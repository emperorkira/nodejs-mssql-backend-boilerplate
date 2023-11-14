//INCLUDES
const { Item } = require("../../models/master/itemModels");
const { Models } = require("../../models");

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    const query=`SELECT 
                      [MstItem].[Id] AS Id
                      ,[MstItem].[ItemCode]
                      ,[MstItem].[BarCode]
                      ,[MstItem].[ItemDescription]
                      ,[MstItem].[Category]
                      ,[MstItem].[Price]
                      ,[MstUnit].[Unit]
                      ,[MstItem].[ImagePath]
                      ,[MstItem].[OnhandQuantity]
                      ,[MstItem].[IsInventory]
                      ,[EntryUser].[FullName] AS [EntryUser]
                      ,[MstItem].[EntryDateTime]
                      ,[UpdateUser].[FullName] AS [UpdateUser]
                      ,[MstItem].[UpdateDateTime]
                      ,[MstItem].[IsLocked]
                FROM MstItem 
                INNER JOIN [MstUnit] ON [MstUnit].[Id] = [MstItem].[UnitId]
                INNER JOIN [MstUser] AS EntryUser ON [EntryUser].[Id] = [MstItem].[EntryUserId]
                INNER JOIN [MstUser] AS UpdateUser ON [UpdateUser].[Id] = [MstItem].[UpdateUserId]`;
    const data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[display()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL SALES ACCOUNT
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : displaySalesAccount()
****************************************************************/
exports.getAllSalesAccount = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstAccount.Id,
                  MstAccount.Account AS [Account Name],
                  MstAccount.Code AS [Account Code],
                  MstAccount.AccountType 
                FROM [MstAccount] 
                WHERE MstAccount.AccountType='SALES'`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllSalesAccount]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : GET ALL ASSET ACCOUNT
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllAssetAccount()
****************************************************************/
exports.getAllAssetAccount = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstAccount.Id,
                  MstAccount.Account AS [Account Name],
                  MstAccount.Code AS [Account Code],
                  MstAccount.AccountType 
                FROM [MstAccount] 
                WHERE MstAccount.AccountType='ASSET'`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllAssetAccount]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL COST ACCOUNT
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllCostAccount()
****************************************************************/
exports.getAllCostAccount = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstAccount.Id,
                  MstAccount.Account AS [Account Name],
                  MstAccount.Code AS [Account Code],
                  MstAccount.AccountType 
                FROM [MstAccount] 
                WHERE MstAccount.AccountType='EXPENSES'`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllCostAccount]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL TAX 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllTax()
****************************************************************/
exports.getAllTax = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstTax.Id, 
                  MstTax.Tax 
                FROM [MstTax]
                GROUP BY MstTax.Id, MstTax.Tax`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllTax]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL ITEM Unit
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemUnit()
****************************************************************/
exports.getAllItemUnit = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstUnit.Id, 
                  MstUnit.Unit 
                FROM [MstUnit] 
                ORDER BY MstUnit.Unit`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllItemUnit]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL ITEM CATEGORY
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemCategory()
****************************************************************/
exports.getAllItemCategory = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstItem.Category 
                FROM [MstItem]
                GROUP BY 
                  MstItem.Category 
                HAVING MstItem.Category Is Not Null 
                ORDER BY MstItem.Category`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllItemCategory]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL ITEM CATEGORY
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemSupplier()
****************************************************************/
exports.getAllItemSupplier = async (req, res, next) => {
  try {
    let query = `SELECT 
                  MstSupplier.Id, 
                  MstSupplier.Supplier 
                FROM [MstSupplier]`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllItemSupplier]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.get = async (req, res) => {
  try {
    let query =`SELECT 
                  [MstItem].*,
                  [SalesAccount].[Code] AS [SalesCode],
                  [SalesAccount].[Account] AS [SalesAccount],
                  [AssetAccount].[Code] AS [AssetCode],
                  [AssetAccount].[Account] AS [AssetAccount],
                  [CostAccount].[Code] AS [CostCode],
                  [CostAccount].[Account] AS [CostAccount],
                  [InTax].[Tax] AS [InTax],
                  [OutTax].[Tax] AS [OutTax],
                  [Unit].[Unit] AS [Unit],
                  [Supplier].[Supplier] AS [Supplier],
                  [EntryUser].[FullName] AS [EntryName],
                  [UpdateUser].[FullName] AS [UpdateName]
                FROM [MstItem] 
                INNER JOIN [MstAccount] AS SalesAccount ON SalesAccount.[Id] = [MstItem].[SalesAccountId]
                INNER JOIN [MstAccount] AS AssetAccount ON AssetAccount.[Id] = [MstItem].[AssetAccountId]
                INNER JOIN [MstAccount] AS CostAccount ON CostAccount.[Id] = [MstItem].[CostAccountId]
                INNER JOIN [MstSupplier] AS Supplier ON Supplier.[Id] = [MstItem].[DefaultSupplierId]
                INNER JOIN [MstTax] AS InTax ON InTax.[Id] = [MstItem].[InTaxId]
                INNER JOIN [MstTax] AS OutTax ON OutTax.[Id] = [MstItem].[OutTaxId]
                INNER JOIN [MstUnit] AS Unit ON Unit.[Id] = [MstItem].[UnitId]
                INNER JOIN [MstUser] AS EntryUser ON EntryUser.[Id] = [MstItem].[EntryUserId]
                INNER JOIN [MstUser] AS UpdateUser ON UpdateUser.[Id] = [MstItem].[UpdateUserId]
                WHERE MstItem.Id = @Id`;
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (dataId) {
      const data = await Models.getWithQuery(dataId,query); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "Data not found" });
      else return res.status(200).json(data);
    } else return res.status(400).json({ message: "Invalid data ID" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[get(Id)]", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 13, 2023
  PURPOSE              : GET THE LATEST ITEM ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.getItemCode = async (req, res) => {
  try {
    const ItemCode = await Models.getAllWithQuery(`SELECT TOP 1 [ItemCode]  FROM [MstItem] ORDER BY [Id] DESC`);
    if (ItemCode) return res.status(200).json(parseInt(ItemCode[0].ItemCode,10)+1);
    else return res.status(400).json({ message: "No ItemId found." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.find = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (dataId) {
      const data = await Models.find(dataId, '[MstItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "Data not found." });
      else return res.status(200).json({ message: "Data found." });
    } else return res.status(400).json({ message: "Invalid data ID" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : DELETE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/
exports.delete = async (req, res) => {
  try {
    const dataId = req.params.Id;
    const result = await Models.find(dataId, '[MstItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Data not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE

    const checkTrnSales= await Models.findWithQuery(`SELECT ItemId FROM TrnSalesLine WHERE ItemId='${dataId}'`)
    if(checkTrnSales) return res.status(400).json({ message: "Data cannot be deleted. " });

    const result2 = await Models.delete(dataId, '[MstItem]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Data deleted" });
    else return res.status(500).json({ message: "Data deletion failed" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 13, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add()
****************************************************************/
exports.add= async (req, res) => {
  try {
   
    const data = req.body;
    const requiredFields = [
      'BarCode', 'Category', 'ItemDescription', 'Alias', 'GenericName', 'Category', 'SalesAccountId', 'AssetAccountId','CostAccountId','InTaxId', 'OutTaxId', 'UnitId', 'DefaultSupplierId', 'Cost', 'MarkUp','Price', 'ImagePath', 'ReorderQuantity', 'OnhandQuantity', 'IsInventory', 'EntryUserId', 'EntryDateTime', 'UpdateUserId', 'UpdateDateTime'
    ];// LIST OF REQUIRED FIELDS

    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);
    }//STOCK THE MISSING FIELDS

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing1.` });
    }//RETURN THE MISSING FIELDS
     
    const checkItemPrice = await Models.findWithQuery(
            `SELECT * 
            FROM [MstItem] 
            WHERE
            (
              (Barcode <> 'NA' OR ItemDescription <> 'NA') -- Handle 'NA' inputs
              AND
              (Barcode = '${data.Barcode}' OR ItemDescription = '${data.ItemDescription}')
            )
            OR
            (
              Barcode = '${data.Barcode}' AND ItemDescription = '${data.ItemDescription}' -- Check for duplicates
            )`);
    if (checkItemPrice) {return res.status(400).json({ message: 'Item already exists.' });} 

    let ItemCode0 = 0;
    const getItemCode = await Models.getAllWithQuery(`SELECT TOP 1 ItemCode FROM MstItem ORDER BY Id DESC`);
    if(getItemCode) ItemCode0=parseInt(getItemCode[0].ItemCode,10)+1;
    else ItemCode0+=1;
    
    const item = await Item.add(ItemCode0, data);
    if (item) return res.status(201).send({ message: 'Item added successfully.' });
    else return res.status(500).send({ message: 'Failed to add item.' });
    
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add()]", message: error.message });
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.update= async (req, res) => {
  try {
    const itemId = req.params.Id; // Assuming req.params.Id contains the item's ID
    const selectedItem = await Models.find(itemId, ['MstItem']); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedItem)  return res.status(404).json({ message: "Item not found" }); //IF SEARCHED ITEM IS NOT FOUNT THEN
    const data = req.body;    //GET DATA
    const requiredFields = [
      'BarCode', 'Category', 'ItemDescription', 'Alias', 'GenericName', 'Category', 'SalesAccountId', 'AssetAccountId','CostAccountId','InTaxId', 'OutTaxId', 'UnitId', 'DefaultSupplierId', 'Cost', 'MarkUp','Price', 'ImagePath', 'ReorderQuantity', 'OnhandQuantity', 'IsInventory', 'UpdateUserId', 'UpdateDateTime'
    ];// LIST OF REQUIRED FIELDS
    
    const missingFields = [];//SET ARRAY FIELD FOR MISSING FIELDS
    //LOOP THE FIELDS TO CHECK EACH DATA IF ITS NOT NULL OR UNDEFINED
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);  //ADD ALL MISSING FIELDS
    }

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing2.` });
    }//SEND TO THE USER ALL MISSING FIELDS

    const checkItemPrice = await Models.findWithQuery(`SELECT Id FROM [MstItem] WHERE Id<>'${itemId}' AND (Barcode <>'NA' AND ItemDescription <> 'NA') AND (Barcode ='${data.Barcode}' OR ItemDescription='${data.ItemDescription}')`);
    if (checkItemPrice) {return res.status(400).json({ message: 'Item already exists.' });}

    const item = await Item.update(itemId, data); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (item) return res.status(201).send({ message: 'Item updated successfully.' });  //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Failed to update item.' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
  
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Update()]" , message: error.message });
  }
};//END HERE
//****************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : LOCK SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id, tableName)
****************************************************************/
exports.lock= async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the data's ID
    const selectedData = await Models.find(dataId, '[MstItem]'); // FIND THE DATA TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Data not found" });
    
    const result = await Models.lock(dataId, '[MstItem]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Locked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Failed to lock the.' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Controller Error[lock()]", message: error.message });
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : UNLOCK SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(Id, tablename)
****************************************************************/
exports.unlock= async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the data's ID
    const selectedData = await Models.find(dataId, '[MstItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "Data not found" });

    const result = await Models.unlock(dataId, '[MstItem]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Unlocked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Failed to Unlocked.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Unlocked()]", message: error.message });
  }
};//END HERE
//****************************************************************