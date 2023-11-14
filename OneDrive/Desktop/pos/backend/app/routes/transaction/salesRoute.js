//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Sales = require("../../controllers/transaction/trnSalesController");

//SET ROUTERS 
router.get("/get-sales", Sales.getAllSales);                                   //GET ALL DATA
router.get("/get-sales/id=:Id", Sales.getSales);                               //GET SPECIFIC SALES DATA | TrnSalesId
router.delete("/delete-sales/id=:Id", Sales.deleteSales);                      //DELETE SPECIFIC DATA | TrnSalesId

//EXPORT ROUTER
module.exports = router;