import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A dense, drifting starfield that softly reacts to the pointer.
 * Kept lightweight: single BufferGeometry with additive-blended points.
 */
function Starfield({ count = 2500, mouse }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute inside a sphere for a soft ambient cloud
      const r = 1.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.008;
    // Pointer-driven parallax
    const tx = mouse.current.x * 0.15;
    const ty = mouse.current.y * 0.15;
    ref.current.rotation.y += (tx - ref.current.rotation.y * 0.02) * 0.02;
    ref.current.rotation.x += (ty - ref.current.rotation.x * 0.02) * 0.02;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}

/** A slow-rotating icosahedron wireframe as a subtle centerpiece. */
function Constellation({ mouse }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.12;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    ref.current.scale.setScalar(scale);
    ref.current.position.x = mouse.current.x * 0.15;
    ref.current.position.y = mouse.current.y * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshBasicMaterial
        color="#ef4444"
        wireframe
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  const onPointerMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current.x = x;
    mouse.current.y = y;
  };

  return (
    <div
      className="absolute inset-0 -z-10"
      onPointerMove={onPointerMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={0.4} color="#3b82f6" />
          <Starfield mouse={mouse} />
          <Constellation mouse={mouse} />
          <Preload all />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
