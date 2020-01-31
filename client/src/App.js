import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import authToken from './token/authToken';
import Navbar from './components/nav/Navbar';
import Home from './components/Profile';
import AuthState from './state/auth/AuthState';
import EntryState from './state/entry/EntryState';
import CreateEntry from './components/entries/CreateEntry';
import EntryComplete from './components/entries/EntryComplete';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import PrivateRoute from './components/protected/PrivateRoute';
import All from './components/Home';

if (localStorage.token) {
  authToken(localStorage.token);
};

function App() {
  return (
    <AuthState>
      <EntryState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={All} />
              <PrivateRoute exact path="/create" component={CreateEntry} />
              <PrivateRoute exact path="/user" component={Home} />
              <PrivateRoute exact path="/submitted" component={EntryComplete} />
              <Route exact path="/register" component={Registration} />
              <Route exact path="/login" component={Login} />
            </Switch>
            </div>
          </Fragment>
        </Router>
      </EntryState>
    </AuthState>
  );
}

export default App;
