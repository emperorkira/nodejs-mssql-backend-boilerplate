//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const Item = require("../../controllers/master/mstItemController");
const ItemPrice = require("../../controllers/master/mstItemPriceController");

//SET ROUTERS 
router.get("/", Item.getAll);                                   //GET ALL DATA
router.post("/add", Item.add);                                  //ADD DATA
router.get("/get-itemCode", Item.getItemCode);                  //GET LATEST ITEM-CODE +1
router.get("/get/id=:Id", Item.get);                            //GET SPECIFIC DATA | MstItemId
router.get("/find/id=:Id", Item.find);                          //FIND SPECIFIC DATA return True or False | MstItemId
router.patch("/update/id=:Id", Item.update);                    //UPDATE SPECIFIC DATA | MstItemId
router.delete("/delete/id=:Id", Item.delete);                   //DELETE SPECIFIC DATA | MstItemId
router.patch("/lock/id=:Id", Item.lock);                        //LOCK SELECTED DATA | MstItemId
router.patch("/unlock/id=:Id", Item.unlock);                    //UNLOCK SELECTED DATA | MstItemId

router.get("/sales-account", Item.getAllSalesAccount);          //GET ALL SALES ACCOUNT
router.get("/cost-account", Item.getAllCostAccount);            //GET ALL COST ACCOUNT
router.get("/asset-account", Item.getAllAssetAccount);          //GET ALL ASSET ACCOUNT
router.get("/tax", Item.getAllTax);                             //GET ALL IN TAX
router.get("/item-category", Item.getAllItemCategory);          //GET ALL ITEM-CATEGORY
router.get("/item-unit", Item.getAllItemUnit);                  //GET ALL ITEm-UNIT
router.get("/item-supplier", Item.getAllItemSupplier);          //GET ALL ITEM-SUPPLIER

//ITEM-PRICE
router.get("/price", ItemPrice.getAllItemPrices);               //GET ALL ITEM-PRICES
router.get("/price/id=:Id", ItemPrice.getAll);                  //GET ITEM ALL PRICES | MstItemId
router.post("/price-add", ItemPrice.add);                       //ADD ITEM NEW PRICE
router.get("/price-find/id=:Id", ItemPrice.find);               //FIND ITEM PRICE | MstItemPriceId
router.get("/price-get/id=:Id", ItemPrice.get);                 //GET ITEM PRICE | MstItemPriceId
router.delete("/price-delete/id=:Id", ItemPrice.delete);        //DELETE ITEM PRICE | MstItemPriceId
router.delete("/prices-delete/id=:Id", ItemPrice.deleteAll);    //DELETE ALL ITEM PRICE | MstItem - ItemCode
router.patch("/price-update/id=:Id", ItemPrice.update);         //UPDATE ITEM PRICE | MstItemPriceId

//EXPORT ROUTER
module.exports = router;