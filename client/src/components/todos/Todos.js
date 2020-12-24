import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';

const Todos = () => {
  const [items, setItems] = useState([]);
  let headerData = JSON.parse(sessionStorage.userData);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todos`, {
        headers: headerData,
      })
      .then((res) => {
        const item = res.data.data;
        setItems(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <Search />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={{
                pathname: `/todo/${item.attributes.slug}`,
                state: { slug: item.attributes.slug },
              }}
            >
              {item.attributes.task}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
