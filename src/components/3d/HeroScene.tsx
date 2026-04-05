'use client';

import { Suspense, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Environment, ContactShadows, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';

function SilkShroud() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Complex fabric-like undulation
    meshRef.current.rotation.y = time / 6;
    meshRef.current.rotation.x = Math.sin(time / 4) / 8;
    
    // Magnetic mouse react - pulling the "cloth"
    const targetX = (state.mouse.x * 2);
    const targetY = (state.mouse.y * 2);
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[1.4, 128, 128]} />
          <MeshDistortMaterial
            color="#111111"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={1}
            roughness={0.1}
            envMapIntensity={4}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transmission={0.4}
            thickness={2}
          />
        </mesh>
      </Float>
      
      {/* Luxury Glints */}
      <Sparkles
        count={80}
        scale={4}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#C9A96E"
      />
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
      <Environment preset="night" />
      <Suspense fallback={null}>
        <Particles count={1500} />
        <SilkShroud />
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
