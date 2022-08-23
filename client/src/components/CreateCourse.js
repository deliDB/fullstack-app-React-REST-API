import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

function CreateCourse() {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]); 
    
    const history = useHistory();
    const { actions, authenticatedUser, authenticatedPassword } = useContext(Context);
    
    const handleSubmit = async (e) => {
        //userId identifies who created the course, which is used to identify if they're authorized to edit/delete the course
        const newCourse = {userId: authenticatedUser.id, title: courseTitle, description: courseDescription, estimatedTime, materialsNeeded};
        const emailAddress = authenticatedUser.email;
        const password = authenticatedPassword;

        e.preventDefault();
        actions.createCourse(newCourse, emailAddress, password)
            .then(errors => errors.length ? setErrors(errors) : history.push('/')) //Any validation errors returned, placed in errors array
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {errors.length ? 
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => {
                            return(
                                <li key={index}>{error}</li> //Map over any validation errors
                            )
                        })}
                    </ul>
                </div>
                : null }
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={courseTitle} 
                                onChange={ e => setCourseTitle(e.target.value)}
                            />

                            <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                                id="courseDescription" 
                                name="courseDescription" 
                                value={courseDescription} 
                                onChange={ e => setCourseDescription(e.target.value)}>  
                            </textarea> 
                            
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={estimatedTime}
                                onChange={ e => setEstimatedTime(e.target.value)} 
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded" 
                                value={materialsNeeded}
                                onChange={ e => setMaterialsNeeded(e.target.value)}>      
                            </textarea>    
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
            </div>
        </main>
    );
}
export default CreateCourse