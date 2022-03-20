import React from "react";

const Header =(props) => {
    return (
        <div>
            <h2>{props.course.name}</h2>
        </div>
    )
}

const Content = (props) => {
    const parts= props.course.parts.map((part,index)=>
        (<p key={index}><b>{part.name}</b> - {part.exercises} exercises</p>));

    return(
        <div>
            {parts}
        </div>
    )
}
const Total =(props) => {
    const total= props.course.parts.reduce((totals, currentValue) =>
        totals + currentValue.exercises, 0);
    return(
        <div>
            <p><b>Number of exercises</b> - {total}</p>
        </div>
    )
}




const Course = (props)=> {
    return(
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />

        </div>
    )
}
export default Course
