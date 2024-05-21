// Middleware Functions

// Middleware to check if the user is authenticated
async function checkAuthenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      // If authenticated, proceed to the next middleware or route handler
      return next();
    }

    // If not authenticated, redirect to the login page
    res.redirect('/');
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in checkAuthenticated middleware:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Middleware to check if the user is not authenticated
async function checkNotAuthenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      // If authenticated, redirect to the home page or another appropriate page
      return res.redirect('/');
    }

    // If not authenticated, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in checkNotAuthenticated middleware:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
