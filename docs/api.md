# API Reference: Technical Blueprint

This document provides exhaustive technical specifications for the Jattac Overflow Menu component and its associated types.

### Table of Contents
1. [OverflowMenu Component](#overflowmenu-component)
2. [IOverflowMenuItem Interface](#ioverflowmenuitem-interface)

[Previous: Features](./features.md) | [Next: Configuration](./configuration.md)

---

### OverflowMenu Component

The primary component for rendering the overflow menu.

| Prop | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `items` | `IOverflowMenuItem[]` | Yes | - | An array of objects defining the menu items and their behavior. |
| `icon` | `React.ReactNode` | No | `<DefaultIcon />` | A custom React node to be used as the menu trigger. |
| `className` | `string` | No | `''` | A custom CSS class to apply to the trigger button for styling. |
| `portal` | `HTMLElement` | No | `null` | A reference to a DOM element to render the menu content into using a React Portal. |

### IOverflowMenuItem Interface

The interface defining the structure of each item in the `items` array.

| Property | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `content` | `React.ReactNode` | Yes | - | The visual content to be displayed for the menu item. |
| `onClick` | `() => void` | No | - | A callback function to execute when the menu item is selected. |
| `children` | `IOverflowMenuItem[]` | No | - | An optional array of child items to create a nested submenu. |

#### Notes on Type Behavior
- If `children` is provided and contains at least one item, the menu item will render as a `SubmenuTrigger` rather than a standard `MenuItem`.
- When an item has `children`, its `onClick` handler is ignored in favor of opening the submenu.

---

[Previous: Features](./features.md) | [Next: Configuration](./configuration.md)
