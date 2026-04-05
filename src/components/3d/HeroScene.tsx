'use client';

import { Suspense, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Environment, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function NoirSculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate rotation and scale on scroll
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    gsap.to(groupRef.current.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'center center',
        scrub: 1,
      }
    });
  }, []);

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
          <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
          <MeshDistortMaterial
            color="#1a1a1a"
            speed={3}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={3}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SceneContent() {
  const { mouse, viewport } = useThree();
  const cameraGroup = useRef<THREE.Group>(null!);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(() => {
    // Smoother mouse parallax
    targetX.current = (mouse.x * viewport.width) / 15;
    targetY.current = (mouse.y * viewport.height) / 15;

    cameraGroup.current.position.x += (targetX.current - cameraGroup.current.position.x) * 0.05;
    cameraGroup.current.position.y += (targetY.current - cameraGroup.current.position.y) * 0.05;
    cameraGroup.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={cameraGroup}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
      <Environment preset="night" />
      <Suspense fallback={null}>
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
      <spotLight 
        position={[10, 15, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={10} 
        castShadow 
      />
      <pointLight 
        position={[-10, 10, -5]} 
        color="#C9A96E" 
        intensity={15} 
      />
      <pointLight 
        position={[10, -10, 10]} 
        color="#ffffff" 
        intensity={10} 
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
