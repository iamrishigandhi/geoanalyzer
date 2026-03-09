// src/Model.tsx
import { useGLTF, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const [wireframe, setWireframe] = useState(false);
    const [stats, setStats] = useState({ vertices: 0, triangles: 0 });

    useEffect(() => {
        let totalVertices = 0;
        let totalTriangles = 0;

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const geometry = mesh.geometry as THREE.BufferGeometry;

                totalVertices += geometry.attributes.position.count;
                totalTriangles += geometry.attributes.position.count / 3;

                if (mesh.material) {
                    (mesh.material as THREE.MeshStandardMaterial).color.set(
                        "red",
                    );
                }
            }
        });

        setStats({ vertices: totalVertices, triangles: totalTriangles });
    }, [scene]);

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material) {
                    (mesh.material as THREE.MeshStandardMaterial).wireframe =
                        wireframe;
                }
            }
        });
    }, [wireframe, scene]);

    return (
        <>
            <primitive object={scene} />

            <Html position={[0, 2, 0]}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                    }}
                >
                    <button
                        onClick={() => setWireframe(!wireframe)}
                        style={{ padding: "6px 12px", fontSize: "14px" }}
                    >
                        Toggle Wireframe
                    </button>

                    <div
                        style={{
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            padding: "4px 8px",
                            fontSize: "12px",
                            borderRadius: "4px",
                        }}
                    >
                        <div>Vertices: {stats.vertices}</div>
                        <div>Triangles: {stats.triangles}</div>
                    </div>
                </div>
            </Html>
        </>
    );
}
