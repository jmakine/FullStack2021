import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = (props) => {

    const course = props.course
    
    return (
        <div>
          <Header course={course} /> 
          <Content course={course}/> 
          
        </div>
      )
}

export default Course;
