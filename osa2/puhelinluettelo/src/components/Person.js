import React from 'react'
import personsService from '../services/personsService';

const Person = (props) => {

const person = props.person

return (
    <li>
        {person.name} {person.number}
        <button onClick={() => personsService.deleteObj(person.id)}>delete</button>  
    </li>    
    )
}

export default Person;
