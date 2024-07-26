const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to mongoDB url')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate:{
      validator: (element) => {
        const letters = (element.length)
        let start = 0
        if(/\b\d{2}-\d/.test(element)){
          start = 2
          console.log("first")  
        }else if(/\b\d{3}-\d/.test(element)){
          start = 3
          console.log("second")  
        }else{
          console.log("none")  
          return false
        }
        const remaining = letters - start - 1
        let regex = new RegExp(`\\b\\d{${start}}-\\d{${remaining}}\\b`, 'i')
        console.log(regex)        
        console.log(regex.test(element))        
        return regex.test(element)
      },
      message: props => `Number ${props.value} incorrect.`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)