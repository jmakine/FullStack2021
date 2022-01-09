import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addedNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value =''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote.content))
        dispatch(addedNotification(content))
        setTimeout(() => dispatch(hideNotification(content)), 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
}

export default NewAnecdote
