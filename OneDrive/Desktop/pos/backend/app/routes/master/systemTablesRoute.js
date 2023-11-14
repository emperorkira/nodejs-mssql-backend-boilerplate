//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Account = require("../../controllers/master/mstAccountController");
const PayType = require("../../controllers/master/mstPayTypeController");
const Tax = require("../../controllers/master/mstTaxController");
const Unit = require("../../controllers/master/mstUnitController");
const Period = require("../../controllers/master/mstPeriodController");
const Terminal = require("../../controllers/master/mstTerminalController");

//SET ROUTERS

//ACCOUNT ROUTES
router.get("/accounts/", Account.getAll);                                   //GET ALL DATA
router.post("/accounts/add", Account.add);                                  //ADD DATA
router.get("/accounts/get/id=:Id", Account.get);                            //GET SPECIFIC DATA
router.get("/accounts/find/id=:Id", Account.find);                          //FIND SPECIFIC DATA
router.patch("/accounts/update/id=:Id", Account.update);                    //UPDATE SPECIFIC DATA
router.delete("/accounts/delete/id=:Id", Account.delete);                   //DELETE SPECIFIC DATA
router.patch("/accounts/lock/id=:Id", Account.lock);                        //LOCK SELECTED DATA
router.patch("/accounts/unlock/id=:Id", Account.unlock);                    //UNLOCK SELECTED DATA
//END ACCOUNT ROUTES

//PAY-TYPE ROUTES
router.get("/pay-type/", PayType.getAll);                                   //GET ALL DATA
router.post("/pay-type/add", PayType.add);                                  //ADD DATA
router.get("/pay-type/get/id=:Id", PayType.get);                            //GET SPECIFIC DATA
router.get("/pay-type/get-accounts", PayType.getAllPayTypeAccount);         //GET ALL PAY-TYPE ACCOUNTS
router.get("/pay-type/find/id=:Id", PayType.find);                          //FIND SPECIFIC DATA
router.patch("/pay-type/update/id=:Id", PayType.update);                    //UPDATE SPECIFIC DATA
router.delete("/pay-type/delete/id=:Id", PayType.delete);                   //DELETE SPECIFIC DATA
//END PAY-TYPE  ROUTES

//TAX ROUTES
router.get("/tax/", Tax.getAll);                                            //GET ALL DATA
router.post("/tax/add", Tax.add);                                           //ADD DATA
router.get("/tax/get/id=:Id", Tax.get);                                     //GET SPECIFIC DATA
router.get("/tax/get-accounts", Tax.getAllTaxAccount);                      //GET ALL TAX ACCOUNTS
router.get("/tax/find/id=:Id", Tax.find);                                   //FIND SPECIFIC DATA
router.patch("/tax/update/id=:Id", Tax.update);                             //UPDATE SPECIFIC DATA
router.delete("/tax/delete/id=:Id", Tax.delete);                            //DELETE SPECIFIC DATA
//END TAX ROUTES

//TAX ROUTES
router.get("/unit/", Unit.getAll);                                          //GET ALL DATA
router.post("/unit/add", Unit.add);                                         //ADD DATA
router.get("/unit/get/id=:Id", Unit.get);                                   //GET SPECIFIC DATA
router.get("/unit/find/id=:Id", Unit.find);                                 //FIND SPECIFIC DATA
router.patch("/unit/update/id=:Id", Unit.update);                           //UPDATE SPECIFIC DATA
router.delete("/unit/delete/id=:Id", Unit.delete);                          //DELETE SPECIFIC DATA
//END TAX ROUTES

//TAX ROUTES
router.get("/period/", Period.getAll);                                      //GET ALL DATA
router.post("/period/add", Period.add);                                     //ADD DATA
router.get("/period/get/id=:Id", Period.get);                               //GET SPECIFIC DATA
router.get("/period/find/id=:Id", Period.find);                             //FIND SPECIFIC DATA
router.patch("/period/update/id=:Id", Period.update);                       //UPDATE SPECIFIC DATA
router.delete("/period/delete/id=:Id", Period.delete);                      //DELETE SPECIFIC DATA
//END TAX ROUTES

//TAX ROUTES
router.get("/terminal/", Terminal.getAll);                                  //GET ALL DATA
router.post("/terminal/add", Terminal.add);                                 //ADD DATA
router.get("/terminal/get/id=:Id", Terminal.get);                           //GET SPECIFIC DATA
router.get("/terminal/find/id=:Id", Terminal.find);                         //FIND SPECIFIC DATA
router.patch("/terminal/update/id=:Id", Terminal.update);                   //UPDATE SPECIFIC DATA
router.delete("/terminal/delete/id=:Id", Terminal.delete);                  //DELETE SPECIFIC DATA
//END TAX ROUTES

//EXPORT ROUTER
module.exports = router;