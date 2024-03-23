
const express = require("express"), d72746572 = express.Router(), r73706C72 = require("../../controllers/master/mstSupplierController"), { checkUser } = require('../../middleware/authMiddleware');

d72746572.get("/", checkUser, r73706C72.k67746C6C);//
d72746572.post("/add", checkUser, r73706C72.k616464);//
d72746572.get("/get/id=:Id", checkUser, r73706C72.k676574);//
d72746572.get("/find/id=:Id", checkUser, r73706C72.k666E64);//
d72746572.patch("/update/id=:Id", checkUser, r73706C72.k75706474);//
d72746572.delete("/delete/id=:Id", checkUser, r73706C72.k646C74);
d72746572.patch("/lock/id=:Id", checkUser, r73706C72.k6C636B);//
d72746572.patch("/unlock/id=:Id", checkUser, r73706C72.k6E6C636B);//
d72746572.get("/supplier-term", checkUser, r73706C72.k73706C7274726D);//
d72746572.get("/supplier-account", checkUser, r73706C72.k73706C72616363);//

module.exports = d72746572;