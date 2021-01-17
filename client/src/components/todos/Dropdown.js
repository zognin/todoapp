import React from 'react';
import '../App.css';

const Dropdown = ({
  handleSelect,
  showCard,
  setShowCard,
  selected,
  searchOptions,
}) => {
  return (
    <div className='dropdown'>
      <div className='dropdown-button' onClick={() => setShowCard(!showCard)}>
        <div className='dropdown-selected'>{selected}</div>
        <div className='arrow-down'></div>
      </div>
      {showCard && (
        <div className='dropdown-card'>
          {searchOptions.map((option) => (
            <div
              key={searchOptions.indexOf(option)}
              className='dropdown-options'
              onClick={handleSelect}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
