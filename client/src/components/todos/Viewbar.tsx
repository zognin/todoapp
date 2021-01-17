import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import AddButton from '../svg/AddButton';
import DeleteAlert from './DeleteAlert';

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

interface DeleteData {
  id: string | string[];
}

interface Props {
  items: undefined | Todo[];
  setItemsDisplayed: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  setIsDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteData: React.Dispatch<React.SetStateAction<DeleteData>>;
}

const Viewbar: React.FC<Props> = ({
  items,
  setItemsDisplayed,
  setIsDeleteAlert,
  setDeleteData,
}) => {
  let categoriesToAdd = [
    'All',
    'Priority',
    'Completed',
    'Incomplete',
    'Start Date Order',
    'End Date Order',
  ];
  const [viewOptions, setViewOptions] = useState(categoriesToAdd);
  const [showCard, setShowCard] = useState(false);
  const [selected, setSelected] = useState(viewOptions[0]);

  useEffect(() => {
    categoriesToAdd = [
      'All',
      'Priority',
      'Completed',
      'Incomplete',
      'Start Date Order',
      'End Date Order',
    ];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const category = items[i].attributes.category;
        if (category && !categoriesToAdd.includes(category)) {
          categoriesToAdd.push(category);
        }
      }
    }
    setViewOptions(categoriesToAdd);
  }, [items]);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelected((e.target as HTMLDivElement).innerHTML);
    setShowCard(!showCard);
  };

  let deleteIds = [];

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    deleteIds = [];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].attributes.is_completed) {
          deleteIds.push(items[i].id);
        }
      }
    }
    setDeleteData({ id: deleteIds });
    setIsDeleteAlert(true);
  };

  const sortStartDate = (a: Todo, b: Todo) =>
    a.attributes.start_time < b.attributes.start_time
      ? -1
      : a.attributes.start_time > b.attributes.start_time
      ? 1
      : 0;
  const sortEndDate = (a: Todo, b: Todo) =>
    a.attributes.end_time < b.attributes.end_time
      ? -1
      : a.attributes.end_time > b.attributes.end_time
      ? 1
      : 0;

  useEffect(() => {
    if (items) {
      if (selected === 'Priority') {
        const priorityItems = items.filter(
          (item) => item.attributes.is_priority
        );
        setItemsDisplayed(priorityItems);
      } else if (selected === 'Completed') {
        const completedItems = items.filter(
          (item) => item.attributes.is_completed
        );
        setItemsDisplayed(completedItems);
      } else if (selected === 'Incomplete') {
        const incompleteItems = items.filter(
          (item) => !item.attributes.is_completed
        );
        setItemsDisplayed(incompleteItems);
      } else if (selected === 'All') {
        setItemsDisplayed(items);
      } else if (selected === 'Start Date Order') {
        const sorted = items.slice().sort(sortStartDate);
        setItemsDisplayed(sorted);
      } else if (selected === 'End Date Order') {
        const sorted = items.slice().sort(sortEndDate);
        setItemsDisplayed(sorted);
      } else {
        const displayItems = items.filter(
          (item) => item.attributes.category === selected
        );
        setItemsDisplayed(displayItems);
      }
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
