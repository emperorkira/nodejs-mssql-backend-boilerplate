//INCLUDES
const { Account } = require("../../models/master/accountModels");
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
    let result = await Models.getAll('[MstAccount]');
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
      const result = await Models.find(dataId, '[MstAccount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (result===null) res.status(404).json({ message: "Account not found" });
      else return res.status(200).json({ message: "Account found" });
    } else return res.status(400).json({ message: "Invalid data ID" });
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
    if (!dataId) return res.status(400).json({ error: "Invalid Account ID" });

    const result = await Models.get(dataId, '[MstAccount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (result === null)return res.status(404).json({ error: "Account not found" });
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
    const result = await Models.find(dataId, '[MstAccount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Account not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const account = await Models.get(dataId,'[MstAccount]'); //GET DATA OF THE ACCOUNT
    const AccountCodes = ['1100', '1200', '1212', '1300', '1400', '2100', '2200', '2300', '2400', '4100', '5100', '5101'], errorCode=[]; //LIST OF DEFAULT ACCOUNTS
    for (const code of AccountCodes) {
      if (account.Code === code ) errorCode.push(code); 
    } 
    if (errorCode.length > 0) {
      const errorCodes = errorCode.join(', ');
      return res.status(400).send({ message: `Default Code[${errorCodes}] are cannot be deleted.` });
    }

    const result2 = await Models.delete(dataId, '[MstAccount]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Account deleted" });
    else return res.status(500).json({ message: "Something went wrong." });

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
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
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.update= async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the data's ID
    const selectedData = await Models.find(dataId, '[MstAccount]'); // FIND THE ITEM TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Account not found" }); //IF SEARCHED DATA IS NOT FOUNT THEN
  
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
    const selectedData = await Models.find(dataId, '[MstAccount]'); // FIND THE DATA TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Account not found" });
    
    const result = await Models.lock(dataId, '[MstAccount]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Locked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
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
    const selectedData = await Models.find(dataId, '[MstAccount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "Data not found" });

    const data = 0;    //GET DATA
    //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    const result = await Models.unlock(dataId, '[MstAccount]');
    if (result) return res.status(201).send({ message: 'Unlocked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Failed to Unlocked.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Unlocked()]", message: error.message });
  }
};//END HERE
//***************************************************************

