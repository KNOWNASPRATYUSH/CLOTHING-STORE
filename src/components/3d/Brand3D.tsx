'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { MeshDistortMaterial, ContactShadows, PerspectiveCamera, Environment, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BrandSculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 2) / 4;
    meshRef.current.rotation.y = time / 3;
    
    outerRef.current.rotation.y = -time / 5;
    outerRef.current.rotation.z = Math.cos(time / 4) / 4;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshWobbleMaterial
            color="#C9A96E"
            speed={2}
            factor={0.2}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
        
        {/* Outer Shell - Wireframe/Glassy */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Brand3D() {
  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={35} />
      <BrandSculpture />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.3}
        scale={8}
        blur={2.5}
        far={4}
      />
      <Environment preset="studio" />
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} intensity={1} />
    </Suspense>
  );
}
