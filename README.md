# Jattac Overflow Menu

A high-performance, accessible, and customizable React overflow menu component designed for modern web applications.

The Jattac Overflow Menu provides a robust solution for managing secondary actions in compact UI areas such as table rows, headers, and toolbars. Built on top of Radix UI primitives and animated with Framer Motion, it offers a refined user experience with full WAI-ARIA compliance and a modern frosted-glass aesthetic.

## Key Features

- **Multi-Level Support:** Seamlessly handle nested submenus with recursive rendering and consistent animations.
- **Accessibility First:** Fully compliant with WAI-ARIA Menu Button patterns, including complete keyboard navigation and focus management.
- **Advanced Animations:** Smooth, spring-based interactions and staggered entry effects for a professional feel.
- **Portal Rendering:** Optional DOM portal support to resolve z-index and overflow clipping issues in complex layouts.
- **Developer-Centric:** Built with TypeScript for strict type safety and a flexible API that supports rich React nodes as menu content.

## Installation

Install the package along with its required peer dependencies:

```bash
npm install jattac.libs.web.overflow-menu react react-dom framer-motion @radix-ui/react-dropdown-menu
```

## Quick Start

The following example demonstrates a basic implementation with three items.

```tsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';
import 'jattac.libs.web.overflow-menu/dist/index.css';

const App = () => {
  const items: IOverflowMenuItem[] = [
    { content: 'Edit', onClick: () => console.log('Edit') },
    { content: 'Settings', onClick: () => console.log('Settings') },
    { content: 'Delete', onClick: () => console.log('Delete') },
  ];

  return <OverflowMenu items={items} />;
};
```

## Documentation Index

1. [Cookbook: Practical Examples](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md) - **Start here** to learn through real-world scenarios.
2. [Feature Showcase](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/features.md) - A high-level overview of available capabilities.
3. [API Reference](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/api.md) - Detailed technical specifications for components and types.
4. [Configuration Guide](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/configuration.md) - Customization, styling, and global settings.
5. [Development Guide](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/development.md) - Instructions for contributors and local setup.
6. [Migration Guide](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/breaking-changes.md) - Handling updates and breaking changes.

---

[Next: Cookbook](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md)
