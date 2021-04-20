import React from 'react'

const Person = (props) => {

const person = props.person

return (
    <li>
        {person.name}
    </li>
    )
}

export default Person;