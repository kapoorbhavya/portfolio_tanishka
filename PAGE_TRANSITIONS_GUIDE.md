# Page Transition System Documentation

## Overview
Your portfolio now has an elegant, smooth page transition system that automatically applies to all routes. The transitions include fade-in animations, blur effects, and a subtle loading bar indicator.

## Features

### ✨ Features Included

1. **Default Page Transitions** (`PageTransition.tsx`)
   - Smooth fade-in/fade-out with scale animation
   - Subtle blur effect during transitions
   - Elegant loading bar at the top
   - GPU-accelerated for performance
   - Automatically applied to all routes

2. **Alternative Transition Styles** (`PageTransitionVariants.tsx`)
   - Multiple elegant transition options to choose from
   - Easily customizable and extensible

3. **Auto Scroll-to-Top** (`ScrollToTop.tsx`)
   - Automatically scrolls to top when navigating to new pages
   - Smooth scrolling behavior

## How It Works

### Default Setup (Already Active)
The page transitions are applied globally through the root layout:

```typescript
// app/layout.tsx
<PageTransition>
  <main className="relative z-10 bg-transparent">{children}</main>
</PageTransition>
```

This component:
- Wraps all page content
- Detects route changes via `usePathname()`
- Triggers smooth animations automatically
- Shows a loading bar during transition

## Customization

### Option 1: Using Default Transitions
The current setup uses the **fadeScale** transition which combines:
- Opacity fade (0 → 1)
- Scale animation (0.98 → 1)
- Blur effect (8px → 0px)
- Duration: 600ms entrance, 400ms exit

### Option 2: Using Multiple Transition Styles
To use the `PageTransitionVariants` component with different effects:

1. **Replace in layout.tsx:**
```typescript
import PageTransitionVariants from "@/app/components/PageTransitionVariants";

<PageTransitionVariants variant="slideRight">
  <main className="relative z-10 bg-transparent">{children}</main>
</PageTransitionVariants>
```

2. **Available Variants:**
   - `fadeScale` (default) - Fade with subtle scale
   - `slideRight` - Slide in from right
   - `slideLeft` - Slide in from left
   - `expandCenter` - Expand from center point

### Option 3: Customizing Timing
Edit animation durations and easing:

```typescript
// In PageTransition.tsx or PageTransitionVariants.tsx
transition: {
  duration: 0.6,  // Change from 0.6s to your preference
  ease: [0.25, 0.46, 0.45, 0.94],  // Cubic bezier values
}
```

## Animation Easing Presets

```
// Smooth deceleration (ease-out)
[0.25, 0.46, 0.45, 0.94]

// Smooth acceleration (ease-in)
[0.4, 0, 1, 1]

// Custom smooth (ease-in-out)
[0.1, 0.7, 0.9, 0.3]

// Spring-like feel
[0.22, 1, 0.36, 1]
```

## Performance Optimizations

The transition system includes:
- ✅ `will-change` CSS hint for GPU acceleration
- ✅ `backface-visibility: hidden` to prevent flickering
- ✅ `filter` for smooth blur effects
- ✅ `transform` for 60fps animations
- ✅ `AnimatePresence` mode="wait" to prevent layout shifts

## Applying Custom Transitions to Specific Pages

If you want page-specific transitions, create wrapper components:

```typescript
// app/components/FadeTransition.tsx
export default function FadeTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

Then wrap page content:
```typescript
// app/projects/page.tsx
<FadeTransition>
  <ProjectsPageContent />
</FadeTransition>
```

## Troubleshooting

### Transitions not appearing?
- Ensure `AnimatePresence` has `mode="wait"` to prevent overlapping
- Check that component uses `usePathname()` to detect route changes
- Verify Framer Motion is installed: `npm list framer-motion`

### Jumpy animations?
- Ensure `willChange` and `backfaceVisibility` are set
- Check for CSS conflicts with `scroll-behavior`
- Use `transform` instead of `top/left` for positioning

### Page content not updating quickly?
- The loading bar duration is set to 800ms (customizable)
- Content switches after 300ms (optimized for visual feedback)
- Adjust timing in the `useEffect` hook if needed

## Browser Support

All animations use standard CSS transforms and filters:
- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Mobile browsers

## Dependencies

Required packages (already in your project):
- `framer-motion` - Animation library
- `next` - Framework with routing
- Tailwind CSS - Styling

## Future Enhancements

Consider adding:
1. Stagger animations for content elements
2. Page-specific transition sounds
3. Analytics tracking for page transitions
4. Configurable transition speeds via URL params
5. Gesture-based transitions on mobile (swipe)

---

For more information on Framer Motion: https://www.framer.com/motion/
For Next.js routing: https://nextjs.org/docs/app/building-your-application/routing
