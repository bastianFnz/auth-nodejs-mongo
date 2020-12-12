const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name:{type:String},
  last_name:{type:String},
  email:{type:String},
  password:{type:String},
  createAt:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('User',UserSchema);
