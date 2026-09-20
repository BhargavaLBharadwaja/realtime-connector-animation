import * as THREE from 'three';

export const materials: Record<string, THREE.MeshPhysicalMaterial> = {
  white: new THREE.MeshPhysicalMaterial({
    color: '#edf2f8',
    roughness: 0.24,
    metalness: 0.02,
    clearcoat: 0.52,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.15,
  }),
  black: new THREE.MeshPhysicalMaterial({
    color: '#0d1118',
    roughness: 0.28,
    metalness: 0.02,
    clearcoat: 0.38,
    clearcoatRoughness: 0.24,
    envMapIntensity: 1.1,
  }),
  blue: new THREE.MeshPhysicalMaterial({
    color: '#1d57e7',
    roughness: 0.22,
    metalness: 0.02,
    clearcoat: 0.62,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.2,
  }),
  purple: new THREE.MeshPhysicalMaterial({
    color: '#6b42d3',
    roughness: 0.22,
    metalness: 0.02,
    clearcoat: 0.58,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.2,
  }),
};

export const innerMaterial = new THREE.MeshStandardMaterial({
  color: '#050910',
  roughness: 0.7,
  metalness: 0.02,
});

export function materialFor(color: string) {
  if (color === '#edf2f8') return materials.white;
  if (color === '#0d1118') return materials.black;
  if (color === '#1d57e7') return materials.blue;
  return materials.purple;
}
