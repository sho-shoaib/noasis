import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, Loader } from "@react-three/drei";
import Scene from "./Scene";
import "./styles.css";

// Based on the example from
// https://codesandbox.io/s/6izyu, thanks SteveCastle!

function App() {
  return (
    <div className="container">
      <Canvas linear>
        <Suspense fallback={null}>
          <Scene />
          <Stats />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
