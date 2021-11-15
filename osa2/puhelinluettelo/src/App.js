import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Persons from './components/Persons'
import personsService from './services/personsService'
import Notification from './components/Notification'

const App = () => {
  
  const [ persons, setPersons] = useState([])  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearch ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ style, setStyle ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }

    if(persons.filter(e => e.name===newName).length > 0){
      setNotification(`Name ${newName} is already added to phonebook`);
      setStyle('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewName('')
      setNewNumber('')}
    else if(persons.filter(e => e.number===newNumber).length > 0){
      setNotification(`Number ${newNumber} is already added to phonebook`);
      setStyle('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewName('')
      setNewNumber('')}  
    else if (newNumber === "" || newNumber === "") {
      setNotification(`Missing info`);
      setStyle('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewName('')
      setNewNumber('')} 
    else {  
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${newName}`)
          setStyle('success')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
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
      <Notification message={notification} style={style}/>

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