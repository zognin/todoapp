import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './users/Login';
import Signup from './users/Signup';
import Home from './todos/Home';
import ForgotPassword from './users/ForgotPassword';
import ResetPassword from './users/ResetPassword';
import TodoCreate from './todos/TodoCreate';
import TodoEdit from './todos/TodoEdit';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/todo/new' component={TodoCreate} />
        <Route exact path='/todo/edit/:id' component={TodoEdit} />
      </Switch>
    </Router>
  );
}

export default App;
