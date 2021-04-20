import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [ newName, setNewName ] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName 
    }
    if(persons.filter(e => e.name===newName).length === 0){
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)}
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNewName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>        
          <button type="submit">add</button>
      </form>
        
      
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person}/>
         )}
      </ul>
    </div>
  )

}

export default App;