# AutoLayers

> Intelligent Figma plugin that automatically renames layers with developer-friendly, semantic names

[![Version](https://img.shields.io/badge/version-1.1.3-blue.svg)](https://github.com/yourusername/autolayers)
[![Figma](https://img.shields.io/badge/Figma-Plugin-green.svg)](https://www.figma.com/community/plugin/autolayers)

## 🚀 What's New in v1.1.3

- **Expanded Semantic Naming Library**: 40+ patterns including `btn`/`button`, `img`/`image`/`photo`, `icon`, `nav`/`menu`, `dropdown`/`select`, `checkbox`, `radio`, `switch`/`toggle`, `accordion`, `tooltip`, `toast`/`snackbar`, `alert`/`banner`, `spinner`/`loader`, `skeleton`, `breadcrumb`, `pagination`, and more
- **VECTOR Divider Detection**: Vectors with width or height 0 are now named `divider`
- **Simplified Naming**: Removed ordered naming system for a cleaner, name-based approach—layers are renamed based on type and semantic detection from existing names

## 🚀 What's New in v1.1.0

- **Screen Size Detection**: Automatically categorizes artboards by width ranges (desktop ≥1025px, tablet 601-1024px, mobile ≤600px)
- **Semantic/Context-Aware Naming**: Automatically detects common UI patterns (header, footer, card, modal, etc.)
- **Intelligent Dimension Detection**: Recognizes labels, buttons, avatars, and dividers based on size
- **Smart Auto-Layout Analysis**: Detects button groups, navigation bars, and stacks
- **Component Preservation**: Keeps component, instance, and variant names intact
- **Modern Design System Alignment**: Names match Tailwind, Radix, shadcn, and Chakra UI conventions

## ✨ Features

AutoLayers transforms your Figma layer names from generic defaults to meaningful, developer-friendly names that make design-to-code handoffs seamless.

### Semantic Detection

The plugin recognizes 40+ common UI patterns from layer names. If a layer name contains these terms, it will be renamed accordingly:

**Layout & Structure:** `header`, `footer`, `sidebar`, `section`, `wrapper`, `container`, `grid`, `list`

**Interactive:** `btn`/`button`, `link`, `nav`/`menu`, `tab`, `dropdown`/`select`, `checkbox`, `radio`, `switch`/`toggle`, `accordion`

**Content & Media:** `img`/`image`/`photo`/`picture`/`thumbnail`, `icon`, `avatar`, `badge`/`tag`/`chip`

**Forms & Inputs:** `input`/`field`/`form`, `label`, `search`, `filter`

**Overlays & Feedback:** `modal`/`dialog`/`popup`, `tooltip`, `toast`/`snackbar`, `alert`/`banner`, `spinner`/`loader`, `skeleton`

**Cards & Blocks:** `hero`, `card`, `divider`/`separator`, `breadcrumb`, `pagination`

**For Rectangles:** `card`, `badge`, `avatar`, `input` (in addition to dimension-based detection)

### Smart Auto-Layout Naming

- **Horizontal Layouts** → `flex-row`
- **Vertical Layouts** → `flex-col`
- **Static Frames** → `frame`

Semantic detection can override these with more specific names (e.g., `button`, `nav`) when the layer name contains matching terms.

### Top-Level Frame Detection

Artboards and screens are named `[frame-width]` (e.g., `[frame-1920]`, `[frame-375]`).

### Dimension-Based Detection

- **Dividers**: Rectangles ≤3px thick, vectors with width/height 0, or lines → `divider`
- **Images**: Rectangles with image fill → `img`
- **Rectangles**: Default → `square`

## 📊 Complete Naming Reference

| Figma Type | Base Name | Smart Detection |
|------------|-----------|-----------------|
| Rectangle | `square` | → `avatar`, `badge`, `card`, `input`, `divider` |
| Rectangle (with image) | `img` | - |
| Rectangle (≤3px thick) | `divider` | - |
| Frame (Top-level) | - | → `[frame-width]` |
| Frame (Horizontal) | `flex-row` | → 40+ semantic names (button, nav, etc.) |
| Frame (Vertical) | `flex-col` | → 40+ semantic names |
| Frame (No layout) | `frame` | → 40+ semantic names |
| Ellipse | `circle` | - |
| Vector | `vector` | → `divider` (if width/height 0) |
| Star | `star` | - |
| Boolean Operation | `icon` | - |
| Polygon | `polygon` | - |
| Line | `divider` | - |
| Group | `group` | - |
| Component | *preserved* | Original name kept |
| Instance | *preserved* | Original name kept |
| Component Set | *preserved* | Original name kept |
| Text | *preserved* | Original name kept |

## 🎯 Use Cases

- **Design-to-Code Workflow**: Generate meaningful class names and component names
- **Design System Organization**: Maintain consistent naming across projects
- **Team Collaboration**: Clear communication between designers and developers
- **File Cleanup**: Quickly organize messy Figma files
- **Component Libraries**: Better structure for design systems

## 📦 Installation

### From Figma Community (Recommended)
1. Search for "AutoLayers" in Figma Community Plugins
2. Click "Install"

### Manual Installation (Development)
1. Clone this repository
2. Open Figma Desktop App
3. Go to `Plugins` → `Development` → `Import plugin from manifest...`
4. Select the `manifest.json` file from this project

## 🔧 Development Setup

This plugin uses TypeScript and npm.

### Prerequisites
- [Node.js](https://nodejs.org/) (includes npm)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build TypeScript**
   ```bash
   npm run build
   ```

3. **Watch Mode** (auto-compile on save)
   ```bash
   npm run watch
   ```
   Or in VS Code: `Terminal → Run Build Task → npm: watch`

4. **Lint Code**
   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix issues
   ```

### Project Structure

```
AutoLayers/
├── code.ts           # Main plugin logic (TypeScript)
├── code.js           # Compiled JavaScript (auto-generated)
├── ui.html           # Plugin UI
├── manifest.json     # Figma plugin manifest
├── package.json      # npm configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## 🎨 Usage

1. **Select Layers**: Select one or more layers in your Figma file
2. **Run Plugin**: `Plugins → AutoLayers`
3. **Click "Rename Layers"**: The plugin will intelligently rename your selection
4. **Done!**: All selected layers and their children are renamed

### Tips

- Select entire frames to rename all nested children
- Works on multiple selections at once
- Component and instance names are preserved to maintain design system integrity
- Text layers keep their original names

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow existing code style
2. Test thoroughly in Figma
3. Update documentation for new features
4. Run linter before committing: `npm run lint:fix`

## 📝 Changelog

### v1.1.3 (2025)
- ✨ **NEW**: Expanded semantic naming library (40+ patterns: btn/button, img/image, icon, nav, dropdown, checkbox, tooltip, toast, skeleton, etc.)
- ✨ **NEW**: VECTOR divider detection (width or height 0 → divider)
- 🔧 Removed ordered naming system (navbar/header/footer auto-naming)
- 📚 Updated documentation to match current behavior

### v1.1.0 (2025)
- ✨ Added semantic/context-aware naming
- ✨ Added intelligent dimension-based detection
- ✨ Added smart auto-layout analysis
- ✨ Component/instance name preservation
- 🎨 Updated naming conventions to match modern design systems
- 📚 Comprehensive README documentation

### v1.0.0
- 🎉 Initial release
- Basic type-based layer renaming

## 📄 License

MIT License - feel free to use this plugin in your projects!

## 🙏 Acknowledgments

Built with inspiration from modern design systems:
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Chakra UI](https://chakra-ui.com/)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/autolayers/issues)
- **Figma Community**: [Plugin Page](https://www.figma.com/community/plugin/autolayers)

---

Made with ❤️ for designers and developers
