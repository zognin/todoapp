import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import AddButton from '../svg/AddButton';
import DeleteAlert from './DeleteAlert';

const Viewbar = ({
  items,
  setItemsDisplayed,
  setIsDeleteAlert,
  setDeleteData,
}) => {
  let categoriesToAdd = ['All', 'Priority', 'Completed'];
  const [viewOptions, setViewOptions] = useState(categoriesToAdd);
  const [showCard, setShowCard] = useState(false);
  const [selected, setSelected] = useState(viewOptions[0]);

  useEffect(() => {
    categoriesToAdd = ['All', 'Priority', 'Completed'];
    for (let i = 0; i < items.length; i++) {
      const category = items[i].attributes.category;
      if (category && !categoriesToAdd.includes(category)) {
        categoriesToAdd.push(category);
      }
    }
    setViewOptions(categoriesToAdd);
  }, [items]);

  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.innerHTML);
    setShowCard(!showCard);
  };

  let deleteIds = [];

  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteIds = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].attributes.is_completed) {
        deleteIds.push(items[i].id);
      }
    }
    console.log(deleteIds);
    setDeleteData({ id: deleteIds });
    setIsDeleteAlert(true);
  };

  useEffect(() => {
    if (selected === 'Priority') {
      const priorityItems = items.filter((item) => item.attributes.is_priority);
      setItemsDisplayed(priorityItems);
    } else if (selected === 'Completed') {
      const completedItems = items.filter(
        (item) => item.attributes.is_completed
      );
      setItemsDisplayed(completedItems);
    } else if (selected === 'All') {
      setItemsDisplayed(items);
    } else {
      const displayItems = items.filter(
        (item) => item.attributes.category === selected
      );
      setItemsDisplayed(displayItems);
    }
  }, [selected]);

  return (
    <div className='viewbar-container'>
      <div className='viewbar'>
        <div className='view-text'>View: </div>
        <Dropdown
          handleSelect={handleSelect}
          showCard={showCard}
          setShowCard={setShowCard}
          selected={selected}
          searchOptions={viewOptions}
        />
        <div className='todolist-icons-container'>
          <Link to='/todo/new' className='nav-link active' aria-current='page'>
            <AddButton />
          </Link>
          <button className='btn btn-info' onClick={handleDeleteClick}>
            Delete all Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewbar;
