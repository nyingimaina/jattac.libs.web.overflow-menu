# API Reference: Technical Blueprint

This document provides exhaustive technical specifications for the Jattac Overflow Menu component and its associated types.

### Table of Contents
1. [OverflowMenu Component](#overflowmenu-component)
2. [IOverflowMenuItem Type](#ioverflowmenuitem-type)

[Previous: Features](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/features.md) | [Next: Configuration](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/configuration.md)

---

### OverflowMenu Component

The primary component for rendering the overflow menu.

| Prop | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `items` | `IOverflowMenuItem[]` | Yes | - | An array of objects defining the menu items and their behavior. |
| `icon` | `React.ReactNode` | No | `<DefaultIcon />` | A custom React node to be used as the menu trigger. |
| `className` | `string` | No | `''` | A custom CSS class to apply to the trigger button for styling. |
| `portal` | `HTMLElement` | No | `null` | A reference to a DOM element to render the menu content into using a React Portal. |

### IOverflowMenuItem Type

`IOverflowMenuItem` is a discriminated union that enforces correct property usage for different menu item roles.

| Property | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `content` | `React.ReactNode` | Yes | - | The visual content for the menu item. |
| `onClick` | `() => void` | **See Note** | - | Callback executed when the item is selected. |
| `children` | `IOverflowMenuItem[]` | **See Note** | - | Optional child items to create a nested submenu. |
| `visible` | `boolean \| (() => boolean) \| (() => Promise<boolean>)` | No | `true` | Controls the visibility of the item. Supports booleans, sync, and async functions. |
| `enabled` | `boolean \| (() => boolean) \| (() => Promise<boolean>)` | No | `true` | Controls whether the item is interactive. Supports booleans, sync, and async functions. |

#### Notes on Union Variants
- **`ActionItem`:** Required `onClick`. Does not accept `children`.
- **`SubmenuItem`:** Required `children` (minimum 1 item). `onClick` is optional and usually omitted.

#### Notes on Visibility and Enabled State
- If `visible` resolves to `false`, the item will not be rendered at all.
- If `enabled` resolves to `false`, the item is rendered as disabled and `onClick` will not be triggered.
- Async functions are evaluated once when the item is mounted or when their reference changes.

---

[Previous: Features](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/features.md) | [Next: Configuration](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/configuration.md)
