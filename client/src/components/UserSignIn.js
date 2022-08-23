import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

function UserSignIn (){

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const context = useContext(Context);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //If there's no user with the email address entered in the database, sign in fails, otherwise there's a redirect to the main page.
        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if(user === null){
                    console.log('Sign In unsuccessful.');
                    setErrors(errors)
                } else {
                    history.push('/');
                    console.log(`Sign In was successful! Welcome ${emailAddress}!`);
                }
            })
            .catch( err => {
                console.log(err);
              });
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                         id="emailAddress" 
                         name="emailAddress" 
                         type="email" 
                         value={emailAddress}
                         onChange={ e => setEmailAddress(e.target.value) }
                         placeholder="Email Address"
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={password} 
                        onChange={ e => setPassword(e.target.value) }
                        placeholder="Password"
                    />
                    <button className="button" type="submit">Sign In</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    )
 }
 export default UserSignIn
