'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

/* ── Gold Thread Curtain — mouse-reactive ─────────────────────── */
function ThreadCurtain() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  const threads = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const x = (i / 40) * 8 - 4;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 12; j++) {
        pts.push(new THREE.Vector3(x, (j / 12) * 8 - 4, 0));
      }
      return {
        curve: new THREE.CatmullRomCurve3(pts),
        x,
        phase: (i / 40) * Math.PI * 2,
        isGold: i % 3 !== 0,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = mouse.x * 3;
    const my = mouse.y * 3;

    groupRef.current.children.forEach((child, i) => {
      const thread = threads[i];
      if (!thread) return;

      // Update geometry to react to mouse
      const mesh = child as THREE.Mesh;

      // Distort thread toward mouse position
      const dx = thread.x - mx;
      const dist = Math.abs(dx);
      const influence = Math.max(0, 1 - dist / 3) * 0.8;

      const newPts = Array.from({ length: 13 }, (_, j) => {
        const y = (j / 12) * 8 - 4;
        const sway = Math.sin(t * 0.8 + thread.phase + j * 0.3) * 0.06;
        const pull = influence * Math.sin((j / 12) * Math.PI) * (mx - thread.x) * 0.15;
        return new THREE.Vector3(thread.x + sway + pull, y + influence * (my - y) * 0.05, 0);
      });

      const newCurve = new THREE.CatmullRomCurve3(newPts);
      const newGeo = new THREE.TubeGeometry(newCurve, 20, 0.008, 4, false);
      mesh.geometry.copy(newGeo);
      newGeo.dispose();

      // Pulse opacity
      (mesh.material as THREE.MeshStandardMaterial).opacity =
        (0.3 + influence * 0.5) + Math.sin(t + thread.phase) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {threads.map((thread, i) => (
        <mesh key={i}>
          <tubeGeometry args={[thread.curve, 20, 0.008, 4, false]} />
          <meshStandardMaterial
            color={thread.isGold ? '#D4AF6A' : '#9898C0'}
            emissive={thread.isGold ? '#C9A96E' : '#7070A0'}
            emissiveIntensity={thread.isGold ? 4 : 2}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Brand3D() {
  return (
    <>
      <ThreadCurtain />
      <Environment preset="studio" />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 3, 3]} color="#D4AF6A" intensity={10} />
      <pointLight position={[0, -3, 3]} color="#C8C8D4" intensity={4} />
    </>
  );
}
