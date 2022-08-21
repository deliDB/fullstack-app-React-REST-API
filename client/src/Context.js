import React from 'react';
import config from './config';

export const Context = React.createContext({});

export const Provider = ({ children }) => {
  function api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
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
          return response.json().then((data) => data);
        } else if (response.status === 401){
          return null;
        } else {
          throw new Error();
        }
  }  
    return (
        <Context.Provider value={{
          actions: {
            getCourses
          }
        }}>
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