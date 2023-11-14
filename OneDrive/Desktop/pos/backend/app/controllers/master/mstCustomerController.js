//INCLUDES
const { Customer } = require("../../models/master/customerModels");
const { Models } = require('../../models');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : display()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    const query=`SELECT MstCustomer.[Id]
                    ,MstCustomer.[Customer]
                    ,MstCustomer.[Address]
                    ,MstCustomer.[ContactNumber]
                    ,EntryUser.[FullName] AS EntryUser
                    ,MstCustomer.[EntryDateTime]
                    ,UpdateUser.[FullName] AS UpdateUser
                    ,MstCustomer.[UpdateDateTime]
                    ,MstCustomer.[IsLocked]
                FROM MstCustomer 
                INNER JOIN MstUser AS EntryUser ON EntryUser.Id = MstCustomer.EntryUserId
                INNER JOIN MstUser AS UpdateUser ON UpdateUser.Id = MstCustomer.UpdateUserId`;
    const result = await Models.getAllWithQuery(query);
    return res.status(200).json(result); 
  } catch (error) {
    return res.status(500).json({error: "Controller Error[getAll]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id) returns TRUE/FALSE
****************************************************************/
exports.find = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (dataId) {
      const result = await Models.find(dataId, '[MstCustomer]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (result===null) res.status(404).json({ message: "Customer not found" });
      else return res.status(200).json({ message: "Customer found" });
    } else return res.status(400).json({ message: "Invalid Customer ID" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id) returns DATA
****************************************************************/
exports.get = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (!dataId) return res.status(400).json({ error: "Invalid Customer ID" });

    const result = await Models.get(dataId, '[MstCustomer]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (result === null)return res.status(404).json({ error: "Customer not found" });
    else return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
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
    const result = await Models.find(dataId, 'MstCustomer'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Customer not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE

    let query=` SELECT TrnSales.Id 
                FROM TrnSales 
                INNER JOIN MstCustomer ON MstCustomer.Id = TrnSales.CustomerId
                WHERE TrnSales.CustomerId='${dataId}' AND MstCustomer.Id!='5451'`//Walk-in;
    const checkId = await Models.findWithQuery(query);
    if (checkId)   return res.status(400).json({ message: `Customer cannot be deleted.`  });

    const result2 = await Models.delete(dataId, '[MstCustomer]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Customer deleted" });
    else return res.status(500).json({ message: "Something went wrong ." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add()
****************************************************************/
exports.add= async (req, res) => {
  try {
    const data = req.body;
    const requiredFields = ['Customer', 'Address', 'ContactPerson', 'ContactNumber', 'CreditLimit','TermId', 'TIN', 'WithReward', 'RewardConversion', 'AccountId','EntryUserId', 'EntryDateTime','UpdateUserId', 'UpdateDateTime', 'IsLocked'];

    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);
    }

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstCustomer] WHERE Customer ='${data.Customer}'`);
    if (checkData) {return res.status(400).json({ message: 'Customer already exists.' });}

    const result = await Customer.create(data);
    if (result) return res.status(201).send({ message: 'Customer added successfully.' });
    else return res.status(500).send({ message: 'Something went wrong .' });
  
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add()]", message: error.message  });
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.update= async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the data's ID
    const selectedData = await Models.find(dataId, '[MstCustomer]');    // FIND THE ITEM TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Customer not found" }); //IF SEARCHED DATA IS NOT FOUNT THEN
    
    const data = req.body;    //GET DATA
    const requiredFields = [ 'Customer', 'Address', 'ContactPerson', 'ContactNumber', 'CreditLimit','TermId', 'TIN', 'WithReward', 'RewardConversion', 'AccountId','EntryUserId', 'EntryDateTime','UpdateUserId', 'UpdateDateTime'];
    const missingFields = [];  //SET ARRAY FIELD FOR MISSING FIELDS
    for (const field of requiredFields) { //LOOP THE FIELDS TO CHECK EACH DATA IF ITS NOT NULL OR UNDEFINED
      if (data[field] === undefined || data[field] === null) missingFields.push(field); //ADD ALL MISSING FIELDS
    }

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }//SEND TO THE USER ALL MISSING FIELDS

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstCustomer] WHERE Id<>'${dataId}' AND Customer ='${data.Customer}'`);
    if (checkData) {return res.status(400).json({ message: 'Data already exists.' });}

    const result = await Customer.update(dataId, data); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Customer updated successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong .' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Update()]", message: error.message  });
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
    const selectedData = await Models.find(dataId, '[MstCustomer]'); // FIND THE DATA TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Customer not found" });
    
    const result = await Models.lock(dataId, '[MstCustomer]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Locked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong .' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[lock()]", message: error.message });
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
    const selectedData = await Models.find(dataId, '[MstCustomer]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "Customer not found" });
    
    const result = await Models.unlock(dataId, '[MstCustomer]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Unlocked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong .' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Unlocked()]", message: error.message });
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : DISPLAAy ALL SALES ACCOUNT
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : displaySalesAccount()
****************************************************************/
exports.getAllSalesAccount = async (req, res, next) => {
  try {
    const Id=req.params.Id;
    let query =`SELECT 
                  TrnSales.SalesDate, 
                  TrnSales.SalesNumber, 
                  TrnSales.CustomerId, 
                  TrnSales.Amount, 
                  TrnSales.PaidAmount, 
                  TrnSales.CreditAmount, 
                  TrnSales.DebitAmount, 
                  TrnSales.BalanceAmount, 
                  TrnSales.IsLocked,
                  TrnSales.IsCancelled 
                FROM  [TrnSales] 
                INNER JOIN MstCustomer ON MstCustomer.Id=TrnSales.CustomerId
                WHERE TrnSales.IsLocked=1 AND 
                TrnSales.IsCancelled=0 AND
                CustomerId='${Id}'
                ORDER BY TrnSales.SalesDate DESC`;
    let result = await Models.getAllWithQuery(query);
    return res.status(200).json(result); 
  } catch (error) {
    //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
    return res.status(500).json({ error: "Controller Error[displaySalesAccount]", message: error.message  });
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : 
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllTerm()
****************************************************************/
exports.getAllTerm = async (req, res, next) => {
  try {
    let query =`SELECT 
                  MstTerm.Id, 
                  MstTerm.Term, 
                  MstTerm.NumberOfDays AS [Number of Days] 
                FROM  [MstTerm]`;
    let result = await Models.getAllWithQuery(query);
    return res.status(200).json(result); 

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[displaySalesAccount]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : 
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllCustomerAccount()
****************************************************************/
exports.getAllCustomerAccount = async (req, res, next) => {
  try {
    let query =`SELECT 
                  MstAccount.Id, 
                  MstAccount.Account, 
                  MstAccount.AccountType 
                FROM [MstAccount]
                WHERE MstAccount.Account Is Not Null
                AND MstAccount.AccountType='ASSET' 
                ORDER BY MstAccount.Account`;
    let result = await Models.getAllWithQuery(query);
    res.status(200).json(result); 

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[displaySalesAccount]", message: error.message  });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : 
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllPriceDescription()
****************************************************************/
exports.getAllPriceDescription = async (req, res, next) => {
  try {
    let query =`SELECT MstItemPrice.PriceDescription 
                FROM [MstItemPrice] 
                GROUP BY MstItemPrice.PriceDescription 
                HAVING Not MstItemPrice.PriceDescription Is Null
                ORDER BY MstItemPrice.PriceDescription`;
    let result = await Models.getAllWithQuery(query);
    return res.status(200).json(result); 

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[displaySalesAccount]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************