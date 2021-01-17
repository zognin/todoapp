import React from 'react';
import '../App.css';

interface Props {
  handleSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  showCard: boolean;
  setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  searchOptions: string[];
}

const Dropdown: React.FC<Props> = ({
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
              onClick={(e) => handleSelect(e)}
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
