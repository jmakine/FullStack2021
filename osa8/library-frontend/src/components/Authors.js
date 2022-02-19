import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'
import Select from 'react-select'

const Authors = ({show, token}) => {
  const authors = useQuery(ALL_AUTHORS)
  
  const [name, setName] = useState(null)
  const [yearString, setYear] = useState('')

  const [ editAuthor, result ] = useMutation(SET_BIRTHYEAR, {
    onError: (error) => console.log(error),
    update: (store, response) => {
      const storeData = store.readQuery({ query: ALL_AUTHORS })
      const editedData = response.data.editAuthor
      const updatedAuthors = storeData.allAuthors.map(author => author.name === editedData.name ? editedData : author)
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...storeData,
          allAuthors: updatedAuthors
        }
      })
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.error()
    }
  }, [result])

  if (!show || !authors.data) {
    return null
  }

  const setBirthYear = async (event) => {
    //event.preventDefault()

    if(!name || !yearString){
      return null
    }
    const year = Number(yearString)

    editAuthor({ variables: { name: name.value, setBornTo: year } })
    setName(null)
    setYear('')
  }

  const options = authors.data.allAuthors.map(a => a && {value: a.name, label: a.name})

  if (authors.loading) {
    return <div>Loading ... </div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {token &&
      <>
      <h2>Set birthyear</h2>
        <div>
          <form onSubmit={setBirthYear}>
          <div> Name
            <Select 
              defaultValue={name}
              onChange={setName}
              options={options}
            />
          </div>
          <div> Born
            <input
              type='number'
              value={yearString}
              onChange={({target}) => setYear(target.value)}
            />
          </div>
          <button type='submit'>Update author</button>
          </form>
        </div>
        </>
}

    </div>
  )
}

export default Authors