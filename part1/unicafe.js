import { useState } from 'react'
import './style.css'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)
const StatisticLine =({value, text})=>(
    <tr>
        <th>{text}</th>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, bad, neutral}) => {
    const all = good + neutral + bad
    if(good ===0 && bad ===0 && neutral ===0 ) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <table>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value ={(good - bad)/all} />
            <StatisticLine text="positive %" value ={good/all *100}  />
        </table>
    )
}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick =()=> {
        setGood(good+1)
    }
    const handleNeutClick =()=> {
        setNeutral(neutral+1)
    }
    const handleBadClick =()=> {
        setBad(bad+1)
    }


    return (
        <div>
            <h2>Give feedback</h2>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutClick} text='neutral'/>
            <Button handleClick={handleBadClick} text='bad'/>
            <h2>Statistics</h2>
            <Statistics  good={good}  neutral={neutral} bad={bad}/>

        </div>
    )
}

export default App
