import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Todo.css';
import checkboxTicked from '../../images/check-box.png';
import checkboxBlank from '../../images/blank-check-box.png';
import Back from './Back';

const Todo = (props) => {
  const slug = props.location.state.slug;
  sessionStorage.setItem('slug', slug);
  let headerData = JSON.parse(sessionStorage.userData);
  const [item, setItem] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todos/${slug}`, {
        headers: headerData,
      })
      .then((resp) => {
        setItem(resp.data.data.attributes);
      })
      .catch((err) => console.log(err));
  }, []);

  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({ pathname: `/todo/edit/${slug}`, state: { slug: slug } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Task: {item.task}</h1>
        <br />
        <p>Description: {item.description}</p>
        <p>Category: {item.category}</p>
        <div>
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
        <div>
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
        <button className='btn btn-primary' type='submit'>
          Edit
        </button>
      </form>
    </div>
  );
};

export default Todo;
