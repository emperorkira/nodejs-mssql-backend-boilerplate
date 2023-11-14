//INCLUDE NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

// IMPORT ROUTE HANDLER
const item = require('./itemRoute');
const discount = require('./discountRoute');
const customer = require('./customerRoute');
const supplier = require('./supplierRoute');
const systemTables = require('./systemTablesRoute');
const user = require('./userRoute');

//MSTER ROUTES
router.use("/item", item);    
router.use("/discount", discount);  
router.use("/customer", customer);  
router.use("/supplier", supplier);  
router.use("/system-tables", systemTables); 
router.use("/user", user); 
//END MASTER FILES

// Export the router
module.exports = router;
