const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const app = express()
dotenv.config({path:'./config/config.env'})

app.use(require('./routes/auth.js'))

app.listen(process.env.PORT,()=>{
    console.log(`run port ${process.env.PORT}`)
})
