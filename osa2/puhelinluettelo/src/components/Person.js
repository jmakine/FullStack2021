import React from 'react'

const Person = (props) => {

const person = props.person

return (
    <li>
        {person.name} {person.number}
    </li>
    )
}

export default Person;