//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Collection = require("../../controllers/transaction/trnCollectionController");
const CollectionLine = require("../../controllers/transaction/trnCollectionLineController");

//SET ROUTERS 
router.get("/", Collection.getAll);                                     //GET ALL DATA
router.get("/get/id=:Id", Collection.get);                              //GET SPECIFIC COLLECTION DATA | TrnCollectionId
router.get("/find/id=:Id", Collection.find);                            //FIND SPECIFIC COLLECTION DATA

/*
router.delete("/delete/id=:Id", Collection.delete);                     //DELETE SPECIFIC DATA | TrnCollectionId
router.patch("/unlock/id=:Id", Collection.unlock);                      //UNLOCK | TrnCollectionId
router.patch("/lock/id=:Id", Collection.lock);                          //LOCK | TrnCollectionId
router.patch("/update/id=:Id", Collection.update);                      //UPDATE DATA | TrnCOllectionId
router.post("/add", Collection.add);                                    //ADD NEW DATA

//TrnCollectionLine
router.get("/line/id=:Id", CollectionLine.getAll);                      //GET ALL COLLECTION OF USER | CollectionId               
router.get("/get-sales", Collection.getAllSales);  
router.get("/get-users", Collection.getAllUsers);  
*/

//EXPORT ROUTER
module.exports = router;