//INCLUDES
const { Tax } = require("../../models/master/taxModels");
const { Models } = require('../../models');

/****************************************************************
STATUS               : WORKING
DATE CREATED/UPDATED : September 29, 2023
PURPOSE              : DISPLAY ALL DATA
PROGRAMMER           : MARK DINGLASA
FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
try {
  let data = await Models.getAll('[MstTax]');
  return res.status(200).json(data); 
} catch (error) {
  return res.status(500).json({ error: "Controller Error[getAll()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
}
};//END HERE
//***************************************************************

/****************************************************************
STATUS               : WORKING
DATE CREATED/UPDATED : September 29, 2023
PURPOSE              : DISPLAY ALL DATA
PROGRAMMER           : MARK DINGLASA
FUNCTION NAME        : getAll()
****************************************************************/
exports.getAllTaxAccount = async (req, res, next) => {
  try {
    let query=`SELECT MstAccount.Id, MstAccount.Account, MstAccount.AccountType
              FROM MstAccount
              WHERE MstAccount.Account IS NOT NULL
                    AND MstAccount.AccountType = 'LIABILITY'
              ORDER BY MstAccount.Account`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllTaxAccount()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
  };//END HERE
  //***************************************************************
  

/****************************************************************
STATUS               : WORKING
DATE CREATED/UPDATED : September 30, 2023
PURPOSE              : GET ONE SPECIFIC DATA
PROGRAMMER           : MARK DINGLASA
FUNCTION NAME        : get(Id)
****************************************************************/
exports.get = async (req, res) => {
try {
  const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
  if (dataId) {
    const data = await Models.get(dataId, '[MstTax]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!data) return res.status(404).json({ message: "Tax not found" });
    else return res.status(200).json(data);
  } else return res.status(400).json({ message: "Invalid Tax ID" });
} catch (error) {
 return res.status(500).json({ error: "Controller Error[get(Id)]", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
}
};//END HERE
//***************************************************************

/****************************************************************
STATUS               : WORKING
DATE CREATED/UPDATED : September 30, 2023
PURPOSE              : FIND ONE SPECIFIC DATA
PROGRAMMER           : MARK DINGLASA
FUNCTION NAME        : find(Id)
****************************************************************/
exports.find = async (req, res) => {
try {
  const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
  if (dataId) {
    const data = await Models.find(dataId, '[MstTax]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!data) return res.status(404).json({ message: "Tax not found." });
    else return res.status(200).json({ message: "Tax found." });
  } else return res.status(400).json({ message: "Invalid data ID" });
} catch (error) {
  return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
}
};//END HERE
//***************************************************************

/****************************************************************
STATUS               : WORKING
DATE CREATED/UPDATED : September 30, 2023
PURPOSE              : DELETE SPECIFIC DATA
PROGRAMMER           : MARK DINGLASA
FUNCTION NAME        : delete (Id)
****************************************************************/
exports.delete = async (req, res) => {
try {
  const dataId = req.params.Id;
  const result = await Models.find(dataId, '[MstTax]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
  if (!result)  return res.status(404).json({ message: "Data not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
  
  const result2 = await Models.delete(dataId, '[MstTax]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
  if (result2) return res.status(200).json({ message: "Tax deleted" });
  else return res.status(500).json({ message: "Something went wrong, please try again." });
} catch (error) {
  return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
}
};//END HERE
//***************************************************************



/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : ADD or CREATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add()
****************************************************************/
exports.add= async (req, res) => {
  try {
    const data = req.body, requiredFields = [ 'Code', 'Tax', 'Rate', 'AccountId' ], missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstTax] WHERE Code='${data.Code}' AND Tax='${data.Tax}'`);
    if (checkData) {return res.status(400).json({ message: 'Tax already exists.' });}

    const result = await Tax.add(data);
    if (result) return res.status(201).send({ message: 'Tax added successfully.' });
    else return res.status(500).send({ message: 'Something went wrong, please try again.' });
    
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add()]", message: error.message  });
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 30, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.update= async (req, res) => {
  try {
    const dataId = req.params.Id, selectedData = await Tax.find(dataId);  // FIND THE data TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Data not found" });
    
    const data = req.body, requiredFields = [ 'Code', 'Tax', 'Rate', 'AccountId' ], missingFields = []; //SET ARRAY FIELD FOR MISSING FIELDS
    for (const field of requiredFields) { //LOOP THE FIELDS TO CHECK EACH DATA IF ITS NOT NULL OR UNDEFINED
      if (data[field] === undefined || data[field] === null) missingFields.push(field);  //ADD ALL MISSING FIELDS
    }

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }//SEND TO THE USER ALL MISSING FIELDS

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstTax] WHERE Id<>'${dataId}' AND (Code='${data.Code}' AND Tax='${data.Tax}')`);
    if (checkData) {return res.status(400).json({ message: 'Data already exists.' });}

    const result = await Tax.update(dataId, data); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Data updated successfully.' });  //UPDATING DATA IS SUCCESFULL
   else return res.status(500).send({ message: 'Failed to update Data.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
  } catch (error) {
    res.status(500).json({ error: "Controller Error[Update()]", message: error.message  });
  }
};//END HERE
//****************************************************************
