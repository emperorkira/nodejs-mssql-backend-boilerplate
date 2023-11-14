//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Customer = require("../../controllers/master/mstCustomerController");

//SET ROUTERS 
router.get("/", Customer.getAll);                                       //GET ALL DATA
router.post("/add", Customer.add);                                      //ADD DATA
router.get("/get/id=:Id", Customer.get);                                //GET SPECIFIC DATA
router.get("/find/id=:Id", Customer.find); 
router.patch("/update/id=:Id", Customer.update);                        //UPDATE SPECIFIC DATA
router.delete("/delete/id=:Id", Customer.delete);                       //DELETE SPECIFIC DATA
router.patch("/lock/id=:Id", Customer.lock);                            //LOCK SELECTED DATA
router.patch("/unlock/id=:Id", Customer.unlock);                        //UNLOCK SELECTED DATA

router.get("/sales-history/id=:Id", Customer.getAllSalesAccount);              //GET ALL CUSTOMER SALES ACCOUNT
router.get("/customer-term", Customer.getAllTerm);                      //GET ALL TERMS
router.get("/customer-account", Customer.getAllCustomerAccount);        //GET ALL CUSTOMER ACCOUNTS
router.get("/price-description", Customer.getAllPriceDescription);      //GET ALL DEFAULT PRICE DESCRIPTION

//EXPORT ROUTER
module.exports = router;