require('dotenv').config();

//  IMPORT APP
const app = require('./app');
const port = 3000;

//  LISTING TO PORT
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
