import React, { useState, useEffect } from 'react';
import Todos from './Todos';
import Header from './Header';
import CalendarView from './CalendarView';
import axios from 'axios';
import '../App.css';
import { productionBackendURL } from '../Path';

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

const Home = () => {
  const [items, setItems] = useState<undefined | Todo[]>([]);
  const [itemsDisplayed, setItemsDisplayed] = useState<undefined | Todo[]>([]);
  let headerData = JSON.parse(sessionStorage.userData);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`${productionBackendURL}/api/v1/todos`, {
        headers: headerData,
      })
      .then((res) => {
        const item = res.data.data;
        setItems(item);
        setItemsDisplayed(item);
      });
  }, [isUpdate]);

  return (
    <div>
      <Header />
      <div className='view'>
        <CalendarView items={items} />
        <Todos
          items={items}
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
