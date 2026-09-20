# Realtime Connector Animation

A live WebGL scene built with React, TypeScript, Three.js, React Three Fiber and Rapier. The uploaded MP4 is a visual reference only and is not imported, played, or used at runtime.

## Run

```bash
npm install
npm run dev
```

The app entry is `src/App.tsx`; the modular scene is under `src/components/PhysicsHero/`. The repository started as an empty Vite shell, so no existing website functionality was replaced. The connector uses shared visual geometry/materials, hollow tube interiors, Rapier rigid bodies, controlled spawning/recycling, responsive quality levels, and reduced-motion handling.
