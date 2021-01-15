import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { productionBackendURL, productionFrontendURL } from '../Path';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSent(true);
    const payload = {
      email: email,
      redirect_url: `${productionFrontendURL}/reset-password`,
    };
    axios.post(`${productionBackendURL}/api/v1/auth/password`, null, {
      params: payload,
    });
  };

  return (
    <div className='user-auth'>
      {isSent && (
        <div
          className='alert alert-info alert-dismissible fade show'
          role='alert'
        >
          Email sent. Please check your email.
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setIsSent(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}
      <form onSubmit={handleReset}>
        <h1>Forgot Password</h1>
        <br />
        <p>
          Please enter your email. We will send you an email with instructions
          to reset your password.
        </p>
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
