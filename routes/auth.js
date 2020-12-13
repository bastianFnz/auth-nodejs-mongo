const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const User = require('../model/user')
const service = require('../config/authService')

router.post('/signup',async(req,res)=>{
  let {Email,Password,Name,LastName} = req.body

  let emailExist = await User.findOne({email:Email});
  if (emailExist) {
    return res.status(400).json({
      success:false,
      message:"Email ya ha sido registrado"
    })
  }

  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(Password,salt)

  let user = new User({
    name:{first_name:Name,
    last_name:LastName},
    idt:uuidv4(),
    email:Email,
    password:hashedPassword
  })

  try {
    let userSaved = await user.save();
    res.status(200).json({
      success:true,
      message:"El usuario ha sido creado correctamente"
    })

  } catch (err) {
    console.log(err);
    res.status(500).send({message:"error intentelo de nuevo"})
  }
})

router.post('/login',async(req,res)=>{
  let{Email,Password}=req.body
  try{

    let userExist = await User.findOne({email:Email});
    if (!userExist) {
      return res.status(400).json({
        success:false,
        message:'Email no esta registrado'
      })
    }

    let ValidPass = await bcrypt.compare(Password,userExist.password);
    if (!ValidPass)  return res.status(400).json({
      success:false,
      message:'El email o la contraseña no coninciden'
    })


    return res.status(200).json({
      success:true,
      token:service.createToken(userExist)

    })
  } catch (err) {
    console.log(err);
    res.status(500).send({message:"error intentelo de nuevo"})
  }
})

module.exports = router;
