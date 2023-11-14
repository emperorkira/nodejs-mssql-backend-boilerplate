//INCLUDES
const { Discount } = require("../../models/master/discountModels");
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
    const query = `SELECT 
                        [MstDiscount].[Id],
                        [MstDiscount].[Discount],
                        [MstDiscount].[DiscountRate],
                        [EntryUser].[FullName] AS [EntryUser],
                        [MstDiscount].[EntryDateTime],
                        [UpdateUser].[FullName] AS [UpdateUser],
                        [MstDiscount].[UpdateDateTime],
                        [MstDiscount].[IsLocked],
                        [MstDiscount].[DiscountCode]
                    FROM [MstDiscount]
                    INNER JOIN MstUser AS [EntryUser] ON [EntryUser].Id = [MstDiscount].EntryUserId
                    INNER JOIN MstUser AS [UpdateUser] ON [UpdateUser].Id = [MstDiscount].UpdateUserId`;
    const data = await Models.getAllWithQuery(query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAll()]", message: error.message });
  }
};
//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 14, 2023
  PURPOSE              : GET THE LATEST DISCOUNT ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.getDiscountCode = async (req, res) => {
  try {
    const DiscountCode = await Models.getAllWithQuery(`SELECT TOP 1 [DiscountCode]  FROM [MstDiscount] ORDER BY [Id] DESC`);
    if (DiscountCode) return res.status(200).json(parseInt(DiscountCode[0].DiscountCode,10)+1);
    else return res.status(400).json({ message: "No DiscountCode found." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : ADD DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.add = async (req, res) => {
  try {
    const data = req.body;
    const requiredFields = ['Discount', 'DiscountRate',  'IsVatExempt', 'IsDateScheduled', 'IsTimeScheduled', 'IsDayScheduled', 'EntryUserId', 'EntryDateTime', 'UpdateUserId', 'UpdateDateTime'];
    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null)  missingFields.push(field);
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400) .send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstDiscount] WHERE Discount ='${data.Discount}'`);
    if (checkData) {return res.status(400).json({ message: 'Discount already exists.' });}

    let DiscountCode = 0;
    const getDiscountCode = await Models.getAllWithQuery(`SELECT TOP 1 DiscountCode FROM MstDiscount ORDER BY Id DESC`);
    if(getDiscountCode) DiscountCode=parseInt(getDiscountCode[0].DiscountCode,10)+1;
    else DiscountCode+=1;
    
    const createdData = await Discount.add(DiscountCode,data);
    if (createdData) return res.status(201).send({ message: 'Discount added successfully.', data: createdData });
    else return res.status(500).send({ message: 'Something went wrong .' });
    
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add]", message: error.message });
  }
};//END HERE
//****************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : UPDATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.update = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    const selectedData = await Models.find(dataId, '[MstDiscount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "Discount not found" });
    
    const data = req.body;    //GET DATA
    const requiredFields = [ 'Discount', 'DiscountRate','IsVatExempt', 'IsDateScheduled', 'IsTimeScheduled', 'IsDayScheduled', 'UpdateUserId',  'UpdateDateTime'];
    const missingFields = [];  //SET ARRAY FIELD FOR MISSING FIELDS
    for (const field of requiredFields) {   //LOOP THE FIELDS TO CHECK EACH DATA IF ITS NOT NULL OR UNDEFINED
      if (data[field] === undefined || data[field] === null) missingFields.push(field); //ADD ALL MISSING FIELDS
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }//SEND TO THE USER ALL MISSING FIELDS

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstDiscount] WHERE Id<>'${dataId}' AND Discount ='${data.Discount}'`);
    if (checkData) { return res.status(400).json({ message: 'Discount already exists.' });}

    const datas = await Discount.update(dataId, data);//IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (datas) {
      return res.status(201).send({ message: 'Discount updated successfully.' }); //UPDATING DATA IS SUCCESFULL
    } else {
      return res.status(500).send({ message: 'Failed to update Discount.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    }
  } catch (error) {
      return res.status(500).json({ error: "Controller Error[update]", message: error.message });
  }
};//END HERE
//****************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL ITEM CODE
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemCode()
****************************************************************/
exports.getAllItemCode = async (req, res, next) => {
  try {
    let query=` SELECT Id, ItemCode FROM MstItem`;
    let data = await Models.getAllWithQuery(query);
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ error: "Controller Error[getAllItemCode]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 03, 2023
  PURPOSE              : GET ALL DISCOUNTED ITEM
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllDiscountedItem()
****************************************************************/
exports.getAllDiscountedItem = async (req, res, next) => {
  try {
    let query=`SELECT Id, ItemDescription, IsLocked
              FROM MstItem
              WHERE ItemDescription IS NOT NULL AND IsLocked = 1
              ORDER BY ItemDescription`;
    let data = await Models.getAllWithQuery(query);
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ error: "Controller Error[getAllDiscountedItem]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

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
    const selectedData = await Models.find(dataId, '[MstDiscount]'); // FIND THE DATA TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Discount not found" });
    
    const result = await Models.lock(dataId, '[MstDiscount]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Locked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong.' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
  } catch (error) {
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
    const selectedData = await Models.find(dataId, '[MstDiscount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "Discount not found" });
    
    const result = await Models.unlock(dataId, '[MstDiscount]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Unlocked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Unlocked()]", message: error.message });
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
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (dataId) {
      const data = await Models.get(dataId, '[MstDiscount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "Discount not found" });
      else return res.status(200).json(data);
    } else return res.status(400).json({ message: "Invalid DiscountId" });
  } catch (error) {
   return res.status(500).json({ error: "Controller Error[get(Id)]", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
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
      const data = await Models.find(dataId, '[MstDiscount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "Discount not found." });
      else return res.status(200).json({ message: `Discount found. ${dataId}` });
    } else return res.status(400).json({ message: "Invalid DiscountId" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : OCtober 14, 2023
  PURPOSE              : DELETE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/
exports.delete = async (req, res) => {
  try {
    const dataId = req.params.Id;
    const result = await Models.find(dataId, '[MstDiscount]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Discount not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    if(dataId<=16) return res.status(400).json({ message: "Default Discount cannot be deleted." });

    const result2 = await Models.delete(dataId, '[MstDiscount]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Discount deleted" });
    else return res.status(400).json({ message: "Something went wrong ." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************
