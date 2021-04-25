import React, { useState } from 'react'
import Search from './components/Search'
import CountryData from './components/CountryData'

const App = () => {

  const [ searchValue, setSearch ] = useState('')

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)    
  }

  return (
    <div>
      <p>Search for a country</p>
      <Search 
        onChange = {handleSearchChange}
        value= {searchValue} />
      <CountryData search={searchValue}/>
    </div>
  );
}

export default App;