import React from 'react'

const Header = (props) => {

  const header=props.course.name

  return (
    <div>
      <p> {header} </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.content} {props.exercises} </p>
    </div>
  )
}

const Content = (props) => {

  const name1 = props.course.parts[0].name
  const name2 = props.course.parts[1].name
  const name3 = props.course.parts[2].name

  const exercises1 = props.course.parts[0].exercises
  const exercises2 = props.course.parts[1].exercises
  const exercises3 = props.course.parts[2].exercises

  return (
    <div>
      <p> <Part content={name1} exercises={exercises1}/> </p>
      <p> <Part content={name2} exercises={exercises2}/> </p>
      <p> <Part content={name3} exercises={exercises3}/> </p>
    </div>
  )
}

const Total = (props) => {

  const exercises1 = props.course.parts[0].exercises
  const exercises2 = props.course.parts[1].exercises
  const exercises3 = props.course.parts[2].exercises

  return (
    <div>
      <p> Number of exercises {exercises1+exercises2+exercises3} </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10 
      },
      {
        name: 'Using props to pass data',
        exercises: 7 
      },
      {
        name: 'State of a component',
        exercises: 14 
      }
    ]
  }

  return (
    <div>
      <Header course={course} /> 
      <Content course={course}/> 
      <Total course={course} />
    </div>
  )
}

export default App;
