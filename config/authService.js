const jwt = require('jsonwebtoken');

function createToken(user) {

  payload = {
    sub:user.idt,
    iat:(new Date).getTime(),
    exp:new Date().getTime() + (86400000*14)
  }

  return jwt.sign(payload,process.env.TOKEN_SECRET)
}

module.exports = {
  createToken
}
