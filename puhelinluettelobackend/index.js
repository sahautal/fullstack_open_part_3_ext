const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

morgan.token('info', function (req, res) {
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

let persons = [
  {
    name: "Dan Abramov",
    number: "12414444444",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];
// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.get("/info",morgan(), (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people <br/> 
     ${new Date()}`);
});

app.get("/api/persons", (request, response) => {
  console.log("persons endpoint");
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }

  console.log(person);
  response.json(person);
});

app.post("/api/persons", (request, response) => {
  // morgan(":method :url :status :res[content-length] - :response-time ms");
  morgan();
  body = request.body;
  // console.log(body);
  const newName = body.name;
  const newNnumber = body.number;
  // console.log(newName);
  if (newName === "" || newName === null || newName === undefined) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  if (newNnumber === "" || newNnumber === null || newNnumber === undefined) {
    return response.status(400).json({
      error: "number is missing",
    });
  }
  if (persons.some((person) => person.name === newName)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  //nimi tai numero puuttuu
  //lisättävä nimi on jo luettelossa
  const newDude = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000 + 1),
  };
  persons = persons.concat(newDude);
  response.json(newDude);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
