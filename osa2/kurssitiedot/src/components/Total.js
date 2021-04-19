import React from 'react'

const Total = (props) => {

const parts = props.course.parts

    return (
        <p>
            <strong>               
            Total of {parts
                .map( v => v.exercises )
                .reduce( (sum, currentValue) => 
                sum + currentValue, 0)}
            &nbsp;exercises
            </strong>
        </p> 
    )
}

export default Total;