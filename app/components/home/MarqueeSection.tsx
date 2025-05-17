import React from "react";
import { Category } from "@/app/types/home.types";

interface MarqueeSectionProps {
  category: Category[];
}

const MarqueeSection: React.FC<MarqueeSectionProps> = ({ category }) => {
  return (
    <div className="text-white overflow-hidden whitespace-nowrap group">
      <div className="flex items-center gap-10 animate-marquee group-hover:animation-paused">
        {category.map((cat) => (
          <span
            key={cat._id}
            className="cursor-pointer transition duration-300 card hover:text-red-500 px-4 py-2 rounded"
          >
            {cat.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
