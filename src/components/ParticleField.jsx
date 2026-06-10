import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Dense, fast-moving particle swarm with color gradient
const ParticleSwarm = ({ count = 600 }) => {
  const mesh = useRef();
  
  const { positions, colors, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    
    const color1 = new THREE.Color('#ff416c');
    const color2 = new THREE.Color('#ff4b2b');
    const color3 = new THREE.Color('#ff6b9d');
    const color4 = new THREE.Color('#c850c0');
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a wide field
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      
      // Random color from palette
      const t = Math.random();
      const c = t < 0.3 ? color1 : t < 0.5 ? color2 : t < 0.7 ? color3 : color4;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      
      spd[i] = 0.3 + Math.random() * 1.5;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, colors: col, speeds: spd, offsets: off };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const posArray = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const speed = speeds[i];
      const offset = offsets[i];
      
      // Flowing wave motion
      posArray[idx] += Math.sin(time * speed * 0.3 + offset) * 0.008;
      posArray[idx + 1] += Math.cos(time * speed * 0.2 + offset * 1.3) * 0.006;
      posArray[idx + 2] += Math.sin(time * speed * 0.15 + offset * 0.7) * 0.003;
      
      // Wrap around boundaries
      if (posArray[idx] > 15) posArray[idx] = -15;
      if (posArray[idx] < -15) posArray[idx] = 15;
      if (posArray[idx + 1] > 10) posArray[idx + 1] = -10;
      if (posArray[idx + 1] < -10) posArray[idx + 1] = 10;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation of entire field
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Glowing energy ring that pulses
const EnergyRing = ({ radius = 4, color = '#ff416c', speed = 1, position = [0, 0, 0] }) => {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.elapsedTime;
    ringRef.current.rotation.x = Math.PI * 0.5 + Math.sin(time * 0.3 * speed) * 0.3;
    ringRef.current.rotation.z = time * 0.2 * speed;
    const pulse = 1 + Math.sin(time * 2 * speed) * 0.1;
    ringRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

// Floating light orbs
const LightOrb = ({ position, color, size = 0.3 }) => {
  const orbRef = useRef();
  const startPos = useRef(position);
  
  useFrame((state) => {
    if (!orbRef.current) return;
    const time = state.clock.elapsedTime;
    orbRef.current.position.x = startPos.current[0] + Math.sin(time * 0.5) * 1.5;
    orbRef.current.position.y = startPos.current[1] + Math.cos(time * 0.4) * 1;
    orbRef.current.position.z = startPos.current[2] + Math.sin(time * 0.3) * 0.5;
    
    const pulse = 1 + Math.sin(time * 3) * 0.3;
    orbRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={orbRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

// Camera that gently drifts
const DriftCamera = () => {
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.015;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ParticleSwarm count={500} />
        
        {/* Subtle energy rings */}
        <EnergyRing radius={5} color="#ff416c" speed={0.8} position={[2, 0, -3]} />
        <EnergyRing radius={3.5} color="#c850c0" speed={1.2} position={[-1, 1, -5]} />
        <EnergyRing radius={6} color="#ff4b2b" speed={0.5} position={[0, -1, -8]} />
        
        {/* Floating light orbs */}
        <LightOrb position={[6, 3, -4]} color="#ff416c" size={0.25} />
        <LightOrb position={[-5, -2, -3]} color="#c850c0" size={0.35} />
        <LightOrb position={[3, -4, -6]} color="#ff4b2b" size={0.2} />
        <LightOrb position={[-7, 4, -5]} color="#ff6b9d" size={0.3} />
        <LightOrb position={[0, 5, -7]} color="#ff416c" size={0.15} />

        <DriftCamera />
      </Canvas>
    </div>
  );
};

export default ParticleField;
