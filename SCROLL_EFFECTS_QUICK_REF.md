# 🎯 Scroll Effects - Quick Reference

## ✅ What's Now Active

1. **Scroll Down/Up Indicator** at bottom of screen ✅
   - Shows "Scroll down" with animated arrow at top
   - Shows "Back to top" with animated arrow at bottom
   - Automatically appears/disappears based on scroll position

2. **Scroll Progress Bar** at top ✅
   - Blue gradient bar fills as you scroll
   - Shows visual progress through page
   - Elegant and subtle

3. **Scroll Animation Components** ✅
   - Use on any content to create smooth scroll effects

---

## 🚀 Quick Usage

### Fade + Slide (Most Common)

```tsx
import ScrollFade from "@/app/components/ScrollAnimations";

<ScrollFade direction="up">
  <h2>Content fades and slides up as you scroll</h2>
</ScrollFade>
```

### Scale + Fade (For Cards)

```tsx
import { ScrollReveal } from "@/app/components/ScrollAnimations";

<ScrollReveal scale={0.8}>
  <div className="card">Scales up as it comes into view</div>
</ScrollReveal>
```

### Parallax (For Backgrounds)

```tsx
import { ScrollParallax } from "@/app/components/ScrollAnimations";

<ScrollParallax speed={0.5}>
  <img src="hero.jpg" alt="Parallax" />
</ScrollParallax>
```

---

## 🎨 Direction Options

| Direction | Effect | Best For |
|-----------|--------|----------|
| `"up"` | Slides up + fades | Text, headers, cards |
| `"down"` | Slides down + fades | Bottom content |
| `"left"` | Slides from right + fades | Left column content |
| `"right"` | Slides from left + fades | Right column content |

---

## 📋 Copy-Paste Examples

### Hero Section
```tsx
import ScrollFade from "@/app/components/ScrollAnimations";

<ScrollFade direction="up">
  <h1>Your Title</h1>
</ScrollFade>
<ScrollFade direction="up" className="mt-4">
  <p>Your subtitle</p>
</ScrollFade>
```

### Card Grid
```tsx
{items.map(item => (
  <ScrollReveal key={item.id} scale={0.8}>
    <Card {...item} />
  </ScrollReveal>
))}
```

### Alternating Sections
```tsx
<div className="grid grid-cols-2">
  <ScrollFade direction="left">Left content</ScrollFade>
  <ScrollParallax><img /></ScrollParallax>
</div>
```

---

## ⚙️ Props Reference

### ScrollFade
- `direction`: "up" | "down" | "left" | "right"
- `className`: CSS classes

### ScrollReveal
- `scale`: 0.5 to 1.0 (how small before reveal)
- `className`: CSS classes

### ScrollParallax
- `speed`: 0.3 to 0.8 (lower = slower)
- `className`: CSS classes

---

## 🎬 Common Patterns

**Pattern 1: Sequential reveals**
```tsx
<ScrollFade><h1>Title</h1></ScrollFade>
<ScrollFade className="mt-4"><p>Subtitle</p></ScrollFade>
<ScrollFade className="mt-4"><button>CTA</button></ScrollFade>
```

**Pattern 2: Card grid**
```tsx
<div className="grid grid-cols-3">
  {cards.map(c => <ScrollReveal key={c.id}><Card {...c}/></ScrollReveal>)}
</div>
```

**Pattern 3: Alternating layout**
```tsx
<ScrollFade direction="left">Left</ScrollFade>
<ScrollParallax><Image /></ScrollParallax>
```

---

## 🎯 Where to Add

✅ Hero sections  
✅ Section titles  
✅ Feature cards  
✅ Project showcases  
✅ Achievement lists  
✅ Call-to-action areas  
✅ Testimonials  

---

## 🔧 Customization

### Make animations trigger earlier
Edit `ScrollAnimations.tsx`:
```tsx
offset: ["start 0.9", "end 0.1"]  // Triggers sooner
```

### Slow down animations
```tsx
<ScrollFade duration={1.0}>  {/* Slower */}
```

### Change parallax speed
```tsx
<ScrollParallax speed={0.2}>  {/* Slower movement */}
```

---

## ✨ That's All!

The scroll indicators are **automatically visible** on every page. Just wrap your content with the scroll animation components to add smooth scroll effects.

**See `SCROLL_EFFECTS_GUIDE.md` for detailed examples**
