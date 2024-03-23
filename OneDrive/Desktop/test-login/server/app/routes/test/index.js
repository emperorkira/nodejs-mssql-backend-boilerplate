const express = require("express"), d72746572 = express.Router(), { checkUser, requireAuth } = require('../../middleware/authMiddleware'), r617468 = require("../../controllers/auth");
const test = require('../../controllers/test')

d72746572.get("/", test.testing ); 
d72746572.post("/register", test.register);
d72746572.post("/pass", test.pass);

module.exports = d72746572;