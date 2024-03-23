const { f706C696E6974 } = require("../database/db"), o73716C = require('mssql');
function isString(value) {  return typeof value === 'string' || value instanceof String; }

class o6D646C73 {
  static async f67746C6C(d74626C6E6D65) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `SELECT * FROM ${d74626C6E6D65}`;
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.recordset || [];
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
         await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(getAll): ${error.message}`);
      }
    }
  }// END HERE
 
  static async f676574(c4964, d74626C6E6D65) {
    let c706F6F6C;
    try {
      if (isNaN(c4964)) throw new Error('Id must be a number');
      if (typeof d74626C6E6D65 !== 'string') throw new Error('d74626C6E6D65 must be a string');
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `SELECT * FROM ${d74626C6E6D65} WHERE Id = @Id`;
      c72717374.input('Id', o73716C.Int, c4964);
      const d72736C74 = await c72717374.query(c717279);
      return (d72736C74.recordset.length > 0)? d72736C74.recordset[0]:  null;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(get): ${error.message}`);
      }
    }
  }// END HERE
  
  static async f676574514644(c717279, Field = [], ar666C64747970 = [], Data = []) {
    let c706F6F6C;
    try {
      if (!c717279) throw new Error('SQL c717279 is empty or invalid');
      if (!Field || !Data || Field.length !== Data.length || Field.length !== ar666C64747970.length) throw new Error('Field, Data, or ar666C64747970 is empty, or their lengths do not match');
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      for (let i = 0; i < Field.length; i++) {
        if (Data[i] !== undefined) c72717374.input(Field[i], ar666C64747970[i], Data[i]);
        else throw new Error(`Data for field '${Field[i]}' is undefined`);
      }
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.recordset || [];
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (closeError) {
        throw closeError;
      }
    }
  }// END HERE
  
  //get
  static async f67657451(c4964, c717279) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      c72717374.input('Id', o73716C.Int, c4964);
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.recordset || [];
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(getWithc717279): ${error.message}`);
      }
    }
  }// END HERE
  
  // get all with query
  static async f6765744151(c717279) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.recordset || [];
    } catch (error) {
      throw new Error(`Database c717279 error: ${error}`);
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(getAllWithc717279): ${error.message}`);
      }
    }
  }// END HERE
  


  static async f666E64(c4964, d74626C6E6D65) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `SELECT [Id] FROM ${d74626C6E6D65} WHERE [Id] = @c4964`;
      c72717374.input('c4964', o73716C.Int, c4964);
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.recordset.length > 0;
    } catch (error) {
      throw new Error(`ModelsError[find(c4964,d74626C6E6D65)]: ${error}`);
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(find): ${error.message}`);
      }
    }
  }// END HERE
  
  static async f666E64514644(c717279, Field = [], ar666C64747970 = [], Data = []) {
    let c706F6F6C;
    try {
      if (!c717279) throw new Error('SQL c717279 is empty or invalid');
      if (!Field || !Data || Field.length !== Data.length || Field.length !== ar666C64747970.length) throw new Error('Field, Data, or ar666C64747970 is empty, or their lengths do not match');
      c706F6F6C = await f706C696E6974();
      c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      for (let i = 0; i < Field.length; i++) {
        if (Data[i] !== undefined) c72717374.input(Field[i], ar666C64747970[i], Data[i]);
        else throw new Error(`Data for field '${Field[i]}' is undefined`);
      }
      const d72736C74 = await c72717374.query(c717279);
      return (d72736C74.recordset.length !== 0);
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(findWithQFD): ${error.message}`);
      }
    }
  }// END HERE

  static async f666E6451(c717279) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.recordset.length > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(findWithc717279): ${error.message}`);
      }
    }
  }// END HERE
  
  static async f646C7451(c717279) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const d72736C74 = await c72717374.query(c717279);
      return true;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(deleteWithc717279): ${error.message}`);
      }
    }
  }

  static async f646C74(c4964, d74626C6E6D65) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `DELETE FROM ${d74626C6E6D65} WHERE Id = @c4964`;
      c72717374.input('c4964', o73716C.Int, c4964);
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.rowsAffected[0] === 1;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(delete): ${error.message}`);
      }
    }
  }// END HERE
  
  static async deleteAllWithField(c4964, Field, d74626C6E6D65) {
    let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `DELETE FROM ${d74626C6E6D65} WHERE ${Field} = @c4964`;
      c72717374.input('c4964', o73716C.Int, c4964);
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(deleteAllWithField): ${error.message}`);
      }
    }
  }// END HERE

  static async f646C746177666C64(c4964, Field, d74626C6E6D65) {
    let c706F6F6C;
    try {
      if(!c4964 || !Field || !d74626C6E6D65 ){
        console.log('Fields are empty'); return false;
      }
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `DELETE FROM ${d74626C6E6D65} WHERE ${Field} = @c4964`;
      c72717374.input('c4964', o73716C.Int, c4964);
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(deleteAllWithField): ${error.message}`);
      }
    }
  }
  
  static async f646C74716664(c4964, FieldList, tableList) {
    let c706F6F6C;
    try {
      if (!tableList || !Array.isArray(tableList) || tableList.length === 0) throw new Error('Table is undefined or null');
      if (!FieldList || !Array.isArray(FieldList) || FieldList.length !== tableList.length) throw new Error('Field list is undefinde or null');  
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const transaction = new o73716C.Transaction(c706F6F6C);
      await transaction.begin();
      for (let i = 0; i < tableList.length; i++) {
        const c72717374 = new o73716C.c72717374(transaction);
        const c717279 = `DELETE FROM ${tableList[i]} WHERE ${FieldList[i]} = @c4964`;
        c72717374.input('c4964', o73716C.Int, c4964);
        await c72717374.query(c717279);
      }
      await transaction.commit();
      return true;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(deleteMultiple): ${error.message}`);
      }
    }
  }// END HERE

  static async f6C636B(Id, d74626C6E6D65) {
    let c706F6F6C; const data = 1;
    try {
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `UPDATE ${d74626C6E6D65} SET IsLocked = @IsLocked WHERE Id = @Id`;
      const d72736C74 = await c72717374.input('Id', o73716C.Int, Id).input('IsLocked', o73716C.Int, data || 0).query(c717279);
      return d72736C74.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(lock): ${error.message}`);
      }
    }
  }// END HERE
  
  static async f6E6C636B(Id, d74626C6E6D65) {
    const data = 0; let c706F6F6C;
    try {
      c706F6F6C = await f706C696E6974();  c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const c717279 = `UPDATE ${d74626C6E6D65} SET IsLocked = @IsLocked WHERE Id = @Id`;
      const d72736C74 = await c72717374.input('Id', o73716C.Int, Id).input('IsLocked', o73716C.Int, data || 0).query(c717279);
      return d72736C74.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(unlock): ${error.message}`);
      }
    }
  }// END HERE
  
  static async f616464514644(d74626C6E6D65, ar666C6473 = [], ar666C64747970 = [], ar666C64647461 = []) {
    let c706F6F6C;
    try {
      if (!d74626C6E6D65) throw new Error('Table name field is missing.');
      if (!ar666C6473 || !ar666C64647461 || ar666C6473.length !== ar666C64647461.length || ar666C6473.length !== ar666C64747970.length) throw new Error('Field, Data, or ar666C64747970 is empty, or their lengths do not match');
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request(), d666C646D6E73 = ar666C6473.join(', ');
      const d666C6470726D = ar666C6473.map((c666C6473) => `@${c666C6473}`).join(', ');
      const c717279 = `INSERT INTO ${d74626C6E6D65}(${d666C646D6E73}) VALUES (${d666C6470726D})`;
      ar666C6473.forEach((c666C6473, index) => {
        if (ar666C64647461[index] !== undefined) c72717374.input(c666C6473, ar666C64747970[index], ar666C64647461[index]);
        else throw new Error(`Data for field '${c666C6473}' is undefined`);
      });
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(addWithQFD): ${error.message}`);
      }
    }
  }// END HERE

  // add in bulk, add(tablename, field, fieldtype, data)
  static async add(d74626C6E6D65, ar666C6473 = [], ar666C64747970 = [], ar666C64647461 = []) {
    let c706F6F6C;
    try {
      if (!Array.isArray(ar666C6473) || !Array.isArray(ar666C64747970) || !Array.isArray(ar666C64647461) || ar666C6473.length !== ar666C64747970.length || ar666C6473.length !== ar666C64647461[0].length) throw new Error('Invalid input: Field, ar666C64747970, or ar666C64647461 arrays are either not arrays or have different lengths.');
      if (ar666C64647461.length === 0) throw new Error('ar666C64647461 array is empty.');
      c706F6F6C = await f706C696E6974(); 
      c706F6F6C.setMaxListeners(15);
      const transaction = new o73716C.Transaction(c706F6F6C);
      await transaction.begin();
      for (const c64617461 of ar666C64647461) {
        const c72717374 = new o73716C.c72717374(transaction);
        const d666C646D6E73 = ar666C6473.join(', ');
        const d666C6470726D = ar666C6473.map((c666C6473) => `@${c666C6473}`).join(', ');
        const c717279 = `INSERT INTO ${d74626C6E6D65}(${d666C646D6E73}) VALUES (${d666C6470726D})`;
        ar666C6473.forEach((c666C6473, x001x) => {
          c72717374.input(c666C6473, ar666C64747970[x001x], c64617461[x001x]);
        });
        await c72717374.query(c717279);
      } await transaction.commit();
      return true;
    } catch (error) {
      if (c706F6F6C && transaction) await transaction.rollback();
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(add): ${error.message}`);
      }
    }
  }// END HERE

  // update data in bulk, update(Id, tablename, field, fieldtype, data)
  static async update(Id, tableName, fields, fieldTypes, data) {
    let pool;
    try {
        if (!Array.isArray(fields) || !Array.isArray(fieldTypes) || !Array.isArray(data) || fields.length !== fieldTypes.length || fields.length !== data[0].length) {
            throw new Error('Invalid input: Fields, fieldTypes, or data arrays are either not arrays or have different lengths.');
        }
        if (data.length === 0) {
            throw new Error('Data array is empty.');
        }
        pool = await f706C696E6974(); pool.setMaxListeners(15);
        const transaction = new o73716C.Transaction(pool);
        await transaction.begin();
        for (const item of data) {
            const request = new o73716C.Request(transaction);
            const setExpressions = fields.map((field, index) => `${field} = @${field}${index}`);
            const updateQuery = `UPDATE ${tableName} SET ${setExpressions.join(', ')} WHERE id = @id`;
            fields.forEach((field, index) => {
                request.input(field, fieldTypes[index], item[index]);
            });
            request.input('id', o73716C.Int, Id); // Pass the ID as a parameter
            await request.query(updateQuery);
        }
        await transaction.commit();
        return true;
    } catch (error) {
        if (pool && transaction) await transaction.rollback();
        throw error;
    } finally {
        try {
            if (pool) {
                await pool.close();
                pool = null;
            }
        } catch (error) {
            throw new Error(`Error closing database connection (update): ${error.message}`);
        }
    }
  }
  

  static async f75706474514644(c4964, d74626C6E6D65, ar666C6473 = [], ar666C64747970 = [], ar666C64647461 = []) {
    let c706F6F6C;
    try {
      if (!c4964) throw new Error('Id field is missing.');
      if (!d74626C6E6D65) throw new Error('Table name field is missing.');
      if (!Array.isArray(ar666C6473) || !Array.isArray(ar666C64647461) || !Array.isArray(ar666C64747970) || ar666C6473.length !== ar666C64647461.length || ar666C6473.length !== ar666C64747970.length) throw new Error('Field, Data, or ar666C64747970 arrays are either not arrays or have different lengths.');
      c706F6F6C = await f706C696E6974(); c706F6F6C.setMaxListeners(15);
      const c72717374 = c706F6F6C.request();
      const sc666C6473 = ar666C6473.map(c666C6473 => `${c666C6473} = @${c666C6473}`).join(', ');
      const c717279 = `UPDATE ${d74626C6E6D65} SET ${sc666C6473} WHERE [Id] = @c4964`;
      c72717374.input('c4964', o73716C.Int, c4964);
      ar666C6473.forEach((c666C6473, x001x) => {
        c72717374.input(c666C6473, ar666C64747970[x001x], ar666C64647461[x001x]);
      });
      const d72736C74 = await c72717374.query(c717279);
      return d72736C74.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (c706F6F6C) {
          await c706F6F6C.close(); c706F6F6C = null;
        }
      } catch (error) {
        throw new Error(`Error closing database c706F6F6C(update): ${error.message}`);
      }
    }
  }// END HERE
  
}//END CLASS MODELS
(async () => {
  //const env = o707468.resolve(__dirname, '../../env.txt');
  //const res = await o6D646C73.f6765744151( "SELECT * FROM Mstitem" );
  //console.log(res)
})();
//EXPORT THE CLASS
module.exports = {
    o6D646C73: o6D646C73
  };
  