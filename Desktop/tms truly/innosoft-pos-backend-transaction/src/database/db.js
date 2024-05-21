import  sql from 'mssql'; import { config } from './index.js';

export async function conn() {
  try {
    const connection =  sql.connect(config);
    return connection;
  } catch (error) {
    throw new Error(`Database Config: ${error.message}`);
  }
}

(async () => {
  try{
    conn;
    console.log('Database Connected');
  }catch(error){
    console.log('Database connection error');
  }
})();

