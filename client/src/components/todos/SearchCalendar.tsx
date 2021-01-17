import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../App.css';

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
  isActiveSearchCalendar: boolean;
  setIsActiveSearchCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  items: Todo[] | undefined;
  setItemsDisplayed: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
}

const SearchCalendar: React.FC<Props> = ({
  isActiveSearchCalendar,
  setIsActiveSearchCalendar,
  selected,
  items,
  setItemsDisplayed,
}) => {
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const handleClose = () => {
    setIsActiveSearchCalendar(false);
  };

  const handleSearchDate = (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth();
    const date = value.getDate();
    if (items) {
      const itemsCopy = [...items];
      if (selected === 'By Start Date') {
        const itemsFiltered = itemsCopy.filter((item) => {
          const isoTime = item.attributes.start_time;
          let localTime = new Date(isoTime);
          const itemDate = localTime.getDate();
          const itemMonth = localTime.getMonth();
          const itemYear = localTime.getFullYear();
          return date === itemDate && month === itemMonth && year === itemYear;
        });
        setItemsDisplayed(itemsFiltered);
      } else {
        const itemsFiltered = itemsCopy.filter((item) => {
          const isoTime = item.attributes.end_time;
          let localTime = new Date(isoTime);
          const itemDate = localTime.getDate();
          const itemMonth = localTime.getMonth();
          const itemYear = localTime.getFullYear();
          return date === itemDate && month === itemMonth && year === itemYear;
        });
        setItemsDisplayed(itemsFiltered);
      }
    }
  };

  const handleSearchMonth = (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth();
    if (items) {
      const itemsCopy = [...items];
      if (selected === 'By Start Date') {
        const itemsFiltered = itemsCopy.filter((item) => {
          const isoTime = item.attributes.start_time;
          let localTime = new Date(isoTime);
          const itemMonth = localTime.getMonth();
          const itemYear = localTime.getFullYear();
          return month === itemMonth && year === itemYear;
        });
        setItemsDisplayed(itemsFiltered);
      } else {
        const itemsFiltered = itemsCopy.filter((item) => {
          const isoTime = item.attributes.end_time;
          let localTime = new Date(isoTime);
          const itemMonth = localTime.getMonth();
          const itemYear = localTime.getFullYear();
          return month === itemMonth && year === itemYear;
        });
        setItemsDisplayed(itemsFiltered);
      }
    }
  };
  const handleSearchYear = (value: Date) => {
    const year = value.getFullYear();
    if (items) {
      const itemsCopy = [...items];
      if (selected === 'By Start Date') {
        const itemsFiltered = itemsCopy.filter((item) => {
          const isoTime = item.attributes.start_time;
          let localTime = new Date(isoTime);
          const itemYear = localTime.getFullYear();
          return year === itemYear;
        });
        setItemsDisplayed(itemsFiltered);
      } else {
        const itemsFiltered = itemsCopy.filter((item) => {
          const isoTime = item.attributes.end_time;
          let localTime = new Date(isoTime);
          const itemYear = localTime.getFullYear();
          return year === itemYear;
        });
        setItemsDisplayed(itemsFiltered);
      }
    }
  };

  return (
    <div>
      {isActiveSearchCalendar ? (
        <div id='search-calendar-container'>
          <div className='close-btn' onClick={handleClose}>
            Close
          </div>
          <Calendar
            onChange={(value) => setDate(value)}
            value={date}
            onClickDay={(value) => handleSearchDate(value)}
            onClickMonth={(value) => handleSearchMonth(value)}
            onClickYear={(value) => handleSearchYear(value)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchCalendar;
