import Section1 from "../section1";
import Section2 from "../section2";
import Section3 from "../section3";
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import Scene from "./Scene";

const CanvasData = () => {
  return (
    <div className="relative">
      <Canvas
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ near: 0.1, far: 2000, fov: 25 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1, 
          outputColorSpace: THREE.SRGBColorSpace,
          alpha: true,
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 30,
        }}
      >
        {/* Soft Warm Neutral Background Fog (Cream/Paper tone match) */}
        <fog attach="fog" args={['#fff5e8', 120, 400]} />

        {/* Soft Clinical Ambient Light (Warm Cream & Clean Tint) */}
        <ambientLight intensity={1.5} color={"#fffaef"} />

        {/* Key Light: Main Studio Front Light (Warm & Soft High-End Glow) */}
        <directionalLight
          position={[50, 120, 100]}
          intensity={3.2}
          color={"#ffffff"}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Fill Light: Soft Warm Crimson Accent (Matches --crimson brand theme) */}
        <directionalLight
          position={[-60, 40, 80]}
          intensity={1.8}
          color={"#deb1ad"} 
        />

        {/* Rim / Back Light: Subtle Warm Outline to Separate Model from Background */}
        <directionalLight
          position={[0, 50, -100]}
          intensity={2.5}
          color={"#b99378"}
        />

        {/* Bottom Bounce Light: Soft Ground Reflection */}
        <pointLight 
          position={[0, -50, 50]} 
          intensity={1.0} 
          color={"#ead8c3"} 
          distance={300} 
        />

        {/* Subtle Clean Dust Particles (Subdued for Clinical Feel) */}
        <Sparkles 
          count={80} 
          scale={[150, 50, 150]} 
          size={4} 
          speed={0.3} 
          color={"#b99378"} 
        />

        {/* Built-in Studio Environment Preset for Realistic Reflections on Muscles */}
        <Environment preset="city" environmentIntensity={0.6} />

        {/* Your 3D Scene */}
        <Scene />
      </Canvas>

      <div className="relative z-10">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
};

export default CanvasData;