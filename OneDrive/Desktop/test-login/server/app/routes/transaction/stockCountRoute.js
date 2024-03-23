//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const StockCount = require("../../controllers/transaction/trnStockCountController");

//SET ROUTERS
router.get("/", StockCount.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", StockCount.get);                              //GET SPECIFIC DATA | Parent Id
router.get("/find/id=:Id", StockCount.find);                            //FIND SPECIFIC  DATA


//EXPORT ROUTER
module.exports = router;