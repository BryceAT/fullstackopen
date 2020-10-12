import React, { useState , useEffect } from 'react';
import './App.css';
import personService from './services/persons'

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
const Persons = ({persons, newFilter,deletePerson}) => {
  return(
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            .map(person => <div key={person.id}>{person.name} {person.number}  
                            <button type="submit" onClick={() => deletePerson(person.id)}>delete</button>
                            </div>)}
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
    personService.getAll()
                  .then(response => {
                    console.log('promise fulled')
                    setPersons(response.data)
                  })
  },[])
  const deletePerson = (id) => {
    console.log(`person ${id} is to be removed`)
    const result = window.confirm('Are you sure you want to delete person '+
    `"${persons.filter(person => person.id === id)[0].name}"?`)
    if (result) {
      personService.removePerson(id).then(response => {
        console.log(`person ${id} is no more `)
        personService.getAll()
        .then(response => {
          console.log('promise fulled')
          setPersons(response.data)
        })
      })
      
      } else {
        console.log(`nevermind about ${id}`)
      }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person=>person.name).findIndex(curname => curname === newName) === -1) 
    {
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: Math.max(persons.map(person => person.id)) + 1,
    }
    personService.create(personObject).then(response => {
      setPersons(persons.concat(response.data))
    })
    setNewName('')
    setNewNumber('')
  } else {
  const result = window.confirm(newName + 'is already added to the phonebook, replace the old number with a new one?')
  if (result){
    const person = persons.find(p => p.name === newName)
    const changedPerson = {...person, number:newNumber}
    personService.update(person.id, changedPerson).then(response => {
      setPersons(persons.map(p => p.id !== person.id ? p : response.data))
    })
    setNewName('')
    setNewNumber('')
  }
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
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
