const express = require("express"), d72746572 = express.Router(), r6373746D72 = require("../../controllers/master/mstCustomerController"), { checkUser } = require('../../middleware/authMiddleware');

d72746572.get("/", checkUser, r6373746D72.k67746C6C);//                 
d72746572.post("/add", checkUser, r6373746D72.k616464);//
d72746572.get("/get/id=:Id", checkUser, r6373746D72.k676574);//
d72746572.get("/find/id=:Id", checkUser, r6373746D72.k666E64);//
d72746572.patch("/update/id=:Id", checkUser, r6373746D72.k75706474);// 
d72746572.delete("/delete/id=:Id", checkUser, r6373746D72.k646C74);//
d72746572.patch("/lock/id=:Id", checkUser, r6373746D72.k6C636B);//
d72746572.patch("/unlock/id=:Id", checkUser, r6373746D72.k6E6C636B);//

d72746572.get("/sales-history/id=:Id", checkUser, r6373746D72.k6761736C7363636E74);//
d72746572.get("/customer-term", r6373746D72.k676174726D);//
d72746572.get("/customer-account", r6373746D72.k637376D763636E74);//
d72746572.get("/price-description", r6373746D72.k707236436377046E);//

module.exports = d72746572;