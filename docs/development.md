# Development Guide: Contributing to Jattac Overflow Menu

Thank you for your interest in contributing to the Jattac Overflow Menu. This document provides instructions for setting up your local environment and understanding the project's internal structure.

### Table of Contents
1. [Local Setup](#local-setup)
2. [Internal Architecture](#internal-architecture)
3. [Available Scripts](#available-scripts)
4. [Testing and Quality Assurance](#testing-and-quality-assurance)

[Previous: Configuration](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/configuration.md) | [Next: Breaking Changes](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/breaking-changes.md)

---

### Local Setup

To get started with local development, ensure you have Node.js and npm installed.
1. Clone the repository.
2. Install dependencies by running `npm install`.
3. To start the development build in watch mode, run `npm run watch`.

### Internal Architecture

The project is structured to maintain a clean separation between data, styles, and UI components:
- `src/Data`: Contains TypeScript interfaces and types, such as `IOverflowMenuItem`.
- `src/Styles`: Contains CSS Modules for component styling.
- `src/UI`: Contains the core React components, including `OverflowMenu.tsx`.
- `test-app/`: A standalone React environment for manual testing and component verification.
- `test-app2/`: A Next.js (App Router) environment for verifying compatibility with modern frameworks.

### Available Scripts

- `npm run build`: Compiles the library using Rollup into ESM and CommonJS formats.
- `npm run watch`: Compiles the library in watch mode for a faster development cycle.
- `npm run lint`: Executes ESLint to ensure code quality and style consistency.
- `npm run size`: Analyzes the bundle size to maintain a lightweight footprint.

### Testing and Quality Assurance

Before submitting a pull request, please ensure that:
- The project builds without errors (`npm run build`).
- No linting issues are present (`npm run lint`).
- The component is manually verified in both `test-app` and `test-app2` to ensure cross-framework compatibility.

---

[Previous: Configuration](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/configuration.md) | [Next: Breaking Changes](https://github.com/nyingimaina/jattac.libs.web.overflow-menu/blob/develop/docs/breaking-changes.md)
