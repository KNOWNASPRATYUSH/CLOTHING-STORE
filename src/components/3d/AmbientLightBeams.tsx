'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function AmbientLightBeams() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={1} color="#ffffff" />
      
      <group ref={groupRef}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
           <Sparkles
             count={50}
             scale={12}
             size={4}
             speed={0.2}
             opacity={0.15}
             color="#1A1A1A"
           />
        </Float>
      </group>
    </>
  );
}
