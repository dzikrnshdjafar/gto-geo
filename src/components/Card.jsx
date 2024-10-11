import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-gray-100/40 shadow-lg rounded-lg p-6 mb-6">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl text-gray-700 font-semibold text-gray-800 text-center">{title}</h2>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Card;
