//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Supplier = require("../../controllers/master/mstSupplierController");

//SET ROUTERS 
router.get("/", Supplier.getAll);                                   //GET ALL DATA
router.post("/add", Supplier.add);                                  //ADD DATA
router.get("/get/id=:Id", Supplier.get);                            //GET SPECIFIC DATA
router.get("/find/id=:Id", Supplier.find);                          //FIND SPECIFIC DATA
router.patch("/update/id=:Id", Supplier.update);                    //UPDATE SPECIFIC DATA
router.delete("/delete/id=:Id", Supplier.delete);                   //DELETE SPECIFIC DATA
router.patch("/lock/id=:Id", Supplier.lock);                        //LOCK SELECTED DATA
router.patch("/unlock/id=:Id", Supplier.unlock);                    //UNLOCK SELECTED DATA
router.get("/supplier-term", Supplier.getAllSupplierTerm);          //GET ALL TERMS
router.get("/supplier-account", Supplier.getAllSupplierAccount);    //GET ALL Supplier ACCOUNTS

//EXPORT ROUTER
module.exports = router;