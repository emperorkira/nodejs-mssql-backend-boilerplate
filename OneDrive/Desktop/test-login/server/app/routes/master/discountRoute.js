const express = require("express"), d72746572 = express.Router(), r6473636E74 = require("../../controllers/master/mstDiscountController"), r6473636E7469746D = require("../../controllers/master/mstDiscountItemController"), { checkUser } = require('../../middleware/authMiddleware');

d72746572.get("/", checkUser, r6473636E74.k67746C6C);//
d72746572.post("/add", checkUser, r6473636E74.k616464);//
d72746572.get("/get/id=:Id", checkUser, r6473636E74.k676574);//
d72746572.get("/find/id=:Id", checkUser, r6473636E74.k666E64);//
d72746572.delete("/delete/id=:Id", checkUser, r6473636E74.k646C74);
d72746572.patch("/update/id=:Id", checkUser, r6473636E74.k75706474);//
d72746572.patch("/lock/id=:Id", checkUser, r6473636E74.k6C636B);//
d72746572.patch("/unlock/id=:Id", checkUser, r6473636E74.k6E6C636B);//
d72746572.get("/get-discountId", checkUser, r6473636E74.k676473636E746964);//
d72746572.get("/item-code", checkUser, r6473636E74.k676169746D6364); //

d72746572.get("/discounted-item/id=:Id", checkUser, r6473636E7469746D.k67746C6C);//
d72746572.get("/discounted-item/find/id=:Id", checkUser, r6473636E7469746D.k666E64); //
d72746572.get("/discounted-item/get/id=:Id", checkUser, r6473636E7469746D.k676574);//
d72746572.post("/discounted-item-add", checkUser, r6473636E7469746D.k616464);//
d72746572.patch("/discounted-item-update/id=:Id", checkUser, r6473636E7469746D.k75706474);
d72746572.delete("/discounted-item-delete/id=:Id", checkUser, r6473636E7469746D.k646C74);//
d72746572.delete("/discounted-items/delete/id=:Id", checkUser, r6473636E7469746D.k646C74616C6C);
d72746572.get("/discounted-item/get-null", checkUser, r6473636E7469746D.k67616E6C6C666B);//
d72746572.patch("/discounted-item/update-null/id=:Id", checkUser, r6473636E7469746D.k757064746E6C6C66B);//

module.exports = d72746572;