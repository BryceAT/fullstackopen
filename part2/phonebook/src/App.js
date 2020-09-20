import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Filter = (props) => {
  return(
  <div>
    filter shown with <input value={props.value} onChange={props.onChange} />
  </div>
  )
} 
const PersonForm = (props) => {
  return(
  <div>
    <form>
      <div>
        name: <input value={props.name} onChange={props.nameChange}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.numberChange}/>
      </div>
      <div>
        <button type="submit" onClick={props.submitOnClick}>add</button>
      </div>
    </form>
  </div>
  )
} 
const Persons = ({persons, newFilter}) => {
  return(
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            .map(person => <div key={person.name}>{person.name} {person.number}</div>)}
  </div>
  )
} 

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          console.log('promise fulled')
          setPersons(response.data)
      })
  },[])
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person=>person.name).findIndex(curname => curname === newName) === -1) 
    {
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  } else {
  window.alert(newName + 'is already added to the phonebook')
  }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h2>add a new</h2>
      
      <PersonForm name = {newName} nameChange={handleNameChange} 
                  number = {newNumber} numberChange={handleNumberChange}
                  submitOnClick ={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter = {newFilter}/>
    </div>
  )
}

export default App;
