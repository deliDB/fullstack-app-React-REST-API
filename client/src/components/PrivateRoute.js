import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

/**
 * high order component to configure protected routes (routes requiring authentication)
 * User is redirected to sign in screen if there's an attempt to access a private route.
 */

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};

export default PrivateRoute

/**
 * Source: https://teamtreehouse.com/library/react-authentication/react-router-and-authentication/protect-routes-that-require-authentication
 */