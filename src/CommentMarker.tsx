import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";

/**
 * A component that renders a comment marker in the 3D scene.
 * The marker is a billboarded text that always faces the camera.
 * @param {object} props - The component's props.
 * @param {THREE.Vector3} props.position - The position of the marker in 3D space.
 * @param {THREE.Vector3} props.normal - The normal of the face the marker is attached to.
 * @param {number} props.number - The number to display on the marker.
 * @param {() => void} props.onClick - The function to call when the marker is clicked.
 * @returns {JSX.Element} A Three.js group containing the marker.
 */
export default function CommentMarker({
    position,
    normal,
    number,
    onClick,
}: {
    position: THREE.Vector3;
    normal: THREE.Vector3;
    number: number;
    onClick: () => void;
}) {
    const markerRef = useRef<THREE.Group>(null!);

    // Use useFrame to update the marker's position and orientation on every frame.
    useFrame(() => {
        if (markerRef.current) {
            // Position the marker at the specified position.
            markerRef.current.position.copy(position);
            // Orient the marker to be perpendicular to the face it's attached to.
            markerRef.current.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 0, 1),
                normal,
            );
        }
    });

    return (
        <group ref={markerRef} onClick={onClick}>
            <Billboard>
                <Text
                    fontSize={0.1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {number}
                </Text>
            </Billboard>
        </group>
    );
}
