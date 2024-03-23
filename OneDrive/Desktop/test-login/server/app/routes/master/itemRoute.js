const express = require("express"), d72746572 = express.Router(), r69746D = require("../../controllers/master/mstItemController"), r69746D707263 = require("../../controllers/master/mstItemPriceController"), { checkUser } = require('../../middleware/authMiddleware');

d72746572.get("/tokens", r69746D.tokens);//
d72746572.get("/", checkUser, r69746D.k67746C6C);//
d72746572.post("/add", checkUser,r69746D.k616464);
d72746572.get("/get-itemId", checkUser, r69746D.k674964);//
d72746572.get("/get/id=:Id", checkUser, r69746D.k676574);//
d72746572.get("/find/id=:Id", checkUser, r69746D.k666E64);//
d72746572.patch("/update/id=:Id", checkUser, r69746D.k75706474);//
d72746572.delete("/delete/id=:Id", checkUser, r69746D.k646C74);
d72746572.patch("/lock/id=:Id", checkUser, r69746D.k6C636B);//
d72746572.patch("/unlock/id=:Id", checkUser, r69746D.k6E6C636B);//

d72746572.get("/sales-account", r69746D.k6761736C7363636E74);
d72746572.get("/cost-account", r69746D.k6761637374612366E74);
d72746572.get("/asset-account", r69746D.k6761737374616366E74);
d72746572.get("/tax", r69746D.k67617478);
d72746572.get("/item-category", r69746D.k67616976D63746772);
d72746572.get("/item-unit", r69746D.k6761756E74);
d72746572.get("/item-supplier", r69746D.k6761737570706C72);
d72746572.get("/item-kitchen", r69746D.k674149746D4B);

d72746572.get("/price", checkUser, r69746D707263.k676169746D707263);//
d72746572.get("/price/id=:Id", checkUser, r69746D707263.k67746C6C);//
d72746572.post("/price-add", checkUser, r69746D707263.k616464);//
d72746572.get("/price-find/id=:Id", checkUser, r69746D707263.k666E64);//
d72746572.get("/price-get/id=:Id", checkUser, r69746D707263.k676574);//
d72746572.delete("/price-delete/id=:Id", checkUser, r69746D707263.k646C74);//
d72746572.delete("/prices-delete/id=:Id", checkUser, r69746D707263.k646C74616C6C);//
d72746572.patch("/price-update/id=:Id", checkUser, r69746D707263.k75706474);//
d72746572.get("/price/get-null", checkUser, r69746D707263.k67616E6C6C666B);//
d72746572.patch("/price/update-null/id=:Id", checkUser, r69746D707263.k757064746E6C6C66B);//

module.exports = d72746572;








