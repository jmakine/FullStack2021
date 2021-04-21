import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearch ] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }

    if(persons.filter(e => e.name===newName).length === 0){
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)}
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    console.log('event.target.value ', event.target.value)
    
    const filtered = persons
        .filter(person => 
          person.name.includes(event.target.value) 
          || (event.target.value)==='')
          console.log('filtered after searchChange ' ,filtered)
    return filtered
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        <input           
          onChange={handleSearchChange} 
          value={searchValue}
          placeholder="Search by name" />
      </div>

      <form onSubmit={addNewName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>     
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange}/>
          </div>   
          <button type="submit">add</button>
      </form>        
      
      <h2>Numbers</h2>
      <ul>
        {persons
        .filter(person => 
          (person.name).toUpperCase().includes(searchValue.toUpperCase()) 
          || person.name==='') 
        .map(person => 
          <Person key={person.name} person={person}/>)
        }
      </ul>
    </div>
  )

}

export default App;