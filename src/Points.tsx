import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export function Point({ position }: { position: THREE.Vector3 }) {
    return (
        <Sphere args={[0.05]} position={position}>
            <meshBasicMaterial color="red" />
        </Sphere>
    );
}
