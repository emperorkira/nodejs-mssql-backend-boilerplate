/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : SERVER
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import app from './app'
import * as dotenv from "dotenv";
import {conn} from './config'

dotenv.config(); conn();

const port = process.env.PORT || 3500;
//  LISTING TO PORT
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
