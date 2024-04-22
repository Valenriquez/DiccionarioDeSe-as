import React from 'react';
import './CategoryLabel.css'; // Import your CSS file

const CategoryLabel = ({ htmlFor, labelText }) => {
  return (
    <span className="rounded-label">
      <label htmlFor={htmlFor}>{labelText}</label>
    </span>
  );
};

export default CategoryLabel;
