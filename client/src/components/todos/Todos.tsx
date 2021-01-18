import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import '../App.css';
import CheckboxTicked from '../svg/CheckboxTicked';
import Trash from '../svg/Trash';
import DeleteAlert from './DeleteAlert';
import DeletingAlert from './DeletingAlert';
import PriorityIcon from '../svg/PriorityIcon';
import Viewbar from './Viewbar';
import { searchOptions } from './SearchOptions';
import SearchCalendar from './SearchCalendar';
import { productionBackendURL } from '../Path';

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
  items: undefined | Todo[];
  itemsDisplayed: undefined | Todo[];
  setItemsDisplayed: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeleteData {
  id: string | string[];
}

const Todos: React.FC<Props> = ({
  items,
  itemsDisplayed,
  setItemsDisplayed,
  isUpdate,
  setIsUpdate,
}) => {
  let headerData = JSON.parse(sessionStorage.userData);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>({ id: '' });
  const [selected, setSelected] = useState(searchOptions[0]);
  const [isActiveSearchCalendar, setIsActiveSearchCalendar] = useState(false);
  const [error, setError] = useState(false);

  //wait time for http requests
  const [waitTime, setWaitTime] = useState(0);

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = (e.target as HTMLDivElement).getAttribute('id')!;
    setDeleteData({ id: id });
    setIsDeleteAlert(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsDeleteAlert(false);
    setIsDeletingAlert(true);
    if (Array.isArray(deleteData.id)) {
      setTimeout(() => {
        axios
          .post(
            `${productionBackendURL}/api/v1/todos/destroy_multiple`,
            deleteData,
            {
              headers: headerData,
            }
          )
          .catch(() => setError(true));
      }, waitTime);
    } else {
      axios
        .delete(`${productionBackendURL}/api/v1/todos/${deleteData.id}`, {
          headers: headerData,
          data: deleteData,
        })
        .catch(() => setError(true));
    }
    setTimeout(() => {
      setIsDeletingAlert(false);
      setDeleteData({ id: '' });
      setIsUpdate(!isUpdate);
    }, 1000);
  };

  return (
    <div className='todos-container'>
      <DeleteAlert
        isDeleteAlert={isDeleteAlert}
        setIsDeleteAlert={setIsDeleteAlert}
        handleDelete={handleDelete}
      />
      <DeletingAlert isDeletingAlert={isDeletingAlert} />
      <Search
        items={items}
        setItemsDisplayed={setItemsDisplayed}
        setIsActiveSearchCalendar={setIsActiveSearchCalendar}
        selected={selected}
        setSelected={setSelected}
      />
      <SearchCalendar
        isActiveSearchCalendar={isActiveSearchCalendar}
        setIsActiveSearchCalendar={setIsActiveSearchCalendar}
        selected={selected}
        items={items}
        setItemsDisplayed={setItemsDisplayed}
      />
      <Viewbar
        items={items}
        setItemsDisplayed={setItemsDisplayed}
        setDeleteData={setDeleteData}
        setIsDeleteAlert={setIsDeleteAlert}
      />
      {error && (
        <div
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          There is an error, please try again later.
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setError(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}
      <div className='todolist'>
        <div className='todolist-container'>
          {itemsDisplayed &&
            itemsDisplayed.map((todo) => (
              <Link
                to={{
                  pathname: `/todo/edit/${todo.attributes.id}`,
                  state: {
                    task: todo.attributes.task,
                    description: todo.attributes.description,
                    category: todo.attributes.category,
                    start_time: todo.attributes.start_time,
                    end_time: todo.attributes.end_time,
                    is_completed: todo.attributes.is_completed,
                    is_priority: todo.attributes.is_priority,
                    id: todo.attributes.id,
                  },
                }}
                key={todo.id}
                className='todolist-items'
              >
                <small className='todolist-date'>
                  {todo.attributes.start_time.slice(5, 10)} to{' '}
                  {todo.attributes.end_time.slice(5, 10)}
                </small>
                <div className='todolist-items-link'>
                  {todo.attributes.task}
                </div>
                <small className='todolist-items-category'>
                  {todo.attributes.category}
                </small>
                <div className='todolist-icons-container'>
                  {todo.attributes.is_priority && <PriorityIcon />}
                  <CheckboxTicked
                    id={todo.id}
                    isCompleted={todo.attributes.is_completed}
                    setError={setError}
                    waitTime={waitTime}
                    setWaitTime={setWaitTime}
                    items={items}
                  />
                  <Trash handleDeleteClick={handleDeleteClick} id={todo.id} />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
