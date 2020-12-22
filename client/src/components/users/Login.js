import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //   const csrfToken = document.querySelector('[name=csrfToken]').content;
  //   axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
  //   axios.defaults.withCredentials = true;

  let history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/v1/auth/sign_in', user)
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
        console.log(err);
      });
  };

  return (
    <section>
      <form onSubmit={handleLogin}>
        <div className='mb3'>
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
        <div className='mb3'>
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
        <button type='submit' className='btn btn-primary'>
          Log In
        </button>
      </form>
    </section>
  );
};

export default Login;
