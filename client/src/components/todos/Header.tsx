import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { productionBackendURL } from '../Path';

const Header = () => {
  let history = useHistory();
  let headerData = JSON.parse(sessionStorage.userData);

  const handleSignout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios
      .delete(`${productionBackendURL}/api/v1/auth/sign_out`, {
        headers: headerData,
      })
      .then((resp) => {
        sessionStorage.removeItem('userData');
        history.push(`/login`);
      });
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <Link to='/home' className='navbar-title'>
            My To Do List
          </Link>
          <div className='navbar-links-container'>
            <Link to='/todo/new' aria-current='page'>
              <div className='navbar-link'>New Task</div>
            </Link>

            <Link to='#' aria-current='page' onClick={handleSignout}>
              <div className='navbar-link'>Sign Out</div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
