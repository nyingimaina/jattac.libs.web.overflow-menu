# Cookbook: Practical Examples

The Jattac Overflow Menu is designed to be highly flexible. This cookbook provides practical, copy-paste recipes for common scenarios, ranging from simple action lists to complex nested menus.

### Table of Contents
1. [Simple Action Menu](#simple-action-menu)
2. [Custom Trigger Icon](#custom-trigger-icon)
3. [Rich Content Items](#rich-content-items)
4. [Multi-Level Child Menus](#multi-level-child-menus)
5. [Conditional Visibility](#conditional-visibility)
6. [Enabled Toggling](#enabled-toggling)
7. [Using a Portal for Complex Layouts](#using-a-portal-for-complex-layouts)

[Previous: README](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/README.md) | [Next: Features](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/features.md)

---

### Simple Action Menu

The most common use case is a flat list of actions. This recipe shows the minimum configuration required to implement a standard overflow menu.

```tsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const items: IOverflowMenuItem[] = [
  { content: 'Edit', onClick: () => console.log('Edit clicked') },
  { content: 'Delete', onClick: () => console.log('Delete clicked') },
];

const MyComponent = () => (
  <OverflowMenu items={items} />
);
```

### Custom Trigger Icon

You can override the default animated "three dots" icon with any React node. This is useful for integrating with icon libraries like `react-icons` or `lucide-react`.

```tsx
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const items: IOverflowMenuItem[] = [
  { content: 'Profile', onClick: () => {} },
  { content: 'Security', onClick: () => {} },
];

const MyComponent = () => (
  <OverflowMenu items={items} icon={<FiSettings size={20} />} />
);
```

### Rich Content Items

The `content` property of each menu item can be a complex React node. This allows for items with icons, badges, or specialized typography.

```tsx
import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const items: IOverflowMenuItem[] = [
  {
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FiEdit2 /> <span>Edit Entry</span>
      </div>
    ),
    onClick: () => {},
  },
  {
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'red' }}>
        <FiTrash2 /> <span>Delete Entry</span>
      </div>
    ),
    onClick: () => {},
  },
];

const MyComponent = () => (
  <OverflowMenu items={items} />
);
```

### Multi-Level Child Menus

Support for nested menus is built-in. Simply add a `children` array to any item. The component will recursively render submenus with consistent styling and animations.

```tsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const items: IOverflowMenuItem[] = [
  {
    content: 'Share',
    children: [
      { content: 'Email', onClick: () => {} },
      { content: 'Message', onClick: () => {} },
      {
        content: 'Social Media',
        children: [
          { content: 'Twitter', onClick: () => {} },
          { content: 'Facebook', onClick: () => {} },
        ],
      },
    ],
  },
  { content: 'Download', onClick: () => {} },
];

const MyComponent = () => (
  <OverflowMenu items={items} />
);
```

### Conditional Visibility

Control the visibility of menu items using booleans, synchronous functions, or asynchronous functions. This is ideal for role-based access control or state-dependent actions.

```tsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const items: IOverflowMenuItem[] = [
  {
    content: 'Admin Panel',
    visible: false, // Statically hidden
    onClick: () => {},
  },
  {
    content: 'User Settings',
    visible: () => localStorage.getItem('user') !== null, // Synchronous check
    onClick: () => {},
  },
  {
    content: 'Delete Project',
    visible: async () => {
      const response = await fetch('/api/check-permissions');
      return response.ok; // Asynchronous check
    },
    onClick: () => {},
  },
];

const MyComponent = () => <OverflowMenu items={items} />;
```

### Enabled Toggling

Similar to visibility, you can disable items while keeping them visible. Disabled items are non-interactive and styled appropriately to indicate their state.

```tsx
import React from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const items: IOverflowMenuItem[] = [
  {
    content: 'Quick Save',
    enabled: true,
    onClick: () => {},
  },
  {
    content: 'Export Data',
    enabled: () => isDataDirty, // Synchronous check
    onClick: () => {},
  },
  {
    content: 'Finalize Deployment',
    enabled: async () => {
      const status = await getBuildStatus();
      return status === 'ready'; // Asynchronous check
    },
    onClick: () => {},
  },
];

const MyComponent = () => <OverflowMenu items={items} />;
```

### Using a Portal for Complex Layouts

When a menu is rendered inside a container with `overflow: hidden` or restricted z-indexing (e.g., a table cell or a modal), use the `portal` prop to render the menu outside the parent's stacking context.

```tsx
import React, { useRef } from 'react';
import OverflowMenu, { IOverflowMenuItem } from 'jattac.libs.web.overflow-menu';

const App = () => {
  const portalRef = useRef<HTMLDivElement>(null);
  
  const items: IOverflowMenuItem[] = [
    { content: 'Action 1', onClick: () => {} },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ overflow: 'hidden', height: '100px' }}>
        <OverflowMenu items={items} portal={portalRef.current} />
      </div>
      
      {/* The menu will be rendered here, outside the hidden container */}
      <div ref={portalRef} id="menu-portal" />
    </div>
  );
};
```

---

[Previous: README](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/README.md) | [Next: Features](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/features.md)
