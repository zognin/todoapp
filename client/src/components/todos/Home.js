import React from 'react';
import Todos from './Todos';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <h1>Home Page after user logs in</h1>
      <Header />
      <Todos />
    </div>
  );
};

export default Home;
