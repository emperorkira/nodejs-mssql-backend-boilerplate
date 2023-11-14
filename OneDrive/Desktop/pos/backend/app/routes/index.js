//INCLUDE NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

// IMPORT ROUTE HANDLER
const MstRoutes = require('./master');
const TrnRoutes = require('./transaction');


//MSTER ROUTES
router.use("/", MstRoutes);    

//TRANSACTIONS ROUTES
router.use("/", TrnRoutes);



// Export the router
module.exports = router;
