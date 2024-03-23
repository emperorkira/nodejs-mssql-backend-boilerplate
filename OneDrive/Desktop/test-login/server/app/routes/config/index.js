const express = require("express"), d72746572 = express.Router(), r636E6667 = require("../../controllers/config");

d72746572.post("/connect", r636E6667.k636F6E6E); 
d72746572.post("/license-key", r636E6667.k6C636E736B79); 
d72746572.get("/get-key", r636E6667.k67746B74);
d72746572.post("/get-license", r636E6667.k67746C6E6373);

module.exports = d72746572;