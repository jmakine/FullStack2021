import React, { useState } from 'react'

const Display = (props) => {
  return (
    <div>
      {props.text} 
      {props.good} 
      {props.neutral}
      {props.bad}
      {props.all}
      {props.average}
      {props.positive}
      </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)
  
  const increaseGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setSum(sum + 1)
  }

  const increaseNeutral = () => {    
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setSum(sum - 1)
  }

  const average = (sum, all) => {
    return sum/all
  }

  const positive = (good, all) => {
    return good/all*100 + ' %'
  }

  return (
    <div>
      <h1>Give Feedback</h1>      
      <Button 
        handleClick={increaseGood}
        text='good'
      />
      <Button 
        handleClick={increaseNeutral}
        text='neutral'
      />           
      <Button 
        handleClick={increaseBad}
        text='bad'
      />

      <h1>Statistics</h1>
      <Display good={good} text='Good '/>
      <Display neutral={neutral} text='Neutral '/>
      <Display bad={bad} text='Bad '/>
      <Display all={all} text='All '/>
      <Display average={average(sum, all)} text='Average '/>
      <Display positive={positive(good, all)} text='Positive '/>      
    </div>
  )
}      

export default App;