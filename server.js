const express = require('express')
const dotenv = require('dotenv')
const mongoose= require('mongoose')

const app = express()
dotenv.config({path:'./config/config.env'})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology:true
  },
   (err) => {
      if (!err) {
          console.log('Successfully Established Connection with MongoDB')
      }
      else {
          console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
      }
    }
);

app.use(require('./routes/auth.js'))

app.listen(process.env.PORT,()=>{
    console.log(`run port ${process.env.PORT}`)
})
