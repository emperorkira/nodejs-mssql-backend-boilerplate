  /**
   * AUTHOR       : Mark Dinglasa
   * COMMENT/S    : N/A
   * CHANGES      : N/A
   * LOG-DATE     : 2024-05-27 11:48PM
  */
 
  import  sql from 'mssql'; import { config } from '../type/index.js';

  export async function conn() {
    try {
      if (!config) throw new Error(`Database Config: ${error.message}`);
      const connection =  sql.connect(config);
      return connection;
    } catch (error) {
      throw new Error(`Database Config: ${error.message}`);
    }
  }

  (async () => {
    try{
      conn();
      console.log('Database Connected ' + config.server);
    }catch(error){
      console.log('Database connection error');
    }
  })();

