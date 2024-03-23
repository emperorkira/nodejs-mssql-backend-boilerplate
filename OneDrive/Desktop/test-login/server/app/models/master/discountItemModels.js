const o73716C = require('mssql');
const o6462 = require("../../database/db");

class o6473636E7469746D {
    constructor() {}

    /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : February 08, 2024
    PURPOSE              : add an array of data
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : add(data)
    ****************************************************************/
    static async f616464(dataList) {
        let pool, transaction;
        try {
            if (!dataList || dataList.length === 0) { console.log('Invalid or empty dataList.'); return false; }
            pool = await o6462.f706C696E6974(); pool.setMaxListeners(15);
            transaction = new o73716C.Transaction(pool);
            await transaction.begin();
            for (const data of dataList) {
                const { DiscountId, ItemId, IsAutoDiscount } = data;
                if (ItemId !== null && typeof ItemId !== 'number') { console.log('Invalid data structure in dataList.'); continue; }
                const request = new o73716C.Request(transaction);
                const query = `INSERT INTO [MstDiscountItem] (DiscountId, ItemId, IsAutoDiscount) VALUES (@DiscountId, @ItemId, @IsAutoDiscount)`;
                request.input('DiscountId', o73716C.Int, DiscountId || null).input('ItemId', o73716C.Int, ItemId).input('IsAutoDiscount', o73716C.Bit, IsAutoDiscount);
                await request.query(query);
            }
            await transaction.commit();
            return true;
        } catch (error) {
            console.error('Error in f616464:', error);
            if (transaction) await transaction.rollback();
            throw error;
        } finally {
            try {
                if (pool) await pool.close(); pool=null;
            } catch (error) {
                console.error('Error closing database connection:', error);
                throw new Error(`Error closing database connection: ${error.message}`);
            }
        }
    }// END FUNCTION

    /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : February 08, 2024
    PURPOSE              : update an array of data
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(dataList)
    ****************************************************************/
    static async f757064(dataList) {
        let pool, transaction;
        try {
            if (!dataList || dataList.length === 0) { console.log('Invalid or empty dataList.'); return false; }
            pool = await o6462.f706C696E6974();
            pool.setMaxListeners(15);
            transaction = new o73716C.Transaction(pool);
            await transaction.begin();
            for (const data of dataList) {
                const { Id, DiscountId, ItemId, IsAutoDiscount } = data;
                if (ItemId !== null && typeof ItemId !== 'number') {
                    console.log('Invalid data structure in dataList.');
                    continue;
                }
                const request = new o73716C.Request(transaction);
                const query = `
                    UPDATE [MstDiscountItem] 
                    SET [ItemId] = @ItemId, [IsAutoDiscount] = @IsAutoDiscount
                    WHERE [Id] = @Id AND [DiscountId] =@DiscountId
                `;
                request.input('Id', o73716C.Int, Id)
                    .input('DiscountId', o73716C.Int, DiscountId)
                    .input('ItemId', o73716C.Int, ItemId)
                    .input('IsAutoDiscount', o73716C.Bit, IsAutoDiscount);
                await request.query(query);
            }
            await transaction.commit();
            return true;
        } catch (error) {
            console.error('Error in f616464:', error);
            if (transaction) await transaction.rollback();
            throw error;
        } finally {
            try {
                if (pool) {
                    await pool.close();
                    pool = null;
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
                throw new Error(`Error closing database connection: ${error.message}`);
            }
        }
    }// END FUNCTION

    /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : February 08, 2024
    PURPOSE              : UPDATE NULL FK IN BULK - DiscountItem
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : updateNullFK(Id, data)
    ****************************************************************/
    static async f75706474626C6BD(DiscountId, dataList) {
        let pool, transaction;
        try {
            if (!dataList || dataList.length === 0) {
                console.log('Invalid or empty dataList.');
                return false;
            }
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
                    UPDATE [MstDiscountItem] 
                    SET DiscountId = cases.DiscountId
                    FROM (VALUES ${placeholders}) AS cases(Id, DiscountId) 
                    WHERE [MstDiscountItem].[Id] = cases.Id
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
            try {
                if (pool) {
                    await pool.close();
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
                throw new Error(`Error closing database connection: ${error.message}`);
            }
        }
    }// END FUNCTION
    
}// END CLASS

/*
(async () => {
    try {
        const datalist =[
            {
                "Id": 11,
                "DiscountId": 10,
                "ItemId": 1,
                "IsAutoDiscount": 1,
                "ItemCode": "000001",
                "ItemDescription": "SERVICE CHARGE"
            },
            {
                "Id": 12,
                "DiscountId": 10,
                "ItemId": 1,
                "IsAutoDiscount": 1,
                "ItemCode": "000001",
                "ItemDescription": "SERVICE CHARGE"
            }
        ];
        const result = await o6473636E7469746D.f757064(datalist); // Corrected function call
        console.log(result);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
*/

module.exports = { o6473636E7469746D: o6473636E7469746D };
