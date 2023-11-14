//INCLUDES
const { User } = require("../../models/master/userModels");
const { AccessRights } = require("../../models/master/accessRightsModels");
const { Models } = require("../../models");


/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    const query=`SELECT  
                    [MstUser].[Id],
                    [MstUser].[UserName],
                    [MstUser].[FullName],
                    [EntryUser].[FullName] AS EntryUser,
                    [MstUser].[EntryDateTime],
                    [UpdateUser].[FullName] AS UpdateUser,
                    [MstUser].[UpdateDateTime],
                    [MstUser].[IsLocked]
                FROM [MstUser] 
                INNER JOIN MstUser AS EntryUser ON EntryUser.Id = [MstUser].EntryUserId
                INNER JOIN MstUser AS UpdateUser ON UpdateUser.Id = [MstUser].UpdateUserId;
                `;
    const data = await Models.getAllWithQuery(query);
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
      const data = await Models.get(dataId, '[MstUser]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "User not found" });
      else return res.status(200).json(data);
    } else return res.status(400).json({ message: "Invalid User ID" });
  } catch (error) {
   return res.status(500).json({ error: "Controller Error[get(Id)]", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};

//END HERE
//***************************************************************


/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getUserAccessRight(Id)
****************************************************************/
exports.getUserAccessRights = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    let query =`SELECT 
                  MstUser.Id AS UserCode, 
                  MstUserForm.Id AS Id,   
                  MstUserForm.FormId,
                  MstUserForm.CanDelete,
                  MstUserForm.CanAdd,
                  MstUserForm.CanLock,
                  MstUserForm.CanUnlock,
                  MstUserForm.CanPrint,
                  MstUserForm.CanPreview,
                  MstUserForm.CanEdit,
                  MstUserForm.CanTender,
                  MstUserForm.CanDiscount,
                  MstUserForm.CanView,
                  MstUserForm.CanSplit,
                  MstUserForm.CanCancel,
                  MstUserForm.CanReturn,
                  SysForm.Form As Form
                FROM MstUser
                INNER JOIN MstUserForm ON MstUserForm.UserId = MstUser.UserCode
                INNER JOIN SysForm ON SysForm.Id = MstUserForm.FormId
                WHERE MstUser.UserCode = @Id`;
    if (dataId) {
      const data = await Models.getWithQuery(dataId, query); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "User not found" });
      else return res.status(200).json(data);
    } else return res.status(400).json({ message: "Invalid User ID" });
  } catch (error) {
   return res.status(500).json({ error: "Controller Error[getUserAccessRight(Id)]", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};
//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 13, 2023
  PURPOSE              : GET THE LATEST USER ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.getUserCode = async (req, res) => {
  try {
    const UserCode = await Models.getAllWithQuery(`SELECT TOP 1 [UserCode]  FROM [MstUser] ORDER BY [Id] DESC`);
    if (UserCode) return res.status(200).json(parseInt(UserCode[0].UserCode,10)+1);
    else return res.status(400).json({ message: "No UserId found." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};
//END HERE
//***************************************************************


/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 21, 2023
  PURPOSE              : GET ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.getAllSysForms = async (req, res, next) => {
  try {
    let data = await Models.getAll('[SysForm]');
    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getAllSysForm()", message: error.message });  //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};
//END HER
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/

exports.find = async (req, res) => {
  try {
    const dataId = req.params.Id; // Assuming req.params.Id contains the item's ID
    if (dataId) {
      const data = await Models.find(dataId, '[MstUser]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
      if (!data) return res.status(404).json({ message: "User not found." });
      else return res.status(200).json({ message: "User found." });
    } else return res.status(400).json({ message: "Invalid User ID" });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[find(Id)]", message: error.message }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};

//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : DELETE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/

exports.delete = async (req, res) => {
  try {
    const dataId = req.params.Id;
    const result = await Models.find(dataId, '[MstUser]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "User not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.delete(dataId, '[MstUser]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "User deleted" });
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
  FUNCTION NAME        : add()
****************************************************************/

exports.add= async (req, res) => {
  try {
    const data = req.body;
    // Check if the username already exists with a different ID
    const checkUsername = await User.checkUsername(data.UserName);
    if (checkUsername) return res.status(400).send({ message: `Username is already taken.` });

    const requiredFields = [ 'UserName', 'Password','FullName', 'UserCardNumber', 'EntryUserId', 'EntryDateTime','UpdateUserId', 'UpdateDateTime'];
    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);
    } if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    let UserCode = 0;
    const getUserCode = await Models.getAllWithQuery(`SELECT TOP 1 UserCode FROM MstUser ORDER BY Id DESC`);
    if(getUserCode) UserCode=parseInt(getUserCode[0].UserCode,10)+1;
    else UserCode+=1;

    const result = await User.add(UserCode, data);
    if (result) return res.status(201).send({ message: 'User added successfully.' });
    else return res.status(500).send({ message: 'Something went wrong.' });
    
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[add()]", message: error.message  });
  }
};

//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 24, 2023
  PURPOSE              : UPDATE or EDIT SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/

exports.update = async (req, res) => {
  try {
    const dataId = parseInt(req.params.Id, 10);
    const selectedData = await Models.find(dataId, '[MstUser]'); // FIND THE ITEM TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "Data not found" });

    const data = req.body; // GET DATA
    const requiredFields = ['UserName', 'Password', 'FullName', 'EntryUserId', 'EntryDateTime', 'UpdateUserId', 'UpdateDateTime'];

    // Check if the username already exists with a different ID
    const checkUsername = await User.checkUsernameWithId(dataId, data.UserName);
    if (checkUsername) return res.status(400).send({ message: `Username is already taken.` });
    

    const missingFields = [];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) missingFields.push(field);
    }

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(', ');
      return res.status(400).send({ message: `Required fields [${missingFieldNames}] are missing.` });
    }

    const result = await User.update(dataId, data);
    if (result) {
      return res.status(201).send({ message: 'User updated successfully.' });
    } else {
      return res.status(500).send({ message: 'Something went wrong.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error, message: error.message});
  }
};

//END HERE
//****************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 22, 2023
  PURPOSE              : DISPLAY User ACCOUNT
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : displayUserRights()
****************************************************************/

exports.getAllCopyAccessRights= async (req, res, next) => {
  try {
    let query =`SELECT 
                  MstUser.Id, 
                  MstUser.UserName, 
                  MstUser.IsLocked 
                FROM MstUser 
                WHERE MstUser.IsLocked='True'
                ORDER BY MstUser.UserName`;
    let data = await Models.getAllWithQuery(query);
    res.status(200).json(data); 
  } catch (error) {
    //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
    res.status(500).json({ error: "Controller Error[displayUserAccount]", message: error.message  });
  }
};

//END HERE
//***************************************************************

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : 
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getCopyAccessRights()
****************************************************************/
exports.getCopyAccessRights = async (req, res, next) => {
  try {
    const dataId = parseInt(req.params.Id, 10); // Assuming req.params.Id contains the item's ID
    if (isNaN(dataId)) return res.status(400).json({ message: "Invalid data ID" });

    const query = `SELECT 
                    FormId, CanDelete, CanAdd, CanLock, CanUnlock, CanPrint, CanPreview,
                    CanEdit, CanTender, CanDiscount, CanView, CanSplit, CanCancel, CanReturn, SysForm.Form
                  FROM [MstUserForm]
                  INNER JOIN SysForm ON SysForm.Id = MstUserForm.FormId
                  WHERE UserId = '${dataId}';
                  `;
    const data = await Models.getAllWithQuery(query);
    if (!data) return res.status(404).json({ message: "User not found" });
    else return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Controller Error[getCopyAccessRights]", message: error.message });
  }
};
//END HERE
//***

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
    const selectedData = await Models.find(dataId, '[MstUser]'); // FIND THE DATA TO CONFIRM THE DATA EXISTS
    if (!selectedData) return res.status(404).json({ message: "User not found" });
    
    const result = await Models.lock(dataId, '[MstUser]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Locked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong.' });  //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
    
  } catch (error) {
    res.status(500).json({ error: "Controller Error[lock()]", message: error.message });
  }
};
//END HERE
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
    const selectedData = await Models.find(dataId, '[MstUser]'); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!selectedData) return res.status(404).json({ message: "User not found" });
    
    const result = await Models.unlock(dataId, '[MstUser]'); //IF ALL REQUIRED FIELDS ARE PRESENT THEN UPDATE THE DATA
    if (result) return res.status(201).send({ message: 'Unlocked successfully.' }); //UPDATING DATA IS SUCCESFULL
    else return res.status(500).send({ message: 'Something went wrong.' }); //UPDATING DATA IS UNSUCCESFUL, SOMETHING WENT WRONG
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[Unlocked()]", message: error.message });
  }
};
//END HERE
//***************************************************************

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 10, 2023
  PURPOSE              : DELETE ALL ACCESS RIGHTS OF A SUER
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAllAccessRights (Id)
****************************************************************/
exports.deleteAllAccessRights = async (req, res) => {
  try {
    const dataId = req.params.Id //UserCode;
    const result = await Models.findWithQuery(`SELECT Username FROM [MstUserForm] WHERE UserId='${dataId}'`); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "User not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.deleteAllWithField(dataId,['UserId'],'[MstUserForm]'); //IF THE ITEM IS FOUND, THEN DELETE THE ITEM
    if (result2) return res.status(200).json({ message: "User deleted." });
    else return res.status(500).json({ message: "Something went wrong." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[deleteAllAccessRights(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 19, 2023
  PURPOSE              : DELETE one ACCESS RIGHTS OF A user
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAccessRight(Id)
****************************************************************/
exports.deleteAccessRight = async (req, res) => {
  try {
    const dataId = req.params.Id //MstUserForm;
    const result = await Models.findWithQuery(`SELECT Id FROM [MstUserForm] WHERE Id='${dataId}'`); // FIND THE ITEM TO CONFIRM THE ITEM EXISTS
    if (!result)  return res.status(404).json({ message: "Access Right not found" });  //IF ITEM WASN'T FOUND THEN SEND THE ERROR MESSAGE
    
    const result2 = await Models.delete(dataId,'[MstUserForm]'); //IF THE ACCESS RIGHT IS FOUND, THEN DELETE 
    if (result2) return res.status(200).json({ message: "Access Right deleted." });
    else return res.status(500).json({ message: "Something went wrong." });
  } catch (error) {
    return res.status(500).json({ error: "Controller Error[deleteAccessRight(Id)]", message: error.message  }); //SOMETHING WENT WRONG ABOVE, INSIDE THE TRY{ code here }
  }
};//END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : 
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : addAccessRights()
****************************************************************/

exports.addBulkAccessRights = async (req, res) => {
  try {
    const failedRights = []; // Access rights forms that failed to add to a user
    let count = 0; // Count the rights that have been added

    const UserCode = req.params.Id; // req.user.Id; get latest userId
    /*const checkUser = await Models.find(UserId, '[MstUser]'); // Check if the user exists
    if (!checkUser) {
      return res.status(400).send({ message: "User doesn't exist." }); // Return an error message
    }*/

    const datas = req.body; // Check if the data is empty
    if (!Array.isArray(datas) || datas.length === 0) {
      return res.status(400).send({ message: 'Access Rights Data are empty.' }); // Return an error message
    }
    
    // Collect access rights data to be added in a bulk insert operation
    const accessRightsToInsert = [];

    for (const data of datas) {
      const checkAccessRight = await Models.findWithQuery(
        `SELECT FormId FROM [MstUserForm] WHERE UserId='${UserCode}' AND FormId='${data.FormId}'`
      );

      if (checkAccessRight) {
        failedRights.push(data.Form);
      } else {
        accessRightsToInsert.push(data);
        count++;
      }
    }

    if (accessRightsToInsert.length > 0) {
      // Perform a bulk insert operation with the collected access rights data
      const bulkInsertResult = await AccessRights.addBulkAccessRights(UserCode, accessRightsToInsert);
      if (!bulkInsertResult) {
        failedRights.push('failed to add.');
      }
    }

    return res.status(201).send({ message: `${count} access rights were added successfully. ${failedRights.join(', ')}` });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[addBulkAccessRights()]', message: error.message });
  }
};


/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : 
  PURPOSE              : to Update the acccess rights of a user in bulk
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateBulkAccessRights()
  REQUIRED FIELDS      :
                        Id - of the access rights
                        FormId
                        ,[UserId]
                        ,[CanDelete]
                        ,[CanAdd]
                        ,[CanLock]
                        ,[CanUnlock]
                        ,[CanPrint]
                        ,[CanPreview]
                        ,[CanEdit]
                        ,[CanTender]
                        ,[CanDiscount]
                        ,[CanView]
                        ,[CanSplit]
                        ,[CanCancel]
                        ,[CanReturn]
  ****************************************************************/
exports.updateBulkAccessRights = async (req, res) => {
  try {
    const failedRights = []; // Access rights forms that failed to add to a user
    let count = 0; // Count the rights that have been added

    const UserId = req.params.Id; // Get userID from the request
    const checkUser = await Models.find(UserId, '[MstUser]'); // Check if the user exists
    if (!checkUser) {
      return res.status(400).send({ message: "User doesn't exist." }); // Return an error message
    }

    const datas = req.body; // Check if the data is empty
    if (!Array.isArray(datas) || datas.length === 0) {
      return res.status(400).send({ message: 'Access Rights Data are empty.' }); // Return an error message
    }

    // Collect access rights data to be added in a bulk insert operation
    const accessRightsToUpdate = [];
    for (const data of datas) {
      const checkAccessRight = await Models.findWithQuery(
        `SELECT FormId FROM [MstUserForm] WHERE UserId='${parseInt(UserId,10)}' AND FormId='${parseInt(data.FormId,10)}'`
      );

      if (checkAccessRight) {
        accessRightsToUpdate.push(data);
        count++;
      } else {
        failedRights.push(data.Form);
      }
    }

    if (accessRightsToUpdate.length > 0) {
      // Perform a bulk insert operation with the collected access rights data
      const bulkInsertResult = await AccessRights.updateBulkAccessRights(UserId, accessRightsToUpdate);
      if (!bulkInsertResult) {
        failedRights.push('failed to add.');
      }
    }

    return res.status(201).send({ message: `${count} access rights were updated successfully. ${failedRights.join(', ')}`});

  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[updateBulkAccessRights()]', message: error.message });
  }
};