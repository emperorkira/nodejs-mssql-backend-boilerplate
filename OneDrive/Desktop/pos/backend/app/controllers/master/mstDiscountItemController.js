//INCLUDES
const {DiscountItem } = require("../../models/master/discountItemModels");
const { Models } = require('../../models');

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : DISPLAY ALL DATA+6
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    const dataId = req.params.Id;//DiscountCode
    let query=` SELECT MstDiscountItem.* ,
                MstItem.ItemCode, 
                MstItem.ItemDescription
                FROM [MstDiscountItem] 
                INNER JOIN MstItem ON MstItem.Id= MstDiscountItem.ItemId
                WHERE DiscountId='${dataId}'`;
    let data = await Models.getAllWithQuery(query);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[display()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************


/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : ADD DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.add = async (req, res) => {
  try {
    const data = req.body;
    const requiredFields = ['DiscountId', 'ItemId' ];
    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null)  missingFields.push(field);
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400) .send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstDiscountItem] WHERE DiscountId ='${data.DiscountId}' AND ItemId='${data.ItemId}'`);
    if (checkData) {return res.status(400).json({ message: 'Data already exists.' });}
    
    const createdData = await DiscountItem.add(data);
    if (createdData) return res.status(201).send({ message: 'Data added successfully.', data: createdData });
    else return res.status(500).send({ message: 'Failed to add Data.' });
    
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add]", message: error.message });
  }
};//END HERE 
//****************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : UPDATE DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.update = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    const selectedData = await Models.find(dataId, '[MstDiscountItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "Data not found" });
    
    const data = req.body;    //GET DATA
    const requiredFields = ['DiscountId', 'ItemId'];
    const missingFields = [];  //SET ARRAY FIELD FOR MISSING FIELDS
    for (const field of requiredFields) {   //LOOP THE FIELDS TO CHECK EACH DATA IF ITS NOT NULL OR UNDEFINED
      if (data[field] === undefined || data[field] === null) missingFields.push(field); //ADD ALL MISSING FIELDS
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }//SEND TO THE USER ALL MISSING FIELDS

    const checkData = await Models.findWithQuery(`SELECT Id FROM [MstDiscountItem] WHERE Id<>'${dataId}' AND (DiscountId ='${data.DiscountId}' AND ItemId='${data.ItemId}')`);
    if (checkData) {return res.status(400).json({ message: 'Data already exists.' });}
    
    const datas = await DiscountItem.update(dataId, data);//IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (datas) {
      //UPDATING DATA IS SUCCESFULL
      res.status(201).send({ message: 'Data updated successfully.' });
    } else {
      //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
      res.status(500).send({ message: 'Failed to update data.' });
    }
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Controller Error[update]", message: error.message });
  }
};//END HERE 
//****************************************************************


/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.get = async (req, res) => {
  try {
    const dataId = req.params.Id; // DiscountId
    if (dataId) {
      const data = await Models.get(dataId,'[MstDiscountItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "Data not found" });
      else return res.status(200).json(data);
    } else return res.status(400).json({ message: "Invalid data ID" });
  } catch (error) {
   return res.status(500).json({ error: "Controller Error[get(Id)]", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE 
//***************************************************************



/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.find = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (dataId) {
      const data = await Models.find(dataId, '[MstDiscountItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "Data not found." });
      else return res.status(200).json({ message: "Data found." });
    } else return res.status(400).json({ message: "Invalid data ID" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE 
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : DELETE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/

exports.delete = async (req, res) => {
  try {
    const dataId = req.params.Id;
    const result = await Models.find(dataId, '[MstDiscountItem]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Data not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.delete(dataId, '[MstDiscountItem]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Data deleted" });
    else return res.status(500).json({ message: "Data deletion failed" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE 
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 20, 2023
  PURPOSE              : DELETE all data that has specific discountId
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAll(Id)
****************************************************************/
exports.deleteAll = async (req, res) => {
  try {
    const dataId = req.params.Id;
    const result = await Models.findWithQuery(`SELECT DiscountCode FROM MstDiscount WHERE DiscountCode='${dataId}'`); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Discount not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.deleteAllWithField(dataId,'DiscountId','MstDiscountItem'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Discount deleted" });
    else return res.status(500).json({ message: "Discount deletion failed" });

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[deleteAll(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE 
//***************************************************************