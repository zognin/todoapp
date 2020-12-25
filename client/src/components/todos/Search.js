import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchIcon from '../../images/search.png';
import Dropdown from './Dropdown';
import { searchOptions } from './SearchOptions';

const Search = ({ items, itemsDisplayed, setItemsDisplayed }) => {
  const [input, setInput] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [selected, setSelected] = useState(searchOptions[0]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  function find(input) {
    let regexInput = new RegExp(input, 'i');
    if (selected === 'By Category') {
      setItemsDisplayed(
        items.filter((item) => regexInput.test(item.attributes.category))
      );
    } else {
      setItemsDisplayed(
        items.filter((item) => regexInput.test(item.attributes.task))
      );
    }
  }

  function reorder() {
    if (selected === 'By Priority') {
      const priorityItems = items.filter((item) => item.attributes.is_priority);
      const nonPriorityItems = items.filter(
        (item) => !item.attributes.is_priority
      );
      const reorderedItems = priorityItems.concat(nonPriorityItems);
      setItemsDisplayed(reorderedItems);
    } else if (selected === 'By Completed') {
      const completedItems = items.filter(
        (item) => item.attributes.is_completed
      );
      const nonCompletedItems = items.filter(
        (item) => !item.attributes.is_completed
      );
      const reorderedItems = completedItems.concat(nonCompletedItems);
      setItemsDisplayed(reorderedItems);
    } else {
      setItemsDisplayed(items);
    }
  }

  useEffect(() => {
    if (input) {
      find(input);
    } else {
      setItemsDisplayed(items);
    }
  }, [input]);

  useEffect(() => {
    reorder();
  }, [selected]);

  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.innerHTML);
    setShowCard(!showCard);
  };

  return (
    <div>
      <div className='search-bar'>
        <input
          id='search'
          name='search'
          placeholder='Search...'
          value={input}
          onChange={handleChange}
        ></input>
        <img src={SearchIcon} className='search-icon' alt='search'></img>
        <Dropdown
          handleSelect={handleSelect}
          showCard={showCard}
          setShowCard={setShowCard}
          selected={selected}
        />
      </div>
    </div>
  );
};

export default Search;
