import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

const App = () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path='/' component={Courses} />
        <Route path='/courses/create' component={CreateCourse} />
        <Route path='/courses/:id/update' component={UpdateCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/signout' component={UserSignOut} />
      </Switch>
    </div>
  </Router>
);

export default App
