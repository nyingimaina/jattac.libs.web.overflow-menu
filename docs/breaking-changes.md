# Upgrade Path: Breaking Changes

This document provides information about major version changes and breaking changes to the Jattac Overflow Menu.

### Table of Contents
1. [Version 0.0.30 (Upcoming)](#version-0-0-30-upcoming)

[Previous: Development](./development.md) | [Next: README](../README.md)

---

### Version 0.0.30 (Upcoming)

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

For detailed implementation information, refer to the [Multi-Level Child Menus recipe](./examples.md#multi-level-child-menus) in the Cookbook.

---

[Previous: Development](./development.md) | [Next: README](../README.md)
