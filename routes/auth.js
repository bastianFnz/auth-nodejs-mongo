const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

router.post('/login',async(req,res)=>{
  let{Email,Password}=req.body

  let emailExist = await User.findOne({email:Email});
  if (!emailExist) {
    return res.status(400).json({
      success:false,
      message:'Email no esta registrado'
    })
  }

  let ValidPass = await bcrypt.compare(Password,user.password);
  if (!ValidPass)  return res.status(400).json({
    success:false,
    message:'El email o la contraseña no coninciden'
  })

  return res.status(200).json({
    success:true,
    token:'superToken'
  })
})

module.exports = router;

