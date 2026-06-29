"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";

interface HotspotConfig {
  position: [number, number, number];
  title: string;
  description: string;
}

interface VirtualTour3DProps {
  imageUrl: string;
  title: string;
  description: string;
  hotspots: HotspotConfig[];
  onExit?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

function Panorama({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  
  // Fix for AI-generated panoramas:
  // We use a python script to make the image seamlessly wrap, so we just use normal wrapping here.
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1; // Invert x so it looks correct from inside the sphere
  texture.needsUpdate = true;

  // Since we are looking from the inside of the sphere, we need to ensure it renders correctly
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return (
    <mesh>
      {/* Large sphere to enclose the camera */}
      <sphereGeometry args={[500, 60, 40]} />
      {/* Texture maps to the inside of the sphere */}
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function Hotspot({ position, title, description }: HotspotConfig) {
  const [hovered, setHovered] = useState(false);
  return (
    <Html position={position} center>
      <div 
        className={`relative group transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border-[3px] border-white/80 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
        </div>
        
        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-1/2 left-14 -translate-y-1/2 w-56 bg-black/80 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl pointer-events-none z-50">
            <h4 className="text-white font-bold text-sm mb-2">{title}</h4>
            <p className="text-gray-300 text-xs leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </Html>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-white font-mono text-sm">{progress.toFixed(0)}% Loading 3D Engine...</p>
      </div>
    </Html>
  );
}

export function VirtualTour3D({ imageUrl, title, description, hotspots, onExit, onNext, onPrev }: VirtualTour3DProps) {
  return (
    <div className="w-full h-screen bg-[#03060a] relative cursor-grab active:cursor-grabbing overflow-hidden">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 80 }}>
        <Suspense fallback={<Loader />}>
          <Panorama imageUrl={imageUrl} />
          
          {/* Render provided hotspots */}
          {hotspots.map((hotspot, index) => (
            <Hotspot key={index} {...hotspot} />
          ))}
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          minDistance={10}
          maxDistance={400}
          enablePan={false} 
          rotateSpeed={-0.6} // Negative to simulate head turning when dragging
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 right-8 md:top-12 md:left-12 flex justify-between items-start pointer-events-none z-10">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-md">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30 inline-block mb-4">
            Interactive 360° Tour
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white drop-shadow-lg mb-4">
            {title}
          </h2>
          <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">
            {description}
          </p>
        </div>
      </div>

      {/* Exit Button */}
      {onExit && (
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
          <button 
            onClick={onExit}
            className="bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-colors shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Return to Map
          </button>
        </div>
      )}

      {/* Room Navigation Overlay (Next/Prev Room) */}
      {(onNext || onPrev) && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          {onPrev && (
            <button 
              onClick={onPrev}
              className="bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-xl"
              title="Previous Room"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
          {onNext && (
            <button 
              onClick={onNext}
              className="bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-xl"
              title="Next Room"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </div>
      )}

      {/* Crosshair / Center Guide */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
}
