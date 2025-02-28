import React, { useState } from "react";
import useComments from "../hooks/useComments";
import notifications from "../constants/notifications";
import toast from "react-hot-toast";

const CommentModal = ({ articleId, onClose }: { articleId: string; onClose: () => void }) => {
    const [comment, setComment] = useState("");

    const { addComment, error } = useComments(articleId);

    const handleSubmit = async () => {
        await addComment(comment);
        setComment("");
        onClose();
    };

    // if any error occure during comment submission
    if (error) toast.error(error.details || notifications.error.commentFailed.description);

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
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
