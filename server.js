const express = require('express')
const dotenv = require('dotenv')
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()
dotenv.config({path:'./config/config.env'})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//verified token

var dec = (req,res,next)=>{
  
  let token = req.headers['authorization']
  if (token) {

    if (token.startsWith('Bearer ')){

      token = token.slice(7, token.length);

      let decoded = jwt.verify(token, process.env.TOKEN_SECRET)

      if (decoded.exp < (Date.now())) {

        return res.status(401).send({message:'el token expiro'})
      }else {
        req.user = decoded.sub
        next();
      }

    }else {
      res.status(400).send({message:'Token no valido'})
    }
  }else {
    return res.status(401).send({message:'el token no existe'})
  }

}

app.use(require('./routes/auth.js'))
app.use(dec);
app.use(require('./routes/protected.js'))

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

app.listen(process.env.PORT,()=>{
    console.log(`run port ${process.env.PORT}`)
})
