import React from 'react';
import '../components/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './users/Login';
import Signup from './users/Signup';
import Home from './todos/Home';
import ForgotPassword from './users/ForgotPassword';
import ResetPassword from './users/ResetPassword';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
