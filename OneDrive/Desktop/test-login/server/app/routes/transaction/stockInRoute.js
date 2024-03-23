//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const StockIn = require("../../controllers/transaction/trnStockInController");

//SET ROUTERS
router.get("/", StockIn.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", StockIn.get);                              //GET SPECIFIC DATA | Parent Id
router.get("/find/id=:Id", StockIn.find);                            //FIND SPECIFIC  DATA

//EXPORT ROUTER
module.exports = router;