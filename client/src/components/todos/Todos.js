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

const Todos = () => {
  const [items, setItems] = useState([]);
  const [itemsDisplayed, setItemsDisplayed] = useState([]);
  let headerData = JSON.parse(sessionStorage.userData);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: '' });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todos`, {
        headers: headerData,
      })
      .then((res) => {
        const item = res.data.data;
        setItems(item);
        setItemsDisplayed(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  const toggleCheckbox = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('id');
    const isCompleted = e.target.getAttribute('value');
    const toggle_completed = isCompleted === 'false' ? true : false;
    let item = { id: id, is_completed: toggle_completed };

    axios
      .put(
        `http://localhost:3000/api/v1/todos/${id}`,
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
    axios
      .delete(`http://localhost:3000/api/v1/todos/${deleteData.id}`, {
        headers: headerData,
        data: deleteData,
      })
      .then((resp) => {})
      .catch((err) => console.log(err.response));
    setTimeout(() => {
      setIsDeletingAlert(false);
      setDeleteData({ id: '' });
      setIsUpdate(!isUpdate);
    }, 1000);
  };

  return (
    <div>
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
      />
      <Viewbar
        items={items}
        itemsDisplayed={itemsDisplayed}
        setItemsDisplayed={setItemsDisplayed}
        deleteData={deleteData}
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
