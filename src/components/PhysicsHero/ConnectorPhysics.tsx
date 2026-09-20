import { BallCollider, CapsuleCollider, RigidBody } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Connector } from './Connector';
import { CONFIG, weightedColor } from './PhysicsConfig';

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function resetBody(body: RapierRigidBody, reduced: boolean) {
  body.setTranslation({ x: rand(-CONFIG.spawn.x * 0.5, CONFIG.spawn.x * 0.5), y: CONFIG.spawn.y + rand(0, 4), z: rand(-CONFIG.spawn.z * 0.5, CONFIG.spawn.z * 0.5) }, true);
  body.setRotation(new THREE.Quaternion().setFromEuler(new THREE.Euler(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2))), true);
  body.setLinvel({ x: rand(-CONFIG.initialVelocity.x, CONFIG.initialVelocity.x), y: reduced ? -0.7 : rand(-2.1, -0.9), z: rand(-CONFIG.initialVelocity.z, CONFIG.initialVelocity.z) }, true);
  body.setAngvel({ x: rand(-CONFIG.angularVelocity, CONFIG.angularVelocity), y: rand(-CONFIG.angularVelocity, CONFIG.angularVelocity), z: rand(-CONFIG.angularVelocity, CONFIG.angularVelocity) }, true);
}

export function ConnectorPhysics({ reduced }: { reduced: boolean }) {
  const body = useRef<RapierRigidBody>(null);
  const seed = useMemo(() => ({ scale: rand(CONFIG.minScale, CONFIG.maxScale), color: weightedColor(), position: [rand(-8, 8), rand(-4, 9), rand(-7, 7)] as [number, number, number], rotation: [rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2)] as [number, number, number] }), []);
  useFrame(() => { const b = body.current; if (!b) return; const p = b.translation(); if (Math.abs(p.x) > CONFIG.limits.x || p.y < -CONFIG.limits.y || p.y > CONFIG.limits.y || Math.abs(p.z) > CONFIG.limits.z) resetBody(b, reduced); });
  return <RigidBody ref={body} colliders={false} position={seed.position} rotation={seed.rotation} mass={CONFIG.mass} friction={CONFIG.friction} restitution={CONFIG.restitution} linearDamping={CONFIG.linearDamping} angularDamping={CONFIG.angularDamping}><BallCollider args={[0.7 * seed.scale]} /><CapsuleCollider args={[0.34 * seed.scale, 0.52 * seed.scale]} rotation={[0, 0, Math.PI / 2]} /><CapsuleCollider args={[0.34 * seed.scale, 0.52 * seed.scale]} rotation={[Math.PI / 2, 0, 0]} /><Connector color={seed.color} scale={seed.scale} /></RigidBody>;
}
