import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import '../App.css';

const Todos = () => {
  const [items, setItems] = useState([]);
  const [itemsDisplayed, setItemsDisplayed] = useState([]);
  let headerData = JSON.parse(sessionStorage.userData);

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
  }, []);

  return (
    <div>
      <Search
        items={items}
        itemsDisplayed={itemsDisplayed}
        setItemsDisplayed={setItemsDisplayed}
      />
      <div className='todolist'>
        <div className='todolist-container'>
          {itemsDisplayed.map((item) => (
            <div key={item.id} className='todolist-items'>
              <Link
                to={{
                  pathname: `/todo/${item.attributes.slug}`,
                  state: { slug: item.attributes.slug },
                }}
                className='todolist-items-link'
              >
                {item.attributes.task}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
