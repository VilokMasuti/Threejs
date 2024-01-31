import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../Components/Loader";
import krishna from "../assets/krishna.mp3";
import { soundoff, soundon } from "../assets/icons";
import Sky from "../models/Sky";
import Up from "../models/Up";
import { Plane } from "../models/Plane";
import Bird from "../models/Bird";
import { Island } from "../models/Island";
import HomeInfo from "../Components/HomeInfo";

const Home = () => {
  const audioRef = useRef(new Audio(krishna));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustislandforScreeSize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];
    if (window.innerWidth < 760) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPostion, rotation];
  };

  const adjustPlaneforScreeSize = () => {
    let screenScale;
    let screenPostion;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPostion = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPostion = [0, -4, -4];
    }
    return [screenScale, screenPostion];
  };

  const [islandSacle, islandPosition, islandRotation] =
    adjustislandforScreeSize();
  const [planeSacle, planePosition] = adjustPlaneforScreeSize();
  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div> */}

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 600 }}
      >
        <Suspense fallback={<Loader />}>
          //import lights
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Sky />
          <Up isRotating={isRotating} />
          {/* <Sky /> */}
          <Island
            position={islandPosition}
            scale={islandSacle}
            rotation={islandRotation}
            isRotaing={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            planeSacle={planeSacle}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
          <Bird />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="jukebox"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </section>
  );
};

export default Home;
