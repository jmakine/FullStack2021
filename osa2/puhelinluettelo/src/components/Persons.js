import React from 'react'
import Person from './Person'

const Persons = (props) => {

const persons = props.persons
const search = props.search

return (
    <ul>
        {persons
        .filter(person => 
            (person.name).toUpperCase().includes(search.toUpperCase()) 
            || person.name==='') 
        .map(person => 
            <Person key={person.name} person={person}/>)
        }
    </ul>
)
}

export default Persons;