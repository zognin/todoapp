import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../App.css';

const SearchCalendar = ({
  isActiveSearchCalendar,
  setIsActiveSearchCalendar,
  selected,
  setSelected,
  items,
  setItemsDisplayed,
}) => {
  const [date, setDate] = useState(new Date());

  const handleClose = (e) => {
    setIsActiveSearchCalendar(false);
  };

  const handleSearchDate = (value, e) => {
    const year = value.getFullYear();
    const month = value.getMonth();
    const date = value.getDate();
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
  };

  const handleSearchMonth = (value, e) => {
    const year = value.getFullYear();
    const month = value.getMonth();
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
  };
  const handleSearchYear = (value, e) => {
    const year = value.getFullYear();
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
  };

  return (
    <div>
      {isActiveSearchCalendar ? (
        <div id='search-calendar-container'>
          <div className='close-btn' onClick={handleClose}>
            Close
          </div>
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={(value, e) => handleSearchDate(value, e)}
            onClickMonth={(value, e) => handleSearchMonth(value, e)}
            onClickYear={(value, e) => handleSearchYear(value, e)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchCalendar;
