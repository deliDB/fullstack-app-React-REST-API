import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';

export default () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Courses} />
      </Switch>
    </div>
  </Router>
);

