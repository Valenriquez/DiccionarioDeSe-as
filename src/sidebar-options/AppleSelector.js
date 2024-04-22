import React from 'react';
import Select from 'react-select';
import { FaApple } from 'react-icons/fa'; // Replace with your actual icons

const IconRenderer = ({ icon, label }) => (
  <div>
    {icon === 'FaApple' && <FaApple style={{ marginRight: '8px' }} />}
    {label}
  </div>
);

const AppleSelector = ({ options, onSelect }) => {
  const handleChange = (selectedOption) => {
    onSelect(selectedOption.value);
  };

  const customOptionRenderer = ({ data }) => <IconRenderer {...data} />;

  return (
    <Select
      options={options}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      isSearchable
      components={{ Option: customOptionRenderer }}
      placeholder="Select an Apple product"
    />
  );
};

export default AppleSelector;
