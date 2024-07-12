import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import FilteredPList from './components/FilteredPList'
// import axios from 'axios'
import numberService from './services/numbers'
import Notification from './components/Notification'
import './styles.css'




const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [status, setStatus] = useState([null,null])

  useEffect(() => {
    const promise = numberService.reader().then(
      response => {
        const people = response
        setPersons(people)
        console.log("Extracted from server")
      }
    )
  },[])

  const Duplicate = (newName) => {
    return persons.find(person => person.name === newName)
  }

  const submission = (event) =>{
    event.preventDefault()
    const repeatedPerson = Duplicate(newName)
    // if(persons.filter(person => person.name === newName).length > 0){
    //   alert(newName + " is already in the phonebook!")
    //   return
    // }
    
    if (repeatedPerson !== undefined){
      if (!window.confirm(newName+' is already in the phonebook,are you sure you want to overwrite the old number?')){
        return
      }
      const usedId = repeatedPerson.id
      const usedName = repeatedPerson.name
      repeatedPerson.number = newNumber
      numberService.updater(usedId,repeatedPerson).then(response => {
        const newList = persons.map(person => {
          if(person.id !== usedId) return person;
          else return response
        })
        // setPersons(persons.map(person => {
          //   person !== usedId? person:response
          // }))
          console.log(newList)
          setPersons(newList)
          setNewName('')
          setNewNumber('')
          setStatus([usedName+' updated',true])
          setTimeout(() => {setStatus([null,null])},5000)
      }).catch(error => {
        setPersons(persons.filter(person => person.id !== usedId))
        setNewName('')
        setNewNumber('')
        setStatus([usedName +' was removed from the server',false])        
        setTimeout(() => {setStatus([null,null])},5000)
      })
      return
    }
      
    const newNameObject = {
      name : newName,
      number: newNumber
    }
    
    numberService.creator(newNameObject).then(response =>{
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })

    setStatus(['Added '+newName,true])
    setTimeout(() => {setStatus([null,null])},5000)

  }
  
  const deletion = (id,name) => {
    if (!window.confirm('Are you sure you want to delete '+name)){
      return
    }
    numberService.deleter(id).then(response => {
      const newList = persons.filter(person => person.id !== id)
      console.log(newList)
      setPersons(newList)
    }).catch(error =>{
      setPersons(newList)
      setStatus([name +' was already deleted',false])
      setTimeout(() => {setStatus([null,null])},5000)
    })
    // alert(name+' deleted')
    setStatus([name+' deleted',true])
    setTimeout(() => {setStatus([null,null])},5000)
  }



  const changeName = (event) =>{
    // console.log('changed name')
    setNewName(event.target.value)
  }

  const changeNumber = (event) =>{
    // console.log('changed number')
    setNewNumber(event.target.value)
  }

  const changeFilter = (event) =>{
    // console.log('changed filter')
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text = {status[0]} type = {status[1]}/>
      <Filter filter = {newFilter} functionChange = {changeFilter}></Filter>
      <Add submission = {submission} changeName = {changeName}
       changeNumber = {changeNumber} newName = {newName} 
       newNumber = {newNumber}/>      
      <FilteredPList filteredPersons = {filteredPersons} buttonFunction = {deletion}/>
    </div>
  )
}

export default App
