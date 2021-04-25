import React from 'react'

const OneCountry = (props) => {

    const country = props.country
    
    return (
        <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages:</h2>
        <ul>
            {country.languages
            .map(language =>
            <li key={country.languages.name}>{language.name}</li>
            )}
        </ul>
        <img src={country.flag} alt='' height='200' width='380'></img>
        </div>
    )
}

export default OneCountry;