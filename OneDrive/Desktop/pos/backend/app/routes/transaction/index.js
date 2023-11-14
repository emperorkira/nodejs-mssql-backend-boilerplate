//INCLUDE NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

// IMPORT ROUTE HANDLER
const Sales = require('./salesRoute');

//MSTER ROUTES
router.use("/sales", Sales);    
//END MASTER FILES

// Export the router
module.exports = router;
