"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ───────────────────────────────────────────────────── */
interface NodeData {
  position: THREE.Vector3;
  color: string;
  size: number;
  speed: number;
  phase: number;
}

interface EdgeData {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  opacity: number;
}

/* ─── Palette ─────────────────────────────────────────────────── */
const PURPLE = "#8b5cf6";
const CYAN   = "#06b6d4";
const WHITE  = "#ffffff";

/* ─── Network Node ───────────────────────────────────────────── */
function NetworkNode({
  position,
  color,
  size,
  speed,
  phase,
}: NodeData) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Gentle hover float
    meshRef.current.position.y = position.y + Math.sin(t * speed + phase) * 0.12;
    // Pulse scale
    const pulse = 1 + Math.sin(t * speed * 1.6 + phase) * 0.08;
    meshRef.current.scale.setScalar(pulse);
    // Ring slow rotation + fade
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.006;
      ringRef.current.rotation.x += 0.003;
    }
  });

  return (
    <group position={position}>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.85}
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Orbiting glow ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[size * 1.9, size * 0.06, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      {/* Point glow halo */}
      <mesh>
        <sphereGeometry args={[size * 2.8, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

/* ─── Network Edges (lines between nodes) ────────────────────── */
function NetworkEdges({ edges }: { edges: EdgeData[] }) {
  const lineObjects = useMemo(() => {
    return edges.map((edge) => {
      const geom = new THREE.BufferGeometry().setFromPoints([edge.start, edge.end]);
      const mat  = new THREE.LineBasicMaterial({
        color:       edge.color,
        transparent: true,
        opacity:     edge.opacity,
      });
      return new THREE.Line(geom, mat);
    });
  }, [edges]);

  return (
    <>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </>
  );
}

/* ─── Animated Data Packets (moving dots along edges) ─────────── */
function DataPackets({ nodes }: { nodes: NodeData[] }) {
  const count = 8;
  const refs = useRef<THREE.Mesh[]>([]);

  const packets = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const toIdx   = (fromIdx + 1 + Math.floor(Math.random() * (nodes.length - 1))) % nodes.length;
      return {
        from:   nodes[fromIdx].position,
        to:     nodes[toIdx].position,
        speed:  0.28 + Math.random() * 0.22,
        offset: Math.random(),
        color:  i % 2 === 0 ? CYAN : PURPLE,
      };
    });
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    packets.forEach((p, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const progress = ((t * p.speed + p.offset) % 1 + 1) % 1;
      mesh.position.lerpVectors(p.from, p.to, progress);
    });
  });

  return (
    <>
      {packets.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </>
  );
}

/* ─── Floating Code Glyphs ───────────────────────────────────── */
function FloatingRings() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    r1.current.rotation.z += delta * 0.14;
    r1.current.rotation.x += delta * 0.06;
    r2.current.rotation.x -= delta * 0.10;
    r2.current.rotation.y += delta * 0.08;
    r3.current.rotation.y -= delta * 0.07;
    r3.current.rotation.z += delta * 0.05;
  });

  return (
    <group position={[0.5, 0, -1]}>
      <mesh ref={r1}>
        <torusGeometry args={[2.2, 0.009, 8, 100]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.45} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.8, 0.006, 8, 100]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.30} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 6, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[3.4, 0.004, 6, 80]} />
        <meshBasicMaterial color={WHITE} transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

/* ─── Central Core ────────────────────────────────────────────── */
function CentralCore() {
  const coreRef  = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    coreRef.current.rotation.y  = t * 0.4;
    coreRef.current.rotation.z  = t * 0.15;
    outerRef.current.rotation.y = -t * 0.25;
    outerRef.current.rotation.x =  t * 0.18;
    // Breathing scale
    const s = 1 + Math.sin(t * 1.4) * 0.06;
    coreRef.current.scale.setScalar(s);
  });

  return (
    <group>
      {/* Outer wireframe octahedron */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[0.9, 2]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Inner solid icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.7}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>
      {/* Dense glowing core */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={WHITE}
          emissive={WHITE}
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

/* ─── Particle Field ──────────────────────────────────────────── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 1400;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color={PURPLE} transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Full Scene ──────────────────────────────────────────────── */
function TechNetworkScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  /* — Node positions — */
  const nodes: NodeData[] = useMemo(() => [
    // Clustered satellite nodes around centre
    { position: new THREE.Vector3( 2.2,  1.1, -0.5), color: CYAN,   size: 0.13, speed: 0.9, phase: 0.0 },
    { position: new THREE.Vector3(-2.0,  0.8,  0.3), color: PURPLE, size: 0.11, speed: 1.1, phase: 1.2 },
    { position: new THREE.Vector3( 1.8, -1.4,  0.6), color: PURPLE, size: 0.10, speed: 0.8, phase: 2.4 },
    { position: new THREE.Vector3(-1.5, -1.0, -0.7), color: CYAN,   size: 0.12, speed: 1.0, phase: 0.7 },
    { position: new THREE.Vector3( 0.6,  2.2,  0.2), color: WHITE,  size: 0.08, speed: 1.3, phase: 3.1 },
    { position: new THREE.Vector3(-0.4, -2.4, -0.3), color: WHITE,  size: 0.09, speed: 0.7, phase: 1.8 },
    { position: new THREE.Vector3( 3.0, -0.2,  0.4), color: CYAN,   size: 0.07, speed: 1.2, phase: 4.2 },
    { position: new THREE.Vector3(-3.2,  0.3, -0.2), color: PURPLE, size: 0.08, speed: 0.95, phase: 5.0 },
    // Outer halo nodes
    { position: new THREE.Vector3( 1.0,  3.2,  1.0), color: CYAN,   size: 0.06, speed: 1.4, phase: 2.0 },
    { position: new THREE.Vector3(-1.2, -3.0,  0.8), color: PURPLE, size: 0.06, speed: 0.85, phase: 3.5 },
  ], []);

  /* — Edges (connect nearby nodes) — */
  const edges: EdgeData[] = useMemo(() => {
    const pairs: [number, number][] = [
      [0,1],[1,2],[2,3],[3,0],[0,4],[1,5],[2,6],[3,7],[4,5],[6,7],[0,8],[1,9],[4,8],[5,9]
    ];
    return pairs.map(([a, b]) => ({
      start:   nodes[a].position,
      end:     nodes[b].position,
      color:   a % 2 === 0 ? PURPLE : CYAN,
      opacity: 0.15 + Math.random() * 0.1,
    }));
  }, [nodes]);

  /* — Mouse parallax — */
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.45,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.28,
      0.04
    );
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      pointer.x * 0.3,
      0.03
    );
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Central core */}
        <CentralCore />

        {/* Satellite nodes */}
        {nodes.map((n, i) => (
          <NetworkNode key={i} {...n} />
        ))}

        {/* Connecting edges */}
        <NetworkEdges edges={edges} />

        {/* Moving data packets */}
        <DataPackets nodes={nodes} />

        {/* Orbital rings */}
        <FloatingRings />

        {/* Purple sparkles */}
        <Sparkles count={120} scale={7} size={1.4} speed={0.3} color={PURPLE} noise={0.4} />
        {/* Cyan sparkles */}
        <Sparkles count={60}  scale={5} size={0.9} speed={0.18} color={CYAN} noise={0.25} />
      </Float>
    </group>
  );
}

/* ─── Scene Lighting ──────────────────────────────────────────── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4,  5,  4]} intensity={3.5} color={PURPLE} />
      <pointLight position={[-4, -4,  3]} intensity={2.5} color={CYAN} />
      <pointLight position={[0,   8, -4]} intensity={1.0} color={WHITE} />
      <pointLight position={[0,  -6,  6]} intensity={0.8} color={PURPLE} />
    </>
  );
}

/* ─── Exported Canvas ─────────────────────────────────────────── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42, near: 0.1, far: 200 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Lights />

      {/* Deep star field */}
      <Stars radius={100} depth={50} count={3500} factor={2.8} saturation={0} fade speed={0.4} />

      {/* Ambient particle haze */}
      <ParticleField />

      {/* Main tech network */}
      <TechNetworkScene />
    </Canvas>
  );
}
