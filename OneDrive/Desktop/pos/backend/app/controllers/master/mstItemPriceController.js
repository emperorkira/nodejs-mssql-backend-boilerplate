//INCLUDES
const { ItemPrice } = require("../../models/master/itemPriceModels");
const { Models } = require("../../models");

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemPrices()
****************************************************************/
exports.getAllItemPrices= async (req, res, next) => {
  try {
    let data = await Models.getAll('[MstItemPrice]');
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAll()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 09, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    const dataId = req.params.Id;
    const ItemData= await Models.get(dataId,'MstItem');
    let data = await Models.getAllWithQuery(`SELECT * FROM [MstItemPrice] WHERE ItemId=${parseInt(ItemData.ItemCode,10)}`);
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAll()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
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
      const data = await Models.get(dataId,'[MstItemPrice]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
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
      const data = await Models.find(dataId, '[MstItemPrice]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
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
    const result = await Models.find(dataId, '[MstItemPrice]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Data not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.delete(dataId, '[MstItemPrice]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Data deleted" });
    else return res.status(500).json({ message: "Data deletion failed" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 26, 2023
  PURPOSE              : DELETE ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/
exports.deleteAll = async (req, res) => {
  try {
    const dataId = req.params.Id;//ItemCode
    const result = await Models.findWithQuery(`SELECT ItemId FROM MstItemPrice WHERE ItemId=${dataId}`); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Data not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.deleteAllWithField(dataId,'ItemId', '[MstItemPrice]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "Data deleted" });
    else return res.status(500).json({ message: "Data deletion failed" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[delete(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE
//***************************************************************


/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : OCtober 10, 2023
  PURPOSE              : ADD MULTIPLE PRICES TO AN ITEM
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add()
****************************************************************/
  exports.add = async (req, res) => {
    try {
      const failed = [], datas = req.body, itemPricesToInsert = []; let count = 0, message = '';
      if (!Array.isArray(datas) || datas.length === 0){
        return res.status(400).send({ message: 'Item Price Data are empty.' });
      }
  
      for (const data of datas) {
        const requiredFields = ['ItemId', 'PriceDescription', 'Price', 'TriggerQuantity'];
        for (const field of requiredFields) {
          if (data[field] === undefined || data[field] === null) failed.push(data.PriceDescription);
        }//CHECK MISSING FIELDS
        const checkItemPrice = await Models.findWithQuery(`SELECT ItemId FROM [MstItemPrice] WHERE ItemId = '${data.ItemId}' AND (PriceDescription = '${data.PriceDescription}' AND Price = '${data.Price}' AND TriggerQuantity = '${data.TriggerQuantity}')`);
        if (checkItemPrice) failed.push(data.PriceDescription);
        else {
          itemPricesToInsert.push(data);
          count++;
        }
      }
  
      if (itemPricesToInsert.length > 0) {
        const result = await ItemPrice.add(itemPricesToInsert);
        if (failed.length > 0) failed.push('failed to add.');
        if (count > 0) message = `${count} Item Price were added successfully.`;
        if (result) return res.status(201).send({ message: `${message} ${failed.length > 0 ? failed.join(', ') : ''}` });
        else return res.status(500).json({ message: 'Adding data failed. Something went wrong.' });
      } else {
        return res.status(400).json({ message: 'No data to add.' });
      }
    } catch (error) {
        return res.status(500).json({ error: 'Controller Error[add()]', message: error.message });
    }
  };
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : UPDATE ONE SPECIFIC PRICE OF AN ITEM
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.update = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    const selectedItem = await Models.find(dataId, ['MstItemPrice']); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedItem)  return res.status(404).json({ message: "Item not found" });

    const data = req.body; // GET DATA
    const requiredFields = ['ItemId', 'PriceDescription', 'Price', 'TriggerQuantity'];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) return res.status(400).json({ message: `Required field '${field}' is missing.` });
    }

    const checkItemPrice = await Models.findWithQuery(`SELECT ItemId FROM [MstItemPrice] WHERE Id<>'${dataId}' AND (ItemId = '${data.ItemId}' AND PriceDescription = '${data.PriceDescription}' AND Price = '${data.Price}' AND TriggerQuantity = '${data.TriggerQuantity}')`);
    if (checkItemPrice) {return res.status(400).json({ message: 'ItemPrice already exists.' });}
    
    const item = await ItemPrice.update(dataId, data);
    if (item) return res.status(200).json({ message: 'Data updated successfully.' });
    else return res.status(500).json({ message: 'Failed to update data.' });
  
  } catch (error) {
      return res.status(500).json({ error: "Controller Error[Update()]", message: error.message }); // Provide a more meaningful error message
  }
};//END HERE
//****************************************************************