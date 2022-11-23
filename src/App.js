import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/loginform';
import './App.css';
import RegisterForm from './components/registerform';
import TaskList from './components/tasklist';
import TaskDetail from './components/taskdetail';
import React from 'react';
import ProtectedRoute from './common/protectedroute';


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={RegisterForm} />
        <ProtectedRoute path='/:title' component={TaskDetail} />
        <ProtectedRoute path='/' component={TaskList} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
