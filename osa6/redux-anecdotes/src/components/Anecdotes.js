import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
//import { votedNotification, hideNotification } from '../reducers/notificationReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick} >vote</button>
    </div>
  </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filterState = useSelector(state => state.filter)
  
  return(
    <ul>
      {anecdotes
      .filter((x) =>
        x.content.toLowerCase().includes(filterState.toLowerCase()))
      .sort((x, y) => y.votes - x.votes)
      .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote.id)) 
            dispatch(setNotification(`You voted for: ${anecdote.content}`, 5))
            }
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes