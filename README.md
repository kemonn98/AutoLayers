# AutoLayers

> Intelligent Figma plugin that automatically renames layers with developer-friendly, semantic names

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/yourusername/autolayers)
[![Figma](https://img.shields.io/badge/Figma-Plugin-green.svg)](https://www.figma.com/community/plugin/autolayers)

## 🚀 What's New in v1.1.0

- **Semantic/Context-Aware Naming**: Automatically detects common UI patterns (header, footer, card, modal, etc.)
- **Intelligent Dimension Detection**: Recognizes buttons, avatars, and dividers based on size
- **Smart Auto-Layout Analysis**: Detects button groups, navigation bars, and stacks
- **Component Preservation**: Keeps component, instance, and variant names intact
- **Modern Design System Alignment**: Names match Tailwind, Radix, shadcn, and Chakra UI conventions

## ✨ Features

AutoLayers transforms your Figma layer names from generic defaults to meaningful, developer-friendly names that make design-to-code handoffs seamless.

### Semantic Detection

The plugin intelligently recognizes common UI patterns:

**For Frames:**
- `header`, `footer`, `sidebar`
- `hero`, `card`, `modal`
- `section`, `wrapper`, `grid`, `list`

**For Rectangles:**
- `button`, `card`, `badge`, `avatar`, `input`

### Smart Auto-Layout Naming

- **Horizontal Layouts** → `flex-row`, `button-group`, or `nav`
- **Vertical Layouts** → `stack` (modern design system term)
- **Static Frames** → `container` or semantic names

### Dimension-Based Detection

Automatically recognizes UI elements by their dimensions:
- **Buttons**: 36-60px height, 80-320px wide → `button`
- **Cards**: 200-400px width, 150-400px height → `card`
- **Avatars**: Small square shapes ≤80px → `avatar`
- **Dividers**: Very thin elements ≤3px → `divider`

## 📊 Complete Naming Reference

| Figma Type | Base Name | Smart Detection |
|------------|-----------|-----------------|
| Rectangle | `box` | → `button`, `avatar`, `badge`, `card`, `input`, `divider` |
| Rectangle (with image) | `img` | - |
| Frame (Horizontal) | `flex-row` | → `button-group`, `nav` |
| Frame (Vertical) | `stack` | - |
| Frame (No layout) | `container` | → `header`, `footer`, `hero`, `modal`, etc. |
| Ellipse | `circle` | → `avatar` (if small) |
| Vector | `icon` | - |
| Star | `icon` | - |
| Boolean Operation | `icon` | - |
| Polygon | `shape` | - |
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
