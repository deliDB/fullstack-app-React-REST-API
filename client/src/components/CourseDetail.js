import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail() {
    const [ data, setData ] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios(`http://localhost:5000/api/courses/${id}`)
            .then(response => setData(response.data))
            .catch(error => console.log('Error fetching and parsing data', error))
    }, [])
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to="update-course.html">Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{ data.title }</h4>
                            <p>By {data.firstName} {data.lastName}</p>
                            <p>{ data.description }</p>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{ data.estimatedTime }</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                { data.materialsNeeded }
                            </ul>
                        </div>                
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail