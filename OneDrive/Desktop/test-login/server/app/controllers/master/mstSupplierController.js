const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const d747874 = resolve(__dirname, '../../texts/date.json'), e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all data of supplier
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f6765744151(o02x747874.q0sx01)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get specific supplier by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t7370706C72);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error'  });
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to find a specific supplier by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete specific supplier by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874),  c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7370706C72)))  return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    const v6374 = await o6D646C73.f666E64514644(o04x747874.q0sx02, ['c4964'], [o73716C.Int], [c4964]);
    const v636F74 = await o6D646C73.f666E64514644(o04x747874.q0sx03, ['c4964'], [o73716C.Int], [c4964]); 
    if(v636F74 || c4964 <= 1 || v6374) return res.status(203).json({ message:  o01x747874.e00x02, category:'error'  }); 
    if (await o6D646C73.f666E64514644(o04x747874.q0sx04, ['Id', 'IsLocked'], [o73716C.Int, o73716C.Bit], [c4964, '1'])) return res.status(203).json({ message: o01x747874.e00x10, category:'error' });
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to add new data in supplier table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const ar666C6473 = [ 'SupplierCode','Supplier', 'Address', 'TelephoneNumber', 'CellphoneNumber', 'FaxNumber', 'TermId', 'TIN', 'AccountId', 'EntryUserId', 'EntryDateTime','IsLocked' ];
    const ar72717264666C64 = ['Supplier', 'Address', 'TelephoneNumber', 'CellphoneNumber', 'FaxNumber','TermId', 'TIN', 'AccountId'];
    const ar666C64747970= [ o73716C.NVarChar(255), o73716C.NVarChar(100),  o73716C.NVarChar(255), o73716C.NVarChar(50), o73716C.NVarChar(50), o73716C.NVarChar(50), o73716C.Int, o73716C.NVarChar(50), o73716C.Int, o73716C.Int, o73716C.DateTime, o73716C.Bit ];
    const c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    const c6773706C726364 = await o6D646C73.f6765744151(o04x747874.q0sx05);
    const c6364 = (!c6773706C726364[0].SupplierCode)? 0 : c6773706C726364[0].SupplierCode;
    const c73706C726364 = String(parseInt(c6364) + 1).padStart(6, '0');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x07, category:'error' });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0sx06, ['Supplier'], [o73716C.NVarChar(100)], [c64617461.Supplier])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'  });
    if (!/^[a-zA-Z0-9\s\-\.,&]+$/.test(c64617461.Supplier)) return res.status(203).json({ message: o01x747874.e01x7370706C72, category: 'error' });
    if (!/^[a-zA-Z0-9\s\-\.,&]+$/.test(c64617461.Address)) return res.status(203).json({ message: o01x747874.e02x7370706C72, category: 'error' });
    if (!/^[0-9\s\-]+$/.test(c64617461.TelephoneNumber)) return res.status(203).json({ message: o01x747874.e03x7370706C72, category: 'error' });
    if (!/^[0-9\s\-\+]+$/.test(c64617461.CellphoneNumber)) return res.status(203).json({ message: o01x747874.e04x7370706C72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.TermId, o02x747874.t74726D))) return res.status(203).json({ message: o01x747874.e06x46373746D72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e02x7079747970, category: 'error' });
    if (!/^[0-9\s\-]+$/.test(c64617461.TIN)) return res.status(203).json({ message: o01x747874.e07x46373746D72, category: 'error' });
    if (c64617461.TIN === null || c64617461.TIN === '' || parseInt(c64617461.TIN, 10) === 0) c64617461.TIN = 'NA';
    const ar666C64647461 =[ c73706C726364, c64617461.Supplier, c64617461.Address, c64617461.TelephoneNumber, c64617461.CellphoneNumber, c64617461.FaxNumber, c64617461.TermId, c64617461.TIN, c64617461.AccountId || 0, c7573724964, c647465, 1 ];
    const d72736C74 = await o6D646C73.f616464514644(o02x747874.t7370706C72, ar666C6473, ar666C64747970, ar666C64647461);
    if (!d72736C74) return res.status(203).send({ message: o01x747874.e00x01, category:'error' });
    return res.status(201).send({ message: o03x747874.s616363616464, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update a specific supplier by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const ar666C6473 = [ 'Supplier', 'Address', 'TelephoneNumber', 'CellphoneNumber', 'FaxNumber', 'TermId', 'TIN', 'AccountId', 'UpdateUserId', 'UpdateDateTime' ];
    const ar666C64747970= [  o73716C.NVarChar(100),  o73716C.NVarChar(255), o73716C.NVarChar(50), o73716C.NVarChar(50), o73716C.NVarChar(50), o73716C.Int, o73716C.NVarChar(50), o73716C.Int, o73716C.Int, o73716C.DateTime ];
    const ar72717264666C64 = ['Supplier', 'Address', 'TelephoneNumber', 'CellphoneNumber', 'FaxNumber', 'TermId', 'TIN',  'AccountId' ];
    const c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c64617461 || !c4964) return res.status(203).json({ message: o01x747874.e00x08, category:'error' });
    if (c4964 <= 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error'  });
    if (await o6D646C73.f666E64514644(o04x747874.q0sx07,['Id', 'Supplier'], [o73716C.Int,o73716C.NVarChar(100)], [c4964, c64617461.Supplier])) return res.status(203).json({ message: o01x747874.e00x04, category:'error' });
    if (!/^[a-zA-Z0-9\s\-\.,&]+$/.test(c64617461.Supplier)) return res.status(203).json({ message: o01x747874.e01x7370706C72, category: 'error' });
    if (!/^[a-zA-Z0-9\s\-\.,&]+$/.test(c64617461.Address)) return res.status(203).json({ message: o01x747874.e02x7370706C72, category: 'error' });
    if (!/^[0-9\s\-]+$/.test(c64617461.TelephoneNumber)) return res.status(203).json({ message: o01x747874.e03x7370706C72, category: 'error' });
    if (!/^[0-9\s\-\+]+$/.test(c64617461.CellphoneNumber)) return res.status(203).json({ message: o01x747874.e04x7370706C72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.TermId, o02x747874.t74726D))) return res.status(203).json({ message: o01x747874.e06x46373746D72, category: 'error' });
    if (!(await o6D646C73.f666E64(c64617461.AccountId, o02x747874.t6163636E74))) return res.status(203).json({ message: o01x747874.e02x7079747970, category: 'error' });
    if (!/^[0-9\s\-]+$/.test(c64617461.TIN)) return res.status(203).json({ message: o01x747874.e07x46373746D72, category: 'error' });
    if (c64617461.TIN === null || c64617461.TIN === '' || parseInt(c64617461.TIN, 10) === 0) c64617461.TIN = '000000';
    const ar666C64647461 =[ c64617461.Supplier, c64617461.Address, c64617461.TelephoneNumber, c64617461.CellphoneNumber, c64617461.FaxNumber, c64617461.TermId, c64617461.TIN, c64617461.AccountId || 0, c7573724964, c647465];
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t7370706C72, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).send({ message: o03x747874.s7570647464, category:'success'  }); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to lock a specific suppleir by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id)
****************************************************************/
exports.k6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanLock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 === 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if (!(await o6D646C73.f6C636B(c4964, o02x747874.t7370706C72))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s6C636B, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to unlock specific supplier
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock()
****************************************************************/
exports.k6E6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 11, 'CanUnlock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 === 1) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t7370706C72))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if (!(await o6D646C73.f6E6C636B(c4964, o02x747874.t7370706C72))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s6E6C636B, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : get all suppliers account in account table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllSupplierAccount()
****************************************************************/
exports.k73706C72616363 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0sx08)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all supplier term in terms table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllSupplierTerm()
****************************************************************/
exports.k73706C7274726D = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0sx09)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE
