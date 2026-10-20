# v0.2.1 — straight view and larger controls

Game code: `8a5764953cce5708236393dff75d982e0310b978`.
Successful Chromium run: https://github.com/GeshaAI/carrot-adventure/actions/runs/39424473325

All five maps completed in Chromium. Added real touch input in all four cardinal directions, normal arrow label checks and minimum 54 px button targets at the primary landscape viewport. Geometry checks confirm that screen axes match the grid and all five boards fit three viewports. Existing checks for swipe, pause, reload, sound preference, replay, standalone HTML and absence of JS errors also passed. The camera is now straight overhead without rotation. Physical Samsung testing of this revision remains pending.

The earlier v0.2 results below describe the preceding isometric edition.

# Verification — 20 October 2026

Tested game code: commit `98ec8017f53fd8a85348d47241284c7cd15f187a`.
Confirmed successful GitHub Actions run: https://github.com/GeshaAI/carrot-adventure/actions/runs/39423257117

## Shared-rule solver (Node.js)

| Level | Carrots | Winning route (moves) | Search states discovered |
|---|---:|---:|---:|
| 1 | 5 | 19 | 719 |
| 2 | 8 | 28 | 3,168 |
| 3 | 7 | 27 | 2,994 |
| 4 | 9 | 27 | 9,985 |
| 5 | 12 | 48 | 132,503 |

All five maps are solvable. All solutions are replayed through the same pure state transition function used by the game. Assertions cover wall and water collisions, each carrot collected once, pressure plates, doors, spike respawn with inventory/gates preserved, valid checkpoint positions, pause, per-step animation lock, malformed saves, localStorage persistence and denied storage. The castle's final carrot is reached across the bridge.

## Actual Chromium browser run in GitHub Actions

Playwright 1.62.1, Chromium 151, Linux; 1280×800 viewport, touch enabled, device scale 1.5. Also checked document overflow at 800×360 and 800×1280.

Passed: all five maps completed via keyboard input; touch arrow; swipe; paused movement blocked; current position restored after page reload; sound preference persisted; level transitions; replay after final victory; standalone HTML loaded and exposed valid game state; no JavaScript or console errors. Build check confirmed that the standalone HTML matches its canonical modules. Screenshots of all five gardens and the victory screen are attached to the successful workflow as `browser-preview`.

One intermediate browser test was unstable because its advancing wall clock could trigger held-key repeat while screenshots were captured. The test now freezes its clock between explicit input steps. The final run above passed.

## Limits and remaining steps

- A physical Samsung Galaxy Tab S6 Lite / Android browser was not available. Actual device frame rate, thermal behavior, finger ergonomics and sound playback quality remain unverified.
- The game targets about 30 render frames per second and caps pixel density at 1.5; these are implementation limits, not a measured tablet performance claim.
- The visual style is original procedural Canvas artwork. No commercial quality parity claim is made.
- The PR is prepared on a separate branch. GitHub Pages deploy is deliberately skipped on pull requests; merge to main and select Settings → Pages → GitHub Actions to publish. A live v0.2 URL has not been confirmed.
- No critical game logic failures were detected by the completed checks. APK packaging is deferred until the tablet browser version is approved.
