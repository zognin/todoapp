import React, { useState, useEffect } from 'react';
import Todos from './Todos';
import Header from './Header';
import CalendarView from './CalendarView';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [itemsDisplayed, setItemsDisplayed] = useState([]);
  let headerData = JSON.parse(sessionStorage.userData);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todos`, {
        headers: headerData,
      })
      .then((res) => {
        const item = res.data.data;
        setItems(item);
        setItemsDisplayed(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  return (
    <div>
      <Header />
      <div className='view'>
        <CalendarView items={items} />
        <Todos
          items={items}
          setItems={setItems}
          itemsDisplayed={itemsDisplayed}
          setItemsDisplayed={setItemsDisplayed}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      </div>
    </div>
  );
};

export default Home;
