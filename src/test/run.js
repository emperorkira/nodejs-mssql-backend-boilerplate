  /**
   * AUTHOR       : Mark Dinglasa
   * COMMENT/S    : TEST SERVER
   * CHANGES      : N/A
   * LOG-DATE     : 2024-05-27 11:48PM
  */
  import 'dotenv/config'
  import app from './app.js'

  const port = process.env.PORT || 3500;

  //  LISTING TO PORT
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
