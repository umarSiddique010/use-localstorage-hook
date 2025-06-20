# useLocalstorage

A React hook for safe, reactive access to `localStorage`, with:

* Reactive state management with automatic re-renders
* Cross-tab synchronization via storage events
* Auto-initialization on mount with validation
* Built-in `set`, `get`, `remove`, `clearAll` helpers
* Support for any JSON-serializable data
* Error-resilient design with comprehensive error handling
* Zero dependencies — just native Web APIs + React

---

## Why Use This Hook?

> No more repeating `localStorage.setItem` logic in every component.

`useLocalstorage` is for React developers who want:

* Reactive localStorage state that updates your UI automatically
* Cross-tab synchronization - changes in one tab update others
* One-liner setup of persistent browser state
* Safety against stale keys or malformed data
* Clean `set/get/remove` operations without spaghetti
* Auto-persisted defaults on first load
* Reusability across apps, components, and projects

**Perfect for:**

* Auth tokens or user session keys
* UI preferences (dark mode, language)
* Cart data or product filters
* Any local-only persistence logic that needs cross-tab sync

---

## What Is This?

`useLocalstorage()` is a custom React hook that wraps the native `localStorage` API in a safe, reactive, composable way.

It handles:

* Reactive state management with `useState`
* Cross-tab synchronization with storage events
* When to write to localStorage (`useEffect`)
* How to write (with stringification and error handling)
* Reading, removing, and clearing browser keys
* Making it all memoized and safe for reuse

---

## Installation

```bash
npm install @mdus/use-localstorage-hook
# or
yarn add @mdus/use-localstorage-hook
```

---

## API Reference

### What It Expects

| Argument      | Type     | Required | Description                                             |
| ------------- | -------- | -------- | ------------------------------------------------------- |
| `storeName`   | `string` | Yes      | The key to use inside localStorage                      |
| `initialData` | `any`    | Yes      | The default data to initialize if the key is empty/null |

### What It Returns

| Key             | Type       | Description                                                    |
| --------------- | ---------- | -------------------------------------------------------------- |
| `getStore`      | `any`      | The current value from localStorage (reactive state)           |
| `setStore`      | `function` | Sets a value into `localStorage` and updates the reactive state |
| `removeStore`   | `function` | Removes the item with this key from localStorage               |
| `clearAllStore` | `function` | Clears **all** localStorage entries                            |

---

## Usage

### 1. Basic Reactive State

```jsx
import useLocalstorage from "@mdus/use-localstorage-hook";

function ThemeToggle() {
  const { getStore: theme, setStore: setTheme } = useLocalstorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### 2. Cross-Tab Synchronization

```jsx
function UserPreferences() {
  const { getStore: prefs, setStore: setPrefs } = useLocalstorage("userPrefs", {
    language: "en",
    notifications: true
  });

  // This will automatically update across all open tabs
  const updateLanguage = (lang) => {
    setPrefs({ ...prefs, language: lang });
  };

  return (
    <div>
      <p>Language: {prefs.language}</p>
      <button onClick={() => updateLanguage("es")}>Switch to Spanish</button>
    </div>
  );
}
```

### 3. Managing Complex Data

```jsx
function ShoppingCart() {
  const { getStore: cart, setStore: setCart, removeStore } = useLocalstorage("cart", []);

  const addItem = (item) => {
    setCart([...cart, item]);
  };

  const clearCart = () => {
    removeStore();
  };

  return (
    <div>
      <p>Items in cart: {cart.length}</p>
      <button onClick={() => addItem({ id: Date.now(), name: "Product" })}>
        Add Item
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

---

## Key Features

### 1. Reactive State Management

The hook uses `useState` to provide reactive state that automatically re-renders your components when localStorage changes:

```js
const [getStore, setGetStore] = useState(() => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialData;
  } catch (err) {
    console.error(`Error reading localStorage key "${key}":`, err);
    localStorage.removeItem(key);
    return initialData;
  }
});
```

### 2. Cross-Tab Synchronization

The hook listens for storage events to keep multiple tabs in sync:

```js
useEffect(() => {
  const handleStoreChange = (e) => {
    if (e.key === key) {
      try {
        if (e.newValue === null) {
          setGetStore(null);
        } else {
          setGetStore(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error(`Error parsing storage event for key "${key}":`, err);
        setGetStore(null);
      }
    }
  };

  window.addEventListener('storage', handleStoreChange);
  return () => window.removeEventListener('storage', handleStoreChange);
}, [key]);
```

### 3. Safe Initialization

The hook validates inputs and safely initializes localStorage:

```js
if (!storeName || initialData === undefined) {
  throw new Error("useLocalstorage: storeName and initialData are required.");
}
```

### 4. Error Resilience

All operations are wrapped in try/catch blocks with meaningful error messages and fallback behavior.

---

## Internals

### Lifecycle-Safe Initialization

When the component mounts, the hook checks if localStorage already contains the key:

```js
useEffect(() => {
  try {
    const existing = localStorage.getItem(key);
    if (existing === null) {
      setStore(initialData);
    }
  } catch (err) {
    console.error(`Error initializing localStorage key "${key}":`, err);
  }
}, [key, initialData, setStore]);
```

This prevents overwriting existing values.

### Pure React API

* Uses `useState` for reactive state management
* Uses `useCallback` to memoize methods
* Uses `useEffect` for storage event listeners and initialization
* Safe to use inside other hooks and effects
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

This hook solves a **real problem**: managing persistent state in a clean, reactive, and React-friendly way with cross-tab synchronization. It reflects an engineering mindset focused on **clarity**, **reusability**, **reactivity**, and **edge case safety** — all in under 3KB of code.

If it saves you time, please consider starring and sharing.