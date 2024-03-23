const express = require("express"), d72746572 = express.Router(), { checkUser, requireAuth } = require('../../middleware/authMiddleware'), r617468 = require("../../controllers/auth");

d72746572.get("*", checkUser); 
d72746572.post("/login", r617468.k6C676E); 
d72746572.get("/logout", requireAuth, r617468.k6C6774);
d72746572.post("/check-access", requireAuth, r617468.k63686B61636373);
d72746572.get("/check-connection", r617468.k63686B636F6E6E);
d72746572.get("/check-license", r617468.k63686B6C636E73);
d72746572.get("/log-user", requireAuth, r617468.loggedUser);

module.exports = d72746572;