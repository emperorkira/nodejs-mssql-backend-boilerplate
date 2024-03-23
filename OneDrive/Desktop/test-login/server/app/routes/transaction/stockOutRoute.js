//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const StockOut = require("../../controllers/transaction/trnStockOutController");

//SET ROUTERS
router.get("/", StockOut.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", StockOut.get);                              //GET SPECIFIC DATA | Parent Id
router.get("/find/id=:Id", StockOut.find);                            //FIND SPECIFIC  DATA

//EXPORT ROUTER
module.exports = router;