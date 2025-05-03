// src/components/common/HoverImage.jsx
import React, { useState } from "react";

const HoverImage = ({ image, alt, overlayText, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={alt} 
        className={`w-full h-full transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-xl font-serif">{overlayText}</p>
        </div>
      )}
    </div>
  );
};

export default HoverImage;