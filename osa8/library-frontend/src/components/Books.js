import React, { useState } from 'react'

const Books = ({show, books}) => {

  const [selectedGenre, setGenre] = useState('all')
  if (!show || !books.data) {
    return null
  }

  if(books.loading) {
    return <div>Loading ...</div>
  }

  const allBooks = books.data.allBooks.filter( book => {
    if(selectedGenre !== 'all') {
      return book.genres.includes(selectedGenre)
    } 
    return book
  })

  const allGenres = books.data.allBooks.map(book => book.genres).flat(1)
  const uniqueGenres = [...new Set(allGenres)]

  console.log(allGenres)
  console.log(uniqueGenres)

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{selectedGenre}</strong> </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {allBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre, index) => {
          return <button key={genre + index} onClick={() => setGenre(genre)}>{genre}</button>
        })}
        <button onClick={() => setGenre('all')}>all</button>
      </div>
    </div>
  )
}

export default Books