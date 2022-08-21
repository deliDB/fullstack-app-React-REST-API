import React from 'react';
import config from './config';

export const Context = React.createContext({});

export const Provider = ({ children }) => {
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

  const createCourse = async(course) => {
    const response = await api('/courses/create', 'POST', course);
    if (response.status === 201){
      return [];
    } else if (response.status === 400){
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }

  const updateCourse = async(course, id)=> {
    const response = await api(`/courses/${id}`, 'PUT', course);
    if(response.status === 204){
      return [];
    } else if (response.status === 400){
      return response.json().then(data => data.errors);
    } else {
      throw new Error();
    }
  }
  const value = {
    actions: {
      getCourses,
      getCourse,
      createCourse,
      updateCourse
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