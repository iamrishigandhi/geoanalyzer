import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[1, 1, 5]} />
                <directionalLight position={[5, 5, -5]} />
                <directionalLight position={[-5, 5, 0]} />
                <directionalLight position={[0, -5, 0]} />

                <Model url="/AnimatedMorphCube.glb" />

                <OrbitControls />
            </Canvas>
        </div>
    );
}
