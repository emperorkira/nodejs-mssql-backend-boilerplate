const LocalStrategy = require('passport-local').Strategy;
const { XORDecryption } = require('../../license');
// const _USER = require('../controllers/master/mstUserController');
async function initialize(passport, getUserByUserName, getUserById) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await getUserByUserName(username);
      if (!user) return done(null, false, { message: 'No user with that username' });
      const unhashedPassword = await XORDecryption('@innosoft', user.Password);
      const passwordMatch = (unhashedPassword === password);
      if (passwordMatch) {return done(null, user);} 
      else {return done(null, false, { message: "The password or username you've entered is incorrect." });}
    } catch (error) {
      return done(error);
    }
  };
  //
  passport.use(new LocalStrategy({ usernameField: 'UserName', passwordField: 'Password' }, authenticateUser));
  passport.serializeUser((user, done) => { done(null, user.Id);});
  passport.deserializeUser(async (Id, done) => {
    try {
      const user = await getUserById(Id); done(null, user);
    } catch (error) {
      done(error);
    }
  });
}//END FUNCTION
module.exports = { initialize };
