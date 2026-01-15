# Jattac Overflow Menu

[![npm version](https://badge.fury.io/js/jattac.libs.web.overflow-menu.svg)](https://badge.fury.io/js/jattac.libs.web.overflow-menu)

A customizable, accessible, and animated overflow menu for React, designed for a delightful developer experience.

This component provides a powerful and flexible overflow menu that is easy to style and customize. It's built on top of [Radix UI's](https://www.radix-ui.com/) Dropdown Menu primitive and animated with [Framer Motion](https://www.framer.com/motion/), giving you a robust foundation with a beautiful user experience out of the box.

---

## Table of Contents

- [Why Jattac Overflow Menu?](#why-jattac-overflow-menu)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API and Props](#api-and-props)
  - [`OverflowMenu` Component](#overflowmenu-component)
  - [`IOverflowMenuItem` Interface](#ioverflowmenuitem-interface)
- [Recipes: From Zero to Expert](#recipes-from-zero-to-expert)
  - [Custom Trigger Icon](#custom-trigger-icon)
  - [Rich Item Content](#rich-item-content)
  - [Using a Portal](#using-a-portal)
- [Styling and Customization](#styling-and-customization)
- [Accessibility](#accessibility)
- [License](#license)

---

## Why Jattac Overflow Menu?

This component is designed to be the last overflow menu you'll ever need. Here's the philosophy:

- **Headless at the Core:** We leverage the power of Radix UI to handle all the complex logic for state management, positioning, and accessibility. This means you get a battle-tested foundation that just works.
- **You Own the UI:** While we provide a default modern look and feel, you have 100% control over the rendering. Use our styles, or override them completely. It's your choice.
- **Animations Included:** We use Framer Motion to provide smooth, delightful animations out of the box.
- **Developer Experience First:** Our goal is to provide a component that is easy to learn, a joy to use, and powerful enough for advanced use cases.

## Installation

Install the package and its peer dependencies using npm:

```bash
npm install jattac.libs.web.overflow-menu react react-dom framer-motion @radix-ui/react-dropdown-menu
```

> **Note on Peer Dependencies:** This component requires `react`, `react-dom`, `framer-motion`, and `@radix-ui/react-dropdown-menu` to be installed in your project.

## Getting Started

Here's a basic example to get you up and running in seconds.

```jsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';
import 'jattac.libs.web.overflow-menu/dist/index.css'; // Don't forget to import the styles!

const App = () => {
  const menuItems: IOverflowMenuItem[] = [
    {
      content: 'Edit Profile',
      onClick: () => alert('Editing Profile!'),
    },
    {
      content: 'View Settings',
      onClick: () => alert('Viewing Settings!'),
    },
    {
      content: 'Log Out',
      onClick: () => alert('Logging Out!'),
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2rem' }}>
      <OverflowMenu items={menuItems} />
    </div>
  );
};

export default App;
```

## API and Props

### `OverflowMenu` Component

The `OverflowMenu` component accepts the following props:

| Prop        | Type                  | Required | Default     | Description                                                                                                |
|-------------|-----------------------|----------|-------------|------------------------------------------------------------------------------------------------------------|
| `items`     | `IOverflowMenuItem[]` | Yes      | -           | An array of objects that define the menu items.                                                            |
| `icon`      | `ReactNode`           | No       | `DefaultIcon` | A custom trigger icon to open the menu.                                                                    |
| `className` | `string`              | No       | `''`        | A CSS class to apply to the trigger button for custom styling.                                             |
| `portal`    | `HTMLElement`         | No       | `null`      | A DOM element to render the menu into. Use this to prevent z-index issues with parent containers.        |

### `IOverflowMenuItem` Interface

Each item in the `items` array must conform to this interface:

```typescript
interface IOverflowMenuItem {
  content: React.ReactNode; // The content to display for the item.
  onClick?: () => void;     // Function to call when the item is clicked.
}
```

---

## Recipes: From Zero to Expert

Here are some common use cases to help you get the most out of the component.

### Custom Trigger Icon

You can provide any `ReactNode` as the trigger icon. This is great for using a custom SVG or an icon from a library like `react-icons`.

```jsx
import { BsThreeDotsVertical } from 'react-icons/bs';
// ...
<OverflowMenu items={menuItems} icon={<BsThreeDotsVertical size={24} />} />
```

### Rich Item Content

The `content` property of a menu item can be any valid `ReactNode`. This allows you to create rich menu items with icons, styled text, and more.

```jsx
import { FiEdit, FiLogOut } from 'react-icons/fi';

const richMenuItems: IOverflowMenuItem[] = [
  {
    content: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FiEdit /> Edit Profile
      </span>
    ),
    onClick: () => alert('Editing Profile!'),
  },
  {
    content: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'red' }}>
        <FiLogOut /> Log Out
      </span>
    ),
    onClick: () => alert('Logging Out!'),
  },
];

// ...
<OverflowMenu items={richMenuItems} />
```

### Using a Portal

To avoid z-index issues with parent containers, you can render the menu in a React Portal.

```jsx
const App = () => {
  const portalContainer = document.getElementById('portal-container');
  // ...
  return (
    <div>
      <OverflowMenu items={menuItems} portal={portalContainer} />
      {/* ... other content ... */}
      <div id="portal-container" />
    </div>
  );
}
```

> **Best Practice:** Using a portal is highly recommended for menus that might be rendered inside complex layouts, such as tables, modals, or other components with their own stacking context.

---

## Styling and Customization

The component is styled using CSS Modules, but it's designed to be easily customized. The underlying Radix UI components expose `data-` attributes that you can use to target specific states and parts of the menu.

Here are some of the most common selectors:

| Selector                               | Description                               |
|----------------------------------------|-------------------------------------------|
| `[data-state="open"]`                  | Applied to the trigger when the menu is open. |
| `[data-state="closed"]`                | Applied to the trigger when the menu is closed. |
| `.jattac-overflow-menu-content`        | The menu content container.               |
| `.jattac-overflow-menu-item`           | An individual menu item.                  |
| `[data-highlighted]`                   | Applied to a menu item when it is highlighted (e.g., on hover or with keyboard navigation). |

**Example: Overriding the background color of a highlighted item**

```css
/* In your application's global CSS file */
.jattac-overflow-menu-item[data-highlighted] {
  background-color: #f0f0f0;
  color: #333;
}
```

## Accessibility

This component is built on top of Radix UI's Dropdown Menu, which is fully accessible and follows the [WAI-ARIA Menu Button design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/).

- **Keyboard Navigation:** Full keyboard support for opening, closing, and navigating the menu.
- **Focus Management:** Focus is automatically managed, moving to the menu when it opens and returning to the trigger when it closes.
- **ARIA Attributes:** All necessary ARIA attributes are automatically applied.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
