'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { MeshDistortMaterial, ContactShadows, PerspectiveCamera, Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ProductSceneProps {
  color?: string;
  distort?: number;
}

function ProductModel({ color = "#111", distort = 0.3 }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={distort}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function ProductScene({ color, distort }: ProductSceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <Suspense fallback={null}>
        <ProductModel color={color} distort={distort} />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}
