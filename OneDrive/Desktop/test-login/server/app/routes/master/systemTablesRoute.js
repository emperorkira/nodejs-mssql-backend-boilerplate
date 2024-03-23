const express = require("express"), d72746572 = express.Router(), r6163636E74 = require("../../controllers/master/mstAccountController"), r7079747970 = require("../../controllers/master/mstPayTypeController"), r7478 = require("../../controllers/master/mstTaxController"), r756E74 = require("../../controllers/master/mstUnitController"), r707264 = require("../../controllers/master/mstPeriodController"), r74726D6E6C = require("../../controllers/master/mstTerminalController"), { checkUser } = require('../../middleware/authMiddleware');

d72746572.get("/accounts/", checkUser, r6163636E74.k67746C6C);//
d72746572.post("/accounts/add", checkUser, r6163636E74.k616464);//
d72746572.get("/accounts/get/id=:Id", checkUser, r6163636E74.k676574);//
d72746572.get("/accounts/find/id=:Id", checkUser, r6163636E74.k666E64);//
d72746572.patch("/accounts/update/id=:Id", checkUser, r6163636E74.k75706474);//
d72746572.delete("/accounts/delete/id=:Id", checkUser, r6163636E74.k646C74);//
d72746572.patch("/accounts/lock/id=:Id", checkUser, r6163636E74.k6C636B);//
d72746572.patch("/accounts/unlock/id=:Id", checkUser, r6163636E74.k6E6C636B);//

d72746572.get("/pay-type/", checkUser, r7079747970.k67746C6C);//
d72746572.post("/pay-type/add", checkUser, r7079747970.k616464);//
d72746572.get("/pay-type/get/id=:Id", checkUser, r7079747970.k676574);//
d72746572.get("/pay-type/get-accounts", checkUser, r7079747970.k6761707974706363);//
d72746572.get("/pay-type/find/id=:Id", checkUser, r7079747970.k666E64);//
d72746572.patch("/pay-type/update/id=:Id", checkUser, r7079747970.k75706474);//
d72746572.delete("/pay-type/delete/id=:Id", checkUser, r7079747970.k646C74);//

d72746572.get("/tax/", checkUser, r7478.k67746C6C);//
d72746572.post("/tax/add", checkUser, r7478.k616464);
d72746572.get("/tax/get/id=:Id", checkUser, r7478.k676574); //
d72746572.get("/tax/get-accounts", checkUser, r7478.k67617478);//
d72746572.get("/tax/find/id=:Id", checkUser, r7478.k666E64);//
d72746572.patch("/tax/update/id=:Id", checkUser, r7478.k75706474);//
d72746572.delete("/tax/delete/id=:Id", checkUser, r7478.k646C74);//

d72746572.get("/unit/", checkUser, r756E74.k67746C6C);//
d72746572.post("/unit/add", checkUser, r756E74.k616464);//
d72746572.get("/unit/get/id=:Id", checkUser, r756E74.k676574);//
d72746572.get("/unit/find/id=:Id", checkUser, r756E74.k666E64);//
d72746572.patch("/unit/update/id=:Id", checkUser, r756E74.k75706474);//
d72746572.delete("/unit/delete/id=:Id", checkUser, r756E74.k646C74);//

d72746572.get("/period/", checkUser, r707264.k67746C6C);//
d72746572.post("/period/add", checkUser, r707264.k616464);//
d72746572.get("/period/get/id=:Id", checkUser, r707264.k676574);//
d72746572.get("/period/find/id=:Id", checkUser, r707264.k666E64);//
d72746572.patch("/period/update/id=:Id", checkUser, r707264.k75706474);//
d72746572.delete("/period/delete/id=:Id", checkUser, r707264.k646C74);//

d72746572.get("/terminal/", checkUser, r74726D6E6C.k67746C6C);//
d72746572.post("/terminal/add", checkUser, r74726D6E6C.k616464);//
d72746572.get("/terminal/get/id=:Id",checkUser, r74726D6E6C.k676574);//
d72746572.get("/terminal/find/id=:Id", checkUser, r74726D6E6C.k666E64);//
d72746572.patch("/terminal/update/id=:Id", checkUser, r74726D6E6C.k75706474);//
d72746572.delete("/terminal/delete/id=:Id", checkUser, r74726D6E6C.k646C74);//

module.exports = d72746572;