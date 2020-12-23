import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

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
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <Link to='#'>My To Dos</Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to='#' className='nav-link active' aria-current='page'>
                  Edit Profile
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
