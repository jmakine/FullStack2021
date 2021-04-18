import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, addVote] = useState(new Array(7).join('0').split('').map(parseFloat))
  
  const randomize = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber)
  }

  //for some reason, this returns 0 (?)
  const indexOfMax = () => {    
    let max = 0;
    let maxIndex = 0;    
    for (let i = 1; i < votes.length; i++) {
        if (votes[i] > max) {
            max = votes[i];
            maxIndex = i;
        }        
    }    
    return maxIndex;
  }
  
  const vote = () => {  
    const votesCopy = {...votes}
    votesCopy[selected] += 1
    addVote(votesCopy)  
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>Has {votes[selected]} votes</p>
    <Button 
        handleClick={vote}
        text='Vote'
    />
    <Button 
        handleClick={randomize}
        text='Next anecdote'
    />
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[indexOfMax()]}</p> 
    <p>Has {votes[indexOfMax()]} votes</p>
    </div>
  )
}

export default App