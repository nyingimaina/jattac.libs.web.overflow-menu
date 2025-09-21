# React Overflow Menu

[![npm version](https://badge.fury.io/js/jattac.libs.web.overflow-menu.svg)](https://badge.fury.io/js/jattac.libs.web.overflow-menu)

A customizable, animated, and lightweight React overflow menu component built with TypeScript and Framer Motion.

This component provides a clean, modern, and accessible overflow menu suitable for any React application, with a focus on great user experience through satisfying micro-interactions.

## Features

- **Smooth Animations**: Built with Framer Motion for fluid, physics-based animations.
- **Staggered Item Display**: Menu items animate in with a subtle "waterfall" effect.
- **Highly Customizable**: Easily change the trigger icon, menu item content, and functionality.
- **Themable**: Uses CSS variables to allow for deep customization that can match any corporate branding.
- **Portal Support**: Optionally render the menu in a React Portal to avoid CSS stacking context issues.
- **Lightweight**: Simple and focused on providing a great overflow menu experience without unnecessary bloat.

## Installation

Install the package and its peer dependencies using npm:

```bash
npm install jattac.libs.web.overflow-menu react react-dom framer-motion
```

## Getting Started



Here's a basic example to get you up and running quickly.

```jsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

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
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', padding: '2rem' }}>
      <OverflowMenu items={menuItems} />
    </div>
  );
};

export default App;
```

## API and Props

The `OverflowMenu` component accepts the following props:

| Prop        | Type                  | Required | Default | Description                                                                                                |
|-------------|-----------------------|----------|---------|------------------------------------------------------------------------------------------------------------|
| `items`     | `IOverflowMenuItem[]` | Yes      | -       | An array of objects that define the menu items.                                                            |
| `icon`      | `ReactNode`           | No       | `'⋮'`     | A custom trigger icon to open the menu.                                                                    |
| `className` | `string`              | No       | `''`      | A CSS class to apply to the trigger button for custom styling.                                             |
| `portal`    | `HTMLElement`         | No       | `null`  | A DOM element to render the menu into. Use this to prevent z-index issues with parent containers.        |

### The `IOverflowMenuItem` Interface

Each item in the `items` array must conform to this interface:

```typescript
interface IOverflowMenuItem {
  content: React.ReactNode; // The content to display for the item.
  onClick?: () => void;     // Function to call when the item is clicked.
}
```

---

## Advanced Usage

### Custom Trigger Icon

You can provide any `ReactNode` as the trigger icon. This is great for using a custom SVG or an icon from a library like `react-icons`.

```jsx
import { BsThreeDotsVertical } from 'react-icons/bs';

// ...
<OverflowMenu items={menuItems} icon={<BsThreeDotsVertical size={24} />} />
```

### Complex Item Content

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

---

## Theming and Customization

The component can be easily themed by overriding the default CSS variables. The variables are scoped to the `.menuWrapper` class, which is the root of the component.

Here are the available variables and their default values:

```css
.your-custom-wrapper-class {
  --ofm-text-color: #024b59;
  --ofm-text-hover-color: #016a80;
  --ofm-bg: rgba(255, 255, 255, 0.75);
  --ofm-bg-blur: 12px;
  --ofm-border-radius: 12px;
  --ofm-item-border-radius: 8px;
  --ofm-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  --ofm-border: 1px solid rgba(2, 75, 89, 0.15);
  --ofm-item-hover-bg: rgba(2, 75, 89, 0.05);
  --ofm-item-active-bg: rgba(2, 75, 89, 0.1);
}
```

**Example: Creating a Dark Theme**

To apply a dark theme, create a CSS class that overrides these variables and apply it to a parent element.

*Your CSS file:*
```css
.dark-theme {
  --ofm-text-color: #e0e0e0;
  --ofm-text-hover-color: #ffffff;
  --ofm-bg: rgba(40, 40, 40, 0.8);
  --ofm-border: 1px solid rgba(255, 255, 255, 0.1);
  --ofm-item-hover-bg: rgba(255, 255, 255, 0.1);
  --ofm-item-active-bg: rgba(255, 255, 255, 0.15);
}
```

*Your JSX file:*
```jsx
import './your-styles.css';

// ...
<div className="dark-theme">
  <OverflowMenu items={menuItems} />
</div>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
