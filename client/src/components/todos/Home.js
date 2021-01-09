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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  return (
    <div>
      <Header />
      <div className='view'>
        <Todos
          items={items}
          setItems={setItems}
          itemsDisplayed={itemsDisplayed}
          setItemsDisplayed={setItemsDisplayed}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
        <CalendarView items={items} />
      </div>
    </div>
  );
};

export default Home;
