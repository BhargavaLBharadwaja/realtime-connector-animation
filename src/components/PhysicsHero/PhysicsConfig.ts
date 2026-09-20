import type { Vector3Tuple } from 'three';

export type Quality = 'high' | 'medium' | 'low';

export const CONFIG = {
  gravity: [0, -3.6, 0] as Vector3Tuple,
  mass: 1.18,
  friction: 0.54,
  restitution: 0.25,
  linearDamping: 0.08,
  angularDamping: 0.12,
  minScale: 0.82,
  maxScale: 1.18,
  spawn: { x: 13, y: 9, z: 9 },
  limits: { x: 18, y: 15, z: 18 },
  colors: ['#edf2f8', '#0d1118', '#1d57e7', '#6b42d3'] as const,
  initialVelocity: { x: 1.3, y: 1.5, z: 1.2 },
  angularVelocity: 2.8,
} as const;

export const COUNTS: Record<Quality, number> = { high: 58, medium: 40, low: 22 };

export function getQuality(): Quality {
  if (typeof window === 'undefined') return 'high';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low';
  const cores = navigator.hardwareConcurrency || 4;
  if (window.innerWidth < 700 || cores <= 4) return 'low';
  if (window.innerWidth < 1100 || cores <= 8) return 'medium';
  return 'high';
}

export function weightedColor() {
  const r = Math.random();
  if (r < 0.34) return CONFIG.colors[0];
  if (r < 0.6) return CONFIG.colors[1];
  if (r < 0.84) return CONFIG.colors[2];
  return CONFIG.colors[3];
}
