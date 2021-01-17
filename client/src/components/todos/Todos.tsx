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

  const toggleCheckbox = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const id = (e.target as HTMLDivElement).getAttribute('id');
    const isCompleted = (e.target as HTMLDivElement).getAttribute('value');
    const toggle_completed = isCompleted === 'false' ? true : false;
    let item = { id: id, is_completed: toggle_completed };

    axios
      .put(
        `${productionBackendURL}/api/v1/todos/${id}`,
        { todo: item },
        {
          headers: headerData,
        }
      )
      .then((res) => setIsUpdate(!isUpdate))
      .catch((err) => setError(true));
  };

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
      axios
        .post(
          `${productionBackendURL}/api/v1/todos/destroy_multiple`,
          deleteData,
          {
            headers: headerData,
          }
        )
        .catch((err) => setError(true));
    } else {
      axios
        .delete(`${productionBackendURL}/api/v1/todos/${deleteData.id}`, {
          headers: headerData,
          data: deleteData,
        })
        .catch((err) => setError(true));
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
                  state: { id: todo.attributes.id },
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
                  {todo.attributes.is_completed ? (
                    <CheckboxTicked
                      toggleCheckbox={toggleCheckbox}
                      id={todo.id}
                    />
                  ) : (
                    <div
                      className='todolist-checkbox'
                      onClick={toggleCheckbox}
                      id={todo.id}
                    ></div>
                  )}
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
