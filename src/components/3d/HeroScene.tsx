'use client';

import { Suspense, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Environment, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';

function NoirSculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Continuous subtle pulse/sway
    meshRef.current.rotation.x = Math.cos(time / 4) / 4;
    meshRef.current.position.y = Math.sin(time / 2) / 10;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.0, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color="#222222"
            speed={3}
            distort={0.4}
            radius={1}
            metalness={1}
            roughness={0.15}
            envMapIntensity={5}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SceneContent() {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    // Smoother mouse parallax on the GROUP instead of camera
    const time = state.clock.getElapsedTime();
    groupRef.current.position.x += (mouse.x * viewport.width / 20 - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (mouse.y * viewport.height / 20 - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.y = Math.sin(time / 2) / 8;
  });

  return (
    <group ref={groupRef}>
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <Particles count={1000} />
        <NoirSculpture />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={12}
          blur={2.8}
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
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
      <pointLight 
        position={[0, 5, 10]} 
        color="#C9A96E" 
        intensity={20} 
      />
      <pointLight 
        position={[-10, -5, 5]} 
        color="#C9A96E" 
        intensity={10} 
      />
      {/* Front-facing highlight light */}
      <spotLight 
        position={[0, 0, 15]} 
        intensity={30} 
        color="#ffffff"
        angle={0.5}
        penumbra={1}
      />
      {/* Strong Rim Light for visibility */}
      <spotLight 
        position={[0, 0, -10]} 
        intensity={20} 
        color="#ffffff"
        angle={Math.PI / 2}
      />
    </>
  );
}
