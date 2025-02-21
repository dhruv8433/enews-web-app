import React, { useState } from "react";
import useComments from "../hooks/useComments";

const CommentModal = ({ articleId, onClose }: { articleId: string; onClose: () => void }) => {
    const [comment, setComment] = useState("");

    const { addComment } = useComments(articleId);

    const handleSubmit = async () => {
        await addComment(comment);
        setComment("");
        onClose();
    };

    return (
        <div>
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-3">Add a Comment</h2>
                <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-400 px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
