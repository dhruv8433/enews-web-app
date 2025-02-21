import React from "react";
import { motion } from "framer-motion";
import { CommentCardProps } from "../types/comments.types";

const CommentCard: React.FC<CommentCardProps> = ({ user, comment, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white shadow-lg rounded-lg p-5 flex gap-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 my-2"
    >
      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">{user}</h3>
          <span className="text-xs font-medium text-gray-500">{timestamp}</span>
        </div>
        <p className="text-gray-700 mt-2 text-sm leading-relaxed">{comment}</p>
      </div>
    </motion.div>
  );
};

export default CommentCard;
