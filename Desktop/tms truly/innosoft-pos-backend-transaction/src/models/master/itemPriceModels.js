const o73716C = require('mssql'), o6462 = require("../../database/db");

class o69746D707263 {
  constructor() {}

  static async f616464(dataList) {
    let pool, transaction;
    try {
        if (!dataList || !Array.isArray(dataList) || dataList.length === 0) { console.log('Invalid or empty dataList.'); return false; }
        pool = await o6462.f706C696E6974(); pool.setMaxListeners(15); transaction = new o73716C.Transaction(pool);
        await transaction.begin();
        for (const data of dataList) {
            const { ItemId, PriceDescription, Price, TriggerQuantity } = data;
            if ( ItemId !== null && (typeof ItemId !== 'number' || typeof PriceDescription !== 'string' || isNaN(parseFloat(Price)) || isNaN(parseFloat(TriggerQuantity))) ) {
              console.log('Invalid data structure in dataList.'); continue;
            }
            const request = new o73716C.Request(transaction);
            const query = `INSERT INTO [MstItemPrice](ItemId, PriceDescription, Price, TriggerQuantity) VALUES (@ItemId, @PriceDescription, @Price, @TriggerQuantity)`;
            request.input('ItemId', o73716C.Int, ItemId).input('PriceDescription', o73716C.NVarChar(255), PriceDescription).input('Price', o73716C.Decimal(18, 5), Price).input('TriggerQuantity', o73716C.Decimal(18, 5), TriggerQuantity);
            await request.query(query);
        }
        await transaction.commit();
        return true;
    } catch (error) {
        console.error('Error in f616464:', error);
        if (transaction) await transaction.rollback();
        throw error;
    } finally {
        if (pool) { pool.close(); pool = null; }
    }
  }// END HERE


  // UPDATE NULL FK IN BULK - ItemPrice
  static async f75706474626C6B(ItemId, dataList) {
    let pool, transaction;
    try {
        pool = await o6462.f706C696E6974();
        pool.setMaxListeners(35);
        transaction = new o73716C.Transaction(pool);
        await transaction.begin();
        const batchSize = 35;
        const request = new o73716C.Request(transaction);
        for (let i = 0; i < dataList.length; i += batchSize) {
            const batch = dataList.slice(i, i + batchSize);
            const placeholders = batch
                .map((_, index) => `(@Id${i + index}, @ItemId${i + index})`).join(',');
            const query = `
              UPDATE [MstItemPrice] 
              SET ItemId = cases.ItemId
              FROM (VALUES ${placeholders}) AS cases(Id, ItemId) 
              WHERE [MstItemPrice].[Id] = cases.Id
            `;
            batch.forEach((data, index) => {
                request.input(`Id${i + index}`, o73716C.Int, data.Id);
                request.input(`ItemId${i + index}`, o73716C.Int, ItemId);
            });
            await request.query(query);
        }
        await transaction.commit();
        return true;
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    } finally {
        await pool.close();
        pool = null;
    }
  }// END FUNCTION

  // UPDATE NULL FK IN BULK - DiscountItem
  static async f75706474626C6BD(DiscountId, dataList) {
    let pool, transaction;
    try {
        pool = await o6462.f706C696E6974();
        pool.setMaxListeners(35);
        transaction = new o73716C.Transaction(pool);
        await transaction.begin();
        const batchSize = 35;
        const request = new o73716C.Request(transaction);
        for (let i = 0; i < dataList.length; i += batchSize) {
            const batch = dataList.slice(i, i + batchSize);
            const placeholders = batch
                .map((_, index) => `(@Id${i + index}, @DiscountId${i + index})`).join(',');
            const query = `
              UPDATE [MstDiscountPrice] 
              SET DiscountId = cases.DiscountId
              FROM (VALUES ${placeholders}) AS cases(Id, DiscountId) 
              WHERE [MstDiscountPrice].[Id] = cases.Id
            `;
            batch.forEach((data, index) => {
                request.input(`Id${i + index}`, o73716C.Int, data.Id);
                request.input(`DiscountId${i + index}`, o73716C.Int, DiscountId);
            });
            await request.query(query);
        }
        await transaction.commit();
        return true;
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    } finally {
        await pool.close();
        pool = null;
    }
  }// END FUNCTION
}//CLASS

  /*
 (async () => {
  try {
   const datalist = [
                        {
                            "Id": 53,
                            "ItemId": null,
                            "PriceDescription": "3123",
                            "Price": 3,
                            "TriggerQuantity": 3
                        },
                        {
                            "Id": 54,
                            "ItemId": null,
                            "PriceDescription": "2",
                            "Price": 2,
                            "TriggerQuantity": 2
                        }
                    ];
   const result = await f75706474626C6B(1, datalist );
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
  */

module.exports = { o69746D707263: o69746D707263 };
  