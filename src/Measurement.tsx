import { Line, Html } from "@react-three/drei";
import * as THREE from "three";

export function DistanceMeasurement({
    points,
    distance,
}: {
    points: [THREE.Vector3, THREE.Vector3];
    distance: number;
}) {
    const midPoint = new THREE.Vector3()
        .addVectors(points[0], points[1])
        .multiplyScalar(0.5);

    return (
        <group>
            <Line points={points} color="orange" lineWidth={3} />
            <Html position={midPoint}>
                <div
                    style={{
                        color: "orange",
                        background: "rgba(0,0,0,0.7)",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                    }}
                >
                    Distance: {distance.toFixed(3)}
                </div>
            </Html>
        </group>
    );
}

export function AngleMeasurement({
    points,
    angle,
}: {
    points: [THREE.Vector3, THREE.Vector3, THREE.Vector3];
    angle: number;
}) {
    const line1Points: [THREE.Vector3, THREE.Vector3] = [points[0], points[1]];
    const line2Points: [THREE.Vector3, THREE.Vector3] = [points[1], points[2]];

    return (
        <group>
            <Line points={line1Points} color="cyan" lineWidth={3} />
            <Line points={line2Points} color="cyan" lineWidth={3} />
            <Html position={points[1]}>
                <div
                    style={{
                        color: "cyan",
                        background: "rgba(0,0,0,0.7)",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                    }}
                >
                    Angle: {angle.toFixed(1)}°
                </div>
            </Html>
        </group>
    );
}
