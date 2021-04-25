import React from 'react'

const Search = (props) => {

return (
    <div>
        <input           
          onChange={props.onChange} 
          value={props.value}
          placeholder="search ..." />
    </div>
)}

export default Search;