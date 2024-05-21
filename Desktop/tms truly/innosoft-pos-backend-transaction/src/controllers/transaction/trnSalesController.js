//INCLUDES
//const { Sales } = require("../../models/transaction/trnSalesModels");
const { Models } = require('../../models');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 17, 2023
  PURPOSE              : Display all sales data within a certain day
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllSales()
****************************************************************/
exports.getAllSales = async (req, res, next) => {
  try {
    const query=`SELECT
                    TrnSales.SalesDate,
                    TrnSales.SalesNumber,
                    CASE WHEN TrnSales.IsCancelled = 'True' THEN 0 ELSE TrnSales.Amount END AS Amount1,
                    TrnSales.CustomerId,
                    ISNULL(TrnSales.Remarks, '') AS Remarks1,
                    TrnSales.Id,
                    MstCustomer.Customer,
                    MstUser.UserName,
                    MstTerminal.Terminal,
                    TrnSales.IsLocked,
                    CASE WHEN TrnSales.PaidAmount > 0 THEN 'True' ELSE 'False' END AS IsCollected,
                    TrnSales.IsCancelled,
                    CONVERT(NVARCHAR, TrnSales.SalesDate, 101) AS SalesDateFilter
                FROM TrnSales
                INNER JOIN MstCustomer On MstCustomer.Id=TrnSales.CustomerId
                INNER JOIN MstUser ON MstUser.Id = TrnSales.SalesAgent
                INNER JOIN MstTerminal ON MstTerminal.Id = TrnSales.TerminalId`;
    const result = await Models.getAllWithQuery(query);
    return res.status(200).json(result); 
  } catch (error) {
    return res.status(500).json({error: "Controller Error[getAll]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 18, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getSales(sales-number) returns DATA
****************************************************************/

exports.getSales = async (req, res) => {
  try {
    const  TrnSalesId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (!TrnSalesId) return res.status(400).json({ error: "Invalid Sales Number" });
    const result = await Models.get(TrnSalesId, '[TrnSales]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (result === null)return res.status(404).json({ error: "Account not found" });
    else return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : DELETE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/
exports.deleteSales = async (req, res) => {
  try {
    const dataId = req.params.Id;
    const result = await Models.find(dataId, '[TrnSales]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Sales not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.deleteMultiple(dataId, ['[SalesId]','[Id]','[SalesId]'],['[TrnCollection]','[TrnSales]','[TrnSalesLine]']); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Sales deleted" });
    else return res.status(500).json({ message: "Something went wrong." });

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};
//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
/*
exports.add= async (req, res) => {
  try {
    const data = req.body;
    const requiredFields = ['Code', 'Account', 'IsLocked'];
    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstAccount] WHERE  Code ='${data.Code}'`);
    if (checkData) {return res.status(400).json({ message: 'Account already exists.' });}

    const result = await Account.add(data);
    if (result) return res.status(201).send({ message: 'Account added successfully.' });
    else  return res.status(500).send({ message: 'Something went wrong.' });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add()]", message: error.message  });
  }
};
*/
//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
/*
exports.update= async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the data's ID
    const findings = await Models.find(dataId, '[MstAccount]'); // FIND THE ITEM TO CONFIRM THE DATA EXISTS
    if (!findings) return res.status(404).json({ message: "Account not found" }); //IF SEARCHED DATA IS NOT FOUNT THEN
  
    const data = req.body;    //GET DATA
    const requiredFields = [ 'Code', 'Account'];
    const missingFields = []; //SET ARRAY FIELD FOR MISSING FIELDS

    for (const field of requiredFields) { //LOOP THE FIELDS TO CHECK EACH DATA IF ITS NOT NULL OR UNDEFINED
      if (data[field] === undefined || data[field] === null) missingFields.push(field); //ADD ALL MISSING FIELDS 
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }//SEND TO THE USER ALL MISSING FIELDS
   
    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstAccount] WHERE  Id<>'${dataId}' AND Code ='${data.Code}'`);
    if (checkData) {return res.status(400).json({ message: 'Account already exists.' });}

    const result = await Account.update(dataId, data);  //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Account updated successfully.' });
    else return res.status(500).send({ message: 'Something went wrong.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
  } catch (error) {
    res.status(500).json({ error: "Controller Error[Update()]", message: error.message  });
  }
};
*/
//END HERE
//****************************************************************

