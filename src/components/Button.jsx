// src/components/Button.js
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;