import React, { useState } from 'react';
import '../App.css';
import { searchOptions } from './SearchOptions';

const Dropdown = ({ handleSelect, showCard, setShowCard, selected }) => {
  return (
    <div className='dropdown'>
      <div className='dropdown-button' onClick={() => setShowCard(!showCard)}>
        <span className='dropdown-selected'>{selected}</span>
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
