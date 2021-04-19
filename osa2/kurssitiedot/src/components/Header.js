import React from 'react'

const Header = (props) => {

  const header=props.course.name

  return (
    <div>
      <h2> {header} </h2>
    </div>
  )
}

export default Header;