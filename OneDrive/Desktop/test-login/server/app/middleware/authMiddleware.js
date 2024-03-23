const jwt = require('jsonwebtoken'), o757372 = require('../controllers/master/mstUserController'), { resolve } = require('path'),{ f72646C6E } = require('../database/function'), t747874 = resolve(__dirname, '../texts/tables.json');

const requireAuth = async (req, res, next) => {
  const token = await req.cookies.jwt;
  console.log('RA-TOKEN: ' + token );
  const lines = f72646C6E(t747874);
  if (token) {
    jwt.verify(token, String(lines.na00x02), (error) => {
      if (error) return res.status(403).send({login:false, error:`Error 403: User not authorized. ${error}`});
      else next();
    });
  } else {
    return res.status(403).send({login:false, message:`Error 403: User not authorized.`});
  }
};

// check current user
const checkUser = async (req, res, next) => {
  const token = await req.cookies.jwt;
  console.log('CU-TOKEN: ' + token );
  const lines = f72646C6E(t747874);
  if (token) {
    jwt.verify(token, String(lines.na00x02), async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        next();
      } else {
        let user = await o757372.getUserById(decodedToken.Id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };