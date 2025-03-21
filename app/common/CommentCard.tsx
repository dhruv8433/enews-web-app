import React from "react";
import { motion } from "framer-motion";
import { CommentCardProps } from "../types/comments.types";

const CommentCard: React.FC<CommentCardProps> = ({ user, comment, timestamp }) => {
  console.log(timestamp.toString());
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ backgroundColor: `var(--secondary)` }}
      className=" shadow-lg rounded-lg p-5 flex gap-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 my-2"
    >
      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg" style={{color: `var(--text)`}}>{user}</h3>
          <span className="text-xs font-medium" style={{color: `var(--text)`}}>{timestamp}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed" style={{color: `var(--text)`}}>{comment}</p>
      </div>
    </motion.div>
  );
};

export default CommentCard;
