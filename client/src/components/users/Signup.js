import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { productionBackendURL } from '../Path';

const Signup = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [valid, setValid] = useState({
    email: false,
    password: false,
    password_confirmation: false,
  });
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  useEffect(() => {
    if (
      pattern.test(user.email) &&
      user.password.length >= 12 &&
      user.password === user.password_confirmation
    ) {
      setValid({ email: true, password: true, password_confirmation: true });
    } else if (!pattern.test(user.email)) {
      setValid({ ...valid, email: false });
    } else if (user.password.length < 12) {
      setValid({ ...valid, email: true, password: false });
    } else {
      setValid({ email: true, password: true, password_confirmation: false });
    }
  }, [user.email, user.password, user.password_confirmation]);

  let history = useHistory();

  axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

  const handleSignup = (e) => {
    e.preventDefault();
    if (valid.email && valid.password && valid.password_confirmation) {
      setSubmitError(false);
      axios
        .post(`${productionBackendURL}/api/v1/auth`, user)
        .then((resp) => {
          setIsSuccessAlert(true);
          setTimeout(() => {
            setIsSuccessAlert(false);
            history.push('/login');
          }, 800);
        })
        .catch((err) => {
          if (err.response.status === 422) {
            setUserAlreadyExists(true);
          } else {
            setError(true);
          }
        });
    } else {
      setSubmitError(true);
    }
  };

  return (
    <div className='user-auth'>
      {isSuccessAlert && (
        <div className='alert alert-success'>
          Account Created! Redirecting to Login...
        </div>
      )}
      {userAlreadyExists && (
        <div
          className='alert alert-info alert-dismissible fade show'
          role='alert'
        >
          User already exists
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setUserAlreadyExists(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}
      {submitError && (
        <div
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          Please ensure all fields are filled in correctly before signing up
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setSubmitError(false)}
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
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
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
          {!valid.email && (
            <small id='passwordHelp' className='form-text text-muted'>
              Please enter a valid email
            </small>
          )}
        </div>
        <br />
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
          {!valid.password && (
            <small id='passwordHelp' className='form-text text-muted'>
              Your password should be at least 12 characters
            </small>
          )}
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='password_confirmation' className='form-label'>
            Password Confirmation
          </label>
          <input
            type='password'
            className='form-control'
            id='password_confirmation'
            name='password_confirmation'
            value={user.password_confirmation}
            onChange={handleChange}
          ></input>
          {!valid.password_confirmation && (
            <small id='passwordHelp' className='form-text text-muted'>
              Please ensure your passwords match
            </small>
          )}
        </div>
        <br />
        <button type='submit' className='btn btn-primary'>
          Sign up
        </button>
        <br />
        <Link to='/login'>Or log in if you have an account</Link>
      </form>
    </div>
  );
};

export default Signup;
