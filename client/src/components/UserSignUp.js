import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

function UserSignUp() {
    const context = useContext(Context);
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {firstName, lastName, emailAddress, password};
        context.actions.createUser(newUser)
            .then(errors => {
                if(errors.length){
                    setErrors(errors) //Validation errors assigned to errors array. 
                } else {
                    //If account is successfully created, the user is automatically signed in
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            console.log('Account creation and sign in successful');
                            history.push('/');
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {errors.length ? 
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => {
                            return(
                                <li key={index}>{error}</li>
                            )
                        })}
                    </ul>
                </div>
                : null }
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        onChange={ e => setFirstName(e.target.value) }     
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName"  
                        name="lastName" 
                        type="text" 
                        onChange={ e => setLastName(e.target.value) }     

                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        onChange={ e => setEmailAddress(e.target.value) }     

                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        onChange={ e => setPassword(e.target.value) }     
                    />
                    <button className="button" type="submit">Sign Up</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignUp