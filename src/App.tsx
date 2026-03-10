import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useState } from "react";

export default function App() {
    const [wireframe, setWireframe] = useState(true);
    const [stats, setStats] = useState({ vertices: 0, triangles: 0 });
    const [color, setColor] = useState("#000CB3");
    const [backgroundColor, setBackgroundColor] = useState("#000000");

    return (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <div style={{ flex: 3 }}>
                <Canvas camera={{ position: [3, 3, 3] }}>
                    <color attach="background" args={[backgroundColor]} />
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={4} />

                    <Model
                        wireframe={wireframe}
                        onStatsChange={(newStats) => setStats(newStats)}
                        color={color}
                        backgroundColor={backgroundColor}
                    />

                    <OrbitControls />
                </Canvas>
            </div>
            <div style={{ flex: 1, padding: "20px" }}>
                <h2>Controls</h2>
                <button
                    onClick={() => setWireframe(!wireframe)}
                    style={{ padding: "6px 12px", fontSize: "14px" }}
                >
                    Toggle Wireframe
                </button>
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="color-picker">Color:</label>
                    <input
                        id="color-picker"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ marginLeft: "5px" }}
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label htmlFor="background-color-picker">Background Color:</label>
                    <input
                        id="background-color-picker"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        style={{ marginLeft: "5px" }}
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <h2>Stats</h2>
                    <div>Vertices: {stats.vertices}</div>
                    <div>Triangles: {stats.triangles}</div>
                </div>
            </div>
        </div>
    );
}
