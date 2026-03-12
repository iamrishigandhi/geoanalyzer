import { Sphere } from "@react-three/drei";
import * as THREE from "three";

/**
 * A component that renders a single point in 3D space as a small red sphere.
 * @param {object} props - The component's props.
 * @param {THREE.Vector3} props.position - The position of the point in 3D space.
 * @returns {JSX.Element} A Three.js sphere mesh.
 */
export function Point({ position }: { position: THREE.Vector3 }) {
    return (
        <Sphere args={[0.05]} position={position}>
            <meshBasicMaterial color="red" />
        </Sphere>
    );
}
