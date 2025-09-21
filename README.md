# React Overflow Menu

[![npm version](https://badge.fury.io/js/jattac.libs.web.overflow-menu.svg)](https://badge.fury.io/js/jattac.libs.web.overflow-menu)

A customizable, animated, and lightweight React overflow menu component built with TypeScript and Framer Motion.

This component provides a clean, modern, and accessible overflow menu suitable for any React application, with a focus on great user experience through satisfying micro-interactions.

## Features

- **Smooth Animations**: Built with Framer Motion for fluid, physics-based animations, including a subtle wave animation and color change for the default icon.
- **Staggered Item Display**: Menu items animate in with a subtle "waterfall" effect.
- **Highly Customizable**: Easily change the trigger icon, menu item content, and functionality.
- **Responsive Positioning**: Mobile-first design with desktop awareness, ensuring the menu positions correctly on various screen sizes and avoids cut-offs.
- **Enhanced Hover Effects**: Menu items feature modern background and foreground color changes on hover for clear visual feedback.
- **Item Separators**: Muted borders visually separate menu items, improving clarity and user experience.
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

## Styling and Customization

The component's styling is primarily controlled via its internal CSS module (`OverflowMenu.module.css`). While direct customization through CSS variables is no longer supported, you can override the component's default styles by targeting its CSS classes in your own stylesheets.

For example, to change the background of the menu:

```css
/* In your application's CSS file */
.your-custom-wrapper-class .OverflowMenu-module_menu__n8uKD { /* Use the hashed class name from your build output */
  background: #f0f0f0; /* Your desired background */
}
```
*Note: The exact hashed class names (e.g., `OverflowMenu-module_menu__n8uKD`) will depend on your build process. You may need to inspect the rendered HTML to find them.*

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.