import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import FloatingLines from "./FloatingLines";
import { useState } from "react";
import * as THREE from "three";
import CommentMarker from "./CommentMarker";
import CommentThread from "./CommentThread";

export default function App() {
    const [wireframe, setWireframe] = useState(true);
    const [color, setColor] = useState("#000CB3");
    const [rotateX, setRotateX] = useState(false);
    const [rotateY, setRotateY] = useState(false);
    const [rotateZ, setRotateZ] = useState(false);
    const [speedX, setSpeedX] = useState(1);
    const [speedY, setSpeedY] = useState(1);
    const [speedZ, setSpeedZ] = useState(1);
    const [lightIntensity, setLightIntensity] = useState(1.5);

    const [comments, setComments] = useState<
        {
            id: number;
            position: THREE.Vector3;
            normal: THREE.Vector3;
            messages: string[];
        }[]
    >([]);
    const [selectedComment, setSelectedComment] = useState<number | null>(null);

    const handleAddComment = (position: THREE.Vector3, normal: THREE.Vector3) => {
        const newComment = {
            id: comments.length + 1,
            position,
            normal,
            messages: [],
        };
        setComments([...comments, newComment]);
        setSelectedComment(newComment.id);
    };

    const handleAddMessage = (commentId: number, message: string) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, messages: [...comment.messages, message] }
                    : comment,
            ),
        );
    };

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
                    <ambientLight intensity={lightIntensity} />
                    <directionalLight position={[5, 5, 5]} intensity={lightIntensity * 3} />

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

                    {comments.map((comment) => (
                        <CommentMarker
                            key={comment.id}
                            position={comment.position}
                            normal={comment.normal}
                            number={comment.id}
                            onClick={() => setSelectedComment(comment.id)}
                        />
                    ))}

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

                <div style={{ marginTop: "20px" }}>
                    <h3>Rotation</h3>
                    <button onClick={() => setRotateX(!rotateX)}>
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
                    <button onClick={() => setRotateY(!rotateY)}>
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
                    <button onClick={() => setRotateZ(!rotateZ)}>
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

                <div style={{ marginTop: "20px" }}>
                    <h3>Lighting</h3>
                    <label>Intensity: </label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={lightIntensity}
                        onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                    />
                    <span>{lightIntensity}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <h3>Comments</h3>
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
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {selectedComment && (
                    <CommentThread
                        comment={comments.find((c) => c.id === selectedComment)!}
                        onAddComment={handleAddMessage}
                    />
                )}
            </div>
        </div>
    );
}
