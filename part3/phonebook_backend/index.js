const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

// let persons  = [
//   { 
//     "id": 1,
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": 2,
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": 3,
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": 4,
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
   else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(express.json())
app.use(express.static('dist'))



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

app.use(errorHandler)

app.get('/',(request,response) => {
  response.send('<h1>Backend</h1>')
})
    
    
app.get('/api/persons',(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  // response.json(persons)
})


app.get('/info',(request,response) => {
  Person.find({}).then(persons => {
    const number = persons.length
    const date = new Date()
    const message = "<p>Phonebook has info for " + number.toString()+ "</p><p>" + date.toString() + "</p>"
    response.send(message)
  })
})

app.get('/api/persons/:id',(request,response,next) => {
  // const identifier = Number(request.params.id)
  // const element = persons.find(person => person.id === identifier)
  // if(element){
  //   response.json(element)
  // }else{
  //   response.status(402).end()
  // }
  const identifier = request.params.id
  Person.findById(identifier)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end() 
    }
  })
  .catch(error => next(error))

})

app.delete('/api/persons/:id',(request,response) => {
  // const identifier = Number(request.params.id)
  // persons = persons.filter(person => person.id !== identifier)
  // response.status(204).end()
  const identifier = request.params.id
  Person.findByIdAndDelete(identifier)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})


app.post('/api/persons/',(request,response,next) => {
  const person = request.body
  // if ((!person.name) || (!person.number)) return response.status(400).json({error:"both name and number are required"})
  // const repeated = persons.find(individual => individual.name === person.name)
  // if (repeated) 
  //   return response.status(400).json({error:"name already exists"})
  // // // // // const newPerson = {
  // // // // //   name : request.body.name,
  // // // // //   number : request.body.number
  // // // // // }
  // // // // // newPerson.id = Math.floor(Math.random()*100000)
  // // // // // persons = persons.concat(newPerson)
  // // // // // response.json(newPerson)
  const newPerson = new Person({
    name: person.name,
    number: person.number
  })
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    id: body.id,
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person,{ new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})