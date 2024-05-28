import { ADD } from '..';
import poolPromise, { conn } from '../../config/database.config';
import sql from 'mssql';


describe('ADD.records', () => {
  beforeAll(async () => {
    await poolPromise; // Ensure the database connection is established before running tests
  });

  afterEach(async () => {
    // Clean up inserted records after each test
    const pool:any = await conn();
    await pool.request().query('DELETE FROM [dbo].[AuditTrail]');
  });
  
  it('should insert multiple records into the database', async () => {
    const Table = 'AuditTrail'; // Replace with your table name
    const Fields = [ 'UserId', 'Action', 'Record', 'RecordTable', 'DateCreated' ];
    const Types = [ sql.Int, sql.NVarChar(50), sql.Int, sql.NVarChar(50), sql.DateTime ];
    const dataList:any = [ 
      [1, 'test-action1',1, 'test-table1', "2024-05-03"],
      [1, 'test-action2',1, 'test-table2', "2024-05-03"],
      [1, 'test-action3',1, 'test-table3', "2024-05-03"],
    ];
    
    const result = await ADD.records(Table, Fields, Types, dataList);
    
    // Check if records are successfully inserted
    expect(result).toBe(true);

    // Query database to verify inserted records
    const pool:any = await conn();
    const queryResult = await pool.request().query(`SELECT * FROM ${Table}`);
    
    // Assert that the number of retrieved records matches the number of inserted records
    expect(queryResult.recordset.length).toBe(dataList.length);
  });
  it('should fail if table name is missing', async () => {
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int, sql.DateTime];
    const dataList = [['testData1', 123, new Date()]];

    await expect(ADD.records('', Fields, Types, dataList)).rejects.toThrow('Table name field is missing.');
  });

  it('should fail if table name is missing', async () => {
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int, sql.DateTime];
    const dataList = [['testData1', 123, new Date()]];

    await expect(ADD.records('', Fields, Types, dataList)).rejects.toThrow('Table name field is missing.');
  });

  it('should fail if any field data is undefined', async () => {
    const Table = 'AuditTrail';
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int, sql.DateTime];
    const dataList = [
      ['testData1', 123, undefined], // Field3 data is undefined
      ['testData2', 456, new Date()]
    ];

    await expect(ADD.records(Table, Fields, Types, dataList)).rejects.toThrow("Data for field 'field3' in record 1 is undefined");
  });

  it('should fail if parameter lengths do not match', async () => {
    const Table = 'AuditTrail';
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int];
    const dataList = [['testData1', 123]]; // Only two fields provided

    await expect(ADD.records(Table, Fields, Types, dataList)).rejects.toThrow('Parameter is empty, or their lengths do not match');
  });
  // Add more test cases as needed to cover various scenarios
});