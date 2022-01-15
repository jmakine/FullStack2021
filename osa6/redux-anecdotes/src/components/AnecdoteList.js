import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, voteAnecdote }) => {
  return(
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => voteAnecdote(anecdote)} >vote</button>
    </div>
  </div>
  )
}

const Anecdotes = ({ vote, setNotification, anecdotes }) => {
  
  const voteAnecdote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`You voted for: ${anecdote.content}`, 5)
  }

  

  return(    
    <ul>
      {anecdotes
      .sort((x, y) => y.votes - x.votes)
      .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          voteAnecdote={voteAnecdote}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  if (!state.filter) 
    return {
      anecdotes: state.anecdotes
    }
  else return {
    anecdotes: 
      state.anecdotes.filter((x) => 
        x.content.toLowerCase().includes(state.filter.toLowerCase())),
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Anecdotes)