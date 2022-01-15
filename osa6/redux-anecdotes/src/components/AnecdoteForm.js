import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = ({ setNotification, createAnecdote } ) => {
    
    const addAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value =''
        createAnecdote(content)
        setNotification(`Added: ${content}`, 5)
    }

    return (
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(
    null,
    mapDispatchToProps)(NewAnecdote)
