import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";

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

    useFrame(() => {
        if (markerRef.current) {
            markerRef.current.position.copy(position);
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
