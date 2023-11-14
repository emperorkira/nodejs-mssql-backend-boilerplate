const { Models } = require("../../models");
const { User } = require("../../models/master/userModels");
const { Discount } = require("../../models/master/discountModels");
const { ItemPrice } = require("../../models/master/itemPriceModels");
const { AccessRights } = require("../../models/master/accessRightsModels");
const bcrypt = require('bcrypt');
const { XORDecryption, XOREncryption}= require('../../../license');

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 3, 2023
  PURPOSE              : UPDATE AND ENCRYPT ALL USER's PASSWORD
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateAllPassword()
****************************************************************/
/*
const encryptAllPassword = async () => {
    let flag = true, count = 0, UserId, UserPassword;
    try {
        const datas = await Models.getAll('MstUser');
        for (const data of datas ){
            UserId =parseInt(data.Id), UserPassword=data.Password;
            const hashedPassword = await XOREncryption('@innosoft',UserPassword);
            console.log(hashedPassword);
            flag = await User.updatePassword(UserId, hashedPassword);
            if (!flag) {
            console.error(`Failed to update password for user with ID: ${data.Id}`);
            } else {
            count++;
            }
        }
  
      if (count === datas.length) {
        console.log('Updating password is successful.');
      } else {
        console.log('Some password updates failed.');
      }
       
    } catch (error) {
      console.error('Error updating passwords:', error);
    }
  };
  
  const decryptAllPassword = async () => {
    let flag = true, count = 0, UserId, UserPassword;
    try {
        const datas = await Models.getAll('MstUser');
        for (const data of datas ){
            UserId =parseInt(data.Id), UserPassword=data.Password;
            const hashedPassword = await XORDecryption('@innosoft',UserPassword);
            
            flag = await User.updatePassword(UserId, hashedPassword);
            if (!flag) {
            console.error(`Failed to update password for user with ID: ${data.Id}`);
            } else {
            count++;
            }
        }
  
      if (count === datas.length) {
        console.log('Updating password is successful.');
      } else {
        console.log('Some password updates failed.');
      }
       
    } catch (error) {
      console.error('Error updating passwords:', error);
    }
  };
*/
/*const validatePassword = async () => {
    try {
        const datas = await Models.getAll('MstUser');
          UserId =parseInt(datas[0].Id), UserPassword=datas[0].Password;
          const hashedPassword = await XORDecryption('@innosoft',UserPassword);
          console.log('UserId: '+UserId + ' -Password: '+UserPassword +' -Hash: '+ hashedPassword);
          
        if ('innosoft' === hashedPassword) {
          console.log('Check.');
        } else {
          console.log('failed.');
        }
      } catch (error) {
        console.error('Error updating passwords:', error);
      }
  };*/
  
/*const storedHashedPassword = '$2b$10$U9NMJORdtEDZRQPHpYFz4e9rEAaI/Drjti6QmymhncWy0DRG9Iyrq';
const validatePassword = async (providedPassword) => {
    try {
      // Use bcrypt.compare to compare the provided password with the stored hashed password
      const match = await bcrypt.compare(providedPassword, storedHashedPassword);
  
      if (match) {
        console.log('Password is valid.');
      } else {
        console.log('Password is invalid.');
      }
    } catch (error) {
      console.error('Error validating password:', error);
    }
  };
*/
/*================================================================================================= */
/*
**
Status: Working
Date Created/Updated: October 20, 2023
Programmer: Mark DIngalasa 
**
This Code [fillUserCodes], it will fill all the UserCode.
After creating a new column which is UserCode, it wont have any data on it and wont be able to use.
So this code will put data into it base on its order from the Id.
**
const fillUserCodes = async () => {
  let flag = true, count = 0, UserCode = 1;
  try {
    const datas = await Models.getAll('MstUser');
    for (const data of datas) {
      const UserId = parseInt(data.Id);
      flag = await User.fillUserCode(UserId, String(UserCode));
      if (!flag) {
        console.error(`Failed to update UserCode for user with ID: ${data.Id}`);
      } else {
        count++;
      }
      UserCode++;
    }
    if (count === datas.length) {
      console.log('Updating UserCode is successful.');
    } else {
      console.log('Some UserCode updates failed.');
    }
  } catch (error) {
    console.error('Error updating UserCode:', error);
  }
};
*/
/*
**
Status: Working
Date Created/Updated: October 20, 2023
Programmer: Mark DIngalasa 
**
This Code [fillDiscountCodes], it will fill all the DiscountCodes.
After creating a new column which is DiscountCodes, it wont have any data on it and wont be able to use.
So this code will put data into it base on its order from the Id.
**
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
      }
      DicountCode++;
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

*/


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
  let flag, ItemCode, ItemId;
  try {
    const datas = await Models.getAll('MstItemPrice');
    for (const data of datas) {
      try {
        ItemId = parseInt(data.Id);
        if (isNaN(ItemId)) { console.error('ItemId must be a number'); continue; }// Skip this iteration

        let getItem;
        try { getItem = await Models.get(ItemId, 'MstItem');
        } catch (innerError) {
          console.error(`Error: getting MstItem Data`, innerError); continue; // Skip this iteration
        }

        ItemCode = parseInt(getItem.ItemCode, 10);
        if (isNaN(ItemCode)) { failureCount++;
          console.error(`Failed to update ItemCode for ItemPrice with ID: ${data.Id}. ItemCode is not a valid integer.`);
        } else {
          try { flag = await ItemPrice.updatePrevItemCode(ItemId, String(ItemCode));
            if (flag) { successCount++;
            } else { failureCount++;
              console.error(`Failed to update ItemCode for ItemPrice with ID: ${data.Id}`);
            }
          } catch (innerError) { failureCount++;
            console.error(`Error updating ItemCode for ItemPrice with ID: ${data.Id}:`, innerError);
          }
        }//ItemCode

      } catch (innerError) {
        failureCount++;
        console.error(`Error updating ItemCode for ItemPrice with ID: ${data.Id}:`, innerError);
      }//Try LOOP
    }//LOOP

    if (failureCount === 0) console.log('Updating ItemCode is successful.');
    else console.log(`Some ItemCode updates failed. Success count: ${successCount}, Failure count: ${failureCount}`);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//update userId with userCode in MstUserForm
const updatePrevUserCodes = async () => {
  let successCount = 0;
  let failureCount = 0;
  try {
    const datas = await Models.getAllWithQuery(`SELECT UserId
                                                FROM MstUserForm
                                                GROUP BY UserId;`);
    for (const data of datas) {
      try {
        let user;
        try {
          user = await Models.get(data.UserId, 'MstUser');
          //console.log(`userId: ${user.Id} username: ${user.UserName}`);
        } catch (innerError) {
          console.error(`Error: getting MstUser data`, innerError);
          continue; // Skip this iteration
        }

        const userCode = user.UserCode;
        //console.log(`userCode: ${user.UserCode}`);

       if (isNaN(userCode)) {
          failureCount++;
          console.error(`Failed to update User Code for User Form with ID: ${data.Id}. User Code is not a valid integer.`);
        } else {
          try {
            const flag = await AccessRights.updatePrevUserCode(data.UserId, String(userCode));
            if (flag) {
              successCount++;
            } else {
              failureCount++;
              console.error(`Failed to update User Code for User Form with ID: ${data.UserId}`);
            }
          } catch (innerError) {
            failureCount++;
            console.error(`Error updating User Code for User Form with ID: ${data.UserId}`, innerError);
          }
        }
      
      } catch (innerError) {
        failureCount++;
        console.error(`Error updating User Code for User Form with ID: ${data.Id}`, innerError);
      }
    }

    if (failureCount === 0) {
      console.log('Updating User Code is successful.');
    } else {
      console.log(`Some User Code updates failed. Success count: ${successCount}, Failure count: ${failureCount}`);
    }
  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
 
updatePrevUserCodes();