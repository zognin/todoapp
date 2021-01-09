import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarView = ({ items }) => {
  const [date, setDate] = useState(new Date());

  const displayItemOnCalendar = (tileDate, items) => {
    const itemsCopy = [...items];
    tileDate.setUTCHours(0, 0, 0, 0);
    const isoTileDate = tileDate.toISOString();

    const itemsFiltered = itemsCopy.filter((item) => {
      const isoTime = item.attributes.start_time;
      const localTime = new Date(isoTime);
      localTime.setUTCHours(0, 0, 0, 0);
      const isoLocalTime = localTime.toISOString();
      return isoTileDate === isoLocalTime;
    });

    return itemsFiltered.length
      ? itemsFiltered.map((item) => (
          <div key={item.attributes.id}>
            {isoTileDate}
            {item.attributes.task}
          </div>
        ))
      : null;
  };

  return (
    <div className='calendar-container'>
      <Calendar
        onChange={setDate}
        value={date}
        className='react-calendar'
        tileContent={({ date, view }) =>
          view === 'month' ? displayItemOnCalendar(date, items) : null
        }
      />
    </div>
  );
};

export default CalendarView;
