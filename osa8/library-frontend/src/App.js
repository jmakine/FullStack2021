import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Recommend from './components/Recommend'

const App = () => {
  
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(item => item.id).includes(object.id)
    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    if(!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert(`Added book! Title: ${addedBook.title}, Author: ${addedBook.author.name}`)
      updateCacheWith(addedBook)
    }
  })

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
              <button onClick={() => setPage('recommend')}>recommend</button>
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
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommend
        show={page === 'recommend'}
        books={books}
      />

    </div>
  )
}

export default App