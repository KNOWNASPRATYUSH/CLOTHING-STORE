'use client';

import { Canvas } from '@react-three/fiber';
import { View, Preload, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Particles from './Particles';

interface SceneProps {
  eventSource: React.RefObject<HTMLDivElement>;
}

export default function Scene({ eventSource }: SceneProps) {
  return (
    <div 
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // In the background
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        eventSource={eventSource.current || undefined}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
        
        {/* Global Fallback Lighting - ensures models aren't black if Env fails */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C9A96E" />
        
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}
