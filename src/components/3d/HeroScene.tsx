'use client';

import { Suspense, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function LuxuryCloth() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(time / 4) / 8;
    meshRef.current.rotation.y = Math.sin(time / 2) / 8;
    meshRef.current.position.y = Math.sin(time / 1.5) / 15;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          speed={4}
          distort={0.3}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const { mouse, viewport } = useThree();
  const cameraGroup = useRef<THREE.Group>(null!);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(() => {
    // Smoother mouse parallax
    targetX.current = (mouse.x * viewport.width) / 10;
    targetY.current = (mouse.y * viewport.height) / 10;

    cameraGroup.current.position.x += (targetX.current - cameraGroup.current.position.x) * 0.05;
    cameraGroup.current.position.y += (targetY.current - cameraGroup.current.position.y) * 0.05;
    cameraGroup.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={cameraGroup}>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <LuxuryCloth />
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.6}
          scale={15}
          blur={3}
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
      <spotLight 
        position={[10, 15, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={4} 
        castShadow 
      />
      <pointLight 
        position={[-5, -5, -5]} 
        color="#C9A96E" 
        intensity={2} 
      />
      <pointLight 
        position={[5, 5, 10]} 
        color="#ffffff" 
        intensity={1} 
      />
    </>
  );
}
