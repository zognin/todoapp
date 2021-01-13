import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import '../App.css';
import CheckboxTicked from '../svg/CheckboxTicked';
import TrashInactive from '../svg/TrashInactive';
import DeleteAlert from './DeleteAlert';
import DeletingAlert from './DeletingAlert';
import PriorityIcon from '../svg/PriorityIcon';
import Viewbar from './Viewbar';
import { searchOptions } from './SearchOptions';
import SearchCalendar from './SearchCalendar';

const Todos = ({
  items,
  setItems,
  itemsDisplayed,
  setItemsDisplayed,
  isUpdate,
  setIsUpdate,
}) => {
  let headerData = JSON.parse(sessionStorage.userData);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: '' });
  const [selected, setSelected] = useState(searchOptions[0]);
  const [isActiveSearchCalendar, setIsActiveSearchCalendar] = useState(false);

  const toggleCheckbox = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('id');
    const isCompleted = e.target.getAttribute('value');
    const toggle_completed = isCompleted === 'false' ? true : false;
    let item = { id: id, is_completed: toggle_completed };

    axios
      .put(
        `https://cors-anywhere.herokuapp.com/https://zognin-todoapp-rails.herokuapp.com/api/v1/todos/${id}`,
        { todo: item },
        {
          headers: headerData,
        }
      )
      .then((resp) => {
        setIsUpdate(!isUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('id');
    setDeleteData({ id: id });
    setIsDeleteAlert(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setIsDeleteAlert(false);
    setIsDeletingAlert(true);
    if (Array.isArray(deleteData.id)) {
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/https://zognin-todoapp-rails.herokuapp.com/api/v1/todos/destroy_multiple`,
          deleteData,
          {
            headers: headerData,
          }
        )
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      axios
        .delete(
          `https://cors-anywhere.herokuapp.com/https://zognin-todoapp-rails.herokuapp.com/api/v1/todos/${deleteData.id}`,
          {
            headers: headerData,
            data: deleteData,
          }
        )
        .then((resp) => {})
        .catch((err) => console.log(err.response));
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
        itemsDisplayed={itemsDisplayed}
        setItemsDisplayed={setItemsDisplayed}
        setIsActiveSearchCalendar={setIsActiveSearchCalendar}
        selected={selected}
        setSelected={setSelected}
      />
      <SearchCalendar
        isActiveSearchCalendar={isActiveSearchCalendar}
        setIsActiveSearchCalendar={setIsActiveSearchCalendar}
        selected={selected}
        setSelected={setSelected}
        items={items}
        setItemsDisplayed={setItemsDisplayed}
      />
      <Viewbar
        items={items}
        setItemsDisplayed={setItemsDisplayed}
        setDeleteData={setDeleteData}
        setIsDeleteAlert={setIsDeleteAlert}
      />
      <div className='todolist'>
        <div className='todolist-container'>
          {itemsDisplayed.map((todo) => (
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
              <div className='todolist-items-link'>{todo.attributes.task}</div>
              <small className='todolist-items-category'>
                {todo.attributes.category}
              </small>
              <div className='todolist-icons-container'>
                {todo.attributes.is_priority && <PriorityIcon />}
                {todo.attributes.is_completed ? (
                  <CheckboxTicked
                    toggleCheckbox={toggleCheckbox}
                    id={todo.attributes.id}
                  />
                ) : (
                  <div
                    className='todolist-checkbox'
                    onClick={toggleCheckbox}
                    id={todo.id}
                    value={todo.attributes.is_completed}
                  ></div>
                )}
                <TrashInactive
                  handleDeleteClick={handleDeleteClick}
                  handleDelete={handleDelete}
                  id={todo.attributes.id}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
