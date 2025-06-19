# useLocalstorage

A React hook for safe, idiomatic access to `localStorage`, with:

* Functional, lifecycle-safe API
* Auto-initialization on mount
* Built-in `set`, `get`, `remove`, `clearAll` helpers
* Support for any JSON-serializable data
* Error-resilient and `useCallback`-friendly design
* Zero dependencies — just native Web APIs + React

---

## Why Use This Hook?

> No more repeating `localStorage.setItem` logic in every component.

`useLocalstorage` is for React developers who want:

* One-liner setup of persistent browser state
* Safety against stale keys or malformed data
* Clean `set/get/remove` operations without spaghetti
* Auto-persisted defaults on first load
* Reusability across apps, components, and projects

**Perfect for:**

* Auth tokens or user session keys
* UI preferences (dark mode, language)
* Cart data or product filters
* Any local-only persistence logic

---

## What Is This?

`useLocalstorage()` is a custom React hook that wraps the native `localStorage` API in a safe, composable, idiomatic way.

It handles:

* When to write to localStorage (`useEffect`)
* How to write (with stringification and error handling)
* Reading, removing, and clearing browser keys
* Making it all memoized and safe for reuse

---

## Installation

```bash
npm install @umar/use-localstorage-hook
# or
yarn add @umar/use-localstorage-hook
```

---

## API Reference

### What It Expects

| Argument      | Type     | Required | Description                                             |
| ------------- | -------- | -------- | ------------------------------------------------------- |
| `storeName`   | `string` | Yes      | The key to use inside localStorage                      |
| `initialData` | `any`    | Yes      | The default data to initialize if the key is empty/null |

### What It Returns

| Key             | Type       | Description                                             |
| --------------- | ---------- | ------------------------------------------------------- |
| `setStore`      | `function` | Sets a value into `localStorage` under the provided key |
| `getStore`      | `function` | Retrieves and parses the value under the key            |
| `removeStore`   | `function` | Removes the item with this key from localStorage        |
| `clearAllStore` | `function` | Clears **all** localStorage entries                     |

---

## Usage

### 1. Basic Initialization

```jsx
import useLocalstorage from "@umar/use-localstorage-hook";

function ThemeToggle() {
  const { getStore, setStore } = useLocalstorage("theme", "light");

  const toggleTheme = () => {
    const current = getStore();
    setStore(current === "light" ? "dark" : "light");
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

---

## Internals

### Lifecycle-Safe Initialization

When the component mounts:

```js
useEffect(() => {
  const existing = localStorage.getItem(key);
  if (!existing) {
    setStore(initialData);
  }
}, []);
```

This prevents overwriting existing values.

---

### Safety First

* All methods are wrapped in `try/catch` blocks
* Keys are stringified with `.toString()`
* `getStore()` uses `JSON.parse()` and returns `null` on failure

```js
const getStore = useCallback(() => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    throw new Error("Failed to parse localStorage data");
  }
}, [key]);
```

---

### Pure React API

* Uses `useCallback` to memoize methods
* Safe to use inside `useEffect`, `useMemo`, and props
* Designed for composability in any React component

---

## File Structure

```
use-localstorage-hook/
├── src/
│   └── useLocalstorage.js
├── dist/
│   └── index.js
├── package.json
└── README.md
```

---

## Author

**Md Umar Siddique**

* GitHub: [@umarSiddique010](https://github.com/umarSiddique010)
* LinkedIn: [md-umar-siddique](https://linkedin.com/in/md-umar-siddique)
* Dev.to: [@umarSiddique010](https://dev.to/umarsiddique010)

---

## License

MIT © 2025 Md Umar Siddique

---

## Final Note

This hook solves a **real problem**: managing persistent state in a clean, composable, and React-friendly way. It reflects an engineering mindset focused on **clarity**, **reusability**, and **edge case safety** — all in under 2KB of code.

If it saves you time, please consider starring and sharing.