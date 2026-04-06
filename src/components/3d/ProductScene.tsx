'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { MeshDistortMaterial, ContactShadows, PerspectiveCamera, Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ProductSceneProps {
  color?: string;
  distort?: number;
}

function ProductModel({ color = "#D4AF6A", distort = 0.15 }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={distort}
          radius={1}
          metalness={1.0}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function ProductScene({ color, distort }: ProductSceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={35} />
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <ambientLight intensity={0.8} />
      <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-5, -5, -5]} color="#D4AF6A" intensity={1} />
      
      <Suspense fallback={null}>
        <ProductModel color={color} distort={distort} />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={8}
          blur={2.5}
          far={4}
          color="#D4AF6A"
        />
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}
