import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './Todo.css';
import checkboxTicked from '../../images/check-box.png';
import checkboxBlank from '../../images/blank-check-box.png';
import { useHistory } from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import Back from './Back';

const TodoCreate = () => {
  let headerData = JSON.parse(sessionStorage.userData);
  const [item, setItem] = useState({
    task: '',
    description: '',
    category: '',
    is_completed: false,
    is_priority: false,
  });
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
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
  let history = useHistory();
  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/v1/todos`, item, {
        headers: headerData,
      })
      .then((resp) => {
        setIsSuccessAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsSuccessAlert(false);
      history.push('/home');
    }, 800);
  };

  return (
    <div className='todo-form'>
      <form>
        <SuccessAlert isSuccessAlert={isSuccessAlert} />
        <h1>New Task</h1>
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
        <br />
        <button type='submit' className='btn btn-primary' onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default TodoCreate;
