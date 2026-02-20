# Upgrade Path: Breaking Changes

This document provides information about major version changes and breaking changes to the Jattac Overflow Menu.

### Table of Contents
1. [Version 0.0.32](#version-0-0-32)
2. [Version 0.0.30](#version-0-0-30)

[Previous: Development](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/development.md) | [Next: README](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/README.md)

---

### Version 0.0.32

Version 0.0.32 introduces significant API and architectural enhancements to improve type safety and maintainability.

**Breaking Change: IOverflowMenuItem Union**
`IOverflowMenuItem` is now a discriminated union. This change enforces that `onClick` is required for action items (items without `children`).

**Before:**
```tsx
const items: IOverflowMenuItem[] = [
  { content: 'Delete' }, // Invalid if children are absent
];
```

**After:**
```tsx
const items: IOverflowMenuItem[] = [
  { content: 'Delete', onClick: () => {} }, // Now correctly required
];
```

**Feature: Conditional Visibility & Enabled State**
Added `visible` and `enabled` properties supporting boolean, synchronous, and asynchronous values.

```tsx
const items: IOverflowMenuItem[] = [
  {
    content: 'Export',
    enabled: async () => await checkExportStatus(),
    onClick: () => {},
  },
];
```

---

### Version 0.0.30

Version 0.0.30 introduces significant enhancements to the component's internal architecture, including support for multi-level submenus. While the primary API remains consistent, some internal types and styles have changed.

**Before: Flat Items Only**
```tsx
const items: IOverflowMenuItem[] = [
  { content: 'Item 1', onClick: () => {} },
];
```

**After: Multi-Level Support**
```tsx
const items: IOverflowMenuItem[] = [
  {
    content: 'Item 1',
    children: [
      { content: 'Child Item', onClick: () => {} },
    ],
  },
];
```

For detailed implementation information, refer to the [Multi-Level Child Menus recipe](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/examples.md#multi-level-child-menus) in the Cookbook.

---

[Previous: Development](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/development.md) | [Next: README](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/README.md)
