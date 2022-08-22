import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';

function CourseDetail() {
    const [ course, setCourse ] = useState([]);
    const context = useContext(Context);
    const authenticatedUser = context.authenticatedUser;
    const authenticatedPassword = context.authenticatedPassword;

    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        context.actions.getCourse(id)
            .then(res => setCourse(res))
            .catch(error => console.log('Error fetching and parsing data', error))
    }, [])

    const handleDelete = async (e) => {
        const emailAddress = authenticatedUser.email;
        const password = authenticatedPassword;
        context.actions.deleteCourse(id, emailAddress, password)
            .then(() => history.push('/'))
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <button className="button" onClick={handleDelete}>Delete Course</button>
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
                            <p>By {course.firstName} {course.lastName}</p>
                            <p>{ course.description }</p>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{ course.estimatedTime }</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                { course.materialsNeeded }
                            </ul>
                        </div>                
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail