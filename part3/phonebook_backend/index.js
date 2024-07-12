const express = require('express')
const app = express()
const morgan = require('morgan')

let persons  = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())



app.use(morgan( (tokens, req, res) => {
    let returned = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms']
    
    if (tokens.method(req, res) === 'POST') returned = returned.concat(JSON.stringify(req.body))
    returned = returned.join(' ')
    return returned
  })
)
    
    app.get('/',(request,response) => {
      response.send('<h1>Backend</h1>')
    })
    
    
    app.get('/api/persons',(request,response) => {
      response.json(persons)
    })
    
    
    app.get('/info',(request,response) => {
      const number = persons.length
      const date = new Date()
      const message = "<p>Phonebook has info for " + number.toString()+ "</p><p>" + date.toString() + "</p>"
      response.send(message)
    })
    
    app.get('/api/persons/:id',(request,response) => {
      const identifier = Number(request.params.id)
      const element = persons.find(person => person.id === identifier)
      if(element){
        response.json(element)
      }else{
        response.status(402).end()
      }
    })
    
    app.delete('/api/persons/:id',(request,response) => {
      const identifier = Number(request.params.id)
      persons = persons.filter(person => person.id !== identifier)
      response.status(204).end()
    })
    
    
    app.post('/api/persons/',(request,response) => {
      const person = request.body
      if ((!person.name) || (!person.number)) return response.status(400).json({error:"both name and number are required"})
      const repeated = persons.find(individual => individual.name === person.name)
      if (repeated) 
        return response.status(400).json({error:"name already exists"})
      const newPerson = {
        name : request.body.name,
        number : request.body.number
      }
      newPerson.id = Math.floor(Math.random()*100000)
      persons = persons.concat(newPerson)
      response.json(newPerson)
    })
    
    
    
    const PORT = 3001
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)