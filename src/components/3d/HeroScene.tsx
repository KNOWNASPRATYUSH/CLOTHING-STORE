'use client';

import { Suspense, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function LuxuryCloth() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(time / 4) / 4;
    meshRef.current.rotation.y = Math.sin(time / 2) / 4;
    meshRef.current.position.y = Math.sin(time / 1.5) / 10;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#050505"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={1}
          roughness={0.05}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const { camera, mouse } = useThree();
  const cameraGroup = useRef<THREE.Group>(null!);

  useFrame(() => {
    // Mouse parallax effect
    cameraGroup.current.position.x += (mouse.x * 2 - cameraGroup.current.position.x) * 0.05;
    cameraGroup.current.position.y += (mouse.y * 1 - cameraGroup.current.position.y) * 0.05;
    cameraGroup.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={cameraGroup}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <LuxuryCloth />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={15}
          blur={2}
          far={5}
        />
      </Suspense>
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <SceneContent />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} color="gold" intensity={0.5} />
    </>
  );
}
