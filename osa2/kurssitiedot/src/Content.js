import React from 'react'
import Part from './Part'

const Content = (props) => {

    const parts = props.course.parts
    
    return (
      <ul>
        {parts.map(part => <Part key={part.id} content={part.name} exercises={part.exercises}/> )}
      </ul>  
    )
  }

  export default Content;