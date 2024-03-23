const { f6E6372797074, f646372797074 } = require('../../database/function'), o617468 = require('../auth');
const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    //return res.status(200).json('data');
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874);
    // access right
    //return res.status(200).json({ data : String(o02x747874.q0tcx01) });
    const data = await o6D646C73.f6765744151(String(o02x747874.q0tcx01));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[getAll()', message: error.message });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.get = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), CollectionId = parseInt(req.params.Id, 10);
    if (!CollectionId) return res.status(400).json({ message: 'CollectionId is null or undefined' });
    const data = await o6D646C73.f676574514644(o02x747874.q0tcx02, ['Id'], [o73716C.Int], [CollectionId]);
    if (!data) return res.status(404).json({ message: 'Collection not found' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[get(Id)]', message: error.message });
  }
};// END HERE
/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.find = async (req, res) => {
  try {
    const CollectionId = parseInt(req.params.Id, 10);
    if (!CollectionId) return res.status(400).json({ message: 'CollectionId is null or undefine' });
    const data = await o6D646C73.f666E64(CollectionId, '[TrnCollection]');
    if (!data) return res.status(404).json({ message: 'Collection not found.' });
    return res.status(200).json({ message: 'Collection found.' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[find(Id)]', message: error.message });
  }
};// END HERE
/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : DELETE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/
exports.delete = async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 21, 'CanDelete');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const CollectionId = req.params.Id;
    const find = await o6D646C73.find(CollectionId, '[TrnCollection]');
    if (!find)  return res.status(404).json({ message: 'Collection not found' });
    // CHECK LINKS
    const checkTrnSalesQuery = `SELECT CollectionId FROM TrnCollectionLine WHERE CollectionId = @CollectionId`;
    const checkTrnSales= await o6D646C73.findWithQFD(checkTrnSalesQuery, ['CollectionId'], [sql.Int], [CollectionId])
    if(checkTrnSales) return res.status(400).json({ message: 'Collection cannot be deleted. ' });
    // CHECK IsLocked
    const checkIsLocked = await o6D646C73.findWithQFD(`SELECT [IsLocked] FROM [TrnCollection] WHERE [Id]=@Id AND [IsLocked]=@IsLocked`, ['Id','IsLocked'], [sql.Int, sql.Bit], [CollectionId, '1'])
    if (checkIsLocked) return res.status(203).json({ message: 'Cannot delete, collection is locked.' });
    // DELETE IN TABLE
    const deleteCollection = await o6D646C73.delete(CollectionId, '[TrnCollection]');
    if (!deleteCollection) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ message: 'Collection deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[delete(Id)]', message: error.message  });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 13, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add()
****************************************************************/
/*
exports.add= async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 22, 'CanAdd');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    // check login/system date
    // check previous  tranaction if has the same date on this tranasaction date
    const data = await req.body, currentDate= new Date().toISOString(), lines = await config.readFileLines(env), PC = String(lines.UNIT);
    const MxQuery= `SELECT 
                    [Settings].[Id] AS [PcId],
                    [Settings].[PeriodId] AS [PcPeriodId],
                    [Settings].[TerminalId] AS [PcTerminalId],
                    [MstTerminal].[Terminal],
                    [MstPeriod].[Period]
                    FROM [Settings] 
                    LEFT JOIN [MstTerminal] ON [MstTerminal].[Id] =[Settings].[TerminalId]
                    LEFT JOIN [MstPeriod] ON [MstPeriod].[Id] =[Settings].[PeriodId]
                    WHERE [PC]=@PC`;
    //get with Query Field Fieldtype, Data
    const getMx = await o6D646C73.getWithQFD(MxQuery, ['PC'], [sql.NVarChar(255)], [PC]); //GET THE DEFAULT SETTINGS
    //SET THE TERMIANL AND PERIOD
    let MxTerminal='001', MxPeriod='001';
    if (getMx.length > 0) {
      MxTerminal = String(getMx[0].Terminal).padStart(3, '0');
      MxPeriod = String(getMx[0].Period).padStart(3, '0');
    }
    //for instance terminal=001 and period = 002
    let MxCollectionNumber = `${MxTerminal}-${MxPeriod}`; // set mixcollection number
    //collection number is a combination of terminal-period-code
    //get the latest code 
    const getCodeQuery=`SELECT TOP 1 [CollectionNumber] FROM [TrnCollection] WHERE [CollectionNumber] LIKE @MxCollectionNumber ORDER BY [Id] DESC`;
    const getCode = await o6D646C73.getWithQFD(getCodeQuery, ['MxCollectionNumber'], [sql.NVarChar(50)], [`${MxCollectionNumber}%`]);
    //const getCode = await o6D646C73.f6765744151();
    let code = (getCode.length <= 0 || !getCode[0].CollectionNumber) ? '0' : getCode[0].CollectionNumber.slice(-6);
    //NOW if the code contains only 6 digits it should not exceed that
    // if the code exceed 6 digits it should add +1 to period and start the code again from 1
    if (parseInt(code) >= 999999) {
      //for instance the latest CollectionNumber is 001-001-999999
      //then it would add 1 to period, 001-002-000001
      const PcPeriodId = parseInt(getMx[0].PcPeriodId) + 1;
      await o6D646C73.updateWithQFD(parseInt(getMx[0].PcId), '[Settings]', ['PeriodId'], [sql.Int], [PcPeriodId]);
      MxPeriod = String(MxPeriod).padStart(3, '0');
      code = '000000';
    }
    //set the code to 6 characters, if the code exceeds 999999 reset it to 1 then add the zero's on it to make it 000001
    const finalCode = String(parseInt(code) + 1).padStart(6, '0');
    //lastly concat all the components
    MxCollectionNumber = `${MxTerminal}-${MxPeriod}-${finalCode}`;
    return res.status(201).send({ message: MxCollectionNumber });

    //then MxColelctionNumber is the final collection number which the output should be 001-001-000001 as the first entry
    const requiredFields = [
        'PeriodId' ,'CollectionDate', 'CollectionNumber' ,'TerminalId' ,'ManualORNumber'
        ,'CustomerId'  ,'SalesBalanceAmount' ,'Amount' ,'TenderAmount'
        ,'ChangeAmount' ,'PreparedBy' ,'CheckedBy' ,'ApprovedBy' ,'IsCancelled' ,'IsLocked'
        ,'EntryUserId','EntryDateTime'
    ];
    const Fields = [
      'PeriodId' ,'CollectionDate', 'CollectionNumber' ,'TerminalId' ,'ManualORNumber'
      ,'CustomerId' ,'Remarks' ,'SalesId' ,'SalesBalanceAmount' ,'Amount' ,'TenderAmount'
      ,'ChangeAmount' ,'PreparedBy' ,'CheckedBy' ,'ApprovedBy' ,'IsCancelled' ,'IsLocked'
      ,'EntryUserId','EntryDateTime','PostCode'
  ];
    const FieldType =[
      sql.Int, sql.DateTime, sql.NVarChar(50), sql.Int, sql.NVarChar(50),
      sql.Int, sql.NVarChar(255), sql.Int, sql.Decimal(18,5), sql.Decimal(18,5), sql.Decimal(18,5),
      sql.Decimal(18,5), sql.Int, sql.Int, sql.Int, sql.Bit, sql.Bit, 
      sql.Int, sql.DateTime, sql.NVarChar(50)
    ];
    const FieldData =[
      data.PeriodId, data.CollectionDate, MxCollectionNumber, data.TerminalId, MxCollectionNumber,
      data.CustomerId, data.Remarks || null, data.SalesId || null, data.SalesBalanceAmount, data.Amount, data.TenderAmount,
      data.ChangeAmount, data.PreparedBy, data.CheckedBy, data.ApprovedBy, data.IsCancelled, 1, 
      data.EntryUserId || 1,  data.EntryDateTime || currentDate, data.PostCode || null
    ]; // LIST OF REQUIRED FIELDS
    const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null);
    const missingFieldNames = missingFields.join(', ');
    if (missingFields.length > 0) return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    // CHECK DUPLICATION
    const checkDuplicationQuery=`SELECT [CollectionNumber] FROM [TrnCollection] WHERE [CollectionNumber] = @CollectionNumber`;
    const checkDuplication = await o6D646C73.findWithQFD(checkDuplicationQuery, ['CollectionNumber'], [sql.NVarChar(50)], [MxCollectionNumber]);
    if (checkDuplication) return res.status(500).send({ message: 'Collection with ColelctionNumber already exist.' });
    // ADD TO DB
    const CollectionResult = await o6D646C73.addWithQFD( '[TrnCollection]', Fields, FieldType, FieldData );
    if (!CollectionResult) return res.status(500).send({ message: 'Something went wrong.' });
    return res.status(201).send({ message: 'Collection added successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[add()]', message: error.message });
  }
};//END HERE*/

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
/*
exports.update= async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 5, 'CanUpdate');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const CollectionId = req.params.Id;
    const selectedItem = await o6D646C73.find(CollectionId, ['TrnCollection']);
    if (!selectedItem)  return res.status(404).json({ message: 'Item not found' });
    // SET FIELDS
    const data = req.body, currentDate= new Date().toISOString();
    const requiredFields = [
      'CollectionNumber'  ,'ManualORNumber'
      ,'CustomerId' ,'Remarks' ,'SalesId' ,'SalesBalanceAmount' ,'Amount' ,'TenderAmount'
      ,'ChangeAmount','CheckedBy' ,'ApprovedBy' ,'IsCancelled',
      ,'UpdateUserId','UpdateDateTime','PostCode'
    ];
    const FieldType =[
      sql.NVarChar(50), sql.NVarChar(50),
      sql.Int, sql.NVarChar(255), sql.Int, sql.Decimal(18,5), sql.Decimal(18,5), sql.Decimal(18,5),
      sql.Decimal(18,5), sql.Int, sql.Int, sql.Int, sql.Bit, sql.Bit, 
      sql.Int, sql.DateTime, sql.NVarChar(50)
    ];
    const FieldData =[
      data.CollectionNumber, data.ManualORNumber,
      data.CustomerId, data.Remarks || null, data.SalesId || null, data.SalesBalanceAmount, data.Amount, data.TenderAmount,
      data.ChangeAmount, data.CheckedBy, data.ApprovedBy, data.IsCancelled, 
      data.UpdateUserId || 1,  data.UpdateDateTime || currentDate, data.PostCode || null
    ]; // LIST OF REQUIRED FIELDS
    const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null);
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }// SEND TO THE USER ALL MISSING FIELDS
    const item = await o6D646C73.updateWithQFD(CollectionId,'[TrnCollection]', requiredFields, FieldType, FieldData);
    if (item) return res.status(201).send({ message: 'Item updated successfully.' });
    else return res.status(500).send({ message: 'Failed to update item.' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[Update()]' , message: error.message });
  }
};// END HERE*/

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : LOCK SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id, tableName)
****************************************************************/
exports.lock= async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 5, 'CanUpdate');
    // if(!hasAccess ) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const CollectionId = req.params.Id;
    const findings = await o6D646C73.find(CollectionId, '[TrnCollection]');
    if (!findings) return res.status(404).json({ message: 'Collection not found' });
    // LOCK
    const result = await o6D646C73.lock(CollectionId, '[TrnCollection]');
    if (result) return res.status(201).send({ message: 'Locked successfully.' });
    else return res.status(500).send({ message: 'Something went wrong.' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[lock()]', message: error.message });
  }
};//END HERE
/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : UNLOCK SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(Id, tablename)
****************************************************************/
exports.unlock= async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 5, 'CanUpdate');
    // if(!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const CollectionId = req.params.Id;
    const findings = await o6D646C73.find(CollectionId, '[TrnCollection]');
    if (!findings) return res.status(404).json({ message: 'Collection not found' });
    // UNLOCK
    const result = await o6D646C73.unlock(CollectionId, '[TrnCollection]');
    if (result) return res.status(201).send({ message: 'Unlocked successfully.' });
    else return res.status(500).send({ message: 'Something went wrong.' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[Unlocked()]', message: error.message });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAllSales = async (req, res, next) => {
  try {
      const query= 'SELECT SalesNumber, SalesDate, Amount FROM [TrnSales]';
      const data = await o6D646C73.f6765744151(query);
      return res.status(200).json(data);
  } catch (error) {
      return res.status(500).json({ error: 'Controller Error[getAllSales()', message: error.message });
  }
};// END HERE
/****************************************************************
STATUS               : WORKING
DATE CREATED/UPDATED : November 29, 2023
PURPOSE              : ForPreparedBy ,CheckBy, ApprovedBy
PROGRAMMER           : MARK DINGLASA
FUNCTION NAME        : getAll()
****************************************************************/
exports.getAllUsers = async (req, res, next) => {
  try {
      // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 22, 'CanView');
      // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
      // AUTHORIZED
      const Query=`SELECT Id, FullName FROM [MstUser]`;
      const data = await o6D646C73.f6765744151(Query);
      return res.status(200).json(data);
  } catch (error) {
      return res.status(500).json({ error: 'Controller Error[getAllSales()', message: error.message });
  }
};// END HERE