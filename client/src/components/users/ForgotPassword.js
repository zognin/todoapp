import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

  const handleReset = (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      redirect_url: 'http://localhost:3001/reset-password',
    };
    axios
      .post('http://localhost:3000/api/v1/auth/password', null, {
        params: payload,
      })
      .then((resp) => {})
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <br />
      <p>
        Please enter your email. We will send you an email with instructions to
        reset your password.
      </p>
      <form onSubmit={handleReset}>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <button type='submit' className='btn btn-primary'>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
