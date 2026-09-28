window.AIFSProjectFigures.register("pj-desktop-control-1", {
  title: "Validate frames and coordinate spaces",
  steps: [
    { label: "Validate input", detail: "Frame.validate, Frame.logical_point" },
    {
      label: "Apply the boundary",
      detail:
        "A screenshot has physical pixel dimensions while native desktop clicks may use logical coordinates. Validate positive bounded dimensions and a finite display scale, then reject points outside the frame before converting by floor division. The frame generation identifies which observation justified an action.",
    },
    {
      label: "Inspect output",
      detail:
        "A pixel at 200,100 on a scale-two display maps to logical point 100,50; a point exactly on the right boundary is rejected.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
window.AIFSProjectFigures.register("pj-desktop-control-2", {
  title: "Render and manipulate a fixture scene",
  steps: [
    { label: "Validate input", detail: "Backend, FixtureBackend" },
    {
      label: "Apply the boundary",
      detail:
        "Define capture, click and type_text behind one Backend trait. The fixture draws a real PPM image from its state: a text field, a submit region and a green completed scene. Clicking the field changes focus, typing requires focus, and clicking submit completes only after text exists. The fixture makes transition bugs reproducible without controlling the user desktop.",
    },
    {
      label: "Inspect output",
      detail:
        "The final PPM is a real rendered artifact. Fixture completion establishes backend logic only, not native OS control.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
window.AIFSProjectFigures.register("pj-desktop-control-3", {
  title: "Reject stale observations and exhausted budgets",
  steps: [
    {
      label: "Validate input",
      detail: "Controller.capture, Controller.click, Controller.type_text",
    },
    {
      label: "Apply the boundary",
      detail:
        "Place a Controller around the backend. Reserve action budget before each backend call, require a captured frame before clicks, and invalidate that frame after a mutation. A stale generation must fail before clicking. Keep a trace of successful actions and count attempted backend calls even when the backend returns an error.",
    },
    {
      label: "Inspect output",
      detail:
        "A second click cannot reuse the pre-click screenshot. The caller must capture the changed scene first.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
window.AIFSProjectFigures.register("pj-desktop-control-4", {
  title: "Build an opt-in native boundary",
  steps: [
    {
      label: "Validate input",
      detail: "click_argv, text_argv, png_dimensions, MacBackend",
    },
    {
      label: "Apply the boundary",
      detail:
        "Construct macOS screencapture and AppleScript argument arrays without a shell. Pass typed text as an argument, never as executable script content. Read PNG dimensions from native screenshot headers and preserve the actual image payload. The default demo remains the fixture. Native capture requires an explicit --native-capture flag, OS permissions and a caller-supplied DESKTOP_SCALE when the display is scaled. Native click and typing are library methods, not automatic demo actions.",
    },
    {
      label: "Inspect output",
      detail:
        "The tests verify native argument construction and image metadata parsing. Native macOS execution is explicitly unverified by the fixture suite; use it only against a disposable test application.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
