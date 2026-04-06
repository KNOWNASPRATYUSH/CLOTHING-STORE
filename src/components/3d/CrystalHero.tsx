'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function CrystalHero() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.05;
      ringRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#f0eee8" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial
            transmission={1}
            ior={1.4}
            thickness={2}
            roughness={0.1}
            clearcoat={1}
            color="#888888"
          />
        </mesh>

        <mesh ref={ringRef} position={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshPhysicalMaterial
            color="#1A1A1A"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
      </Float>
    </>
  );
}
