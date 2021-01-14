import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../App.css';
import { productionBackendURL } from '../Path';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [userDoesNotExist, setUserDoesNotExist] = useState(false);
  const [error, setError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

  let history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    axios
      .post(`${productionBackendURL}/api/v1/auth/sign_in`, user)
      .then((resp) => {
        const accessTokenResp = resp.headers['access-token'];
        const clientResp = resp.headers.client;
        const uidResp = resp.data.data.uid;
        const userData = JSON.stringify({
          'access-token': accessTokenResp,
          client: clientResp,
          uid: uidResp,
        });

        if (uidResp) {
          sessionStorage.setItem('userData', userData);
          history.push(`/home`);
        }
      })
      .catch((err) => {
        setIsLoggingIn(false);
        if (err.response.status === 401) {
          setUserDoesNotExist(true);
        } else {
          setError(true);
        }
      });
  };

  return (
    <div className='user-auth'>
      {userDoesNotExist && (
        <div
          className='alert alert-info alert-dismissible fade show'
          role='alert'
        >
          User does not exist, please create an account!
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setUserDoesNotExist(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}
      {error && (
        <div
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          There is an error, please try again later.
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setError(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div>
          <h1>To Do App</h1>
        </div>
        <br />
        <h3>Login</h3>
        <br />
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={user.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={user.password}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        {isLoggingIn ? (
          <button type='submit' className='btn btn-secondary'>
            Logging In...
          </button>
        ) : (
          <button type='submit' className='btn btn-primary'>
            Log In
          </button>
        )}
        <br />
        <Link to='/signup'>Create Account</Link>
        <br />
        <Link to='/forgot-password'>Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Login;
