'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { View, Preload, Environment } from '@react-three/drei';
import { Suspense, useEffect, useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SceneProps {
  eventSource: React.RefObject<HTMLDivElement>;
}

export default function Scene({ eventSource }: SceneProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => setProgress(self.progress),
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050508, 1);
        }}
        eventSource={eventSource.current || undefined}
      >
        <CinematicCamera progress={progress} />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <GlassGeometryField />
          <SilkRibbons />
          <GoldParticles />
        </Suspense>

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, -20]} color="#D4AF6A" intensity={8} />
        <pointLight position={[10, 5, -40]} color="#C8C8D4" intensity={4} />

        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}

/* ── Camera with scroll-driven push + mouse parallax ─────────── */
function CinematicCamera({ progress }: { progress: number }) {
  const { camera, mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Push into scene on scroll
    const targetZ = 8 - progress * 80;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    // Gentle lateral drift
    const lateralTarget = Math.sin(progress * Math.PI * 1.5) * 6;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      lateralTarget + mouse.x * 1.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 1.2 + Math.cos(time * 0.3) * 0.5,
      0.03
    );

    // Cinematic tilt on deep scroll
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).fov,
      50 + progress * 20,
      0.04
    );
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();

    camera.lookAt(0, 0, targetZ - 15);
  });

  return null;
}

/* ── Glass Geometric Shapes Field ────────────────────────────── */
function GlassGeometryField() {
  const groupRef = useRef<THREE.Group>(null!);

  const shapes = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      type: ['torus', 'icosa', 'dodeca', 'tetra'][i % 4] as string,
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        -(i * 5) - Math.random() * 20
      ),
      rot: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: 0.4 + Math.random() * 1.2,
      speed: (Math.random() - 0.5) * 0.015,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += shapes[i]?.speed || 0;
      child.rotation.y += (shapes[i]?.speed || 0) * 0.7;
      (child as THREE.Mesh & { material: THREE.MeshPhysicalMaterial }).material.opacity =
        0.15 + Math.sin(t + (shapes[i]?.phase || 0)) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.pos} rotation={shape.rot} scale={shape.scale}>
          {shape.type === 'torus' && <torusGeometry args={[1, 0.3, 16, 40]} />}
          {shape.type === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
          {shape.type === 'dodeca' && <dodecahedronGeometry args={[1, 0]} />}
          {shape.type === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
          <meshPhysicalMaterial
            color={i % 3 === 0 ? '#D4AF6A' : i % 3 === 1 ? '#C8C8D4' : '#8A6A30'}
            metalness={0.8}
            roughness={0.1}
            wireframe={i % 4 !== 0}
            transparent
            opacity={0.2}
            envMapIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Silk Ribbon System ───────────────────────────────────────── */
function SilkRibbons() {
  const groupRef = useRef<THREE.Group>(null!);

  const ribbons = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j < 8; j++) {
        pts.push(new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 25,
          -(i * 10) - Math.random() * 20 - 5
        ));
      }
      return {
        curve: new THREE.CatmullRomCurve3(pts),
        speed: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        isGold: i % 3 !== 0,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      m.opacity = 0.18 + Math.sin(t * ribbons[i].speed * 50 + ribbons[i].phase) * 0.08;
      child.rotation.z = Math.sin(t * ribbons[i].speed + ribbons[i].phase) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {ribbons.map((ribbon, i) => (
        <mesh key={i}>
          <tubeGeometry args={[ribbon.curve, 80, 0.01 + Math.random() * 0.015, 8, false]} />
          <meshStandardMaterial
            color={ribbon.isGold ? '#D4AF6A' : '#9898C0'}
            emissive={ribbon.isGold ? '#D4AF6A' : '#7878A0'}
            emissiveIntensity={ribbon.isGold ? 3 : 1.5}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Gold Particle System ─────────────────────────────────────── */
function GoldParticles() {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color('#D4AF6A');
    const chromeColor = new THREE.Color('#C8C8D4');

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = -Math.random() * 150;

      const c = i % 3 === 0 ? chromeColor : goldColor;
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.z = Math.sin(t * 0.1) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
