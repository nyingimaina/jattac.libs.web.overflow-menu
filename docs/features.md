# Showcase: Feature Overview

The Jattac Overflow Menu offers a powerful set of features designed to simplify the management of secondary actions while providing a premium user experience.

### Table of Contents
1. [Full Accessibility](#full-accessibility)
2. [Multi-Level Submenus](#multi-level-submenus)
3. [Conditional Visibility and Enabled Toggling](#conditional-visibility-and-enabled-toggling)
4. [Advanced Animations](#advanced-animations)
5. [Atomic & Maintainable Architecture](#atomic-maintainable-architecture)
6. [Modern Frosted-Glass Aesthetic](#modern-frosted-glass-aesthetic)
7. [Flexible Trigger Icons](#flexible-trigger-icons)

[Previous: Cookbook](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md) | [Next: API Reference](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/api.md)

---

### Full Accessibility

The component is built on top of Radix UI primitives, ensuring that it is fully accessible to all users. It adheres to the WAI-ARIA Menu Button pattern, providing:
- Full keyboard navigation (arrow keys, Enter, Space, Escape, Tab).
- Focus management to ensure proper tab order.
- ARIA attributes that automatically communicate the state of the menu to assistive technologies.

For implementation details, refer to the [Simple Action Menu recipe](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md#simple-action-menu).

### Multi-Level Submenus

Organize complex sets of actions with ease using recursive submenus. The library handles the logic for positioning, timing, and keyboard navigation for nested menus, ensuring a smooth experience regardless of depth.

For implementation details, refer to the [Multi-Level Child Menus recipe](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md#multi-level-child-menus).

### Conditional Visibility and Enabled Toggling

Dynamically control whether actions are visible or interactive. These properties support boolean values, synchronous functions, and asynchronous functions (Promises). This allows for complex logic, such as checking permissions from an API or verifying state before enabling an action.

For implementation details, refer to the [Conditional Visibility recipe](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md#conditional-visibility).

### Advanced Animations

Powered by Framer Motion, every interaction feels deliberate and responsive. The trigger features spring-based hover effects, and the menu items use staggered entry animations to guide the user's eye.

### Atomic & Maintainable Architecture

The library is designed for enterprise-grade maintainability. The core component has been refactored into atomic, single-responsibility modules, including:
- **`Evaluate` Utility:** Centralized logic for boolean/sync/async property evaluation.
- **Animation Hub:** Consolidated Framer Motion variants for consistency.
- **Isolated UI Components:** Modularized `DefaultIcon` and `MenuRow` for easier testing and extension.

### Modern Frosted-Glass Aesthetic

Out of the box, the component features a "glassmorphism" design, including backdrop blur and a subtle translucent background. This allows it to blend seamlessly into modern, high-quality user interfaces without extensive customization.

### Flexible Trigger Icons

The default "three dots" icon is animated and interactive. However, the component supports any React node as a custom trigger, making it easy to adapt to your application's specific iconography.

For implementation details, refer to the [Custom Trigger Icon recipe](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md#custom-trigger-icon).

---

[Previous: Cookbook](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md) | [Next: API Reference](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/api.md)
