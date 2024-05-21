const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E, f75706C64696D67  } = require('../../database/function'), o617468 = require('../auth');
const d747874 = resolve(__dirname, '../../texts/date.json'), e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of a table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 4 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const d72736C74 = await o6D646C73.f6765744151(o02x747874.q0ix01);
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });  
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get a specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    const d72736C74 = await o6D646C73.f67657451(c4964, o02x747874.q0ix09);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error : ${error.message}`, category:'error' });  
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : to get the lastest Id in the Item table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getId()
****************************************************************/
exports.k674964 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const c4964 = await o6D646C73.f6765744151(o01x747874.q0ix010);
    if (!c4964) res.status(203).json({ Id: 1 });
    return res.status(200).json(parseInt(c4964[0].Id,10));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : find specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 5 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t69746D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : delete specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 4 , 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t69746D)))  return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if ((await o6D646C73.f666E64514644(o04x747874.q0ix011, ['ItemId'], [o73716C.Int], [c4964])) || c4964 === 1 ) return res.status(203).json({ message: o01x747874.e00x02, category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0ix012, ['Id','IsLocked'], [o73716C.Int, o73716C.Bit], [c4964, '1'])) return res.status(203).json({ message: o01x747874.e00x10, category:'error'});
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t69746D))) return res.status(203).json({ message: o01x747874.e00x01 , category:'error'});
    return res.status(200).json({ message: o03x747874.s646C764, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : add new data to item
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType); let image;
    const ar72717264666C64 = ['BarCode', 'Category', 'ItemDescription', 'Alias', 'GenericName', 'Category', 'SalesAccountId', 'AssetAccountId','CostAccountId', 'InTaxId', 'OutTaxId', 'UnitId', 'DefaultSupplierId', 'Cost', 'MarkUp', 'Price', 'ImagePath', 'ReorderQuantity', 'OnhandQuantity', 'IsInventory' ];
    const ar666C6473 =[ 'ItemCode', 'BarCode', 'ItemDescription', 'Alias', 'GenericName', 'Category', 'SalesAccountId', 'AssetAccountId', 'CostAccountId', 'InTaxId', 'OutTaxId', 'UnitId', 'DefaultSupplierId', 'Cost', 'MarkUp', 'Price', 'ImagePath', 'ReorderQuantity', 'OnhandQuantity','IsInventory', 'ExpiryDate', 'LotNumber', 'Remarks', 'EntryUserId','EntryDateTime', 'DefaultKitchenReport', 'IsPackage' ];
    const ar666C64747970 = [ o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Decimal(18, 5), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5), o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5), o73716C.Bit, o73716C.DateTime, o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Int, o73716C.DateTime, o73716C.Int, o73716C.Int ];
    const c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    const c67746364 = await o6D646C73.f6765744151(o04x747874.q0ix013);
    const c6364 = (!c67746364[0].ItemCode)? 0 : c67746364[0].ItemCode;
    const c69746D6364 = String(parseInt(c6364) + 1).padStart(6, '0');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 5 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x07 , category:'error'});
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.` , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0ix014, ['BarCode', 'ItemDescription'], [o73716C.NVarChar(255), o73716C.NVarChar(255)], [c64617461.BarCode, c64617461.ItemDescription])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'}); 
    if (!(await o6D646C73.f666E64(c64617461.SalesAccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e01xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AssetAccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e02xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.CostAccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e03xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.InTaxId, o02x747874.t7478))) return res.status(203).json({ message: o01x747874.e04xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.OutTaxId, o02x747874.t7478))) return res.status(203).json({ message: o01x747874.e05xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.UnitId, o02x747874.t756E74))) return res.status(203).json({ message: o01x747874.e06xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.DefaultSupplierId, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e07xt69746D, category: 'error' });
    if (c64617461.ImagePath === null || c64617461.ImagePath === 'NA' || c64617461.ImagePath === '') image = c64617461.ImagePath;
    else image = await f75706C64696D67 (c64617461.ImagePath);
    if(!image) return res.status(203).json({ message: o01x747874.e00x12, category: 'error' });
    const ar666C64647461 = [ c69746D6364, c64617461.BarCode, c64617461.ItemDescription, c64617461.Alias, c64617461.GenericName, c64617461.Category, c64617461.SalesAccountId, c64617461.AssetAccountId, c64617461.CostAccountId, c64617461.InTaxId, c64617461.OutTaxId, c64617461.UnitId, c64617461.DefaultSupplierId, c64617461.Cost, c64617461.MarkUp, c64617461.Price, image, c64617461.ReorderQuantity, c64617461.OnhandQuantity, c64617461.IsInventory, c64617461.ExpiryDate, c64617461.LotNumber, c64617461.Remarks, c7573724964, c647465, c64617461.DefaultKitchenReport, c64617461.IsPackage ];
    if (!(await o6D646C73.f616464514644(o02x747874.t69746D, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).send({ message: o03x747874.s616363616464 , category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : update a specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType); let image;
    const ar72717264666C64 = [ 'BarCode', 'Category', 'ItemDescription', 'Alias', 'GenericName', 'Category', 'SalesAccountId', 'AssetAccountId','CostAccountId','InTaxId', 'OutTaxId', 'UnitId', 'DefaultSupplierId', 'Cost', 'MarkUp','Price', 'ImagePath', 'ReorderQuantity', 'OnhandQuantity', 'IsInventory' ];
    const c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null),  c6D7376E67666C644E = c6D73736E67666C.join(', ');
    const ar666C6473 =[ 'BarCode', 'ItemDescription', 'Alias', 'GenericName', 'Category', 'SalesAccountId', 'AssetAccountId', 'CostAccountId', 'InTaxId', 'OutTaxId', 'UnitId', 'DefaultSupplierId', 'Cost', 'MarkUp', 'Price', 'ImagePath', 'ReorderQuantity', 'OnhandQuantity','IsInventory', 'ExpiryDate', 'LotNumber', 'Remarks', 'UpdateUserId','UpdateDateTime', 'DefaultKitchenReport', 'IsPackage'];
    const ar666C64747970=[ o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Int, o73716C.Decimal(18, 5), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5), o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5), o73716C.Bit, o73716C.DateTime, o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Int, o73716C.DateTime, o73716C.Int, o73716C.Int ];
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 5 , 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 <= 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t69746D)))  return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.` , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0ix015, ['Id','BarCode','ItemDescription'], [o73716C.Int, o73716C.NVarChar(255),o73716C.NVarChar(255)], [c4964, c64617461.BarCode, c64617461.ItemDescription])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'});
    if (!(await o6D646C73.f666E64(c64617461.SalesAccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e01xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AssetAccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e02xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.CostAccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e03xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.InTaxId, o02x747874.t7478))) return res.status(203).json({ message: o01x747874.e04xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.OutTaxId, o02x747874.t7478))) return res.status(203).json({ message: o01x747874.e05xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.UnitId, o02x747874.t756E74))) return res.status(203).json({ message: o01x747874.e06xt69746D, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.DefaultSupplierId, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e07xt69746D, category: 'error' });
    if (c64617461.ImagePath === null || c64617461.ImagePath === 'NA' || c64617461.ImagePath === '') image = c64617461.ImagePath;
    else image = await f75706C64696D67 (c64617461.ImagePath);
    if(!image) return res.status(203).json({ message: o01x747874.e00x12, category: 'error' });
    const ar666C64647461=[ c64617461.BarCode, c64617461.ItemDescription, c64617461.Alias, c64617461.GenericName, c64617461.Category, c64617461.SalesAccountId, c64617461.AssetAccountId, c64617461.CostAccountId, c64617461.InTaxId, c64617461.OutTaxId, c64617461.UnitId, c64617461.DefaultSupplierId, c64617461.Cost, c64617461.MarkUp, c64617461.Price, image, c64617461.ReorderQuantity, c64617461.OnhandQuantity, c64617461.IsInventory, c64617461.ExpiryDate, c64617461.LotNumber, c64617461.Remarks, c7573724964, c647465, c64617461.DefaultKitchenReport, c64617461.IsPackage ];
    if (!(await o6D646C73.f75706474514644(c4964,o02x747874.t69746D, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s7570647464, category:'success'}); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : lock specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id)
****************************************************************/
exports.k6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 5 , 'CanLock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (c4964 === 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t69746D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if (!(await o6D646C73.f6C636B(c4964, o02x747874.t69746D))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s6C636B, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : unlock specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(Id)
****************************************************************/
exports.k6E6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 5 , 'CanUnlock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (c4964 === 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t69746D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if (!(await o6D646C73.f6E6C636B(c4964, o02x747874.t69746D))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s6E6C636B, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of sales account in account table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllSalesAccount()
****************************************************************/
exports.k6761736C7363636E74 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix02);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of asset account in account table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllAssetAccount()
****************************************************************/
exports.k6761737374616366E74 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix03);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of cost account in account table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllCostAccount()
****************************************************************/
exports.k6761637374612366E74 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix04);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of tax table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllTax()
****************************************************************/
exports.k67617478 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix05);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of unit table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllUnit()
****************************************************************/
exports.k6761756E74 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix06);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of item category in item table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemCategory()
****************************************************************/
exports.k67616976D63746772 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix07);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of supplier table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllSupplier()
****************************************************************/
exports.k6761737570706C72 = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix08);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of item kitchen in item table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemKitchen()
****************************************************************/
exports.k674149746D4B = async (req, res) => {
  try {
    const o747874 = await f72646C6E(q747874);
    const d72736C74 = await o6D646C73.f6765744151(o747874.q0ix016);
    return res.status(200).json(d72736C74); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

exports.tokens  = async (req, res, next) => {
  try {
    const tokens = await req.session.JWT;
    console.log('AUTH-TOKEN'+tokens);
    return res.status(200).send({ token: tokens });
  } catch (err) { console.error(err.message);
    return res.status(500).json({ login: false, message: 'Internal Server Error', category: 'error' });
  }
};
