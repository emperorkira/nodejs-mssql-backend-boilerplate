//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const DCMemo = require("../../controllers/transaction/trnDCMemoController");

//SET ROUTERS
router.get("/", DCMemo.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", DCMemo.get);                              //GET SPECIFIC DATA | Parent Id
router.get("/find/id=:Id", DCMemo.find);                            //FIND SPECIFIC  DATA

//EXPORT ROUTER
module.exports = router;