import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td> 
        {props.good} 
        {props.neutral} 
        {props.bad} 
        {props.all} 
        {props.average} 
        {props.positive} 
      </td>
    </tr>
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
      <tbody>       
        <StatisticLine good={props.good} text='Good '/>
        <StatisticLine neutral={props.neutral} text='Neutral '/>
        <StatisticLine bad={props.bad} text='Bad '/>
        <StatisticLine all={props.all} text='All '/>
        <StatisticLine average={props.average} text='Average '/>
        <StatisticLine positive={props.positive} text='Positive '/>            
      </tbody>
    )
  } 
  return (
  <tbody>
    <tr><td>No feedback given</td></tr>
  </tbody>
  )
}

const App = () => {

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
      <table>
      <Statistics
        good={good} 
        neutral={neutral}
        bad={bad} 
        all={all} 
        sum={sum}
        average={average(sum, all)} 
        positive={positive(good, all)}/>
      </table>

      </div>
  )
}      

export default App; 