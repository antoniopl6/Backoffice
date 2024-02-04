import React, { useState } from 'react';
const Line = ({ start, end, idx, onDelete }) => {
  const [left, top, width, angle] = calculateLine(start, end);
  const [isHovered, setIsHovered] = useState(false);
  const handleArrowHover = () => {
    setIsHovered(true);
  };

  const handleArrowLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <div className="line-container">
      <div
        className="line"
        onMouseEnter={handleArrowHover}
        onMouseLeave={handleArrowLeave}
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          transform: `rotate(${angle}deg)`,
        }}
      >
        {isHovered ? (
          <button className='delete-button' onClick={() => onDelete(idx)}>
            X
          </button>
        ) : <div className="arrow">
        </div>}

      </div>
    </div>
  );
};

const calculateLine = (start, end) => {
  const distance = Math.sqrt(
    Math.pow(end.y - start.y, 2) + Math.pow(end.x - start.x, 2)
  );
  const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;

  return [start.x, start.y, distance, angle];
};

export default Line;
