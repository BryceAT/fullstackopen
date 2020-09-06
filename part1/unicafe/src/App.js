import React, { useState }  from 'react';
import './App.css';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const DisplayRow = (props) => (
  <tr>
    <td> {props.c1}</td>
    <td> {props.c2}</td>
  </tr>
)
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good + neutral + bad > 0) {
    return (
      <div>
      <h1>statstics</h1>
        <table>
          <tbody>
            <DisplayRow c1={"good "} c2={good} />
            <DisplayRow c1={"neutral"} c2={neutral} />
            <DisplayRow c1={"bad"} c2={bad} />
            <DisplayRow c1={"all"} c2={(good + neutral + bad)}/>
            <DisplayRow c1={"average"} c2={(good - bad) / (good + neutral + bad)} />
            <DisplayRow c1={"positive"} c2={good * 100 / (good + neutral + bad)} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
  <div> No feedback given</div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>

      <Button handleClick={()=>setGood(good + 1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={()=>setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App;
