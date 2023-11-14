const { Models } = require("../../models");
const { User } = require("../../models/master/userModels");
const { AccessRights } = require("../../models/master/accessRightsModels");
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
     const col = await _Functions.addTableColumn('dbo','MstUser','UserCode');
        if (col) console.log('Success.');
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
     const result = await _Functions.dropTableColumn('dbo','MstUser','UserCode');
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
const fillUserCodes = async () => {
  let flag = true, count = 0, Code = 1;
  try {
    const datas = await Models.getAll('MstUser');
    for (const data of datas) {
      const UserId = parseInt(data.Id);
      flag = await User.fillUserCode(UserId, String(Code));
      if (!flag) { console.error(`Failed to update UserCode for user with ID: ${data.Id}`);
      } else { count++;
      } Code++;
    }

    if (count === datas.length) { console.log('Updating UserCode is successful.');
    } else { console.log('Some UserCode updates failed.');
    }

  } catch (error) {
    console.error('Error updating UserCode:', error);
  }
};
//fillUserCodes();
/*
**
Status: Working
Date: October 21, 2023
Programmer: Mark Dinglasa
**
THIS CODE [updatePrevUserCodes] Update all the Previous ItemId in to ItemCode hence the System wont use the ItemId anymore in
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
const updatePrevUserCodes = async () => {
  let successCount = 0, failureCount = 0;
  try {
    const datas = await Models.getAllWithQuery(`SELECT UserId FROM MstUserForm GROUP BY UserId;`);
    for (const data of datas) {
      try {
        let user;
        try { user = await Models.get(data.UserId, 'MstUser');
        } catch (innerError) { console.error(`Error: getting MstUser data`, innerError);
          continue; // Skip this iteration
        } const userCode = user.UserCode;

        if (isNaN(userCode)) { failureCount++; 
        } else {
          try { const flag = await AccessRights.updatePrevUserCode(data.UserId, String(userCode));
            if (flag) successCount++;
            else failureCount++;
          } catch (innerError) { failureCount++;}
        }
      } catch (innerError) {  failureCount++; }
    }

    if (failureCount === 0)  console.log('Updating User Code is successful.');
    else console.log(`Some User Code updates failed. Success count: ${successCount}, Failure count: ${failureCount}`);

  } catch (error){   console.error('Error fetching data:', error); }
};
 