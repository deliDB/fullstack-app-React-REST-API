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

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses/:id' component={CourseDetail} />
        <Route exact path='/courses/create' component={CreateCourse} />
      </Switch>
    </div>
  </Router>
);

export default App
