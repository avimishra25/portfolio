import React, { useRef, useMemo, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#3b82f6"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </points>
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

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function HeroCanvas({ mouse, active }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <SceneBoundary>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        fallback={null}
        camera={{ position: [0, 0, 2.6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
          <Starfield mouse={mouse} />
          <Constellation mouse={mouse} />
      </Canvas>
      </SceneBoundary>
    </div>
  );
}
