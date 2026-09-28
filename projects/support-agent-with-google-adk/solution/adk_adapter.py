"""Run two actual ADK agents with a session handoff.

Lesson: projects/support-agent-with-google-adk/stages/04-adk-adapter/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
"""


def collect_events(events):
    rows = []
    for event in events:
        author = event.get("author")
        text = event.get("text", "")
        if not isinstance(author, str) or not author:
            raise ValueError("event author required")
        if not isinstance(text, str):
            raise ValueError("event text must be string")
        if text:
            rows.append(
                {
                    "agent": author,
                    "text": text,
                    "state_delta": dict(event.get("state_delta", {})),
                }
            )
    return rows


async def run_adk(
    ticket_text,
    route_reply="billing",
    answer_reply="Review the invoice and confirm its reference.",
):
    from google.adk.agents import LlmAgent
    from google.adk.workflow import Workflow, START
    from google.adk.models.base_llm import BaseLlm
    from google.adk.models.llm_response import LlmResponse
    from google.adk.runners import Runner
    from google.adk.sessions import InMemorySessionService
    from google.genai import types

    class FixedModel(BaseLlm):
        reply: str
        requests: list[str] = []

        async def generate_content_async(self, llm_request, stream=False):
            self.requests.append(str(llm_request.config.system_instruction))
            yield LlmResponse(
                content=types.Content(role="model", parts=[types.Part(text=self.reply)])
            )

    triage = LlmAgent(
        name="triage",
        model=FixedModel(model="offline-triage", reply=route_reply),
        instruction="Classify the ticket.",
        output_key="route",
    )
    specialist = LlmAgent(
        name="specialist",
        model=FixedModel(model="offline-specialist", reply=answer_reply),
        instruction="Use the route {route} and draft a support reply.",
        output_key="response",
    )
    workflow = Workflow(name="support", edges=[(START, triage, specialist)])
    sessions = InMemorySessionService()
    await sessions.create_session(
        app_name="support", user_id="local", session_id="fixture"
    )
    runner = Runner(node=workflow, app_name="support", session_service=sessions)
    events = []
    async for event in runner.run_async(
        user_id="local",
        session_id="fixture",
        new_message=types.Content(role="user", parts=[types.Part(text=ticket_text)]),
    ):
        text = (
            "".join(part.text or "" for part in event.content.parts)
            if event.content
            else ""
        )
        events.append(
            {
                "author": event.author,
                "text": text,
                "state_delta": event.actions.state_delta,
            }
        )
    session = await sessions.get_session(
        app_name="support", user_id="local", session_id="fixture"
    )
    return {
        "events": collect_events(events),
        "state": session.state,
        "handoff_prompt": specialist.model.requests[0],
    }
