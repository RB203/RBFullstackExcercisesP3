const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}else if (process.argv.length>5){
  console.log('too many arguments')
  process.exit(1)
}else if (process.argv.length===4){
  console.log('not enough arguments')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://rafo203:${password}@fullstackcluster.yy4vg4a.mongodb.net/?retryWrites=true&w=majority&appName=FullstackCluster`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const person = mongoose.model('person', personSchema)



if (process.argv.length===3) {
  person.find({}).then(result => {
  // person.find({name:"stringName", number:"stringNumber"}).then(result => {
    console.log('phonebook:')
    result.forEach(human => {
      console.log(human.name + ' ' + human.number)
    })
    mongoose.connection.close()
  })
}else{

  const register = new person({
    name: process.argv[3],
    number: process.argv[4],
  })

  register.save().then(result => {
    console.log('added ' + result.name + ' number ' + result.number + ' to phonebook')
    mongoose.connection.close()
  }).catch((error) => {
    console.log('Error during the insertion')
    mongoose.connection.close()
  })
}




