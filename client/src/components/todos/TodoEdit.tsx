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

const TodoEdit = (props: any) => {
  let headerData = JSON.parse(sessionStorage.userData);

  const [item, setItem] = useState({
    task: props.location.state.task,
    description: props.location.state.description,
    category: props.location.state.category,
    start_time: props.location.state.start_time,
    end_time: props.location.state.end_time,
    is_completed: props.location.state.is_completed,
    is_priority: props.location.state.is_priority,
    id: props.location.state.id,
  });

  const formatLocalTime = (isoDateTime: string) => {
    const datetime = new Date(isoDateTime);
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const hoursStr = hours <= 9 ? '0' + hours.toString() : hours.toString();
    const minutesStr =
      minutes <= 9 ? '0' + minutes.toString() : minutes.toString();
    return hoursStr + ':' + minutesStr;
  };

  const [startDate, setStartDate] = useState<Date | Date[]>(
    new Date(item.start_time)
  );
  const [startTime, setStartTime] = useState(formatLocalTime(item.start_time));
  const [endDate, setEndDate] = useState<Date | Date[]>(
    new Date(item.end_time)
  );
  const [endTime, setEndTime] = useState(formatLocalTime(item.end_time));

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
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);

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

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .put(
        `${productionBackendURL}/api/v1/todos/${item.id}`,
        { todo: item },
        {
          headers: headerData,
        }
      )
      .then((resp) => {
        setIsSuccessAlert(true);
        setTimeout(() => setIsSuccessAlert(false), 800);
      });
  };

  let history = useHistory();

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsDeleteAlert(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsDeleteAlert(false);
    setIsDeletingAlert(true);
    axios.delete(`${productionBackendURL}/api/v1/todos/${item.id}`, {
      headers: headerData,
      data: item,
    });
    setTimeout(() => {
      setIsDeletingAlert(false);
      history.push('/home');
    }, 1000);
  };

  const handleStartEndDate = (value: Date | Date[]) => {
    setStartDate(value);
    setEndDate(value);
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
            onChange={(value) => {
              handleStartEndDate(value);
            }}
            value={new Date(item.start_time)}
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
            onChange={() => setEndDate}
            value={new Date(item.end_time)}
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
