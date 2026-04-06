'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  ContactShadows,
  Sparkles,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

/* ── Liquid Metal Sphere ─────────────────────────────────────── */
function LiquidMetalSphere() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12;
      outerRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.08;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (innerRef.current.material as any).distort = 0.3 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Inner distortion sphere */}
      <mesh ref={innerRef} scale={0.96}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <MeshDistortMaterial
          color="#8A6A30"
          metalness={0.9}
          roughness={0.15}
          distort={0.3}
          speed={2}
          envMapIntensity={3}
        />
      </mesh>

      {/* Outer glass sphere */}
      <mesh ref={outerRef} scale={1.05}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          thickness={0.4}
          roughness={0.02}
          chromaticAberration={0.15}
          anisotropy={0.3}
          color="#D4AF6A"
          envMapIntensity={2}
          iridescence={0.8}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
    </group>
  );
}

/* ── Orbital Crystal Fragments ───────────────────────────────── */
function OrbitalFragments() {
  const groupRef = useRef<THREE.Group>(null!);

  const fragments = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 1.9 + (i % 3) * 0.4;
      const speed = 0.2 + (i % 5) * 0.06;
      const phase = angle;
      const scale = 0.04 + Math.random() * 0.06;
      const orbitTilt = (Math.random() - 0.5) * Math.PI;
      return { angle, radius, speed, phase, scale, orbitTilt, idx: i };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    fragments.forEach(({ speed, phase, radius, orbitTilt, idx }) => {
      const child = groupRef.current?.children[idx] as THREE.Mesh;
      if (!child) return;
      const a = t * speed + phase;
      child.position.x = Math.cos(a) * radius;
      child.position.y = Math.sin(a * 0.7 + orbitTilt) * 0.8;
      child.position.z = Math.sin(a) * radius * 0.5;
      child.rotation.x = t * 0.5 + idx;
      child.rotation.y = t * 0.3 + idx;
    });
  });

  return (
    <group ref={groupRef}>
      {fragments.map(({ scale, idx }) => (
        <mesh key={idx} scale={scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#D4AF6A"
            metalness={1.0}
            roughness={0.05}
            envMapIntensity={4}
            emissive="#8A6A30"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Rotating Ring Bands ─────────────────────────────────────── */
function RingBands() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) { ring1.current.rotation.x = t * 0.4; ring1.current.rotation.y = t * 0.2; }
    if (ring2.current) { ring2.current.rotation.x = -t * 0.3; ring2.current.rotation.z = t * 0.25; }
    if (ring3.current) { ring3.current.rotation.y = t * 0.35; ring3.current.rotation.z = -t * 0.2; }
  });

  const ringMat = (
    <meshPhysicalMaterial
      color="#C9A96E"
      metalness={0.95}
      roughness={0.08}
      envMapIntensity={2}
    />
  );

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.012, 16, 100]} />
        {ringMat}
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.0, 0.008, 16, 100]} />
        {ringMat}
      </mesh>
      <mesh ref={ring3} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[2.4, 0.005, 16, 100]} />
        <meshPhysicalMaterial
          color="#C8C8D4"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ── Full Scene Content ──────────────────────────────────────── */
function SceneContent() {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.x += (mouse.x * viewport.width * 0.08 - groupRef.current.position.x) * 0.04;
    groupRef.current.position.y += (mouse.y * viewport.height * 0.08 - groupRef.current.position.y) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <LiquidMetalSphere />
        <RingBands />
        <OrbitalFragments />
      </Float>

      <Sparkles
        count={120}
        scale={[8, 8, 8]}
        size={0.8}
        speed={0.3}
        opacity={0.6}
        color="#D4AF6A"
      />

      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={0.25}
        scale={10}
        blur={3}
        far={6}
        color="#D4AF6A"
      />
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <SceneContent />
      <Environment preset="studio" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[0, 4, 8]} color="#D4AF6A" intensity={15} />
      <pointLight position={[-8, -4, 4]} color="#C8C8D4" intensity={5} />
      <spotLight
        position={[0, 8, 10]}
        angle={0.4}
        penumbra={1}
        intensity={20}
        color="#ffffff"
      />
    </>
  );
}
