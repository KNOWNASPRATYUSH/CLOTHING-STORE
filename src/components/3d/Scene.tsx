'use client';

import { Canvas } from '@react-three/fiber';
import { View, Preload, Environment } from '@react-three/drei';
import { Suspense } from 'react';

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
        zIndex: 0,
      }}
    >
      <Canvas
        shadows
        dpr={1}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        eventSource={eventSource}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}
