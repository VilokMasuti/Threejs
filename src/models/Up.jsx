import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import upScene from "../assets/3d/sky.glb";

const Up = ({ isRotating }) => {
  const up = useGLTF(upScene);
  const upRef = useRef();
  useFrame((_, delta) => {
    if (isRotating) {
      upRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
    }
  });
  const Up = useGLTF(upScene);
  return (
    <mesh ref={upRef}>
      <primitive object={Up.scene} />
    </mesh>
  );
};

export default Up;
