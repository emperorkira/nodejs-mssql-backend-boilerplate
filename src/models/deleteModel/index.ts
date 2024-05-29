/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { conn } from '../../config';
import sql, { Int, NVarChar, Transaction } from 'mssql'; 

class Delete {

    /**
     * Remove specific record from a given Id.
     * @param {number} Id
     * @param {string} Table
     * @returns {Promise<Boolean>}
    */
    async recordById(Id: number = 0, Table: string = ''): Promise<boolean> {
        let flag = false;
        try {
            if (isNaN(Id) || typeof Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));

            if (!Table || typeof Table !== 'string') return Promise.reject( new Error('Table name must be provided as a non-empty string'));

            if (Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));

            const pool:any = await conn();
            if (!pool) return Promise.reject(new Error('Connection failed'));

            const result = await pool.request().input('Id', Int, Id).query(`DELETE FROM [dbo].[${Table}] WHERE [Id] = @Id`);
            if (result.rowsAffected[0] !== 1) return Promise.reject(new Error('Database query returned no results'));
            flag = true;
        } catch (error:any) {
            throw new Error(`Error removing records from ${Table}: ${error.message}`);
        }
        return flag;
    } // END HERE

    /**
     * Remove specific record from a given query.
     * @param {string} Query
     * @returns {Promise<Boolean>}
    */
    async recordByQuery(Query: string = ''): Promise<boolean> {
        let flag = false;
        try {
            if (typeof Query !== 'string' || !Query) return Promise.reject( new Error('Query must be provided as a non-empty string'));

            const pool:any = await conn();
            if (!pool) return Promise.reject(new Error('Connection failed'));

            const result = await pool.request().query(Query);
            if (result.rowsAffected[0] < 1) return Promise.reject(new Error('Database query returned no results'));
            flag = true;
        } catch (error:any) {
            throw new Error(`Error removing records, using recordByQuery: ${error.message}`);
        } 
        return flag;
    } // END HERE

    /**
     * Remove multiple records based on given fields.
     * @param {string} Query - The Query.
     * @param {Array} Field - An array of field names for the WHERE clause.
     * @param {Array} Type - An array of SQL data types corresponding to the Field.
     * @param {Array} Data - An array of data values corresponding to the Field.
     * @returns {Promise<Boolean>}
    */
    async recordByFields(Query: string = '', Field: Array<any> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<boolean> {
        let flag = false;
        try {
            if (!Query || typeof Query !== 'string') return Promise.reject( new Error('Query must be provided as a non-empty string'));

            if (!Field.every(field => field !== undefined)) {
            const undefinedIndex1:any = Field.findIndex((field, index) => field === undefined);
            return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex1, 10) +1}' is undefined`));
            }

            if (!Type.every((field: undefined) => field !== undefined)) {
            const undefinedIndex2:any = Type.findIndex((field: undefined, index: any) => field === undefined);
            return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex2, 10) +1}' is undefined`));
            }

            if (!Data.every(field => field !== undefined)) {
            const undefinedIndex3:any = Data.findIndex((field, index) => field === undefined);
            return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex3, 10) +1}' is undefined`));
            }

            if (!Field || !Data || !Type || Field.length !== Data.length || Field.length !== Type.length) return Promise.reject(new Error('Parameter is empty, or their lengths do not match'));

            const pool:any = await conn(); 
            if (!pool) return Promise.reject(new Error('Connection failed'));

            const request = pool.request();
            Field.forEach((field, index) => {
                request.input(field, Type[index], Data[index]);
            });

            const result = await request.query(Query);
            if (result.rowsAffected[0] < 1) return Promise.reject(new Error('Database query returned no results'));
            flag = true;
        } catch (error:any) {
            throw new Error(`Error removing records, using recordByFields: ${error.message}`);
        } 
        return flag;
    }

    /**
     * Remove multiple records based on an array of IDs.
     * @param {Array} Data - An array of record IDs to delete.
     * @param {string} Table - The name of the table.
     * @returns {Promise<Boolean>}
    */
    async recordByIds(Data: Array<any> = [], Table: string = ''): Promise<boolean> {
        let transaction, flag = false, res = 0;
        try {
            // Data = list of Ids => [ {"Id":1}, {"Id":2}, {"Id":3}]
            if (typeof Table !== 'string' || !Table) return Promise.reject(new Error('Table name must be provided as a non-empty string'));

            if (!Array.isArray(Data) || Data.length === 0) return Promise.reject(new Error('Data parameter is missing or empty.'));

            if (Data.some(obj => obj === undefined || obj.Id === undefined)) {
                return Promise.reject( new Error(`One or more Id's in the Data array are undefined`));
            }
    
            const pool: any = await conn();
            if (!pool) return Promise.reject(new Error('Connection failed'));
            
            transaction = new sql.Transaction(pool);
            await transaction.begin();
    
            const batchSize = 15;
            const request = new sql.Request(transaction);
            for (let i = 0; i < Data.length; i += batchSize) {
                const batch = Data.slice(i, i + batchSize);
                const idParams = batch.map((_, index) => `@Id${i + index}`).join(', ');
                batch.forEach((idObj, index) => {
                    request.input(`Id${i + index}`, sql.Int, idObj.Id);
                });
                const query = `DELETE FROM [dbo].[${Table}] WHERE Id IN (${idParams})`;
                const result = await request.query(query);
                res+=result.rowsAffected[0];
            }
            if (res < 1) return Promise.reject(new Error('Database query returned no results'));
            await transaction.commit();
            flag = true;
        } catch (error: any) {
            if (transaction) {
                await transaction.rollback();
            }
            throw new Error(`Error removing records, using recordByIds: ${error.message}`);
        }
        return flag;
    }
}; // END CLASS

export default new Delete();

/*
(async() => {
    try {
        const Data1 = [
            {Id:1}, {Id:2},
            {Id:3}, {Id:4},
            {Id:5}, {Id:6},
            {Id:7}, {Id:8},
            {Id:9}, {Id:10},
            {Id:11}, {Id:12},
            {Id:13}, {Id:14},
            {Id:15}, {Id:16},
            {Id:17}, {Id:18},
            {Id:19}, {Id:20},
            {Id:21}, {Id:22},
            {Id:23}, {Id:24},
            {Id:25}, {Id:26},
            {Id:27}, {Id:28},
            {Id:29}, {Id:30},
            {Id:31}, {Id:32},
            {Id:33}, {Id:34},
            {Id:35}, {Id:36},
            {Id:37}, {Id:38},
            {Id:39}, {Id:undefined}
        ];

        const Data2 =  [{Id:undefined}]
        const result:any = await DELETE.recordByIds(Data1, 'AccessRight');
        console.log(result);
    } catch (error:any) {
        console.log(error);
    }
})();*/