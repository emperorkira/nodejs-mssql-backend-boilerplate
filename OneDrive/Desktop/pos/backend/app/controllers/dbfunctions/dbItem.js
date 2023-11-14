//MODELS-LIB
const { Models } = require("../../models");
const { Item } = require("../../models/master/itemModels");
const { ItemPrice } = require("../../models/master/itemPriceModels");
const _Functions = require("./functions"); 

/*
    **  
    ALTER TABLE
    Add new Column DiscountCode
    **
    Status: Working
    Date Created/Updated: October 20, 2023
    Programmer: Mark DIngalasa 
*/
const addColItemCode = async() =>{
    try {
     const discountCol = await _Functions.addTableColumn('dbo','MstItem','ItemCode');
        if (discountCol) console.log('Success.');
        else console.log('Failed.');
    } catch (error) {
        console.log('Something went wrong.');
    } 
};
//addColDiscountCode();
/*
    **  
    ALTER TABLE
    drop Column DiscountCode
    **
    Status: Working
    Date Created/Updated: October 20, 2023
    Programmer: Mark DIngalasa 
*/
const dropColItemCode = async() =>{
    try {
     const result = await _Functions.dropTableColumn('dbo','MstItem','ItemCode');
        if (result) console.log('Success.');
        else console.log('Failed.');
    } catch (error) {
        console.log('Something went wrong.');
    } 
};
//dropColDiscountCode();

/*
Status: Working
Date Created/Updated: October 20, 2023
Programmer: Mark DIngalasa 
**
This Code [fillDiscountCodes], it will fill all the DiscountCodes.
After creating a new column which is DiscountCodes, it wont have any data on it and wont be able to use.
So this code will put data into it base on its order from the Id.
**
*/
const fillItemCodes = async () => {
  let flag = true, count = 0, ItemCode = 1;
  try {
    const datas = await Models.getAll('MstItem');
    for (const data of datas) {
      const UserId = parseInt(data.Id);
      flag = await Item.fillItemCode(UserId, String(ItemCode));
      if (!flag) {
        console.error(`Failed to update ItemCode for discount with ID: ${data.Id}`);
      } else {
        count++;
      } ItemCode++;
    }
    if (count === datas.length) {
      console.log('Updating DicountCode is successful.');
    } else {
      console.log('Some DicountCode updates failed.');
    }
  } catch (error) {
    console.error('Error updating DicountCode:', error);
  }
};
//fillDiscountCodes();


/*
**
Status: Working
Date: October 21, 2023
Programmer: Mark Dinglasa
**
THIS CODE [updatePrevItemCodes] Update all the Previous ItemId in to ItemCode hence the System wont use the ItemId anymore in
  child component as FK. ItemId once deleted it will not increment but will jump for instance;
    Table: MstItem
    Id : 33484 ItemCode: 000004 BarCode:NA etc...
    Id : 33485 ItemCode: 000004 BarCode:NA etc...
  Now if the user delete the item with an Id of 333485, it will remove it in the database and the next Id would be
    Id : 33484 ItemCode: 000004 BarCode:NA etc...
    Id : 33486 ItemCode: 000005 BarCode:NA etc...
  It wont fill the missing deleted Id.
  So Instead of using ItemId as a FK, the system will use ItemCode as the FK, hence it is system generated not DB generated.
*/

const updatePrevItemCodes = async () => {
    let successCount = 0;
    let failureCount = 0;
    
    try {
      const datas = await Models.getAll('MstItemPrice');
      if (!Array.isArray(datas) || datas.length === 0) {return 'ItemPrice Data is empty.';}
      for (const data of datas) {
        try {
          let getData;
          try {  getData = await Models.get(data.ItemId, 'MstItem');
          } catch (innerError) {  failureCount++;
            continue; // Skip this iteration
          } const NewCode = parseInt(getData.ItemId, 10);
          if (isNaN(NewCode)) { console.error(`Failed to update DiscountCode for DiscountItem with ID: ${data.Id}. DiscountCode is not a valid integer.`);
            failureCount++;
          } else {
            try { const flag = await ItemPrice.updatePrevItemPrice(data.ItemId, String(NewCode));
              if (flag) successCount++;
              else failureCount++;
            } catch (innerError) { failureCount++; }
          }//try update ItemPrice
        } catch (innerError) { failureCount++; }//catch update ItemPrice
      }//FOR LOOP
  
      if (failureCount === 0) console.log('Updating ItemCode is successful.');
      else console.log(`Some ItemCode updates failed. Success count: ${successCount}, Failure count: ${failureCount}`);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  updatePrevItemCodes();

