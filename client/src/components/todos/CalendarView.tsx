import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import '../svg/AddButton';

interface TodoAttributes {
  task: string;
  description: string;
  category: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
  is_priority: boolean;
  slug: string;
  user_id: number;
  id: number;
}

interface Todo {
  attributes: TodoAttributes;
  id: string;
  [key: string]: string | object;
}

interface Props {
  items: undefined | Todo[];
}

const CalendarView: React.FC<Props> = ({ items }) => {
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const displayItemOnCalendar = (tileDate: Date, items: Todo[] | undefined) => {
    if (items) {
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
                state: {
                  task: item.attributes.task,
                  description: item.attributes.description,
                  category: item.attributes.category,
                  start_time: item.attributes.start_time,
                  end_time: item.attributes.end_time,
                  is_completed: item.attributes.is_completed,
                  is_priority: item.attributes.is_priority,
                  id: item.attributes.id,
                },
              }}
              key={item.attributes.id}
            >
              <div className='calendar-todo'>{item.attributes.task}</div>
            </Link>
          ))
        : null;
    } else {
      return null;
    }
  };

  return (
    <div className='calendar-container'>
      <Calendar
        onChange={(value) => setDate(value)}
        value={date}
        //@ts-ignore
        tileContent={({ date, view }) =>
          view === 'month' ? displayItemOnCalendar(date, items) : null
        }
      />
    </div>
  );
};

export default CalendarView;
