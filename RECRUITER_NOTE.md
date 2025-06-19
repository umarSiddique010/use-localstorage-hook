# Hello!

Thanks for checking out my project — `use-localstorage-hook`. This may look like a simple `localStorage` wrapper — but behind it is a mindset of building **clean, safe, production-ready abstractions** that solve recurring frontend problems.

---

## Why I Built This

*"If your component touches `localStorage`, it should never crash because of it."*

I kept repeating the same `localStorage` boilerplate:

* Stringifying/parsing safely
* Preventing overwrite on re-render
* Avoiding runtime crashes from malformed JSON
* Managing storage lifecycle across components

So I built this hook: a stable, declarative API for persistent client-side state — that's also idiomatic to React.

---

## What This Demonstrates

### Clean, Functional API

```js
const { setStore, getStore, removeStore, clearAllStore } = useLocalStorage("cart", []);
```

* Auto-initializes storage only once
* Uses `useCallback` to avoid unnecessary renders
* Wraps all storage methods in error-safe guards
* Designed to plug-and-play in any component, safely

---

## Part of a Larger Journey

This isn't my first hook. `use-localstorage-hook` builds on lessons I've learned from building, publishing, and maintaining:

| Hook Package | Purpose |
|--------------|---------|
| `use-http-request-hook` | React hook with built-in GET caching, waterfall protection, abort handling, and debounce |
| `use-timer-hooks` | Lifecycle-safe `useTimeout` and `useInterval` with manual control |


Each of these solves a **real-world need** in a reusable way, and reflects my philosophy of writing resilient, beginner-friendly, and production-grade code.

---

## What I Focus On

* **API clarity** over cleverness
* **Resilience** against bad inputs, edge cases
* **Zero-dependency** tools you can trust in production
* **React idioms**: `useCallback`, `useEffect`, functional data flow
* **Polished DX**: good docs, safe defaults, scalable design

---

## About Me

I'm **Md Umar Siddique** — a frontend-focused engineer on a deep, intentional journey to full-stack fluency.

---

### I Specialize In

**Advanced React Hooks & UI Logic**

* Custom hooks like `useTimeout`, `useInterval`, `useHttpRequest`, `useLocalStorage`
* Practical use of `useReducer`, `useRef`, `useCallback`, `useMemo`

**Production Engineering Mindset**

* Write code that defends against edge cases and real users
* Think about APIs, caching, lifecycle, and performance

**Open Source Publishing**

* I don't build demo toys — I build real tools
* Everything I publish solves a recurring frontend pain

---

### Currently Learning

**Backend Engineering**

* Node.js + Express
* MongoDB, PostgreSQL, authentication, sessions

**System Design**

* High-level architecture, scaling, and distributed systems

**AI x UI**

* Long-term: I want to build intelligent, human-friendly frontends
  powered by clean backend systems and real-time inference

---

## Vision

My goal is to grow into a **full-stack product engineer** who:

* Writes resilient frontend logic with design in mind
* Ships APIs that scale and recover gracefully
* Collaborates across product, design, and backend teams
* Builds tools and workflows that outlast trends
* Bridges intelligent systems with usable interfaces

---

## Let's Connect

* **Email**: [us70763@gmail.com](mailto:us70763@gmail.com)
* **GitHub**: [@umarSiddique010](https://github.com/umarSiddique010)
* **LinkedIn**: [md-umar-siddique](https://linkedin.com/in/md-umar-siddique)
* **Dev.to**: [@umarSiddique010](https://dev.to/umarsiddique010)

---

## Final Thought

This hook — and every one before it — is part of a bigger goal: becoming a well-rounded engineer who can spot a problem, design a minimal API, and build tools others can trust.

If you found it helpful, feel free to star, use it in your apps, or reach out.

**Let's build things that last.**

---

**Md Umar Siddique**  
*Building tools with purpose. Learning with intent.*