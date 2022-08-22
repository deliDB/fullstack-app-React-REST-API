import React, { useState } from 'react';
import config from './config';

export const Context = React.createContext({});

export const Provider = ({ children }) => {

  const [authenticatedUser, setAuthenticatedUser] = useState('');
  const [authenticatedPassword, setAuthenticatedPassword] = useState('');

  function api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseURL + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  };

  /******************** Users ********************/

  const getUser = async(username, password) => {
    const response = await api('/users', 'GET', null, true, { username, password });
    if(response.status === 200){
      return response.json().then(data => data);
    } else if (response.status === 401){
      return null;
    } else {
      throw new Error();
    }
  }

  const createUser = async(user) => {
    const response = await api('/users', 'POST', user)
    if (response.status === 201){
      return [];
    } else if (response.status === 400){
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }

  const signIn = async(username, password) => {
    const user = await getUser(username, password);
    if(user!== null){
      console.log(user);
      setAuthenticatedUser(user)
      setAuthenticatedPassword(password);
    }
      return user;
  }

  const signOut = async() => {
    setAuthenticatedUser(null);
    setAuthenticatedPassword('');
  }


  /******************** Courses ********************/

  const getCourses = async () => {
    const response = await api('/courses');
      if(response.status === 200){
          return response.json().then(data => data);
        } else {
          throw new Error();
        }
  }  

  const getCourse = async (id) => {
    const response = await api(`/courses/${id}`);
      if(response.status === 200){
          return response.json().then((data) => data);
        } else if (response.status === 404){
          return null
        } else {
          throw new Error();
        }
  }

  const createCourse = async(course, username, password) => {
    const response = await api('/courses', 'POST', course, true, {username, password});
    if (response.status === 201){
      return [];
    } else if (response.status === 400){
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }

  const updateCourse = async(course, id, username, password)=> {
    const response = await api(`/courses/${id}`, 'PUT', course, true, {username, password});
    if(response.status === 204){
      return [];
    } else if (response.status === 400){
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }

  const deleteCourse = async(id, username, password) => {
    const response = await api(`/courses/${id}`, 'DELETE', null, true, {username, password})
    if(response.status === 204){
      console.log('Course successfully deleted');
    } else if (response.status === 403){
      console.log("You don't have permission to delete this course.")
    } else { 
      throw new Error();
    }
  }

  const value = {
    authenticatedUser,
    authenticatedPassword,
    actions: {
      getCourses,
      getCourse,
      createCourse,
      updateCourse,
      deleteCourse,
      getUser,
      createUser,
      signIn,
      signOut
    }
  }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>    
    )
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
/**
 * Sources: 
 * https://howtojs.io/how-to-use-fetch-api-with-async-await-try-catch-then-catch-in-useeffect-hook-in-react-application/
 * https://teamtreehouse.com/library/practice-hooks-in-react
 * https://www.youtube.com/watch?v=ngVvDegsAW8
 * 
 */