# 🐰 CARROT ADVENTURE v0.2

Original isometric garden puzzle game. HTML5 Canvas 2D, vanilla JavaScript modules, no runtime dependencies, paid APIs, accounts or external assets. Based on the supplied working v0.1 prototype (retained at `legacy/v01.html`). This repository previously contained only a README.

## Play

Serve the repository over HTTP: `python3 -m http.server 8080`, then open http://localhost:8080. JavaScript modules require HTTP; opening index.html directly as a file is unsupported.

Touch arrows (hold to repeat), one swipe per cell, arrow keys or WASD. Arrows depict isometric directions: up goes northeast; right goes southeast. Escape pauses. Every accepted step has a 180 ms hop; repeat interval is 210 ms. The game saves the current map, position, carrots, checkpoint, doors and sound choice after each move. Storage errors are handled with an on-screen message. Audio starts only after a gesture; all sounds and the quiet melody use Web Audio synthesis.

## Five gardens

| Garden | Carrots | New mechanic |
|---|---:|---|
| Морковная поляна | 5 | Exploration, locked exit |
| Каменный лабиринт | 8 | Branches and dead ends |
| Волшебные ворота | 7 | Latching pressure plate |
| Опасный сад | 9 | Spikes, checkpoint, water and bridge |
| Тайна морковного замка | 12 | Two independent plates and doors |

Pressure plates latch permanently. A opens a; B opens b. Spikes return the rabbit to the last flag (or the starting cell) and keep collected carrots and opened doors. Water blocks movement; bridges are walkable. Every exit requires all carrots. Completing the fifth garden displays the 41-carrot journey total and replay.

## Architecture and art

`js/game.js` owns pure state transitions shared by runtime and solver. `levels.js`, `collision.js`, `player.js`, `input.js`, `save.js`, `audio.js`, `renderer.js` separate responsibilities. Canvas draws original shaded garden tiles, faceted rocks, layered trees, flowers, rippling water, wooden bridges, portals, pressure plates and a white rabbit with articulated ears, blinking and hops. No copied Bobby Carrot artwork. The `assets` folders describe the procedural assets; no additional downloads are needed. Pixel density is capped at 1.5; rendering is capped at about 30 fps to limit GPU work.

## Verification

`npm test` runs a breadth-first state-space search across each map using the same `step()` rules as the game, including remaining carrots, gate bits and checkpoint. It replays each solution and checks collisions, unique collection, trap state preservation, pause, animation input lock, save validation and localStorage failures. It generates `tests/routes.json`.

Browser checks: `npm install --no-save playwright@1.62.1`, `npx playwright install chromium`, start the local HTTP server, then `node tests/browser.cjs`. Browser tests use real keyboard, pointer and touch events, follow all solver routes, check reload/pause/swipe/replay/sound and two extra viewport sizes. Screenshots go to `test-output/`.

Actual checks and limitations are recorded in `TEST_RESULTS.md`. No claim of testing on physical Samsung hardware is made.

## GitHub Pages from Android

1. Open this repository in Chrome and open the prepared Pull Request. Review the changes and merge it to `main`.
2. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Desktop site mode may make Settings easier to access on a tablet.
3. Open **Actions → Test and deploy gardens**. If needed, choose **Run workflow → main**.
4. Open the URL reported by the successful **Deploy** step. Expected address: `https://geshaai.github.io/carrot-adventure/`. This address is only live after a successful deployment.

The workflow tests every PR and deploys only main. APK export is deliberately deferred until the browser game is approved on the target tablet.
