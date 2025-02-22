import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
  const { competitionName } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/competitions/${competitionName}/courses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error);
      });
  }, [competitionName]);

  return (
    <div>
      <h2>Courses for {competitionName}</h2>
      <ul>
        {courses.map(course => (
          <li key={course.name}>
            <Link to={`/competitions/${competitionName}/courses/${course.name}/participants`}>
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
