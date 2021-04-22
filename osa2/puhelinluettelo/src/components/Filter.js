import React from 'react'

const Filter = (props) => {

return (
    <div>
        <input           
          onChange={props.onChange} 
          value={props.value}
          placeholder="Search by name" />
    </div>
)}

export default Filter;