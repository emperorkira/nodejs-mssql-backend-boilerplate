const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all pay-type
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f67746C6C(o02x747874.t7079747970)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get specific pay-type by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t7079747970);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    return res.status(200).json(d72736C74);
  } catch (error) {
   return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to find specific pay-type by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7079747970))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete specific pay-type by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!await o6D646C73.f666E64(c4964, o02x747874.t7079747970)) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if ((await o6D646C73.f666E64514644(o04x747874.q0ptx01, ['c4964'], [o73716C.Int], [c4964])) || c4964 <= 8) return res.status(203).json({ message: o01x747874.e00x02, category:'error'});
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t7079747970))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).json({ message: o03x747874.s646C764, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to add new data to pay-type table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c64617461 = await req.body, ar72717264666C64 = [ 'PayType', 'AccountId'], c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.` , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0ptx02, ['PayType'], [o73716C.NVarChar(50)], [c64617461.PayType])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'});
    if (!/^[a-zA-Z\s]+$/.test(c64617461.PayType)) return res.status(203).json({ message: o01x747874.e01x7079747970, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e02x7079747970, category: 'error' });
    if (!(await o6D646C73.f616464514644(o02x747874.t7079747970, ['PayType', 'AccountId','SortNumber'], [o73716C.NVarChar(50), o73716C.Int, o73716C.Int], [ c64617461.PayType, c64617461.AccountId, c64617461.SortNumber || null]))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s616363616464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update specific pay-type by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, ar72717264666C64 = [ 'PayType' ], c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 <= 8) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7079747970))) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.` , category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0ptx03,['Id', 'PayType'],[o73716C.Int, o73716C.NVarChar(50)],[c4964, c64617461.PayType])) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!/^[a-zA-Z\s]+$/.test(c64617461.PayType)) return res.status(203).json({ message: o01x747874.e01x7079747970, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e02x7079747970, category: 'error' });
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t7079747970, ['PayType', 'AccountId', 'SortNumber'], [o73716C.NVarChar(50), o73716C.Int, o73716C.Int], [ c64617461.PayType, c64617461.AccountId, c64617461.SortNumber || null]))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s7570647464, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all pay-type account
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllPayTypeAccount()
****************************************************************/
exports.k6761707974706363 = async (req, res) => {
  try {
    const o02x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o02x747874.q0cx09)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE