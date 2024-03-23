//INCLUDE NECESSARY LIBRARY
const express = require("express"), router = express.Router(), { requireAuth, checkUser } = require('../middleware/authMiddleware');

// IMPORT ROUTE HANDLER
const MstRoutes  =  require('./master');
const TrnRoutes  =  require('./transaction');
const AuthRoutes =  require('./auth');
const ConfigRoutes =  require('./config');
const TestRoutes = require('./test')
/*
//CONFIGURATION ROUTES
router.use("/", ConfigRoutes);   

//AUTHENTICATION ROUTES
router.use("/", AuthRoutes);    

//MSTER ROUTES
router.use("/", MstRoutes);    

//TRANSACTIONS ROUTES
router.use("/", TrnRoutes);
*/

//TEST ROUTES
router.use("/", TestRoutes);

// Export the router
module.exports = router;
