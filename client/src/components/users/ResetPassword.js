import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
  const [user, setUser] = useState({
    password: '',
    password_confirmation: '',
  });

  const [valid, setValid] = useState({
    password: false,
    password_confirmation: false,
  });
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const url = window.location.href;
    const queryStringIndex = url.indexOf('?');
    const queryString = url.substring(queryStringIndex + 1);
    const queryStringParts = queryString.split('&');
    var parameters = {};
    queryStringParts.forEach((part) => {
      var equalsIndex = part.indexOf('=');
      var key, value;
      key = part.substring(0, equalsIndex);
      value = part.substring(equalsIndex + 1);
      key = decodeURIComponent(key);
      value = decodeURIComponent(value);
      parameters[key] = value;
    });
    setHeaderData({
      'access-token': parameters['access-token'],
      client: parameters.client,
      uid: parameters.uid,
    });
  }, []);

  useEffect(() => {
    if (
      user.password.length >= 12 &&
      user.password === user.password_confirmation
    ) {
      setValid({ password: true, password_confirmation: true });
    } else if (user.password.length < 12) {
      setValid({ ...valid, email: true, password: false });
    } else {
      setValid({ email: true, password: true, password_confirmation: false });
    }
  }, [user.email, user.password, user.password_confirmation]);

  let history = useHistory();

  axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

  const handleReset = (e) => {
    e.preventDefault();
    if (valid.password && valid.password_confirmation) {
      setSubmitError(false);
      axios
        .put('http://localhost:3000/api/v1/auth/password', null, {
          params: user,
          headers: headerData,
        })
        .then((resp) => {
          history.push(`/login`);
        })
        .catch((err) => {
          console.log(err.response);
          setError(true);
        });
    } else {
      setSubmitError(true);
    }
  };

  return (
    <div>
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
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
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
        <button type='submit' className='btn btn-primary'>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
