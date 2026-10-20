# 🐰 CARROT ADVENTURE v0.4.0

Original straight-view garden puzzle game. HTML5 Canvas 2D, vanilla JavaScript modules, no runtime dependencies, paid APIs, accounts or external assets. Based on the supplied working v0.1 prototype (retained at `legacy/v01.html`). This repository previously contained only a README.

## Play

Serve the repository over HTTP: `python3 -m http.server 8080`, then open http://localhost:8080. JavaScript modules require HTTP; opening index.html directly as a file is unsupported.

Large touch arrows (hold to repeat), one swipe per cell, arrow keys or WASD. Screen and grid directions now match directly: up moves up and right moves right. The board has no rotation or perspective skew. Landscape mode places the D-pad in a separate side panel, freeing vertical space for the board. Escape pauses. Every accepted step has a 180 ms hop; repeat interval is 210 ms. The game saves the current map, position, carrots, checkpoint, doors and sound choice after each move. Storage errors are handled with an on-screen message. Audio starts only after a gesture; all sounds and the quiet melody use Web Audio synthesis.

## Standalone edition

`carrot-adventure-v0.2.html` contains the same game, styles and graphics in one file, with no network dependencies. It can be served normally or opened as a local HTML file in a browser that allows scripts in downloaded files. Android file viewers differ; Chrome is recommended. Regenerate it after source changes with `python3 tools/build_offline.py`. CI verifies it matches the modules. File and HTTP versions have separate localStorage origins.

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

`js/game.js` owns pure state transitions shared by runtime and solver. `levels.js`, `collision.js`, `player.js`, `input.js`, `save.js`, `audio.js`, `renderer.js` separate responsibilities. Canvas draws original axis-aligned shaded garden tiles, faceted rocks, layered trees, flowers, rippling water, wooden bridges, portals, pressure plates and a white rabbit with articulated ears, blinking and hops. No copied Bobby Carrot artwork. The `assets` folders describe the procedural assets; no additional downloads are needed. Pixel density is capped at 1.5; rendering is capped at about 30 fps to limit GPU work.

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

## v0.3: garden selection

The ☷ header button pauses the game and shows all five gardens. Unlocked gardens can be replayed; locked gardens cannot be selected. Returning to the current garden preserves its current position. Selecting another garden starts that map again. Best move counts and unlocks persist alongside the current save. Background colors vary between gardens; paths have worn stone/dirt patches and small mushroom decorations. Straight view and large controls are retained.

## v0.4: painted art

Original transparent sprite atlas generated with the built-in image tool: `assets/environment/garden-atlas-v04.png`. Twelve assets include rabbit idle/hop/blink poses, carrot, flowering shrub, tree, mossy rock, flower/mushroom cluster, closed/open gate, checkpoint and spikes. `js/art.js` maps padded source rectangles without altering the source image. The rabbit switches poses while hopping and blinking. Terrain is a cached continuous meadow with connected dirt paths, fine grass and dust, without checkerboard tiles. A light parchment interface retains the tested straight grid and touch controls. The standalone HTML embeds the atlas as a data URL; no external image requests are required.
