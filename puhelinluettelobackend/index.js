const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))



morgan.token('info', function (req) {
  // console.log(req,res)
  return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.info(req,res)
  ].join(' ')
}))


// let persons = [
//   {
//     name: 'Dan Abramov',
//     number: '12414444444',
//     id: 3,
//   },
//   {
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//     id: 4,
//   },
// ]
// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });



app.get('/info',morgan(), (request, response) => {
  Person.count().then(count=>{
    response.send(`Phonebook has info for ${count} people <br/> 
    ${new Date()}`)
  })
  
})

app.get('/api/persons', morgan(), (request, response, next) => {
  // console.log(Person)
  morgan()
  Person.find({})
    .then(persons => {
      response.json(persons)
    })  
    .catch(error => next(error))
})

app.get('/api/persons/:id', morgan(), (request, response, next) => {

  morgan()
  Person.find({_id:request.params.id})
    .then(person=>{
      if(person){
        response.json(person)
      } else {
        response.status(404).end()
      } 
    })
    .catch(error => next(error))

})

app.post('/api/persons', morgan(), (request, response,next) => {
  morgan()
  // console.log('body:',request.body)
  // morgan(":method :url :status :res[content-length] - :response-time ms");
  morgan()
  const body = request.body

  Person.create({name:body.name, number:body.number})
    .then(createdPerson=>{response.json(createdPerson)})
    .catch(error=>next(error))

})


app.delete('/api/persons/:id', morgan(), (request, response, next) => {
  morgan()
  Person.findByIdAndRemove(request.params.id)
    .then(deletedPerson=>{
      response.json(deletedPerson)
    }).catch(error=>{
      next(error)})
})

app.put('/api/persons/:id', morgan(), (request, response, next) => {
  morgan()
  const {name, number}=request.body
  // console.log(request.params.id)
  // console.log(name, number)
  Person.findByIdAndUpdate(request.params.id,
    {name, number},
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson=>{
      response.json(updatedPerson)
    }).catch(error=>next(error))

  // persons = persons.filter((person) => person.id !== id);
  // Person.deleteOne({ _id: id });
  // response.status(204).end();
})



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    // console.log(error)
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


