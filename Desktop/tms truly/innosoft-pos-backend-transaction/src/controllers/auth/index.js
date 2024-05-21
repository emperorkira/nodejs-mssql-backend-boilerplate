//  INCLUDES
const { o6D646C73 } = require('../../models'), o6673  = require('fs').promises, { f646372797074, f6C636E73766C64, f72646C6E } = require('../../database/function');
const { f677473747267, f677462696F73, f7772746A736E } = require('../../database/function')
const o757372 = require('../master/mstUserController'), jwt = require('jsonwebtoken'), sql = require('mssql'), { resolve } = require('path');
const d747874 = resolve(__dirname, '../../texts/date.json'), e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');
const env = resolve(__dirname, '../../env.txt'), o707468 = require('path');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 20, 2023
  PURPOSE              : to create a jsonwebtoken
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : createToken(Id)
****************************************************************/
const k637238746B6E = (Id) => {
  const lines = f72646C6E(t747874);
  return jwt.sign({ Id }, String(lines.na00x02), {
    expiresIn: 86400000
  })
}// END HERE


/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to login and validate credentials
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : login(UserName, Password, Date, DateType)
****************************************************************/
exports.k6C676E  = async (req, res, next) => {
  try {
    const { UserName, Password, Date, DateType } = await req.body, o01x747874 = await f72646C6E(e747874);
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    const c757372 = await o757372.getUserByUserName(UserName);
    if (!UserName || !/^[a-zA-Z0-9]+$/.test(UserName) || !Password || !Date || !DateType || !dateRegex.test(Date)) return res.status(400).send({ message: 'o01x747874.e00x07', category: 'error' });
    if (!c757372) return res.status(404).send({ login: false, message: 'o01x747874.e04x666E63746E', category: 'error' });
    const c756E70737377 = await f646372797074('@innosoft', c757372[0].Password);
    if (c756E70737377 !== Password) return res.status(401).send({ login: false, message: 'o01x747874.e05x666E63746E', category: 'error' });
    const d746F6B656E  = k637238746B6E(c757372[0].Id); req.session.JWT = d746F6B656E;
    const c64617461 = { "DateType": DateType, "Date": Date };
    if(!(await f7772746A736E(d747874, c64617461))) return res.status(500).json({ login: false, message: 'o01x747874.e00x17', category: 'error' });
    //console.log('AUTH-TOKEN'+ req.session.JWT);
    res.cookie('jwt', d746F6B656E , { httpOnly: true, maxAge: 86400000, sameSite: 'strict', secure: true });
    return res.status(200).send({ token: d746F6B656E, cookies:req.cookies.jwt });
  } catch (err) { console.error(err.message);
    return res.status(500).json({ login: false, message: 'Internal Server Error', category: 'error' });
  }
};

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : destroy session & cookie
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : logout
****************************************************************/
exports.k6C6774  = async (req, res, next) => {
  try {
    const DateData = { "":"" }, o01x747874 = await f72646C6E(t747874);
    if(!(await f7772746A736E(d747874, DateData))) return res.status(200).json({ message: o01x747874.e00x17, category: 'error' })
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: o01x747874.e00x01, category: 'error' })
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' })
      return res.status(200).json({ message: 'Account has been logged out', category: 'success' })
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Internal Server Error', category: 'error' })
  }
}

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : check user access rights
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : checkAccessRights(UserId:Int, FormId:Int, Action:String)
****************************************************************/
exports.k6341637352 = async (UserId, FormId, Action) => {
  try {
    if (!(await o6D646C73.f666E64(UserId, '[MstUser]'))) return false;
    if (!(await o6D646C73.f666E64(FormId, '[MstUserForm]'))) return false;
    const Actions = ['CanDelete', 'CanAdd', 'CanLock', 'CanUnlock', 'CanPrint', 'CanPreview', 'CanEdit', 'CanTender', 'CanDiscount', 'CanView', 'CanSplit', 'CanCancel', 'CanReturn'];
    const missingAction = Actions.find(action => action === Action);
    if (missingAction === undefined) return false;
    const checkUserAccessRightQuery = `SELECT TOP 1 [FormId] FROM [MstUserForm] WHERE UserId = @UserId AND FormId = @FormId AND ${Action} = 1`;
    const checkUserAccessRight = await o6D646C73.f676574514644(checkUserAccessRightQuery, ['UserId', 'FormId'], [sql.Int, sql.Int], [UserId, FormId]);
    if (!checkUserAccessRight || checkUserAccessRight.length === 0) return false;
    return true;
  } catch (error) {
    return false
  }
}

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : check user access rights
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : checkAccessRight(UserId, FormId, Action)
****************************************************************/
exports.k63686B61636373 = async (req, res, next) => {
  try {
    const { UserId, FormId, Action } = await req.body, o01x747874 = await f72646C6E(t747874);
    if (!(await o6D646C73.f666E64(UserId, '[MstUser]'))) return res.status(401).json({ access: false, message: `User ${o01x747874.e00x06}`, category: 'error'});
    if (!(await o6D646C73.f666E64(FormId, '[MstUserForm]'))) return res.status(401).json({ access: false, message: `Form ${o01x747874.e00x06}`, category: 'error' });
    const Actions = ['CanDelete', 'CanAdd', 'CanLock', 'CanUnlock', 'CanPrint', 'CanPreview', 'CanEdit', 'CanTender', 'CanDiscount', 'CanView', 'CanSplit', 'CanCancel', 'CanReturn'];
    const missingAction = Actions.find(action => action === Action);
    if (missingAction === undefined) return res.status(401).json({ access: false, message: o01x747874.e00x07, category: 'error' });
    const checkUserAccessRightQuery = 'SELECT TOP 1 [FormId] FROM [MstUserForm] WHERE UserId = @UserId AND FormId = @FormId AND ' + Action + ' = 1 ';
    const checkUserAccessRight = await o6D646C73.f676574514644(checkUserAccessRightQuery, ['UserId', 'FormId'], [sql.Int, sql.Int], [UserId, FormId]);
    if (!checkUserAccessRight || checkUserAccessRight.length === 0) return res.status(401).json({ access: false, message: o01x747874.e00x11, category: 'error' });
    return res.status(200).json({ access: true, message: 'Granted',category: 'error'});
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ access: false, message: 'Internal Server Error', category: 'error'})
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to check the database-connection
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : check-connection()
****************************************************************/
exports.k63686B636F6E6E = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874);
    const c666C707468  = o707468.resolve(__dirname, '../../../env.json');
    const c64617461 = await f72646C6E(c666C707468 );
    if (c64617461.length < 1) return res.status(200).json({ connection: false, message: `${o01x747874.e00x14} e01x001`, category: 'error' });
    try{
      const c676574 = await o6D646C73.f676574(1, o02x747874.t69746D);
      if(parseInt(c676574.Id, 10) === 1) return res.status(200).json({ connection: true, message: o03x747874.s6462636E, category: 'success' }); 
      return res.status(200).json({ connection: false, message: `${o01x747874.e00x14} e01x002`, category: 'error' });
    }catch(dberror){ console.log(dberror.message);
      return res.status(200).json({ connection: false, message: `${o01x747874.e00x14} e01x003`, category: 'error' });
    }
  } catch (error) { console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : to validate the license saved in the software
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : checkLicense()
****************************************************************/
exports.k63686B6C636E73 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874);
    const c666C707468  = o707468.resolve(__dirname, '../../../licensekey.json'); let c64617461;
    try{
      c64617461 = await f72646C6E(c666C707468);
      if (!c64617461 || c64617461 === null || c64617461 === undefined ) return res.status(200).json({ IsLicensed: false, message: `${o01x747874.e00x16} e01x001`, category: 'error' });
    }catch(readerr){ console.log(readerr);
      return res.status(200).json({ IsLicensed: false, message: `${o01x747874.e00x16} e01x001`, category: 'error' });
    }
    if (c64617461.length < 1) return res.status(200).json({ IsLicensed: false, message: `${o01x747874.e00x16} e01x001`, category: 'error' });
    if(!(await f6C636E73766C64(String(c64617461.LicenseKey)))) return res.status(200).json({ IsLicensed: false, message: `${o01x747874.e00x16}`, category: 'error' });
    return res.status(200).json({ IsLicensed:true, message: o02x747874.s6736C637364, category: 'error' });
  } catch (error) { console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
};// END HERE

/*
  2023/12/04 - get credentials of a logged user - loggedUser() - Working
*/
exports.loggedUser = async (req, res, next) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ user: user[0] });
  } catch (error) {
    return res.status(401).json({ access: false , category: 'error'});
  }
}