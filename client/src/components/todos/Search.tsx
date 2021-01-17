import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchIcon from '../svg/SearchIcon';
import Dropdown from './Dropdown';
import { searchOptions } from './SearchOptions';

interface TodoAttributes {
  task: string;
  description: string;
  category: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
  is_priority: boolean;
  slug: string;
  user_id: number;
  id: number;
}

interface Todo {
  attributes: TodoAttributes;
  id: string;
  [key: string]: string | object;
}

interface Props {
  items: Todo[] | undefined;
  setItemsDisplayed: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  setIsActiveSearchCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<Props> = ({
  items,
  setItemsDisplayed,
  setIsActiveSearchCalendar,
  selected,
  setSelected,
}) => {
  const [input, setInput] = useState('');
  const [showCard, setShowCard] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  function find(input: string) {
    let regexInput = new RegExp(input, 'i');
    if (items) {
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
  }

  function reorder() {
    if (items) {
      if (selected === 'By Priority') {
        const priorityItems = items.filter(
          (item) => item.attributes.is_priority
        );
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
  }

  useEffect(() => {
    if (input) {
      find(input);
    } else {
      setItemsDisplayed(items);
    }
  }, [input]);

  useEffect(() => {
    if (selected === 'By Start Date' || selected === 'By End Date') {
      setIsActiveSearchCalendar(true);
    } else {
      reorder();
    }
  }, [selected]);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelected((e.target as HTMLDivElement).innerHTML);
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
        <SearchIcon />
        <Dropdown
          handleSelect={handleSelect}
          showCard={showCard}
          setShowCard={setShowCard}
          selected={selected}
          searchOptions={searchOptions}
        />
      </div>
    </div>
  );
};

export default Search;
