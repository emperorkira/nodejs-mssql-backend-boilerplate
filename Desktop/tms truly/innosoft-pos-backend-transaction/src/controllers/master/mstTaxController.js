const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all data in tax table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
try {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
  if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
  if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
  return res.status(200).json(await o6D646C73.f67746C6C(o02x747874.t7478)); 
} catch (error) {
  return res.status(500).json({ message:'Internal Server Error', category:'error' });
}
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get specific tax by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
try {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
  if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
  if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
  if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
  const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t7478);
  if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
  return res.status(200).json(d72736C74);
} catch (error) {
 return res.status(500).json({ message:'Internal Server Error', category:'error' });
}
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to find specific tax by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
try {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
  if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
  if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
  if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
  const d72736C74 = await o6D646C73.f666E64(c4964, o02x747874.t7478);
  if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
  return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
} catch (error) {
  return res.status(500).json({ message:'Internal Server Error', category:'error' });
}
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete specific tax by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
try {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
  const v01x6374 = await o6D646C73.f666E64514644(o04x747874.q0txx01, ['Id'], [o73716C.Int], [c4964]);
  const v02x6374 = await o6D646C73.f666E64514644(o04x747874.q0txx02, ['Id'], [o73716C.Int], [c4964]);
  const v03x6374 = await o6D646C73.f666E64514644(o04x747874.q0txx03, ['Id'], [o73716C.Int], [c4964]);
  if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
  if (!(await o617468.k6341637352(c7573724964, 12, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
  if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
  if (!(await o6D646C73.f666E64(c4964, o02x747874.t7478)))  return res.status(203).json({ message:  o01x747874.e00x03, category:'error' });
  if (v01x6374 || v02x6374 || v03x6374 || c4964 <= 6 ) return res.status(203).json({ message: o01x747874.e00x02, category:'error' });
  if (!(await o6D646C73.f646C74(c4964, o02x747874.t7478))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'  });
  return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
} catch (error) {
  return res.status(500).json({ message:'Internal Server Error', category:'error'  });
}
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const ar72717264666C64 = [ 'Code', 'Tax', 'Rate', 'AccountId' ], c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    const ar666C6473 = ['Code', 'Tax', 'Rate', 'AccountId'], ar666C64747970 = [o73716C.NVarChar(50), o73716C.NVarChar(50), o73716C.Decimal(18,5), o73716C.Int];
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x07, category:'error'  });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error'  });
    if (await o6D646C73.f666E64514644(o04x747874.q0txx04, ['Code','Tax'], [o73716C.NVarChar(50),o73716C.NVarChar(50)], [c64617461.Code, c64617461.Tax])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'  });
    if (!/^[a-zA-Z\s]+$/.test(c64617461.Code)) return res.status(203).json({ message: o01x747874.e01x7478, category: 'error' });
    if (!/^[a-zA-Z\s-&]+$/.test(c64617461.Tax)) return res.status(203).json({ message: o01x747874.e02x7478, category: 'error' });
    if (!/^\d+(\.\d+)?$/.test(c64617461.Rate)) return res.status(203).json({ message: o01x747874.e03x7478, category: 'error' });
    const ar666C64647461 = [c64617461.Code, c64617461.Tax, c64617461.Rate,  c64617461.AccountId];
    if (!(await o6D646C73.f616464514644(o02x747874.t7478, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'  });
    return res.status(200).send({ message: o03x747874.s616363616464, category:'success'  });
  } catch (error) {
    return res.status(500).json({ message:'Internal Server Error', category:'error'  });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update specific tax by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const ar72717264666C64 = ['Code', 'Tax', 'Rate', 'AccountId'],  c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    const ar666C6473 = ['Code', 'Tax', 'Rate', 'AccountId'], ar666C64747970s = [o73716C.NVarChar(50), o73716C.NVarChar(50), o73716C.Decimal(18, 5), o73716C.Int];
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category: 'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7478))) return res.status(203).json({ message: o01x747874.e00x03, category: 'error' });
    if (c4964 <= 6) return res.status(203).json({ message: o01x747874.e00x09, category: 'error' });
    if (c6D73736E67666C.length > 0)  return res.status(203).json({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category: 'error' });
    const v634470 = await o6D646C73.f666E64514644( o04x747874.q0txx05, ['Id', 'Code', 'Tax'], [o73716C.Int, o73716C.NVarChar(50), o73716C.NVarChar(50)], [c4964, c64617461.Code, c64617461.Tax]);
    if (v634470) return res.status(203).json({ message: o01x747874.e00x04, category: 'error' });
    if (!/^[a-zA-Z\s]+$/.test(c64617461.Code)) return res.status(203).json({ message: o01x747874.e01x7478, category: 'error' });
    if (!/^[a-zA-Z\s-&]+$/.test(c64617461.Tax)) return res.status(203).json({ message: o01x747874.e01x7478, category: 'error' });
    if (!/^\d+(\.\d+)?$/.test(c64617461.Rate)) return res.status(203).json({ message: o01x747874.e01x7478, category: 'error' });
    const ar666C64647461 = [c64617461.Code, c64617461.Tax, c64617461.Rate, c64617461.AccountId];
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t7478, ar666C6473, ar666C64747970s, ar666C64647461))) return res.status(203).json({ message: o01x747874.e00x01, category: 'error' });
    return res.status(200).json({ message: o03x747874.s7570647464, category: 'success' });
  } catch (error) {
    return res.status(500).json({ message:'Internal Server Error', category: 'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all tax in
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllTaxAccounts()
****************************************************************/
exports.k67617478 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0sx08)); 
  } catch (error) {
    return res.status(500).json({ message:'Internal Server Error', category:'error' });
  }
};// END HERE