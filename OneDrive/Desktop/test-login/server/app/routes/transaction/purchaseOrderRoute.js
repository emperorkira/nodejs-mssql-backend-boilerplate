//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const PurchaseOrder = require("../../controllers/transaction/trnPurchaseOrderController");

//SET ROUTERS
router.get("/", PurchaseOrder.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", PurchaseOrder.get);                              //GET SPECIFIC DATA | Parent Id
router.get("/find/id=:Id", PurchaseOrder.find);                            //FIND SPECIFIC  DATA

//EXPORT ROUTER
module.exports = router;