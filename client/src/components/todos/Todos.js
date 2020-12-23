import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.attributes.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
