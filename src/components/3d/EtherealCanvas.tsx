'use client';

import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';

export default function EtherealCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        className="pointer-events-none"
        shadows
        dpr={[1, 2]} // Limit to 2x even on 3x screens for mobile performance
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false 
        }}
      >
        <Preload all />
        <View.Port />
      </Canvas>
    </div>
  );
}
