import { useState } from "react";
import * as THREE from "three";

/**
 * A component that displays a comment thread and allows users to add new messages.
 * @param {object} props - The component's props.
 * @param {object} props.comment - The comment object, containing its ID, position, normal, and messages.
 * @param {(commentId: number, message: string) => void} props.onAddComment - The function to call when a new message is added.
 * @returns {JSX.Element} A div element containing the comment thread.
 */
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
    // State for the new message input field
    const [newMessage, setNewMessage] = useState("");

    /**
     * Handles the click on the "Add" button.
     * It calls the onAddComment function with the new message and clears the input field.
     */
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
                {comment.position.y.toFixed(2)}, {comment.position.z.toFixed(2)}
                )
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
