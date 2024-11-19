# Fabric.js Extension – Enhanced Canvas Editor with Advanced Shortcuts & Actions
Fabric.js Extension is a powerful enhancement for Fabric.js, introducing a rich set of keyboard shortcuts and intuitive mouse actions to optimize canvas editing. This extension is ideal for designers, developers, and digital artists who need advanced functionality for navigating, manipulating, and customizing elements on the canvas. With streamlined commands, fabricjs-extension allows users to work faster and more precisely, improving productivity in any Fabric.js-based project.

## 🚀 Features
### 🔄 Navigation
- Zoom at Cursor: Zoom in and out precisely where the cursor is positioned using Shift + Command/Ctrl + Wheel.
- Pan & Pan to Center: Easily pan with the mouse wheel or instantly center the canvas view with a single key ("o").
- Custom Zoom Ratios: Quickly adjust to specific zoom levels ("z").
### ✂️ Element Manipulation
- Copy, Paste & Delete: Duplicate elements (Ctrl/Cmd + C), paste images or elements from other sources, and delete elements (Backspace).
- Move & Transform: Move elements ("m"), rotate ("r"), or scale ("s") with ease.
- Rotate by Interval: Rotate elements by set increments with Shift + rotate.
- Crop Tool: Built-in functionality to crop images and shapes directly on the canvas.
### 🎨 Customization
- Change Color: Quickly modify the color of selected elements ("c").
- Rotation Point Customization: Adjust and customize rotation points for selected elements.
### ⚡️ Additional Highlights
- Cross-Platform Compatibility: Automatically adapts shortcuts for Windows (Ctrl) and macOS (Cmd).
- Multi-Command Workflows: Combine commands for complex interactions and precise control over canvas elements.
## 📦 Installation & Usage
Install via npm:
```sh
npm install fabricjs-extension
```
Import and initialize in your Fabric.js project:
```javascript
import { fabric } from "fabric";
import { install } from "fabricjs-extension";

// Initialize Fabric.js
const canvas = new fabric.Canvas("c");

// Apply the extension with custom configuration
install(canvas, {
    actionsToInstall: {
        rotationPointCustomization: {},
        rotateByInterval: {
            steps: 15,
        },
        dropImagesOnCanvas: {
            justCreateObject: true,
        },
        deleteActiveElement: {
            justEmitEvent: true,
        },
    },
});
```
## 🚧 Working Features
### 📌 In Progress
- Layer Management: Add the ability to manage layers directly on the canvas, including layer ordering, hiding/showing layers, and locking layers.
- Guidelines and Snap-to-Grid: Introduce customizable grid overlays and snapping functionality to assist with precise element placement.
- Customizable Keyboard Shortcuts: Enable users to customize shortcuts for all actions, offering flexibility and adaptability for various workflows.
### 🛠 Planned Features
- Multi-Select Enhancements: Improve multi-selection capabilities to allow grouped transformations (e.g., scaling, rotating) and uniform property adjustments (e.g., color, opacity) across multiple elements.
- History and Undo/Redo Stack: Build an internal history stack to enable undo/redo functionality, allowing users to revert or reapply changes.
- Text Manipulation: Enhance text editing capabilities with options for rich text formatting, including font style, alignment, and paragraph spacing.
- Export and Import Settings: Allow users to save their canvas settings, shortcuts, and configurations to easily load them in new projects.