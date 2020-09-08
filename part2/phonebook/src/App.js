import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person=>person.name).findIndex(curname => curname === newName) === -1) 
    {
    const personObject = {
      name: newName,
      date: new Date().toISOString(),
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  } else {
  window.alert(newName + 'is already added to the phonebook')
  }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App;
