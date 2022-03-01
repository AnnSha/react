import React, { useState } from 'react'

const Statistic =({voted,selected, anecdotes}) => {
    let maxVoted =Math.max(...voted)

    return (
        <div>
            <p>has {maxVoted} votes</p>
            <p>Anecdote: </p>
             <p></p>
        </div>
    )}


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [voted, setVoted] = useState([0, 0, 0, 0, 0, 0, 0])


    const handleClick = () => {
        let randomValue = Math.floor(anecdotes.length * Math.random())
        setSelected(randomValue)
    }
    const handleVoteClick = () => {
        const copy = [...voted]
        copy[selected] += 1
        setVoted(copy)
    }


    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>Has {voted[selected]} votes</p>
            <button onClick={handleClick}>next anecdotes</button>
            <button onClick={handleVoteClick}>vote</button>
            <h2>Anecdote with most votes</h2>
            <Statistic voted={voted} selected={selected} anecdotes={anecdotes}/>
        </div>
    )
}


export default App
