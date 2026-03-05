
# <img src="./assets/icon.ico" height="45" align="top"> @mdus/use-localstorage-hook

A robust, zero-dependency React hook to manage localStorage state with cross-tab synchronization and reactivity.

[![npm version](https://img.shields.io/npm/v/@mdus/use-localstorage-hook?style=flat-square&color=blue)](https://www.npmjs.com/package/@mdus/use-localstorage-hook)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Minified Size](https://img.shields.io/bundlephobia/minzip/@mdus/use-localstorage-hook?style=flat-square&label=minzipped)](https://bundlephobia.com/package/@mdus/use-localstorage-hook)
[![React](https://img.shields.io/npm/dependency-version/@mdus/use-localstorage-hook/peer/react?style=flat-square)](https://react.dev/)

## ✨ Features

- **🔄 Cross-Tab Synchronization:** Instantly updates state across different browser tabs/windows using the native `storage` event listener.
- **🛡️ Robust Error Handling:** Wrapped in safe `try/catch` blocks to prevent app crashes if `localStorage` is disabled, full, or corrupted.
- **⚡ Reactive:** Behaves just like `useState`. Updates trigger immediate re-renders.
- **🔢 Auto-Serialization:** Automatically handles `JSON.stringify` on writes and `JSON.parse` on reads.
- **🧹 Clean API:** Provides intuitive helpers like `removeStore` and `clearAllStore`.
- **📦 Zero Dependencies:** Lightweight and focused.

## 📦 Installation

Install the package via your preferred package manager:

```bash
# npm
npm install @mdus/use-localstorage-hook

# yarn
yarn add @mdus/use-localstorage-hook

# pnpm
pnpm add @mdus/use-localstorage-hook
```

## 💻 Quick Start

Here is a simple example of how to persist a user's theme preference.

```jsx
import React from 'react';
import useLocalstorage from '@mdus/use-localstorage-hook';

const ThemeSwitcher = () => {
  // Initialize storage with a key and a default value
  const { getStore, setStore, removeStore } = useLocalstorage('app-theme', 'light');

  const toggleTheme = () => {
    const newTheme = getStore === 'light' ? 'dark' : 'light';
    setStore(newTheme);
  };

  return (
    <div style={{ background: getStore === 'light' ? '#fff' : '#333', padding: '20px' }}>
      <h1>Current Theme: {getStore}</h1>
      
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      
      <button onClick={removeStore} style={{ marginLeft: '10px' }}>
        Reset to System Default (Remove Key)
      </button>
    </div>
  );
};

export default ThemeSwitcher;
```

## 📖 API Reference

### `useLocalstorage(storeName, initialData)`

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `storeName` | `string` | **Yes** | The unique key used to store data in `localStorage`. |
| `initialData` | `any` | **Yes** | The default value to use if the key does not exist yet. |

> **Note:** If `storeName` or `initialData` are missing, the hook will throw an error to prevent silent failures.

#### Return Object

The hook returns an object containing the current state and utility functions:

| Property | Type | Description |
| :--- | :--- | :--- |
| `getStore` | `any` | The current value of the storage item. Acts like the state variable in `useState`. |
| `setStore` | `(data: any) => void` | Updates the state and persists it to `localStorage`. Accepts any JSON-serializable data. |
| `removeStore` | `() => void` | Removes the specific key from `localStorage` and resets state to `null`. |
| `clearAllStore` | `() => void` | **Caution:** Clears **all** data in `localStorage` for the domain. |

## 🛠 Under the Hood

### Safety & Error Boundaries
Directly accessing `localStorage` can be dangerous in modern web development (e.g., inside Iframes, Incognito mode, or when quotas are exceeded).
This hook wraps all storage operations in `try/catch` blocks. If an error occurs (like a JSON parse error), it logs the issue to the console gracefully and falls back to your `initialData` or `null`, ensuring your React app doesn't crash.

### Cross-Tab Reactivity
The hook attaches an event listener to the window's `storage` event.
1. When Tab A updates the key `'user_data'`, the browser fires an event.
2. Tab B catches this event, parses the new value, and updates its local React state immediately.
3. This ensures all open tabs stay in perfect sync without a page reload.

---

<div align="center">
  <p><strong>Developed with ❤️ by Md Umar Siddique</strong></p>
  <a href="https://www.linkedin.com/in/md-umar-siddique-1519b12a4/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://www.npmjs.com/~umarSiddique010"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" /></a>
  <a href="https://dev.to/umarsiddique010"><img src="https://img.shields.io/badge/DEV.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="DEV Community" /></a>
  <a href="https://github.com/umarSiddique010"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://x.com/umarSiddique010"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
</div>