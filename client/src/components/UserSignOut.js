import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';

//Call signOut function from Context and redirects user to main page
function UserSignOut(){
    const context = useContext(Context);
    useEffect(() => {
        context.actions.signOut();
    }, []);

    return (
        <Redirect to="/" />
    );
}

export default UserSignOut