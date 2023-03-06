const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster1.yxlqgow.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id:String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //   returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

//const persons=[]
if (process.argv.length<=3){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

else{
  const newName=process.argv[3]
  const newNumber=process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber
  })
    
  person.save().then(result => {
    console.log('person saved. ', result)
    mongoose.connection.close()
  })
}


// Note.find({ important: true }).then(result => {
//     // ...
//   })

// Person.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })