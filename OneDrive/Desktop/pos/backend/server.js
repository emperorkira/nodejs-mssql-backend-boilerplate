//IMPORT .ENV
require('dotenv').config();

//IMPORT APP
const app = require('./app');

//PORT
const port = process.env.BACKEND_PORT || 3000;

//LISTING TO PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
