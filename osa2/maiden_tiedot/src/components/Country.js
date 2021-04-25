import React from 'react'

const Country = (props) => {

    const country = props.country

    return (
        <li key={country.key}>{country.name}</li>
    )
}

export default Country;