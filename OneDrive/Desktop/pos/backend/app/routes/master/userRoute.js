//IMPORT ALL NECESSARY LIBRARY
const express = require("express");
const router = express.Router();

//INCLUDES CONTROLLER / MODELS
const User = require("../../controllers/master/mstUserController");

//SET ROUTERS 
router.get("/", User.getAll);                                       //GET ALL DATA
router.post("/add", User.add);                                      //ADD DATA
router.get("/get/id=:Id", User.get);                                //GET USER's DETAILS
router.get("/get-userCode", User.getUserCode);                      //GET LATEST USER ID   
router.get("/get-rights/id=:Id", User.getUserAccessRights);         //GET USER's ACCESS RIGHTS
router.get("/find/id=:Id", User.find);                              //FIND USSER return True / False
router.patch("/update/id=:Id", User.update);                        //UPDATE SPECIFIC DATA
router.delete("/delete/id=:Id", User.delete);                       //DELETE SPECIFIC DATA
router.patch("/lock/id=:Id", User.lock);                            //LOCK SELECTED DATA
router.patch("/unlock/id=:Id", User.unlock);                        //UNLOCK SELECTED DATA

router.get("/system-forms", User.getAllSysForms);                   //GET ALL SYSTEM-FORMS
router.get("/copy-rights/id=:Id", User.getCopyAccessRights)         //COPY ALL USER RIGHTS
router.post("/rights-add/id=:Id", User.addBulkAccessRights);        //ADD ACCESS RIGHTS INT BULK TO USER | UserCode
router.patch("/rights-update/id=:Id", User.updateBulkAccessRights); //UPDATE ACCESS RIGHTS INT BULK TO USER | UserCode
router.delete("/rights-delete/id=:Id", User.deleteAllAccessRights); //DELETE ALL USER RIGHTS | UserCode
router.delete("/right-delete/id=:Id", User.deleteAccessRight);      //DELETE ALL USER RIGHTS | UserFormId

//EXPORT ROUTER
module.exports = router;
