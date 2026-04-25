# 🎬 Segue

[![Foundry VTT](https://img.shields.io/badge/Foundry-v13%2B-orange)](https://foundryvtt.com/)
[![GitHub release](https://img.shields.io/github/v/release/north-aok/foundry-vtt-segue)](https://github.com/north-aok/foundry-vtt-segue/releases)

<a href='https://ko-fi.com/northaok' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

**Segue** is a system-agnostic, cinematic module for [Foundry Virtual Tabletop](https://foundryvtt.com/) V13+ that enables smooth, customizable fade-to-black scene transitions to enhance immersion for your GM storytelling and reduce perceived loading times between scene activations for connected players. Use it to introduce new locations, chapter changes, dramatic combat scenes or anything else!

Several Google Fonts included. See [assets/fonts](assets/fonts/) for licensing and details.

---

## Features

- Smoothly fade-to-black the current scene, display text (optional), then smoothly fade into the next scene
- Loads the new scene canvas (and playlist) in the background to minimize or eliminate perceived loading times between scenes
- Customize font, color, size, and animation speeds per scene
- Syncs transition across all connected clients/players
- Simple configuration tab for each scene
- Optional global setting to display overlay above or below the Foundry UI, for players and GM separately
- Localization support

---

## Preview

![Demo](media/Foundry_Virtual_Tabletop_YZ9xbltvqp.gif)

Global Settings  

![Global Settings](media/Screenshot%202025-06-17%20011240.png)

Scene Configuration

![Scene Configuration](media/Screenshot%202025-06-17%20011305.png)

---

## Usage

1. Right-click on a Scene in the sidebar or navigation --> **Configure**
2. Click on the **"Segue"** tab
3. Enable the transition for the scene and customize the settings
4. Activate the scene via the Segue option in the right-click context menu (in either the Scene Directory or Navigation)  

---

## Macro API

Segue exposes a small GM-only API at `game.segue`.

Start a segue by scene ID or scene name:

```js
await game.segue.start("Scene Name");
```

Start a segue from a Scene document:

```js
const scene = game.scenes.getName("Scene Name");
await game.segue.start(scene);
```

By default, `start` respects the scene's Segue enabled setting. To run a segue even if it is disabled for that scene:

```js
await game.segue.start("Scene Name", { force: true });
```

Read the resolved Segue configuration for a scene:

```js
const config = game.segue.getSceneConfiguration("Scene Name");
console.log(config);
```

`game.segue.execute(...)` is also available as an alias for `game.segue.start(...)`.

---

## Global Settings

Found in **Game Settings > Configure Settings > Segue**:
- **Display Segue over UI**: If enabled, the overlay will cover the entire Foundry canvas. Disable to allow the UI (chat, journals, characters sheets, etc) to remain visible during transitions.
- **Display Segue under UI for GM only**: As suggested, this will display the Segue below the UI for the GM, leaving all UI elements visible (e.g., journals, character sheets, etc). Players will still see the full canvas overlay if the above option is enabled. 

---

## Installation

[https://foundryvtt.com/packages/foundry-vtt-segue](https://foundryvtt.com/packages/foundry-vtt-segue)

Find it within Foundry's Add-on Modules, or to manually install:

**https://github.com/north-aok/foundry-vtt-segue/releases/latest/download/module.json**

Copy/paste the above URL into Foundry's Add-on Modules tab > Install Module > Manifest URL and Install:  

![Install via manifest](media/Screenshot%202025-06-18%20114247.png)
---

## Dependencies

- Foundry VTT v13 or higher
- [socketlib](https://foundryvtt.com/packages/socketlib/)
- [libwrapper](https://foundryvtt.com/packages/lib-wrapper/)

---

## Roadmap

- Optional sound effects (over the top of scene Ambience/playlist settings) tied to transitions  
- Trigger Segues from journal entries
- GM "preview" mode for testing transitions  
- Customizable text placement/line wrapping and more text options
- Global default settings override for all new Segues
- More Segue options (fade in/out custom color, text position)  
- Improved GM override options (skip animation for GM)
- Ability for user to add more font families
- More localization options/languages (if requested)
- Remove libwrapper dependency

---
