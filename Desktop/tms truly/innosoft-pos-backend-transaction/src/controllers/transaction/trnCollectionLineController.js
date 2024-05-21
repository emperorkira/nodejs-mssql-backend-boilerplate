// INCLUDES
const { Models } = require("../../models");
// const _Auth = require('../auth');
const sql = require('mssql');
/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 21, 'CanView');
    // if(!hasAccess ) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const Id =  req.params.Id;//CollectionId
    const query=`SELECT [TrnCollectionLine].*, 
                  [MstPayType].[PayType], 
                  [TrnStockIn].[StockInNumber]
                  FROM TrnCollectionLine 
                LEFT JOIN [TrnStockIn] ON [TrnStockIn].[Id] = [TrnCollectionLine].[CollectionId]
                INNER JOIN [MstPayType] ON [MstPayType].[Id] = [TrnCollectionLine].[PayTypeId]
                INNER JOIN [MstAccount] ON [MstAccount].[Id] = [TrnCollectionLine].[AccountId]
                WHERE [TrnCollectionLine].[CollectionId] =  @Id`;
    const data = await Models.getAllWithQFD(query, '[TrnCollectionLine]', ['Id'], [sql.Int], [Id]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAll()", message: error.message });
  }
};//END HERE
/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAllCreditCardType = async (req, res, next) => {
    try {
        //const hasAccess = await _Auth.checkAccessRights(req.user.Id, 22, 'CanView');
        // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
        //AUTHORIZED
        const Query=`SELECT Id, FullName FROM [MstUser]`;
        const data = await Models.getAllWithQuery(Query);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Controller Error[getAllSales()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
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
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 22, 'CanView');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const Query = 'SELECT FROM [TrnCollection] WHERE [TrnCollection].[Id] = @Id';
    const CollectionId = req.params.Id;
    if (!CollectionId) return res.status(400).json({ message: "Invalid CollectionId" });
    const data = await Models.getWithQuery(CollectionId, Query);
    if (!data) return res.status(404).json({ message: "Collection not found" });
    else return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[get(Id)]", message: error.message });
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
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 22, 'CanView');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const CollectionId = req.params.Id;
    if (CollectionId) {
      const data = await Models.find(CollectionId, '[TrnCollection]');
      if (!data) return res.status(404).json({ message: "Collection not found." });
      else return res.status(200).json({ message: "Collection found." });
    } else return res.status(400).json({ message: "Invalid CollectionId" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message });
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
    const result = await Models.find(CollectionId, '[TrnCollection]');
    if (!result)  return res.status(404).json({ message: "Collection not found" });
    // CHECK LINKS
    const checkTrnSalesQuery = 'SELECT CollectionId FROM TrnCollectionLine WHERE CollectionId = @CollectionId';
    const checkTrnSales= await Models.findWithQFD(checkTrnSalesQuery, ['CollectionId'], [sql.Int], [CollectionId])
    if(checkTrnSales) return res.status(400).json({ message: "Collection cannot be deleted. " });
    // DELETE IN TABLE
    const result2 = await Models.delete(CollectionId, '[TrnCollection]');
    if (result2) return res.status(200).json({ message: "Collection deleted" });
    else return res.status(500).json({ message: "Something went wrong." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  });
  }
};// END HERE
/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 13, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add()
****************************************************************/
exports.add= async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 22, 'CanAdd');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const data = req.body, currentDate= new Date().toISOString();
    const requiredFields = [
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
      data.PeriodId, data.CollectionDate, data.CollectionNumber, data.TerminalId, data.ManualORNumber,
      data.CustomerId, data.Remarks || null, data.SalesId || null, data.SalesBalanceAmount, data.Amount, data.TenderAmount,
      data.ChangeAmount, data.PreparedBy, data.CheckedBy, data.ApprovedBy, data.IsCancelled, 1, 
      data.EntryUserId || 1, req.session.date || currentDate, data.PostCode || null
    ]; // LIST OF REQUIRED FIELDS
    const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null);
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }// RETURN THE MISSING FIELDS
    const CollectionResult = await Models.addWithQFD( '[TrnCollection]', requiredFields, FieldType, FieldData );
    if (CollectionResult) return res.status(201).send({ message: 'Collection added successfully.' });
    else return res.status(500).send({ message: 'Soemthing went wrong.' });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add()]", message: error.message });
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.update= async (req, res) => {
  try {
    // const hasAccess = await _Auth.checkAccessRights(req.user.Id, 5, 'CanUpdate');
    // if (!hasAccess) return res.status(403).json({message: `No access rights, User not authorized.` });
    // AUTHORIZED
    const CollectionId = req.params.Id;
    const selectedItem = await Models.find(CollectionId, ['TrnCollection']); 
    if (!selectedItem)  return res.status(404).json({ message: "Item not found" });
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
      data.UpdateUserId || 1, req.session.date || currentDate, data.PostCode || null
    ]; // LIST OF REQUIRED FIELDS
    const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null);
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }// SEND TO THE USER ALL MISSING FIELDS
    const item = await Models.updateWithQFD(CollectionId,'[TrnCollection]', requiredFields, FieldType, FieldData);
    if (item) return res.status(201).send({ message: 'Item updated successfully.' });
    else return res.status(500).send({ message: 'Failed to update item.' });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Update()]" , message: error.message });
  }
};// END HERE
