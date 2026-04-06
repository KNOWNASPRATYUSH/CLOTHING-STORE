'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function FluidBrand() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.1;
      // bobbing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={2} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshPhysicalMaterial
            transmission={1}
            ior={1.4}
            thickness={3}
            roughness={0.1}
            clearcoat={1}
            color="#ffffff"
          />
        </mesh>
      </Float>
    </>
  );
}
