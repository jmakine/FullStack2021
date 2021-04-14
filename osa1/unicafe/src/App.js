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

const Statistics = (props) => {  
  if (props.all > 0) {
    return (
      <div>  
        <Display good={props.good} text='Good '/>
        <Display neutral={props.neutral} text='Neutral '/>
        <Display bad={props.bad} text='Bad '/>
        <Display all={props.all} text='All '/>
        <Display average={props.average} text='Average '/>
        <Display positive={props.positive} text='Positive '/>      
      </div>
    )
  } 
  return (
  <p>No feedback given</p>
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
      <Statistics
        good={good} 
        neutral={neutral}
        bad={bad} 
        all={all} 
        sum={sum}
        average={average(sum, all)} 
        positive={positive(good, all)}
      />
      </div>
  )
}      

export default App; 