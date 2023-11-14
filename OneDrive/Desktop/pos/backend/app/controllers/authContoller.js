//INCLUDES
const { Models } = require('../models/');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 06, 2023
  PURPOSE              : CHECK USERNAME AND PASSWORD
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : postLogin
****************************************************************/
/*
exports.postLogin = async (req, res, next) => {
    try {
        
        // Passport.js middleware for authenticating the user
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next);
    } catch (error) {
        return res.status(500).json({ error: "Controller Error[postLogin]", message: error.message });
    }
};
*/