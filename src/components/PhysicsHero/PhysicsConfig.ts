import type { Vector3Tuple } from 'three';
export type Quality='high'|'medium'|'low';
export const CONFIG={ gravity:[0,-4.2,0] as Vector3Tuple, mass:1.1, friction:.52, restitution:.28, linearDamping:.12, angularDamping:.16, minScale:.86, maxScale:1.1, spawn:{x:12,y:9,z:8}, limits:{x:18,y:15,z:18}, colors:['#eef2f6','#11151d','#174fd3','#6338c7'] } as const;
export const COUNTS:Record<Quality,number>={high:58,medium:38,low:20};
export function getQuality():Quality{ if(typeof window==='undefined')return'high'; if(matchMedia('(prefers-reduced-motion: reduce)').matches)return'low'; const c=navigator.hardwareConcurrency||4; return innerWidth<700||c<=4?'low':innerWidth<1100||c<=8?'medium':'high'; }
export function weightedColor(i:number){ const r=Math.random(); return r<.34?CONFIG.colors[0]:r<.60?CONFIG.colors[1]:r<.84?CONFIG.colors[2]:CONFIG.colors[3]; }
