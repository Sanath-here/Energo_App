import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const RoboticEntity = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
    }
    if (headRef.current) {
      headRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Body */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial
            color="#4f46e5"
            speed={2}
            distort={0.3}
            radius={1}
            emissive="#4f46e5"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Head/Core Area */}
      <group ref={headRef} position={[0, 0, 0.8]}>
        <Sphere args={[0.2, 16, 16]}>
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
        </Sphere>
        {/* Eyes */}
        <mesh position={[0.1, 0, 0.1]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
        </mesh>
        <mesh position={[-0.1, 0, 0.1]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
        </mesh>
      </group>
    </group>
  );
};

const ThreeDCharacter: React.FC = () => {
  return (
    <div className="three-d-character">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <RoboticEntity />
      </Canvas>
    </div>
  );
};

export default ThreeDCharacter;
