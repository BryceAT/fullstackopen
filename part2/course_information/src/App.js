import React from 'react';
import './App.css';

const reducer = (tot, cur) => {
  return (tot + cur.exercises)
}

const Course = (props) => {
  return (
    <div >
      <h1>{props.course.name}</h1>
      {props.course.parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
      <h3>total of {props.course.parts.reduce(reducer, 0)} exercises</h3>
    </div>
    
  )
}
const Courses = (props) => {
  return (
    <div>
    {props.courses.map(course => <div key={course.id}> <Course course={course} /></div>)}
    </div>
  )
}
const App = ({courses}) => {
  return <Courses courses={courses} />
}

export default App;
