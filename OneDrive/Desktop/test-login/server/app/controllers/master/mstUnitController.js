const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all unit data 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f67746C6C(o02x747874.t756E74)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', category:'error' });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get a specific unit data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(400).json({ message: o01x747874.e00x06, category:'error'  });
    const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t756E74);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error'  });
    return res.status(200).json(d72736C74);
  } catch (error) {
   return res.status(500).json({ message: 'Internal Server error', category:'error' });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to find a specific unit data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(400).json({ message: o01x747874.e00x06, category:'error'  });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t756E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'  });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success'  });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', category:'error' });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete a specific unit data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(400).json({ message: o01x747874.e00x06, category:'error'  });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t756E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'  });
    if ((await o6D646C73.f666E64514644(o04x747874.q0ux01, ['c4964'], [o73716C.Int], [c4964])) || c4964 <= 44) return res.status(203).json({ message: o01x747874.e00x02, category:'error'  });
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t756E74))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'  }); 
    return res.status(200).json({ message: o03x747874.s646C764, category:'success'  });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', category:'error'  });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to add new data in unit table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c64617461 = await req.body, ar72717264666C64 = [ 'Unit' ], c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c64617461) return res.status(400).json({ message: o01x747874.e00x06, category:'error'  });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error'  });
    if (await o6D646C73.f666E64514644(o04x747874.q0ux02, ['Unit'], [o73716C.NVarChar(50)], [c64617461.Unit])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'  });
    if (!/^[a-zA-Z0-9\s\(\)\-]+$/.test(c64617461.Unit)) return res.status(203).json({ message: o01x747874.e01x756E74, category: 'error' });
    if (!(await o6D646C73.f616464514644(o02x747874.t756E74, ['Unit'], [o73716C.NVarChar(50)], [c64617461.Unit]))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'  });
    return res.status(200).send({ message: o03x747874.s616363616464, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', category:'error'  });
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, ar72717264666C64 = [ 'Unit' ], c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 12, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (c4964 <= 44) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t756E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0ux03, ['Id', 'Unit'], [o73716C.Int, o73716C.NVarChar(50)], [c4964, c64617461.Unit])) return res.status(203).json({ message: o01x747874.e00x04, category:'error' });
    if (!/^[a-zA-Z0-9\s\(\)\-]+$/.test(c64617461.Unit)) return res.status(203).json({ message: o01x747874.e01x756E74, category: 'error' });
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t756E74, ['Unit'], [o73716C.NVarChar(50)], [c64617461.Unit]))) return res.status(203).send({ message: o01x747874.e00x01, category:'error' }); 
    return res.status(201).send({ message: o03x747874.s7570647464, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error', category:'error' });
  }
};//END HERE
