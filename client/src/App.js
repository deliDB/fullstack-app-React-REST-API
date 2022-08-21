import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route path='/courses/create' component={CreateCourse} />
        <Route path='/courses/:id/update' component={UpdateCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
      </Switch>
    </div>
  </Router>
);

export default App
