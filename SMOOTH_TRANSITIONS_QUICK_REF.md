# 🎬 Smooth Transitions - Quick Reference

## ✅ What's Already Working

**Page transitions are ACTIVE** - when you navigate between pages:
- Pages fade in with subtle scale effect
- Smooth, elegant 600ms animation
- Done automatically ✅ No code changes needed!

---

## 🎯 Add Element Reveals (Pick One Pattern)

### Pattern 1️⃣: Stagger Animation (RECOMMENDED)

Best for: Hero sections, feature lists, multiple items

```tsx
import { StaggerContainer, StaggerItem } from "@/app/components/StaggerAnimation";

<StaggerContainer>
  <StaggerItem><h1>Title</h1></StaggerItem>
  <StaggerItem><p>Subtitle</p></StaggerItem>
  <StaggerItem><button>Action</button></StaggerItem>
</StaggerContainer>
```

✨ Elements slide in one-by-one with perfect timing  
⏱️ 120ms between each element  
📱 Works on mobile  

---

### Pattern 2️⃣: Individual Reveal + Delay

Best for: Card grids, distributed cards

```tsx
import SmoothReveal from "@/app/components/SmoothReveal";

{items.map((item, i) => (
  <SmoothReveal key={i} delay={i * 0.1} direction="up">
    <Card>{item}</Card>
  </SmoothReveal>
))}
```

✨ Perfect for arrays/loops  
⏱️ Each item animates with slight delay  
🎯 Great for portfolios  

---

### Pattern 3️⃣: Directional Slide

Best for: Section titles, side-by-side content

```tsx
<SmoothReveal direction="left">
  <h2>Left Content</h2>
</SmoothReveal>

<SmoothReveal direction="right">
  <h2>Right Content</h2>
</SmoothReveal>
```

🔀 Directions: up, down, left, right  
⏱️ Duration: 600ms (change with `duration={0.8}`)  
📍 Delay: Add with `delay={0.2}`  

---

## 🎨 Real Examples for Your Pages

### Home Page Hero
```tsx
<StaggerContainer>
  <StaggerItem><h1>Crafting Data Excellence</h1></StaggerItem>
  <StaggerItem><p>Transform raw data into intelligent systems</p></StaggerItem>
  <StaggerItem><button>See My Work</button></StaggerItem>
</StaggerContainer>
```

### Projects Grid
```tsx
{projects.map((project, i) => (
  <SmoothReveal key={project.id} delay={i * 0.1}>
    <ProjectCard project={project} />
  </SmoothReveal>
))}
```

### Achievements List
```tsx
<StaggerContainer>
  <StaggerItem><h2>Achievements</h2></StaggerItem>
  {achievements.map((item) => (
    <StaggerItem key={item.id}>
      <AchievementItem {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## ⚙️ Customization

| Prop | Values | Example |
|------|--------|---------|
| `direction` | up, down, left, right | `direction="left"` |
| `delay` | 0 to any number | `delay={0.2}` |
| `duration` | 0.3 to 1.0+ | `duration={0.8}` |
| `staggerDelay` | 0.05 to 0.3 | `staggerDelay={0.15}` |

---

## 🚀 Pro Tips

1. **Use StaggerContainer** for lists/groups - smoother effect
2. **Add delays incrementally** - `delay={index * 0.1}`
3. **Keep duration around 0.6s** - feels luxury
4. **Use direction="up"** - most natural feel
5. **Viewport triggers** - animations only trigger when scrolled into view ✅

---

## 📊 Performance

✅ GPU-accelerated animations  
✅ Smooth 60fps on all devices  
✅ Lazy triggers (when in viewport)  
✅ No performance impact  

---

## ❓ Common Questions

**Q: Do I need to change anything?**  
A: No! Page transitions work automatically. Add element reveals only if you want.

**Q: Will it work on mobile?**  
A: Yes! All animations are optimized for mobile.

**Q: Can I disable animations?**  
A: Yes, remove the wrapper components or disable in user preferences.

**Q: How do I change animation speed?**  
A: Use `duration` prop: `<SmoothReveal duration={0.8}>`

---

## 📁 Files

- `PageTransition.tsx` - Auto page transitions ✅
- `SmoothReveal.tsx` - Individual element reveals
- `StaggerAnimation.tsx` - Multiple element stagger
- `AnimationExamples.tsx` - Copy-paste examples

**See `SMOOTH_TRANSITIONS_GUIDE.md` for detailed documentation**
