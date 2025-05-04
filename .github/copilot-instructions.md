# 🧠 Best Practices for HTML/CSS/JavaScript Projects Using p5.js

## 📁 1. Project Structure

```
project-root/
├── index.html
├── style.css
├── sketch.js
├── classes/
│   └── MyShape.js
├── utils/
│   └── mathHelpers.js
├── assets/
│   └── images/
│   └── sounds/
├── libs/
│   └── p5.min.js
└── README.md
```

- **Modular JS**: Organize your code into classes and utility modules.
- **Use `instance mode` in p5.js** to prevent polluting global scope.
- Keep sketches (`sketch.js`) small and delegate logic to class files.

## 🛠️ 2. HTML Best Practices

- Use semantic tags: `<main>`, `<header>`, `<footer>`, `<section>`, etc.
- Load scripts with `type="module"` when using ES6 imports:
  ```html
  <script type="module" src="sketch.js"></script>
  ```
- Always define viewport meta for responsiveness:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

## 🎨 3. CSS Best Practices

- Use an external CSS file (`style.css`) instead of inline styles.
- Use class selectors (`.button`, `.canvas-wrapper`) and avoid IDs for styling.
- Use CSS variables for maintainable themes:
  ```css
  :root {
    --primary-color: #3498db;
    --font-size-base: 16px;
  }
  ```

## 🧩 4. JavaScript Best Practices (with p5.js)

### p5.js Initialization (Instance Mode)

```js
import { setupCanvas } from './utils/setupCanvas.js';

const sketch = (p) => {
  p.setup = () => {
    setupCanvas(p, 800, 600);
  };

  p.draw = () => {
    p.background(220);
    // Your animation or drawing code here
  };
};

new p5(sketch);
```

### Organize Classes

```js
// classes/CircleEntity.js
export class CircleEntity {
  constructor(p, x, y, r) {
    this.p = p;
    this.pos = p.createVector(x, y);
    this.r = r;
  }

  draw() {
    this.p.circle(this.pos.x, this.pos.y, this.r * 2);
  }
}
```

### Utility Example

```js
// utils/mathHelpers.js
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
```

## 🧪 5. Development Workflow

- Use a local dev server (e.g., `live-server`, `vite`, or `http-server`) to test.
- Use ESLint with p5.js plugin (custom config):
  ```bash
  npm install eslint --save-dev
  ```

- Suggested `.eslintrc.js`:
  ```js
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn'],
    },
  };
  ```

## 🚀 6. Performance Tips

- Use `noLoop()` when animations aren't needed.
- Reuse p5 vectors and colors for fewer allocations.
- Minimize use of `loadImage`, `loadSound` in `draw()`.

## 🔒 7. Accessibility & UX

- Ensure canvas has proper labels if interactive.
- Provide keyboard/mouse alternatives for controls.
- Maintain color contrast for visibility.

## 📝 8. Documentation and Readability

- Comment purpose, not just mechanics.
- Use descriptive names: `playerVelocity` > `pv`
- Document p5.js dependencies clearly in `README.md`.

## ✅ 9. AI Agent Instructions

> Treat p5.js as a rendering/visualization engine. All core logic (input handling, physics, animation) should be implemented in modular JS using ES6 syntax. Prioritize code clarity, reusability, and separation of concerns. All `p5` functions should be accessed through the instance `p`.
