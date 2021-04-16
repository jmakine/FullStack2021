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
  const [votes, addVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})

  const randomize = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber)
  }

  const votesCopy = {...votes}
  
  const vote = () => {  
    votesCopy[selected] += 1
    addVote(votesCopy)
  }

  return (
    <div>
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
    </div>
  )
}

export default App