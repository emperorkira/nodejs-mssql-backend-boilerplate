//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
class Terminal {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.Terminal=data.Terminal;
  }

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : static function for create or add new data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : create(data)
  ****************************************************************/
  static async add(data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `INSERT INTO [MstTerminal](Terminal) VALUES(@Terminal)`;
      request.input('Terminal', sql.NVarChar(50), data.Terminal);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

 /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : static function for update specific data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
  ****************************************************************/
  static async update(Id, data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = ` UPDATE [MstTerminal] SET Terminal= @Terminal  WHERE Id = @Id`;
      request
        .input('Id', sql.Int, Id)
        .input('Terminal', sql.NVarChar(50), data.Terminal);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0)  return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Terminal: Terminal,
};
