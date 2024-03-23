const express = require("express"), d72746572 = express.Router(), { checkUser } = require('../../middleware/authMiddleware'), d727472 = require('./itemRoute'), r6473636E74 = require('./discountRoute'), r6373746D72 = require('./customerRoute'), r73706C72 = require('./supplierRoute'), r737973746D74626C = require('./systemTablesRoute'), r757372 = require('./userRoute');

d72746572.get("*", checkUser); 
d72746572.use("/item", d727472);   
d72746572.use("/discount", r6473636E74);  
d72746572.use("/customer", r6373746D72);  
d72746572.use("/supplier", r73706C72);  
d72746572.use("/system-tables", r737973746D74626C); 
d72746572.use("/user",  r757372);

module.exports = d72746572;