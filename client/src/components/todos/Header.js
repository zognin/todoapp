import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Header = () => {
  let history = useHistory();
  let headerData = JSON.parse(sessionStorage.userData);

  const handleSignout = (e) => {
    e.preventDefault();
    console.log(headerData);
    axios
      .delete('http://localhost:3000/api/v1/auth/sign_out', {
        headers: headerData,
      })
      .then((resp) => {
        console.log(resp);
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
          <div>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link
                  to='/todo/new'
                  className='nav-link active'
                  aria-current='page'
                >
                  New Task
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='#'
                  className='nav-link active'
                  aria-current='page'
                  onClick={handleSignout}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
