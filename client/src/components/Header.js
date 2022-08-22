import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function Header() {
    const context = useContext(Context);
    const authenticatedUser = context.authenticatedUser;
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {
                        //If an authenticated user is signed in, show user name and sign out button
                        authenticatedUser ? 
                        <ul className="header--signedin">
                            <li>Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}!</li>
                            <li><Link to="/signout">Sign Out</Link></li>
                        </ul> :
                        <ul className="header--signedout">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header