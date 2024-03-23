//INCLUDE NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

// IMPORT ROUTE HANDLER
const Sales = require('./salesRoute');
const Collection = require('./collectionRoute');
const DCMemo = require('./dcmemoRoute');
const Disbursement = require('./disbursementRoute');
const PurchaseOrder = require('./purchaseOrderRoute');
const StockIn = require('./stockInRoute');
const StockOut = require('./stockOutRoute');
const StockCount = require('./stockCountRoute');

//MSTER ROUTES
router.use("/sales", Sales);
router.use("/collection", Collection);   
router.use("/dcmemo", DCMemo);   
router.use("/disbursement", Disbursement);   
router.use("/purchase-order", PurchaseOrder);   
router.use("/stock-in", StockIn);
router.use("/stock-out", StockOut); 
router.use("/stock-count", StockCount); 
//END MASTER FILES

// Export the router
module.exports = router;
