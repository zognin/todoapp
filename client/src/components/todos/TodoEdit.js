import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import checkboxTicked from '../../images/check-box.png';
import checkboxBlank from '../../images/blank-check-box.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import DeleteAlert from './DeleteAlert';
import DeletingAlert from './DeletingAlert';
import Back from './Back';
import { productionBackendURL } from '../Path';

const TodoEdit = (props) => {
  let headerData = JSON.parse(sessionStorage.userData);
  const initialDate = new Date();
  const initialISODate = initialDate.toISOString();

  const [item, setItem] = useState({
    task: '',
    description: '',
    category: '',
    start_time: initialISODate,
    end_time: initialISODate,
    is_completed: false,
    is_priority: false,
    id: '',
  });

  const formatLocalTime = (isoDateTime) => {
    const datetime = new Date(isoDateTime);
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const hoursStr =
      hours <= 9 ? '0' + hours.toString().concat() : hours.toString();
    const minutesStr =
      minutes <= 9 ? '0' + minutes.toString() : minutes.toString();
    return hoursStr + ':' + minutesStr;
  };

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState('10:00');

  useEffect(() => {
    const startDateTime = formatDate(startDate, startTime);
    const utcString = startDateTime.toISOString();
    setItem({ ...item, start_time: utcString });
  }, [startDate, startTime]);

  useEffect(() => {
    const endDateTime = formatDate(endDate, endTime);
    const utcString = endDateTime.toISOString();
    setItem({ ...item, end_time: utcString });
  }, [endDate, endTime]);

  const formatDate = (datetime, time) => {
    const hour = time.slice(0, 2);
    const minutes = time.slice(3, 5);
    datetime.setHours(hour);
    datetime.setMinutes(minutes);
    datetime.setSeconds(0);
    return datetime;
  };

  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);
  const id = props.location.state.id;

  useEffect(() => {
    axios
      .get(`${productionBackendURL}/api/v1/todos/${id}`, {
        headers: headerData,
      })
      .then((resp) => {
        setItem(resp.data.data.attributes);
      });
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
        `${productionBackendURL}/api/v1/todos/${id}`,
        { todo: item },
        {
          headers: headerData,
        }
      )
      .then((resp) => {
        setIsSuccessAlert(true);
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
      .delete(`${productionBackendURL}/api/v1/todos/${id}`, {
        headers: headerData,
        data: item,
      })
      .then((resp) => {});
    setTimeout(() => {
      setIsDeletingAlert(false);
      history.push('/home');
    }, 1000);
  };

  return (
    <div className='todo-form'>
      <SuccessAlert isSuccessAlert={isSuccessAlert} />
      <DeletingAlert isDeletingAlert={isDeletingAlert} />
      <DeleteAlert
        isDeleteAlert={isDeleteAlert}
        handleDelete={handleDelete}
        setIsDeleteAlert={setIsDeleteAlert}
      />
      <form>
        <h1>Edit</h1>
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
        <div>
          <label htmlFor='start-date' className='form-label'>
            Start
          </label>
          <Calendar
            onChange={setStartDate}
            value={new Date(item.start_time)}
            onClickDay={(startDate, e) => setStartDate(startDate)}
          />
          <input
            type='time'
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            value={formatLocalTime(item.start_time)}
          />
        </div>
        <br />
        <div>
          <label htmlFor='end-date' className='form-label'>
            End
          </label>
          <Calendar
            onChange={setEndDate}
            value={new Date(item.end_time)}
            onClickDay={(endDate, e) => setEndDate(endDate)}
          />
          <input
            type='time'
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            value={formatLocalTime(item.end_time)}
          />
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
        <button type='submit' className='btn btn-primary' onClick={handleSave}>
          Save Changes
        </button>
        <br />
        <Back />
        <br />
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
