//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Discount = require("../../controllers/master/mstDiscountController");
const DiscountItem = require("../../controllers/master/mstDiscountItemController");

//SET ROUTERS 
router.get("/", Discount.getAll);                                       //GET ALL DATA
router.post("/add", Discount.add);                                      //ADD DATA
router.get("/get/id=:Id", Discount.get);                                //GET SPECIFIC DATA
router.get("/find/id=:Id", Discount.find);                              //FIND THE DICOUNT returns True or False
router.get("/get-discountCode", Discount.getDiscountCode);               //GET LATEST DICOUNT-Code +1
router.patch("/update/id=:Id", Discount.update);                        //UPDATE SPECIFIC DATA
router.delete("/delete/id=:Id", Discount.delete);                       //DELETE SPECIFIC DATA
router.get("/item-code", Discount.getAllItemCode);                      //DISPLAY ALL ITEM CODE 
router.patch("/lock/id=:Id", Discount.lock);                            //LOCK SELECTED DATA
router.patch("/unlock/id=:Id", Discount.unlock);                        ///UNLOCK SELECTED DATA

router.get("/discounted-item/id=:Id", DiscountItem.getAll);             ///GET ALL DISCOUNTED ITEM | MstDiscountCode
router.get("/discounted-item/find/id=:Id", DiscountItem.find);          //FIND DISCOUNTED ITEM | MstDiscountCode
router.get("/discounted-item/get/id=:Id", DiscountItem.get);            ///GET SPECIFIC DISCOUNTED ITEM
router.post("/discounted-item/add", DiscountItem.add);                  ///ADD NEW DISCOUNTED ITEM
router.patch("/discounted-item/update/id=:Id", DiscountItem.update);    //UPDATE DISCOUNTED ITEM | MstDicountItemId
router.delete("/discounted-item/delete/id=:Id", DiscountItem.delete);    //DELETE ONE DISCOUNTED ITEM  MstDicountItemId
router.delete("/discounted-items/delete/id=:Id", DiscountItem.deleteAll);//DELETE ALL DISCOUNTED ITEM  MstDicountCode

//EXPORT ROUTER
module.exports = router;