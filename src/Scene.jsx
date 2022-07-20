import React from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat
} from "three";

function Skybox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  const texture = loader.load([
    "sky/left.png",
    "sky/right.png",
    "sky/top.png",
    "sky/bottom.png",
    "sky/back.png",
    "sky/front.png"
  ]);

  scene.background = texture;

  return null;
}

function Sphere() {
  const { scene, gl } = useThree();

  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true
  });

  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  scene.add(cubeCamera);

  useFrame(() => cubeCamera.update(gl, scene));

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        envMap={cubeCamera.renderTarget.texture}
        color="white"
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <Skybox />
      <Sphere />
      <OrbitControls autoRotate autoRotateSpeed={4} />
    </>
  );
}

export default Scene;
