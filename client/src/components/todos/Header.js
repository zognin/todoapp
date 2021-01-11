import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Header = () => {
  let history = useHistory();
  let headerData = JSON.parse(sessionStorage.userData);

  const handleSignout = (e) => {
    e.preventDefault();
    axios
      .delete(
        'https://zognin-todoapp-rails.herokuapp.com/api/v1/auth/sign_out',
        {
          headers: headerData,
        }
      )
      .then((resp) => {
        sessionStorage.removeItem('userData');
        history.push(`/login`);
      })
      .catch((err) => {
        console.log(err.response);
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
