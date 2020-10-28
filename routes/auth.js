const express = require('express')
const router = express.Router()


router.get('/login',(req,res)=>{
    res.status(200).send({message:'hello login'})
})

module.exports = router; 
