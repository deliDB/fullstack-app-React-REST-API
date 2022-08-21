import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import api from '../api/config';
import axios from 'axios';

function CreateCourse ({ courses, setCourses }){
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        addCourse();
    }

    const addCourse = async () => {
        try {
            const newCourse = {courseTitle, courseDescription, estimatedTime, materialsNeeded};
            const response = await axios.post('/http://localhost:5000/api/courses/create', newCourse, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            setCourses([response.data, ...courses]);
            setCourseTitle('');
            setCourseDescription('');
            setEstimatedTime('');
            setMaterialsNeeded('');
            history.push('/');
        } catch (errors) {
            setErrors(errors);
        }
    };
    return (
        <main>
            <div class="wrap">
                <h2>Create Course</h2>
                {errors.length ? 
                <div class="validation--errors">
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
                    <div class="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={courseTitle} 
                                onChange={ e => setCourseTitle(e.target.value)}
                            />

                            <p>By Joe Smith</p>

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