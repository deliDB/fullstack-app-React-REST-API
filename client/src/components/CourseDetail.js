import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import ReactMarkdown from 'react-markdown';

function CourseDetail() {
    const [ course, setCourse ] = useState([]);
    //Authenticated user returns object holding id, email, firstName, lastName 
    const { actions, authenticatedUser, authenticatedPassword }  = useContext(Context);
    
    const { id } = useParams();
    const history = useHistory();

    //Sets response to course variable which holds id, description, etc. 
    useEffect(() => {
        actions.getCourse(id)
            .then(res => setCourse(res))
            .catch(error => console.log('Error fetching and parsing data', error))
    }, [])

    const handleDelete = async (e) => {
        const emailAddress = authenticatedUser.email;
        const password = authenticatedPassword;
        actions.deleteCourse(id, emailAddress, password)
            .then(() => history.push('/'))
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {
                        authenticatedUser && authenticatedUser.id === course.userId ?
                        <>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <button className="button" onClick={handleDelete}>Delete Course</button>
                        </> : <></>
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>

                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{ course.title }</h4>
                            <p>By {course.user?.firstName} {course.user?.lastName}</p> 
                            <ReactMarkdown>{ course.description }</ReactMarkdown>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{ course.estimatedTime }</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{ course.materialsNeeded }</ReactMarkdown>
                            </ul>
                        </div>                
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail