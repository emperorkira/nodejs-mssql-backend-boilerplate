const { Models } = require("../../models");
const { Discount } = require("../../models/master/discountModels");
const { DiscountItem } = require("../../models/master/discountItemModels");
const _Functions = require("./functions"); 

//MODELS-LIB


/*
    **  
    ALTER TABLE
    Add new Column DiscountCode
    **
    Status: Working
    Date Created/Updated: October 20, 2023
    Programmer: Mark DIngalasa 
*/
const addColDiscountCode = async() =>{
    try {
     const discountCol = await _Functions.addTableColumn('dbo','MstDiscount','DiscountCode');
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
const dropColDiscountCode = async() =>{
    try {
     const result = await _Functions.dropTableColumn('dbo','MstDiscountItem','DiscountCode');
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
const fillDiscountCodes = async () => {
  let flag = true, count = 0, DicountCode = 1;
  try {
    const datas = await Models.getAll('MstDiscount');
    for (const data of datas) {
      const UserId = parseInt(data.Id);
      flag = await Discount.fillDiscountCode(UserId, String(DicountCode));
      if (!flag) {
        console.error(`Failed to update DicountCode for discount with ID: ${data.Id}`);
      } else {
        count++;
      } DicountCode++;
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

const updatePrevDiscountCodes = async () => {
    let successCount = 0;
    let failureCount = 0;
    
    try {
      const datas = await Models.getAll('MstDiscountItem');
      
      if (!Array.isArray(datas) || datas.length === 0) {
        console.log('DiscountItem Data is empty');
        return 'DiscountItem Data is empty.';
      }
  
      for (const data of datas) {
        try {
          const DiscountId = parseInt(data.Id, 10);
          
          if (isNaN(DiscountId)) {
            console.error(`Failed to update DiscountCode for DiscountItem with ID: ${data.Id}. DiscountId must be a number.`);
            failureCount++;
            continue; // Skip this iteration
          }
          
          let getDiscount;
          try {
            getDiscount = await Models.get(data.DiscountId, 'MstDiscount');
          } catch (innerError) {
            console.error(`Error: getting MsDiscount Data for DiscountItem with ID: ${data.Id}`, innerError);
            failureCount++;
            continue; // Skip this iteration
          }
          
          const NewDiscountCode = parseInt(getDiscount.DiscountCode, 10);
          
          if (isNaN(NewDiscountCode)) {
            console.error(`Failed to update DiscountCode for DiscountItem with ID: ${data.Id}. DiscountCode is not a valid integer.`);
            failureCount++;
          } else {
            try {
                console.error(`DiscountId: ${data.Id} NewDiscountCode: ${NewDiscountCode}`);
             const flag = await DiscountItem.updatePrevDiscountCode(DiscountId, String(NewDiscountCode));
              
              if (flag) {
                successCount++;
              } else {
                failureCount++;
                console.error(`Failed to update DiscountCode for DiscountItem with ID: ${data.Id}`);
              }
            } catch (innerError) {
              failureCount++;
              console.error(`Error updating DiscountCode for DiscountItem with ID: ${data.Id}`, innerError);
            }
          }
        } catch (innerError) {
          failureCount++;
          console.error(`Error updating DiscountCode for DiscountItem with ID: ${data.Id}`, innerError);
        }
      }
  
      if (failureCount === 0) {
        console.log('Updating DiscountCode is successful.');
      } else {
        console.log(`Some DiscountCode updates failed. Success count: ${successCount}, Failure count: ${failureCount}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  //updatePrevDiscountCodes();

