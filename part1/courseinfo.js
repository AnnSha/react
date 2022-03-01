import React from "react";
const Header =(props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
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
            <p>Number of exercises - {total}</p>
        </div>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course = {course} />
            <Content course = {course} />
            <Total course = {course} />
        </div>
    )
}

export default App
