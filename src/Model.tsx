import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Edges, Text, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function CenterLines({ color }: { color: string }) {
    const lines = useMemo(() => {
        const points = [
            [new THREE.Vector3(-1, 1, 0), new THREE.Vector3(1, 1, 0)],
            [new THREE.Vector3(-1, -1, 0), new THREE.Vector3(1, -1, 0)],
            [new THREE.Vector3(0, -1, 1), new THREE.Vector3(0, 1, 1)],
            [new THREE.Vector3(0, -1, -1), new THREE.Vector3(0, 1, -1)],
            [new THREE.Vector3(1, 0, -1), new THREE.Vector3(1, 0, 1)],
            [new THREE.Vector3(-1, 0, -1), new THREE.Vector3(-1, 0, 1)],
        ];
        return points;
    }, []);

    return (
        <group>
            {lines.map((segment, i) => (
                <Line key={i} points={segment} color={color} lineWidth={15} />
            ))}
        </group>
    );
}

export default function Model({
    wireframe,
    onStatsChange,
    color,
    backgroundColor,
}: {
    wireframe: boolean;
    onStatsChange: (stats: { vertices: number; triangles: number }) => void;
    color: string;
    backgroundColor: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null!);

    const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);

    useEffect(() => {
        if (meshRef.current) {
            const geo = meshRef.current.geometry;
            const totalVertices = geo.attributes.position.count;
            const totalTriangles = geo.index
                ? geo.index.count / 3
                : totalVertices / 3;
            onStatsChange({
                vertices: totalVertices,
                triangles: Math.round(totalTriangles),
            });
        }
    }, [geometry, onStatsChange]);

    useEffect(() => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.MeshStandardMaterial).color.set(
                color,
            );
        }
    }, [color]);

    useFrame((_state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta;
        }
    });

    return (
        <group>
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.05}
                />
                {wireframe && (
                    <>
                        <Edges color={backgroundColor} lineWidth={15} />
                        <CenterLines color={backgroundColor} />
                    </>
                )}
            </mesh>
        </group>
    );
}
