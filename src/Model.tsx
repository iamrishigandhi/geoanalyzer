import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Edges, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * A component that renders the center lines of the 3D model.
 * @param {object} props - The component's props.
 * @param {string} props.color - The color of the lines.
 * @returns {JSX.Element} A Three.js group containing the center lines.
 */
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
                <Line key={i} points={segment} color={color} lineWidth={20} />
            ))}
        </group>
    );
}

/**
 * A component that renders the 3D model.
 * It handles the model's appearance, rotation, and click events for adding comments.
 * @param {object} props - The component's props.
 * @returns {JSX.Element} A Three.js group containing the 3D model.
 */
export default function Model({
    wireframe,
    color,
    rotateX,
    rotateY,
    rotateZ,
    speedX,
    speedY,
    speedZ,
    onAddComment,
}: {
    wireframe: boolean;
    color: string;
    rotateX: boolean;
    rotateY: boolean;
    rotateZ: boolean;
    speedX: number;
    speedY: number;
    speedZ: number;
    onAddComment: (position: THREE.Vector3, normal: THREE.Vector3) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null!);

    // Create the geometry for the model once.
    const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);

    // Update the model's color when the color prop changes.
    useEffect(() => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.MeshStandardMaterial).color.set(
                color,
            );
        }
    }, [color]);

    // Rotate the model on every frame if rotation is enabled.
    useFrame((_state, delta) => {
        if (meshRef.current) {
            if (rotateX) {
                meshRef.current.rotation.x += delta * speedX;
            }
            if (rotateY) {
                meshRef.current.rotation.y += delta * speedY;
            }
            if (rotateZ) {
                meshRef.current.rotation.z += delta * speedZ;
            }
        }
    });

    /**
     * Handles clicks on the model.
     * It calls the onAddComment function with the position and normal of the click.
     * @param {object} event - The click event.
     */
    const handleClick = (event: any) => {
        if (event.face) {
            const position = event.point;
            const normal = event.face.normal;
            onAddComment(position, normal);
        }
    };

    return (
        <group>
            <mesh ref={meshRef} geometry={geometry} onClick={handleClick}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.35}
                    metalness={0.15}
                />
                {wireframe && (
                    <>
                        <Edges color="black" lineWidth={20} />
                        <CenterLines color="black" />
                    </>
                )}
            </mesh>
        </group>
    );
}
