const express = require('express')
const dotenv = require('dotenv')
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')

const app = express()
dotenv.config({path:'./config/config.env'})

mongoose.connect(process.env.DB_CONNECT,
{
  useNewUrlParser:true,
  useUnifiedTopology:true
  },
    ()=> console.log('Db running')
)

app.use(require('./routes/auth.js'))

app.listen(process.env.PORT,()=>{
    console.log(`run port ${process.env.PORT}`)
})
