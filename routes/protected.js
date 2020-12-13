const express = require('express');
const router = express.Router();
const User = require('../model/user')

router.get('/secure', async(req,res)=>{
  
  try {
    let users =  await User.find();
    res.status(200).json({
      success:true,
      count:users.length,
      data:users
    })
  } catch (err) {
  console.log(e);
  res.status(500).send('error intentelo de nuevo')
  }

})
module.exports = router;
