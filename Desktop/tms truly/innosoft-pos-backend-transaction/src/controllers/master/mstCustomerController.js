const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json'), d747874 = resolve(__dirname, '../../texts/date.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all data of customer table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 6, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f6765744151(o02x747874.q0cx01));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : find specific data in customer table by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 6, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t46373746D72))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get specific data in customer table by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 = ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 6, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t46373746D72);
    if (!d72736C74) return res.status(203).json({ error: o01x747874.e00x03 , category:'error'});
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get specific data in customer table by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874),c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 6, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t46373746D72))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    const v6374 = await o6D646C73.f666E64514644(o04x747874.q0cx02, ['Id'], [o73716C.Int], [c4964]);
    if (c4964 === 1 || v6374) return res.status(203).json({ message: o01x747874.e00x02 , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0cx03, ['Id', 'IsLocked'], [o73716C.Int, o73716C.Bit], [c4964,'1'])) return res.status(203).json({ message: o01x747874.e00x10, category:'error'});
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t46373746D72))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).json({ message: o03x747874.s646C764 , category:'success'});
  } catch (error) {
    return res.status(500).json({  message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : add new data in customer table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c64617461 = await req.body, c7573724964 = ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const ar666C6473 = [ 'CustomerCode', 'Customer', 'Address', 'ContactPerson', 'ContactNumber', 'CreditLimit', 'TermId', 'TIN', 'WithReward', 'RewardNumber', 'RewardConversion', 'AccountId', 'EntryUserId', 'EntryDateTime', 'IsLocked', 'DefaultPriceDescription' ];
    const ar666C64747970 = [  o73716C.NVarChar(255), o73716C.NVarChar(50), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Int, o73716C.NVarChar(50), o73716C.Bit, o73716C.NVarChar(50), o73716C.Decimal(18, 5), o73716C.Int, o73716C.Int, o73716C.DateTime, o73716C.Bit, o73716C.NVarChar(50) ];
    const ar72717264666C64 = ['Customer', 'Address', 'ContactPerson', 'ContactNumber', 'CreditLimit', 'TermId', 'TIN', 'WithReward', 'RewardConversion', 'AccountId', 'IsLocked'];
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 6, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x07 , category:'error'});
    const c67746373746D7263 = await o6D646C73.f6765744151(o04x747874.q0cx04);
    const c6364 = (!c67746373746D7263[0].CustomerCode)? 0 : c67746373746D7263[0].CustomerCode;
    const c6373746D726364 = String(parseInt(c6364) + 1).padStart(6, '0');
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null || c64617461[field] === '');
    const c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: 'Required fields ' + c6D7376E67666C644E + ' are missing.' , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0cx05, ['Customer'], [o73716C.NVarChar(50)], [c64617461.Customer])) return res.status(203).json({ message: o01x747874.e00x04 , category:'error'});
    if (!/^[a-zA-Z0-9\s]+$/.test(c64617461.Customer)) return res.status(203).json({ message: o01x747874.e01x46373746D72, category: 'error' });
    if (!/^[a-zA-Z0-9\s\-\.,&]+$/.test(c64617461.Address)) return res.status(203).json({ message: o01x747874.e02x46373746D72, category: 'error' });
    if (!/^[a-zA-Z0-9\s]+$/.test(c64617461.ContactPerson)) return res.status(203).json({ message: o01x747874.e03x46373746D72, category: 'error' });
    if (!/^[0-9\s+-]+$/.test(c64617461.ContactNumber)) return res.status(203).json({ message: o01x747874.e04x46373746D72, category: 'error' });
    if (c64617461.ContactNumber === '' || parseInt(c64617461.ContactNumber, 10) === 0) c64617461.ContactNumber = '000000';
    if (!/^\d+(\.\d+)?$/.test(c64617461.CreditLimit)) return res.status(203).json({ message: o01x747874.e05x46373746D72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.TermId, o02x747874.t74726D))) return res.status(203).json({ message: o01x747874.e06x46373746D72, category: 'error' });
    if (!/^[0-9\-]+$/.test(c64617461.TIN)) return res.status(203).json({ message: o01x747874.e07x46373746D72, category: 'error' });
    if (c64617461.TIN === null || c64617461.TIN === '' || c64617461.TIN === '0') c64617461.TIN = '000000';
    if (!/^[0-9\s-]+$/.test(c64617461.RewardNumber)) return res.status(203).json({ message: o01x747874.e08x46373746D72, category: 'error' });
    if (c64617461.RewardNumber === null || c64617461.RewardNumber === '' || c64617461.RewardNumber === '0') c64617461.RewardNumber = '000000';
    if (!/^\d+(\.\d+)?$/.test(c64617461.RewardConversion)) return res.status(203).json({ message: o01x747874.e09x46373746D72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e10x46373746D72, category: 'error' });
    const ar666C64647461 = [ c6373746D726364, c64617461.Customer, c64617461.Address, c64617461.ContactPerson, c64617461.ContactNumber, c64617461.CreditLimit || 0, c64617461.TermId, c64617461.TIN, c64617461.WithReward || 0, c64617461.RewardNumber || null, c64617461.RewardConversion || 0, c64617461.AccountId || 0, c7573724964, c647465, 1, c64617461.DefaultPriceDescription || null ];
    if (!(await o6D646C73.f616464514644(o02x747874.t46373746D72, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.ex00x01, category:'error' });
    return res.status(201).send({ message: o03x747874.s616363616464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : update specific data in customer table by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 = ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const ar666C6473 = [ 'Customer', 'Address', 'ContactPerson', 'ContactNumber', 'CreditLimit', 'TermId', 'TIN', 'WithReward', 'RewardNumber', 'RewardConversion', 'AccountId', 'UpdateUserId', 'UpdateDateTime', 'IsLocked', 'DefaultPriceDescription' ];
    const ar666C64747970 = [ o73716C.NVarChar(50), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Int, o73716C.NVarChar(50), o73716C.Bit, o73716C.NVarChar(50), o73716C.Decimal(18, 5), o73716C.Int, o73716C.Int, o73716C.DateTime, o73716C.Bit, o73716C.NVarChar(50) ];
    const ar72717264666C64 = ['Customer', 'Address', 'ContactPerson', 'ContactNumber', 'CreditLimit', 'TermId', 'TIN', 'WithReward', 'RewardConversion', 'AccountId']
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null);
    const c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 6, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (c4964 <= 1 ) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t46373746D72))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0cx06, ['Id', 'Customer'], [o73716C.Int, o73716C.NVarChar(50)], [c4964, c64617461.Customer])) return res.status(203).json({ message: o01x747874.e00x04 , category:'error'});
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: 'Required fields ' + c6D7376E67666C644E + ' are missing.', category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0cx06, ['Id', 'Customer'], [o73716C.Int, o73716C.NVarChar(255)], [c4964, c64617461.Customer])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'});
    if (!/^[a-zA-Z0-9\s]+$/.test(c64617461.Customer)) return res.status(203).json({ message: o01x747874.e01x46373746D72, category: 'error' });
    if (!/^[a-zA-Z0-9\s\-\.,&]+$/.test(c64617461.Address)) return res.status(203).json({ message: o01x747874.e02x46373746D72, category: 'error' });
    if (!/^[a-zA-Z0-9\s]+$/.test(c64617461.ContactPerson)) return res.status(203).json({ message: o01x747874.e03x46373746D72, category: 'error' });
    if (!/^[0-9\s+-]+$/.test(c64617461.ContactNumber)) return res.status(203).json({ message: o01x747874.e04x46373746D72, category: 'error' });
    if (c64617461.ContactNumber === '' || parseInt(c64617461.ContactNumber, 10) === 0) c64617461.ContactNumber = '000000';
    if (!/^\d+(\.\d+)?$/.test(c64617461.CreditLimit)) return res.status(203).json({ message: o01x747874.e05x46373746D72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.TermId, o02x747874.t74726D))) return res.status(203).json({ message: o01x747874.e06x46373746D72, category: 'error' });
    if (!/^[0-9\-]+$/.test(c64617461.TIN)) return res.status(203).json({ message: o01x747874.e07x46373746D72, category: 'error' });
    if (c64617461.TIN === null || c64617461.TIN === '' || c64617461.TIN === '0') c64617461.TIN = '000000';
    if (!/^[0-9\s-]+$/.test(c64617461.RewardNumber)) return res.status(203).json({ message: o01x747874.e08x46373746D72, category: 'error' });
    if (c64617461.RewardNumber === null || c64617461.RewardNumber === '' || c64617461.RewardNumber === '0') c64617461.RewardNumber = '000000';
    if (!/^\d+(\.\d+)?$/.test(c64617461.RewardConversion)) return res.status(203).json({ message: o01x747874.e09x46373746D72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e10x46373746D72, category: 'error' });
    const Fieldc64617461 = [ c64617461.Customer, c64617461.Address, c64617461.ContactPerson, c64617461.ContactNumber, c64617461.CreditLimit || 0, c64617461.TermId, c64617461.TIN, c64617461.WithReward || 0, c64617461.RewardNumber || null, c64617461.RewardConversion || 0, c64617461.AccountId || 0, c7573724964, c647465, 1, c64617461.DefaultPriceDescription || null ];
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t46373746D72, ar666C6473, ar666C64747970, Fieldc64617461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s7570647464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : lock specific data in customer table by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id, data)
****************************************************************/
exports.k6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 7, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (c4964 === 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t46373746D72))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    if (!(await o6D646C73.f6C636B(c4964, o02x747874.t46373746D72))) return res.status(203).send({ message: o01x747874.e00x01 , category:'error'});
    return res.status(200).send({ message: o04x747874.s6C636B, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : unlock specific data in customer table by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(Id, data)
****************************************************************/
exports.k6E6C636B = async (req, res) => {
  try { 
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 7, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (c4964 === 1) return res.status(203).json({ message: o01x747874.e00x09 , category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t46373746D72))) return res.status(203).json({ message:  o01x747874.e00x03 , category:'error' });
    if (!(await o6D646C73.f6E6C636B(c4964, o02x747874.t46373746D72))) return res.status(203).send({ message:  o04x747874.s6C636B, category:'error'});
    return res.status(200).send({ message: o04x747874.s6E6C636B, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all sales history of a specific customer by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getSalesHistory()
****************************************************************/
exports.k6761736C7363636E74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 7, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    return res.status(200).json(await o6D646C73.f676574514644(o02x747874.q0cx07, ['Id'], [o73716C.Int], [c4964]));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all sales account in account table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllTerm()
****************************************************************/
exports.k676174726D = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0cx08));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all term in term table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllCustomerAccount()
****************************************************************/
exports.k637376D763636E74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0cx09));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all price description in item table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllPriceDescription()
****************************************************************/
exports.k707236436377046E = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0cx010));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE
