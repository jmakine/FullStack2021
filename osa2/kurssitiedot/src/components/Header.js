import React from 'react'

const Header = (props) => {

  const header=props.course.name

  return (
    <div>
      <p> {header} </p>
    </div>
  )
}

export default Header;