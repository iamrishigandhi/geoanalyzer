import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import FloatingLines from "./FloatingLines";
import { useState } from "react";
import * as THREE from "three";
import CommentMarker from "./CommentMarker";
import CommentThread from "./CommentThread";
import { MeasurementTools } from "./MeasurementTools";
import { AngleMeasurement, DistanceMeasurement } from "./Measurement";
import { Point } from "./Points";

type Measurement = {
    id: number;
} & (
    | {
          type: "distance";
          points: [THREE.Vector3, THREE.Vector3];
          distance: number;
      }
    | {
          type: "angle";
          points: [THREE.Vector3, THREE.Vector3, THREE.Vector3];
          angle: number;
      }
);

/**
 * The main application component.
 * It sets up the 3D scene, UI controls, and manages the application's state.
 */
export default function App() {
    // State for the 3D model's appearance
    const [wireframe, setWireframe] = useState(true);
    const [color, setColor] = useState("#000CB3");

    // State for the 3D model's rotation
    const [rotateX, setRotateX] = useState(false);
    const [rotateY, setRotateY] = useState(false);
    const [rotateZ, setRotateZ] = useState(false);
    const [speedX, setSpeedX] = useState(1);
    const [speedY, setSpeedY] = useState(1);
    const [speedZ, setSpeedZ] = useState(1);

    // State for the scene's lighting
    const [lightIntensity, setLightIntensity] = useState(1.5);

    // State for the commenting feature
    const [comments, setComments] = useState<
        {
            id: number;
            position: THREE.Vector3;
            normal: THREE.Vector3;
            messages: string[];
        }[]
    >([]);
    const [selectedComment, setSelectedComment] = useState<number | null>(null);

    // State for the measurement tools
    const [activeTool, setActiveTool] = useState<
        "none" | "distance" | "angle" | "comment"
    >("none");
    const [points, setPoints] = useState<THREE.Vector3[]>([]);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);

    /**
     * Handles clicks on the 3D model.
     * Depending on the active tool, it can add a comment, a measurement point, or complete a measurement.
     * @param {THREE.Vector3} position - The position of the click in 3D space.
     * @param {THREE.Vector3} normal - The normal of the face that was clicked.
     */
    const handleAddComment = (
        position: THREE.Vector3,
        normal: THREE.Vector3,
    ) => {
        if (activeTool === "distance") {
            const newPoints = [...points, position];
            if (newPoints.length === 2) {
                const distance = newPoints[0].distanceTo(newPoints[1]);
                setMeasurements([
                    ...measurements,
                    {
                        id: measurements.length + 1,
                        type: "distance",
                        points: newPoints as [THREE.Vector3, THREE.Vector3],
                        distance,
                    },
                ]);
                setPoints([]);
                setActiveTool("none");
            } else {
                setPoints(newPoints);
            }
        } else if (activeTool === "angle") {
            const newPoints = [...points, position];
            if (newPoints.length === 3) {
                const v1 = newPoints[0].clone().sub(newPoints[1]).normalize();
                const v2 = newPoints[2].clone().sub(newPoints[1]).normalize();
                const angle = v1.angleTo(v2) * (180 / Math.PI);
                setMeasurements([
                    ...measurements,
                    {
                        id: measurements.length + 1,
                        type: "angle",
                        points: newPoints as [
                            THREE.Vector3,
                            THREE.Vector3,
                            THREE.Vector3,
                        ],
                        angle,
                    },
                ]);
                setPoints([]);
                setActiveTool("none");
            } else {
                setPoints(newPoints);
            }
        } else if (activeTool === "comment") {
            const newComment = {
                id: comments.length + 1,
                position,
                normal,
                messages: [],
            };
            setComments([...comments, newComment]);
            setSelectedComment(newComment.id);
            setActiveTool("none");
        }
    };

    /**
     * Adds a message to a comment thread.
     * @param {number} commentId - The ID of the comment to add the message to.
     * @param {string} message - The message to add.
     */
    const handleAddMessage = (commentId: number, message: string) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, messages: [...comment.messages, message] }
                    : comment,
            ),
        );
    };

    /**
     * Deletes a comment.
     * @param {number} commentId - The ID of the comment to delete.
     */
    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
        if (selectedComment === commentId) {
            setSelectedComment(null);
        }
    };

    return (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            {/* 3D VIEW AREA */}
            <div style={{ flex: 3, position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        color: "white",
                        zIndex: 2,
                        fontWeight: "bold",
                        fontSize: "2em",
                    }}
                >
                    COLAB
                </div>
                {/* FloatingLines Background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                    }}
                >
                    <FloatingLines
                        linesGradient={["#000CB3", "#0052D4"]}
                        enabledWaves={["top", "middle", "bottom"]}
                        lineCount={5}
                        lineDistance={5}
                        bendRadius={5}
                        bendStrength={-0.5}
                        interactive={true}
                        parallax={true}
                    />
                </div>

                {/* Three.js Canvas */}
                <Canvas
                    camera={{ position: [3, 2, 3] }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        background: "transparent",
                    }}
                >
                    {/* Lighting */}
                    <ambientLight intensity={lightIntensity} />
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={lightIntensity * 2.66}
                    />

                    {/* 3D Model */}
                    <Model
                        wireframe={wireframe}
                        color={color}
                        rotateX={rotateX}
                        rotateY={rotateY}
                        rotateZ={rotateZ}
                        speedX={speedX}
                        speedY={speedY}
                        speedZ={speedZ}
                        onAddComment={handleAddComment}
                    />

                    {/* Comment Markers */}
                    {comments.map((comment) => (
                        <CommentMarker
                            key={comment.id}
                            position={comment.position}
                            normal={comment.normal}
                            number={comment.id}
                            onClick={() => setSelectedComment(comment.id)}
                        />
                    ))}

                    {/* Measurement Points */}
                    {points.map((point, index) => (
                        <Point key={index} position={point} />
                    ))}

                    {/* Measurement Visualizations */}
                    {measurements.map((measurement) => {
                        if (measurement.type === "distance") {
                            return (
                                <DistanceMeasurement
                                    key={measurement.id}
                                    points={measurement.points}
                                    distance={measurement.distance}
                                />
                            );
                        }
                        if (measurement.type === "angle") {
                            return (
                                <AngleMeasurement
                                    key={measurement.id}
                                    points={measurement.points}
                                    angle={measurement.angle}
                                />
                            );
                        }
                        return null;
                    })}

                    {/* Camera Controls */}
                    <OrbitControls />
                </Canvas>
            </div>

            {/* UI PANEL */}
            <div
                style={{
                    flex: 1,
                    padding: "20px",
                    background: "#111",
                    color: "white",
                    overflowY: "auto",
                }}
            >
                <h2>Controls</h2>

                {/* Wireframe Toggle */}
                <button
                    onClick={() => setWireframe(!wireframe)}
                    style={{
                        padding: "6px 12px",
                        fontSize: "14px",
                        backgroundColor: "#333",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Toggle Wireframe
                </button>

                {/* Color Picker */}
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

                {/* Rotation Controls */}
                <div style={{ marginTop: "20px" }}>
                    <h3>Rotation</h3>
                    <button
                        onClick={() => setRotateX(!rotateX)}
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            backgroundColor: rotateX ? "#007bff" : "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Toggle X Rotation ({rotateX ? "On" : "Off"})
                    </button>
                    <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.1"
                        value={speedX}
                        onChange={(e) => setSpeedX(parseFloat(e.target.value))}
                    />
                    <span>{speedX}</span>
                </div>
                <div>
                    <button
                        onClick={() => setRotateY(!rotateY)}
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            backgroundColor: rotateY ? "#007bff" : "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Toggle Y Rotation ({rotateY ? "On" : "Off"})
                    </button>
                    <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.1"
                        value={speedY}
                        onChange={(e) => setSpeedY(parseFloat(e.target.value))}
                    />
                    <span>{speedY}</span>
                </div>
                <div>
                    <button
                        onClick={() => setRotateZ(!rotateZ)}
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            backgroundColor: rotateZ ? "#007bff" : "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Toggle Z Rotation ({rotateZ ? "On" : "Off"})
                    </button>
                    <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.1"
                        value={speedZ}
                        onChange={(e) => setSpeedZ(parseFloat(e.target.value))}
                    />
                    <span>{speedZ}</span>
                </div>

                {/* Lighting Controls */}
                <div style={{ marginTop: "20px" }}>
                    <h3>Lighting</h3>
                    <label>Intensity: </label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={lightIntensity}
                        onChange={(e) =>
                            setLightIntensity(parseFloat(e.target.value))
                        }
                    />
                    <span>{lightIntensity}</span>
                </div>

                {/* Measurement Tools */}
                <MeasurementTools
                    activeTool={activeTool}
                    onToolChange={setActiveTool}
                    onClear={() => {
                        setMeasurements([]);
                        setPoints([]);
                    }}
                />

                {/* Comments Section */}
                <div style={{ marginTop: "20px" }}>
                    <h3>Comments</h3>
                    <button
                        onClick={() =>
                            setActiveTool(
                                activeTool === "comment" ? "none" : "comment",
                            )
                        }
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            backgroundColor:
                                activeTool === "comment" ? "#007bff" : "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginBottom: "10px",
                        }}
                    >
                        {activeTool === "comment" ? "Cancel" : "Add Comment"}
                    </button>
                    {comments.map((comment) => (
                        <div key={comment.id} style={{ marginBottom: "10px" }}>
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedComment(comment.id)}
                            >
                                Comment #{comment.id}
                            </span>
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {/* Comment Thread */}
                {selectedComment && (
                    <CommentThread
                        comment={
                            comments.find((c) => c.id === selectedComment)!
                        }
                        onAddComment={handleAddMessage}
                    />
                )}
            </div>
        </div>
    );
}

