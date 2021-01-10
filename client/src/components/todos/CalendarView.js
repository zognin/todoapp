import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import '../svg/AddButton';
import AddButton from '../svg/AddButton';
import context from 'react-bootstrap/esm/AccordionContext';

const CalendarView = ({ items }) => {
  const [date, setDate] = useState(new Date());

  const displayItemOnCalendar = (tileDate, items) => {
    const date = tileDate.getDate();
    const month = tileDate.getMonth();
    const year = tileDate.getFullYear();

    const itemsCopy = [...items];

    const itemsFiltered = itemsCopy.filter((item) => {
      const isoTime = item.attributes.start_time;
      let localTime = new Date(isoTime);
      const itemDate = localTime.getDate();
      const itemMonth = localTime.getMonth();
      const itemYear = localTime.getFullYear();
      return date === itemDate && month === itemMonth && year === itemYear;
    });

    return itemsFiltered.length
      ? itemsFiltered.map((item) => (
          <Link
            to={{
              pathname: `/todo/edit/${item.attributes.id}`,
              state: { id: item.attributes.id },
            }}
            key={item.attributes.id}
          >
            <div className='calendar-todo'>{item.attributes.task}</div>
          </Link>
        ))
      : null;
  };

  return (
    <div className='calendar-container'>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) =>
          view === 'month' ? displayItemOnCalendar(date, items) : null
        }
      />
    </div>
  );
};

export default CalendarView;
