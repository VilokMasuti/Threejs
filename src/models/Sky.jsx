import React from "react";
import { useGLTF } from "@react-three/drei";
import skyScene from "../assets/3d/v8_sri_krishna.glb";
const Sky = () => {
  const sky = useGLTF(skyScene);
  return (
    <mesh position={(1, 5, -0)} scale={(3, 3, 4)}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
