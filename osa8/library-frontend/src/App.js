import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const App = () => {
  
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    !token && setToken(localStorage.getItem('jwtToken'))
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token
          ? <button onClick={() => setPage('login')}>login</button>
          : <span>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => logout()}>logout</button>
            </span>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App