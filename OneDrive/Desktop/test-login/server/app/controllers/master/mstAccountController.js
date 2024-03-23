const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : DISPLAY ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f67746C6C(o02x747874.t6163636E74));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : find specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message:  o01x747874.e00x07, category:'error' });
    const v666E646E67 = await o6D646C73.f666E64(c4964, o02x747874.t6163636E74);
    if (!v666E646E67) return res.status(404).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    const c64617461 = await o6D646C73.f676574(c4964, o02x747874.t6163636E74)
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json(c64617461);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : delete specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(q747874), o04x747874 = await f72646C6E(s747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const c4964 = parseInt(req.params.Id, 10)
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x07, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    const v01x6374 = await o6D646C73.f666E64514644(o03x747874.q0ax01, ['Id'], [o73716C.Int], [c4964]);
    const v02x6374 = await o6D646C73.f666E64514644(o03x747874.q0ax02, ['Id'], [o73716C.Int], [c4964]);
    const v03x6374 = await o6D646C73.f666E64514644(o03x747874.q0ax03, ['Id'], [o73716C.Int], [c4964]);
    if (v01x6374 || v02x6374 || v03x6374 || c4964 <= 12 ) return res.status(203).json({ message: o01x747874.e00x02, category:'error' });
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o04x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : add new data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(q747874), o04x747874 = await f72646C6E(s747874), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x07, category:'error' });
    const ar666C6473 = ['Code', 'Account', 'IsLocked', 'AccountType'];
    const ar666C64747970 = [o73716C.NVarChar(50), o73716C.NVarChar(100), o73716C.Bit, o73716C.NVarChar(50)];
    const ar666C64647461 = [c64617461.Code, c64617461.Account, 1, c64617461.AccountType || null];
    const ar72717264666C64 = ['Code', 'Account', 'IsLocked'];
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null);
    const c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.` , category:'error'});
    if (await o6D646C73.f666E64514644(o03x747874.q0ax04, ['Code'], [o73716C.NVarChar(50)], [c64617461.Code])) return res.status(203).json({ message: o01x747874.e00x04, category:'error' });
    if (!/^[0-9]+$/.test(c64617461.Code)) return res.status(203).json({ message: o01x747874.e01x6163636E74, category: 'error' });
    if (!/^[a-zA-Z\s\-&]+$/.test(c64617461.Account)) return res.status(203).json({ message: o01x747874.e02x6163636E74, category: 'error' });
    const v616464746E = await o6D646C73.f616464514644(o02x747874.t6163636E74, ar666C6473, ar666C64747970, ar666C64647461);
    if (!v616464746E) return res.status(203).send({ message: o01x747874.e00x01 , category:'error'});
    return res.status(200).send({ message: o04x747874.s616363616464 , category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : update specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(q747874), o04x747874 = await f72646C6E(s747874), c64617461 = await req.body, c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964 || !c64617461) return res.status(203).json({ message: o01x747874.e00x08 , category:'error'});
    if (c4964 <= 12) return res.status(203).json({ message: o01x747874.e00x09, category: 'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    const ar666C6473 = ['Code', 'Account', 'AccountType'], ar72717264666C64 = ['Code', 'Account'];
    const ar666C64747970 = [o73716C.NVarChar(50), o73716C.NVarChar(100), o73716C.NVarChar(50)];
    const ar666C64647461 = [c64617461.Code, c64617461.Account, c64617461.AccountType || null];
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null);
    const c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: 'Required fields' + c6D7376E67666C644E + ' are missing.' , category:'error'});
    if (await o6D646C73.f666E64514644(o03x747874.q0ax05, ['Id', 'Code'], [o73716C.Int, o73716C.NVarChar(50)], [c4964, c64617461.Code])) return res.status(203).json({ message: o01x747874.e00x04 , category:'error'});
    if (!/^[0-9]+$/.test(c64617461.Code)) return res.status(203).json({ message: o01x747874.e01x6163636E74, category: 'error' });
    if (!/^[a-zA-Z\s\-&]+$/.test(c64617461.Account)) return res.status(203).json({ message: o01x747874.e02x6163636E74, category: 'error' });
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t6163636E74, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o02x747874.e00x01, category:'error' });
    return res.status(200).send({ message: o04x747874.s7570647464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : lock specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(id)
****************************************************************/
exports.k6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12 , 'CanLock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    const d72736C74 = await o6D646C73.f6C636B(c4964, o02x747874.t6163636E74);
    if (!d72736C74) return res.status(203).send({ message: o01x747874.e00x01 , category:'error'});
    return res.status(200).send({ message: o04x747874.s6C636B, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : unlock specific data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(id)
****************************************************************/
exports.k6E6C636B = async (req, res) => {
  try { 
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanUnlock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964 ) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error' });
    const d72736C74 = await o6D646C73.f6E6C636B(c4964, o02x747874.t6163636E74);
    if (!d72736C74) return res.status(203).send({ message: o04x747874.s6C636B, category:'error'});
    return res.status(200).send({ message: o04x747874.s6E6C636B, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE
