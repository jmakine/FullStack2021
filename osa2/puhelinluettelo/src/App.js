import React, { useState } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Persons from './components/Persons'

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
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter 
        onChange={handleSearchChange} 
        value={searchValue} />

      <h2>Add a new</h2>
      <Add 
        onSubmit={addNewName}
        valueName={newName}
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange}
        />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        search={searchValue}
      />   
    </div>
  )
}

export default App;