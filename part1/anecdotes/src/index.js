import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const GetRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const indecator_fn = (x, num) => {
  if (x === num ){
    return 1
  }
  return 0
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4:0, 5:0 })

  const handleVote = (selected) => {
    const newPoints = {
      0:points[0] + indecator_fn(0,selected),
      1:points[1] + indecator_fn(1,selected),
      2:points[2] + indecator_fn(2,selected),
      3:points[3] + indecator_fn(3,selected),
      4:points[4] + indecator_fn(4,selected),
      5:points[5] + indecator_fn(5,selected)
    }
    setPoints(newPoints)
  }
  const mostVotes = () => {
    const t = [0,1,2,3,4,5]
    const curVotes = t.map(value => points[value])
    const biggestVote = Math.max(...curVotes)
    return (
      curVotes.indexOf(biggestVote)
    )
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <div>
      {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <button onClick={()=>handleVote(selected)}>
        vote
      </button>
      <button onClick={()=>setSelected(GetRandomInt(6))} >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <div>
      {props.anecdotes[mostVotes()]}
      </div>
      <div>
      has {points[mostVotes()]} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
