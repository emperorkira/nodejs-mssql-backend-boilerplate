const express = require("express"), d72746572 = express.Router(), r757372 = require("../../controllers/master/mstUserController"), { checkUser } = require('../../middleware/authMiddleware');

d72746572.get("/", checkUser, r757372.k67746C6C);//
d72746572.post("/add", checkUser, r757372.k616464);
d72746572.get("/get/id=:Id", checkUser, r757372.k676574);//
d72746572.get("/find/id=:Id", checkUser, r757372.k666E64);//
d72746572.patch("/update/id=:Id", checkUser, r757372.k75706474);//
d72746572.delete("/delete/id=:Id", checkUser, r757372.k646C74);
d72746572.patch("/lock/id=:Id", checkUser, r757372.k6C636B);//
d72746572.patch("/unlock/id=:Id", checkUser, r757372.k6E6C636B);//
d72746572.get("/system-forms", checkUser, r757372.k67617366726D);//
d72746572.get("/get-userId", checkUser, r757372.k674964);//

d72746572.get("/rights-get/id=:Id", checkUser, r757372.k67757372616373);
d72746572.get("/right-get/id=:Id/userId=:UserId", checkUser, r757372.k67616373);
d72746572.get("/rights-copy/id=:Id", checkUser, r757372.k67636172);
d72746572.post("/rights-add/id=:Id", checkUser, r757372.k6164626C6B );
d72746572.patch("/rights-update/id=:Id", checkUser, r757372.k75706474626C6B);
d72746572.delete("/rights-delete/id=:Id", checkUser, r757372.k6C7861636332676874);
d72746572.delete("/right-delete/id=:Id", checkUser, r757372.k6C7461636332676874);
d72746572.get("/rights/get-null", checkUser, r757372.k67616E6C6C666B);
d72746572.patch("/rights/update-null/id=:Id", checkUser, r757372.k5706474414E6C46);

module.exports = d72746572;

