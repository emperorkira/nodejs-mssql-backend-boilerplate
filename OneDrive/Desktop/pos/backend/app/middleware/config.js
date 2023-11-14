const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const  user  = require('./app/models/userModels');
async function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'No user with that username' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = getUserById(id);
    done(null, user);
  });
}

module.exports = { initialize };
