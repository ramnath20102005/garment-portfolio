# 📱 Mobile-First Quick Reference Card

## 🎯 Breakpoints (Use These!)

```css
/* Mobile First - Start Here */
.component { /* 360px - 767px */ }

/* Tablet */
@media (min-width: 768px) { /* 768px - 1023px */ }

/* Desktop */
@media (min-width: 1024px) { /* 1024px+ */ }

/* Large Desktop */
@media (min-width: 1440px) { /* 1440px+ */ }

/* Landscape Mobile */
@media (max-width: 767px) and (orientation: landscape) { }

/* Touch Devices */
@media (hover: none) and (pointer: coarse) { }
```

---

## 📏 Minimum Sizes

```css
/* Touch Targets */
button, .btn, a { min-height: 44px; min-width: 44px; }

/* Form Inputs */
input, select, textarea { min-height: 48px; font-size: 16px; }

/* Buttons */
.btn-primary { min-height: 48px; }
```

---

## 🎨 Common Patterns

### Stack on Mobile, Row on Desktop
```css
.container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

@media (min-width: 768px) {
    .container {
        flex-direction: row;
        gap: 24px;
    }
}
```

### Grid: 1 Column → 2 → 3
```css
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Full Width on Mobile
```css
.btn {
    width: 100%;
}

@media (min-width: 768px) {
    .btn { width: auto; }
}
```

### Hide Columns on Mobile
```css
@media (max-width: 767px) {
    .table th:nth-child(n+4),
    .table td:nth-child(n+4) {
        display: none;
    }
}
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T: Desktop First
```css
.component {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 767px) {
    .component {
        grid-template-columns: 1fr; /* Overriding */
    }
}
```

### ✅ DO: Mobile First
```css
.component {
    display: grid;
    grid-template-columns: 1fr; /* Start simple */
}

@media (min-width: 1024px) {
    .component {
        grid-template-columns: repeat(3, 1fr); /* Enhance */
    }
}
```

---

### ❌ DON'T: Fixed Widths
```css
.card { width: 400px; } /* Breaks on mobile */
```

### ✅ DO: Flexible Widths
```css
.card { 
    width: 100%; 
    max-width: 400px; 
}
```

---

### ❌ DON'T: Tiny Touch Targets
```css
.icon-btn { 
    width: 24px; 
    height: 24px; 
}
```

### ✅ DO: Minimum 44px
```css
.icon-btn { 
    min-width: 44px; 
    min-height: 44px;
    padding: 10px;
}
```

---

### ❌ DON'T: Small Input Font
```css
input { font-size: 14px; } /* iOS will zoom */
```

### ✅ DO: Minimum 16px
```css
input { font-size: 16px; } /* Prevents zoom */
```

---

## 📱 iOS Specific Fixes

### Prevent Input Zoom
```css
input, select, textarea {
    font-size: 16px; /* Minimum */
}
```

### Safe Area (Notched Devices)
```css
@supports (padding: max(0px)) {
    .container {
        padding-left: max(16px, env(safe-area-inset-left));
        padding-right: max(16px, env(safe-area-inset-right));
    }
}
```

### Viewport Height Fix
```css
.full-height {
    min-height: 100vh;
    min-height: -webkit-fill-available;
}
```

---

## 🎯 Touch Device Handling

### Remove Hover, Add Active
```css
.btn:hover {
    background: blue;
}

@media (hover: none) and (pointer: coarse) {
    .btn:hover {
        background: transparent; /* Reset */
    }
    .btn:active {
        background: blue; /* Tap feedback */
    }
}
```

---

## 📊 Responsive Typography

### Fluid Scaling
```css
h1 {
    font-size: 2rem;      /* Mobile */
}

@media (min-width: 768px) {
    h1 { font-size: 2.5rem; }  /* Tablet */
}

@media (min-width: 1024px) {
    h1 { font-size: 3rem; }    /* Desktop */
}
```

### Using clamp() (Modern)
```css
h1 {
    font-size: clamp(2rem, 5vw, 3rem);
}
```

---

## 🎨 Modal Patterns

### Bottom Sheet on Mobile
```css
.modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    max-height: 90vh;
}

@media (min-width: 768px) {
    .modal {
        position: relative;
        bottom: auto;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 12px;
    }
}
```

---

## 🧭 Navigation Patterns

### Hamburger Menu
```jsx
const [menuOpen, setMenuOpen] = useState(false);

<button onClick={() => setMenuOpen(!menuOpen)}>
    {menuOpen ? <X /> : <Menu />}
</button>

<nav className={menuOpen ? 'open' : ''}>
    {/* Menu items */}
</nav>
```

```css
.nav {
    position: fixed;
    right: 0;
    transform: translateX(100%);
    transition: transform 0.3s;
}

.nav.open {
    transform: translateX(0);
}

@media (min-width: 1024px) {
    .nav {
        position: static;
        transform: none;
    }
}
```

---

## 🔧 Utility Classes

```css
/* Visibility */
.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 768px) {
    .mobile-only { display: none; }
    .desktop-only { display: block; }
}

/* Spacing */
.spacing-mobile { padding: 16px; }

@media (min-width: 768px) {
    .spacing-mobile { padding: 24px; }
}

@media (min-width: 1024px) {
    .spacing-mobile { padding: 32px; }
}

/* Touch Target */
.touch-target {
    min-height: 44px;
    min-width: 44px;
}
```

---

## 🧪 Testing Commands

### Chrome DevTools
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

### Test Devices
- Mobile: 360px, 375px, 390px, 414px, 430px
- Tablet: 768px, 834px, 1024px
- Desktop: 1280px, 1440px, 1920px

### Test Orientations
- Portrait (default)
- Landscape (rotate icon in DevTools)

---

## 📝 Checklist for Every Component

- [ ] Starts with mobile styles (360px)
- [ ] Uses min-width media queries
- [ ] Touch targets ≥ 44px
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Keyboard accessible
- [ ] Touch device optimized

---

## 🚀 Quick Wins

1. **Add viewport meta tag**
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

2. **Use CSS variables**
```css
:root {
    --spacing: 16px;
}
@media (min-width: 768px) {
    :root { --spacing: 24px; }
}
```

3. **Prevent horizontal scroll**
```css
html, body {
    max-width: 100%;
    overflow-x: hidden;
}
```

4. **Smooth scrolling**
```css
html {
    scroll-behavior: smooth;
}
```

---

## 📚 Resources

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [Can I Use](https://caniuse.com/) - Browser support

---

**Print this card and keep it handy!** 🎯
