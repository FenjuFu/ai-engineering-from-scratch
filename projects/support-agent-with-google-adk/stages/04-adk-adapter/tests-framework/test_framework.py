import unittest
from adk_adapter import run_adk


class FrameworkTests(unittest.IsolatedAsyncioTestCase):
    async def test_real_agents_emit_both_authors(self):
        result = await run_adk("invoice question")
        self.assertEqual(
            [event["agent"] for event in result["events"]], ["triage", "specialist"]
        )

    async def test_route_state_reaches_session(self):
        self.assertEqual((await run_adk("invoice"))["state"]["route"], "billing")

    async def test_response_state_is_recorded(self):
        self.assertEqual(
            (await run_adk("invoice", answer_reply="Check invoice 12."))["state"][
                "response"
            ],
            "Check invoice 12.",
        )

    async def test_injected_route_is_observable(self):
        result = await run_adk("login", route_reply="access")
        self.assertEqual(result["state"]["route"], "access")
        self.assertIn("Use the route access", result["handoff_prompt"])

    async def test_runs_do_not_share_session_state(self):
        first = await run_adk("invoice", answer_reply="first")
        second = await run_adk("invoice", answer_reply="second")
        self.assertEqual(first["state"]["response"], "first")
        self.assertEqual(second["state"]["response"], "second")
