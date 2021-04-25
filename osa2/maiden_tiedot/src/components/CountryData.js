import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './Country'
import OneCountry from './OneCountry'

const CountryData= (props) => {

const search = props.search
const [ countries, setCountries] = useState([])  

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(filtered(response.data)) 
      })      
  }, [search])

  function filtered(arr) {
    return (
      arr.filter(
        country => (country.name)
                    .toUpperCase()
                    .startsWith(search.toUpperCase()) 
                    || country.name==='')
    )
  }

  function matchesMoreThan(n) {
    return(
      countries.length > n)
  }

  function matchesExactly(n) {
    return (
      countries.length === n)
  }

  if (matchesMoreThan(10)) {
    return ( <p>Too many matches, specify search</p> )
  
  } else if (matchesExactly(1)) {
    return (  
      <OneCountry key={countries[0].objectID} country={countries[0]}/>
      )
    
  } else { 
    return (
      <div>
        <h2>Countries:</h2>
        <ul>
          {countries
          .filter(country => 
              (country.name).toUpperCase().startsWith(search.toUpperCase()) 
              || country.name==='') 
          .map(country => 
              <Country key={country.objectID} country={country}/>)
          }
      </ul>
    </div>
    )}
}

export default CountryData;