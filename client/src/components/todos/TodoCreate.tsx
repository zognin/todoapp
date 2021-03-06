import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import checkboxTicked from '../../images/check-box.png';
import checkboxBlank from '../../images/blank-check-box.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import Back from './Back';
import { productionBackendURL } from '../Path';

const TodoCreate = () => {
  let headerData = JSON.parse(sessionStorage.userData);
  const [item, setItem] = useState({
    task: '',
    description: '',
    category: '',
    start_time: '',
    end_time: '',
    is_completed: false,
    is_priority: false,
  });
  const [startDate, setStartDate] = useState<Date | Date[]>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState<Date | Date[]>(new Date());
  const [endTime, setEndTime] = useState('10:00');

  useEffect(() => {
    const startDateTime = formatDate(startDate, startTime);
    if (startDateTime instanceof Date) {
      const utcString = startDateTime.toISOString();
      setItem({ ...item, start_time: utcString });
    }
  }, [startDate, startTime]);

  useEffect(() => {
    const endDateTime = formatDate(endDate, endTime);
    if (endDateTime instanceof Date) {
      const utcString = endDateTime.toISOString();
      setItem({ ...item, end_time: utcString });
    }
  }, [endDate, endTime]);

  const formatDate = (datetime: Date | Date[], time: string) => {
    const hour = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));
    if (datetime instanceof Date) {
      datetime.setHours(hour);
      datetime.setMinutes(minutes);
      datetime.setSeconds(0);
    }
    return datetime;
  };

  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setItem({ ...item, [name]: value });
  };

  const handleCheckComplete = () => {
    setItem({ ...item, is_completed: !item.is_completed });
  };

  const handleCheckPriority = () => {
    setItem({ ...item, is_priority: !item.is_priority });
  };

  const handleStartEndDate = (value: Date | Date[]) => {
    setStartDate(value);
    setEndDate(value);
  };

  let history = useHistory();
  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .post(`${productionBackendURL}/api/v1/todos`, item, {
        headers: headerData,
      })
      .then((resp) => {
        setIsSuccessAlert(true);
      });
    setTimeout(() => {
      setIsSuccessAlert(false);
      history.push('/home');
    }, 800);
  };

  return (
    <div className='todo-form'>
      <SuccessAlert isSuccessAlert={isSuccessAlert} />
      <form>
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
        <div>
          <label htmlFor='start-date' className='form-label'>
            Start
          </label>
          <Calendar
            onChange={(value) => {
              handleStartEndDate(value);
            }}
            value={startDate}
            onClickDay={(startDate) => setStartDate(startDate)}
          />
          <input
            type='time'
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            value={startTime}
          />
        </div>
        <br />
        <div>
          <label htmlFor='end-date' className='form-label'>
            End
          </label>
          <Calendar
            onChange={setEndDate}
            value={endDate}
            onClickDay={(endDate) => setEndDate(endDate)}
          />
          <input
            type='time'
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            value={endTime}
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
      </form>
    </div>
  );
};

export default TodoCreate;
