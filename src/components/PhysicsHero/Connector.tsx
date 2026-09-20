import { useMemo } from 'react';
import * as THREE from 'three';
import { innerMaterial, materialFor } from './Materials';

export function Connector({ color, scale = 1 }: { color: string; scale?: number }) {
  const outer = materialFor(color);
  const tube = useMemo(() => new THREE.CylinderGeometry(0.42, 0.42, 1.95, 40, 1, true), []);
  const inner = useMemo(() => new THREE.CylinderGeometry(0.31, 0.31, 1.8, 32, 1, true), []);
  const rim = useMemo(() => new THREE.TorusGeometry(0.42, 0.072, 16, 48), []);
  const center = useMemo(() => new THREE.SphereGeometry(0.73, 40, 32), []);
  const branch = (rotation: [number, number, number], position: [number, number, number]) => <group rotation={rotation} position={position}><mesh geometry={tube} material={outer} castShadow receiveShadow /><mesh geometry={inner} material={innerMaterial} /><mesh geometry={rim} material={outer} position={[0, 0.98, 0]} /><mesh geometry={rim} material={outer} position={[0, -0.98, 0]} /></group>;
  return <group scale={scale}><mesh geometry={center} material={outer} castShadow receiveShadow />{branch([0, 0, 0], [0, 1, 0])}{branch([Math.PI, 0, 0], [0, -1, 0])}{branch([0, 0, Math.PI / 2], [1, 0, 0])}{branch([0, 0, -Math.PI / 2], [-1, 0, 0])}</group>;
}
