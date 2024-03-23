//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();
//INCLUDES CONTROLLER / MODELS
const Disbursement = require("../../controllers/transaction/trnDisbursementController");

//SET ROUTERS
router.get("/", Disbursement.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", Disbursement.get);                              //GET SPECIFIC DATA | Parent Id
router.get("/find/id=:Id", Disbursement.find);                            //FIND SPECIFIC  DATA


//EXPORT ROUTER
module.exports = router;