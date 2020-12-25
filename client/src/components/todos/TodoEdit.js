import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';
import checkboxTicked from '../../images/check-box.png';
import checkboxBlank from '../../images/blank-check-box.png';
import { useHistory } from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import Back from './Back';

const TodoEdit = (props) => {
  let headerData = JSON.parse(sessionStorage.userData);
  const [item, setItem] = useState({
    task: '',
    description: '',
    category: '',
    is_completed: false,
    is_priority: false,
    id: '',
  });
  // let id;
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);
  const slug = sessionStorage.slug;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todos/${slug}`, {
        headers: headerData,
      })
      .then((resp) => {
        setItem(resp.data.data.attributes);
        // id = resp.data.data.id;
        // console.log(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItem({ ...item, [name]: value });
  };

  const handleCheckComplete = (e) => {
    setItem({ ...item, is_completed: !item.is_completed });
  };
  const handleCheckPriority = (e) => {
    setItem({ ...item, is_priority: !item.is_priority });
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/api/v1/todos/${slug}`,
        { todo: item },
        {
          headers: headerData,
        }
      )
      .then((resp) => {
        setIsSuccessAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => setIsSuccessAlert(false), 800);
  };

  let history = useHistory();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setIsDeleteAlert(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setIsDeleteAlert(false);
    setIsDeletingAlert(true);
    axios
      .delete(`http://localhost:3000/api/v1/todos/${slug}`, {
        headers: headerData,
        data: item,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => console.log(err.response));
    setTimeout(() => {
      setIsDeletingAlert(false);
      history.push('/home');
    }, 1000);
  };

  return (
    <div>
      <SuccessAlert isSuccessAlert={isSuccessAlert} />
      {isDeletingAlert && <div className='alert alert-danger'>Deleting...</div>}
      {isDeleteAlert && (
        <div className='alert alert-secondary'>
          <h5 className='alert-heading'>Delete this task?</h5>
          <p>You will not be able to undo this action</p>
          <hr />
          <button className='btn btn-primary' onClick={handleDelete}>
            Yes
          </button>
          <button
            className='btn btn-dark'
            onClick={() => {
              setIsDeleteAlert(false);
            }}
          >
            No
          </button>
        </div>
      )}
      <h1>Edit</h1>
      <br />
      <form>
        <div className='form-group'>
          <label htmlFor='task' className='form-label'>
            Task
          </label>
          <input
            type='text'
            className='form-control'
            id='task'
            name='task'
            value={item.task}
            onChange={handleChange}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            value={item.description}
            onChange={handleChange}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <input
            type='text'
            className='form-control'
            id='category'
            name='category'
            value={item.category}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <div onClick={handleCheckComplete}>
          <label className='checkbox-label'>Completed</label>
          {item.is_completed ? (
            <img
              className='checkbox'
              src={checkboxTicked}
              alt='Checkbox Ticked'
            ></img>
          ) : (
            <img
              className='checkbox'
              src={checkboxBlank}
              alt='Checkbox Blank'
            ></img>
          )}
        </div>
        <br />
        <div onClick={handleCheckPriority}>
          <label className='checkbox-label'>Priority</label>
          {item.is_priority ? (
            <img
              className='checkbox'
              src={checkboxTicked}
              alt='Checkbox Ticked'
            ></img>
          ) : (
            <img
              className='checkbox'
              src={checkboxBlank}
              alt='Checkbox Blank'
            ></img>
          )}
        </div>
        <br />
        <Back />
        <button type='submit' className='btn btn-primary' onClick={handleSave}>
          Save Changes
        </button>
        <button
          type='submit'
          className='btn btn-dark'
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default TodoEdit;
