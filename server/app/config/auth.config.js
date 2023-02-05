/*
* Used in jsonwebtoken functions such as verify() or sign()
* to encode and decode tokens
*/
module.exports = {
  secret: "R[_0|t2%=V[g<x9#!<DBJd1@()]h_N",

  // jwtExpiration: 3600,           // 1 hour
  // jwtRefreshExpiration: 86400,   // 24 hours

  // Test
  jwtExpiration: 30,
  jwtRefreshExpiration: 60,
};