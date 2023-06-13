import React from 'react';

const Text = ({ content, weight, size, color }) => {
  return (
    <span className={`font-${weight} text-${size} text-${color}`}>
      {content}
    </span>
  );
};

export default Text;