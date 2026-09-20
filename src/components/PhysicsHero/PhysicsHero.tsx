import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { CONFIG, COUNTS, getQuality, type Quality } from './PhysicsConfig';
import { ConnectorPhysics } from './ConnectorPhysics';

function CameraRig() {
  const ref = useRef<THREE.PerspectiveCamera>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.035) * 0.3;
    ref.current.position.y = 0.18 + Math.cos(t * 0.045) * 0.2;
    ref.current.position.z = 14.1;
    ref.current.lookAt(0, 0, 0);
  });
  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0.18, 14.1]} fov={42} near={0.1} far={70} />;
}

function Lights({ quality }: { quality: Quality }) {
  return <>
    <ambientLight intensity={0.28} color="#7d8aaa" />
    <directionalLight castShadow={quality !== 'low'} position={[-6, 9, 7]} intensity={2.7} color="#edf3ff" shadow-mapSize-width={quality === 'high' ? 1024 : 512} shadow-mapSize-height={quality === 'high' ? 1024 : 512} shadow-camera-near={1} shadow-camera-far={35} shadow-camera-left={-16} shadow-camera-right={16} shadow-camera-top={16} shadow-camera-bottom={-16} />
    <pointLight position={[7, 2, 5]} intensity={12} distance={22} color="#2f68ff" />
    <pointLight position={[-8, -2, -3]} intensity={9} distance={20} color="#7242d8" />
  </>;
}

export function PhysicsHero() {
  const quality = getQuality();
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ids = useMemo(() => Array.from({ length: COUNTS[quality] }, (_, i) => i), [quality]);
  const dpr = quality === 'high' ? [1, 1.6] : quality === 'medium' ? [1, 1.35] : [1, 1.1];
  return <section className="physics-hero" aria-label="Live 3D connector animation">
    <Canvas shadows={quality !== 'low'} dpr={dpr as [number, number]} gl={{ antialias: quality !== 'low', powerPreference: 'high-performance' }}>
      <color attach="background" args={['#070b12']} />
      <fog attach="fog" args={['#070b12', 18, 40]} />
      <CameraRig />
      <Lights quality={quality} />
      <Physics gravity={CONFIG.gravity} timeStep="vary" interpolate>{ids.map((id) => <ConnectorPhysics key={id} reduced={reduced} />)}</Physics>
      {quality !== 'low' && <ContactShadows position={[0, -10.25, 0]} opacity={0.2} scale={36} blur={3.5} far={12} />}
      <AdaptiveDpr pixelated={quality === 'low'} />
      <AdaptiveEvents />
    </Canvas>
  </section>;
}
