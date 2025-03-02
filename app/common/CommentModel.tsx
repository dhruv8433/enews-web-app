import React, { useState } from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import useComments from "../hooks/useComments";
import notifications from "../constants/notifications";
import toast from "react-hot-toast";

const CommentModal = ({ open, articleId, onClose }: { open: boolean; articleId: string; onClose: () => void }) => {
    const [comment, setComment] = useState("");

    const { addComment, error } = useComments(articleId);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            toast.error(notifications.error.commentNotEmpty.message);
            return;
        }

        await addComment(comment);
        setComment("");
        onClose();
    };

    // Handle error messages
    if (error) toast.error(error.details || notifications.error.commentFailed.description);

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Add a Comment</h2>

                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <div className="flex justify-end mt-4">
                        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>
                            Comment
                        </button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default CommentModal;
