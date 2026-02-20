# Configuration: The Control Panel

The Jattac Overflow Menu is designed to be easily customized. This document outlines the available configuration and styling options.

### Table of Contents
1. [Styling and Customization](#styling-and-customization)
2. [Advanced Styling with Data Attributes](#advanced-styling-with-data-attributes)
3. [Portal Usage and Z-Index](#portal-usage-and-z-index)

[Previous: API Reference](./api.md) | [Next: Development](./development.md)

---

### Styling and Customization

The component uses CSS Modules internally, but its styles can be overridden using standard CSS selectors. The primary classes used are:
- `.jattac-overflow-menu-content`: The container for the menu items.
- `.jattac-overflow-menu-item`: Individual menu items.
- `.jattac-overflow-menu-trigger`: The trigger button for the menu.

### Advanced Styling with Data Attributes

The underlying Radix UI components expose data attributes that can be used to target specific states of the menu:
- `[data-state="open"]`: Applied to the trigger when the menu is visible.
- `[data-state="closed"]`: Applied to the trigger when the menu is hidden.
- `[data-highlighted]`: Applied to a menu item when it is being hovered or navigated via keyboard.

**Example: Customizing a Highlighted Item**
```css
/* In your application's global CSS file */
.jattac-overflow-menu-item[data-highlighted] {
  background-color: #f0f0f0;
  color: #333;
}
```

### Portal Usage and Z-Index

The `portal` prop is used to render the menu content into a specific DOM element. This is essential for layouts where:
- A parent container has `overflow: hidden` or `overflow: scroll`.
- The menu is nested within a complex stacking context (e.g., a modal inside a table).
- You need to explicitly manage the z-index of the menu content relative to other components in your application.

For implementation details, refer to the [Using a Portal recipe](./examples.md#using-a-portal-for-complex-layouts).

---

[Previous: API Reference](./api.md) | [Next: Development](./development.md)
