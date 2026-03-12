import { useState } from "react";
import * as THREE from 'three';

export default function CommentThread({
    comment,
    onAddComment,
}: {
    comment: {
        id: number;
        position: THREE.Vector3;
        normal: THREE.Vector3;
        messages: string[];
    };
    onAddComment: (commentId: number, message: string) => void;
}) {
    const [newMessage, setNewMessage] = useState("");

    const handleAddComment = () => {
        if (newMessage.trim() !== "") {
            onAddComment(comment.id, newMessage);
            setNewMessage("");
        }
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Comment #{comment.id}</h3>
            <p>
                Location: ({comment.position.x.toFixed(2)},{" "}
                {comment.position.y.toFixed(2)}, {comment.position.z.toFixed(2)})
            </p>
            <div>
                {comment.messages.map((message, index) => (
                    <div key={index}>- {message}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Add a comment..."
                style={{ marginTop: "10px" }}
            />
            <button onClick={handleAddComment}>Add</button>
        </div>
    );
}
