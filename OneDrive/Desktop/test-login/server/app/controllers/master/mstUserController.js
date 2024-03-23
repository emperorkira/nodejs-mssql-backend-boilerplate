const { o61637372676874 } = require('../../models/master/accessRightsModels'), { f6E6372797074, f646372797074 } = require('../../database/function'), o617468 = require('../auth');
const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function');
const d747874 = resolve(__dirname, '../../texts/date.json'), e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : 
****************************************************************/
exports.getAllUser = async () => {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874);
  try {
    const d72736C74 = await o6D646C73.f67746C6C(o02x747874.t757372);
    if (d72736C74.length === 0) return console.log(o01x747874.e00x03);
    return  d72736C74;
  } catch (error) {
    return console.log(o01x747874.e00x05);
  }
};
/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : 
****************************************************************/
exports.getUserById = async (c4964) => {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874);
  try {
    const d72736C74 = await o6D646C73.f676574514644(o02x747874.q0usx01, ['Id'], [o73716C.Int], [c4964]);
    if (d72736C74.length === 0) return console.log(o01x747874.e00x03);
    return  d72736C74;
  } catch (error) {
    return console.log(o01x747874.e00x05);
  }
};
/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : 
****************************************************************/
exports.getUserByUserName = async (c7573726E6D) => {
  const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874);
  try {
    console.log(c7573726E6D);
    const d72736C74 = await o6D646C73.f676574514644(o02x747874.q0usx02,['UserName'], [o73716C.NVarChar(255)], [c7573726E6D]);
    if (d72736C74.length === 0) return console.log(o01x747874.e00x03);
    return  d72736C74;
  } catch (error) {
    return console.log(o01x747874.e00x05);
  }
};// END HERE --<>--

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all user data in user table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const d72736C74 = await o6D646C73.f6765744151(o02x747874.q0usx03);
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get specific user data by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    const c64617461 = await o6D646C73.f676574(c4964, o02x747874.t757372);
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    c64617461.Password = await f646372797074(o02x747874.t00x01, c64617461.Password);
    return res.status(200).json(c64617461);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all access rights of a specific user by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getUserAccessRights()
****************************************************************/
exports.k67757372616373 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'  });
    const d72736C74 = await o6D646C73.f67657451(c4964, o02x747874.q0usx04);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03 });
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get latest Id in user table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getId()
****************************************************************/
exports.k674964 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    const c4964 = await o6D646C73.f6765744151(o01x747874.q0usx05);
    if (c4964) return res.status(200).json(parseInt(c4964[0].Id,10));
    else return res.status(203).json({ Id:1 });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all null FK in UserForm table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllNullFK()
****************************************************************/
exports.k67616E6C6C666B= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    return res.status(200).json(await o6D646C73.f6765744151(o02x747874.q0usx06));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update all null FK in UserForm by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateNullFK(Id, data)
****************************************************************/
exports.k757064746E6C6C66B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, ar72717264666C64 = ['UserId'], c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c4964 || !c64617461) return res.status(203).json({ message: o01x747874.e00x08, category:'error'  });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t75737266726D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0usx07, ['FormId'], [o73716C.Int], [c4964])) {
      await o6D646C73.f646C74(c4964, o02x747874.t75737266726D);
      return res.status(200).json({ message: o01x747874.e00x04, category:'error'});
    }
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t75737266726D, ['UserId'], [o73716C.Int], [c64617461.UserId]))) return res.status(500).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s616363616464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to find specific User by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'  });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t757372))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const v6374 = await o6D646C73.f676574514644(o04x747874.q0usx08, ['UserId'], [o73716C.Int], [c4964]);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c4964)  return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t757372)))  return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (v6374.length > 1 || c4964 <=3 ) return res.status(203).json({ message: o01x747874.e00x02, category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0usx09, ['Id','IsLocked'], [o73716C.Int, o73716C.Bit], [c4964, 1])) return res.status(203).json({ message: o01x747874.e00x10, category:'error' });
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t757372))) return res.status(500).json({ message:  o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : to add new user in user table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c64617461 = await req.body, ar72717264666C64 = [ 'UserName', 'Password', 'FullName'], c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    const ar666C6473 = ['UserCode', 'UserName', 'Password', 'FullName', 'UserCardNumber', 'EntryUserId', 'EntryDateTime', 'IsLocked'], ar666C64747970 = [o73716C.Text, o73716C.Text, o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Int, o73716C.DateTime, o73716C.Bit];
    c64617461.UserName = c64617461.UserName.replace(/ /g, ''), c64617461.Password = c64617461.Password.replace(/ /g, '');
    const c67746364 = await o6D646C73.f6765744151(o04x747874.q0usx010);
    const c6364 = (!c67746364[0].UserCode)? 0 : c67746364[0].UserCode;
    const c69746D6364 = String(parseInt(c6364) + 1).padStart(6, '0');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    if (!c64617461)  return res.status(203).json({ message: o01x747874.e00x07, category:'error' });
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (!/^[a-zA-Z\s]+$/.test(c64617461.FullName)) return res.status(203).json({ message: o01x747874.e01x756E74, category: 'error' });
    if(!c64617461.UserCardNumber || c64617461.UserCardNumber===0) c64617461.UserCardNumber = "0000";
    if (!/^[0-9\s\-]+$/.test( c64617461.UserCardNumber)) return res.status(203).json({ message: o01x747874.e02x756E74, category: 'error' });
    const ar666C64647461 =[c69746D6364, c64617461.UserName, (await f6E6372797074(o02x747874.t00x01, c64617461.Password)), c64617461.FullName , c64617461.UserCardNumber || null , c7573724964, c647465, 1];
    if (await o6D646C73.f666E64514644(o04x747874.q0usx011,['UserName'], [o73716C.NVarChar(255)], [c64617461.UserName])) return res.status(203).send({ message: o01x747874.e00x04, category:'error' });
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error'  });
    if (!(await o6D646C73.f616464514644(o02x747874.t757372, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(500).send({ message: o01x747874.e00x01, category:'error'  });
    return res.status(201).send({ message: o03x747874.s616363616464, category:'success'  });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update a specific user by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 }); 
    c64617461.UserName = c64617461.UserName.replace(/ /g, ''), c64617461.Password = c64617461.Password.replace(/ /g, '');
    if (!c647465 || !c647465747970) return res.status(203).json({ message: o01x747874.err02x000001, category: 'error' });
    if (!c4964 || !c64617461) return res.status(203).json({ message: o01x747874.e00x08, category:'error'  });
    if (c4964 <= 3) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t757372))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'  });
    if (!/^[a-zA-Z\s]+$/.test(c64617461.FullName)) return res.status(203).json({ message: o01x747874.e01x756E74, category: 'error' });
    if(!c64617461.UserCardNumber || c64617461.UserCardNumber===0) c64617461.UserCardNumber = "0000";
    if (!/^[0-9\s\-]+$/.test( c64617461.UserCardNumber)) return res.status(203).json({ message: o01x747874.e02x756E74, category: 'error' });
    const ar666C6473 = ['UserName', 'Password', 'FullName', 'UserCardNumber', 'UpdateUserId', 'UpdateDateTime'], ar72717264666C64 = ['UserName', 'Password', 'FullName'];
    const ar666C64747970 = [o73716C.Text, o73716C.Text, o73716C.NVarChar(255), o73716C.NVarChar(255), o73716C.Int, o73716C.DateTime];
    const ar666C64647461 =[c64617461.UserName, (await f6E6372797074(o02x747874.t00x01, c64617461.Password)), c64617461.FullName , c64617461.UserCardNumber || null , c7573724964, c647465];
    const c6D73736E67666C = ar72717264666C64.filter(c72717264666C64 => c64617461[c72717264666C64] === undefined || c64617461[c72717264666C64] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: `Required fields [${c6D7376E67666C644E}] are missing.`, category:'error'  });
    if (await o6D646C73.f666E64514644(o04x747874.q0usx012, ['Id','UserName'], [o73716C.Int, o73716C.NVarChar(255)], [c4964, c64617461.UserName])) return res.status(203).send({ message: o01x747874.e00x04, category:'error'  });
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t757372, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'  });
    return res.status(201).send({ message: o03x747874.s7570647464, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all user, to output in copy rights selection
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllCopyAccessRights()
****************************************************************/
exports.k6761637079616373= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0usx013)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to copy the access rights of a specific user by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getCopyAccessRights(Id)
****************************************************************/
exports.k67636172 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({  message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (c4964 === c7573724964 ) return res.status(203).json({ message: o01x747874.e04x756E74 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    const d72736C74 = await o6D646C73.f676574514644(o02x747874.q0usx014, ['UserId'], [o73716C.Int], [c4964]);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to lock a specific user by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id)
****************************************************************/
exports.k6C636B= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id,10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanLock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (c4964 <= 3) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t757372))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (!(await o6D646C73.f6C636B(c4964, o02x747874.t757372))) return res.status(500).send({ message: o01x747874.e00x01, category:'error' });
    return res.status(201).send({ message: o03x747874.s6C636B, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to unlock a specific user by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(Id)
****************************************************************/
exports.k6E6C636B= async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id,10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanUnlock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (c4964 <= 3) return res.status(203).json({ message: o01x747874.e00x09, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t757372))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (!(await o6D646C73.f6E6C636B(c4964, o02x747874.t757372))) return res.status(500).send({ message: o01x747874.e00x01, category:'error' });
    return res.status(201).send({ message: o03x747874.s6E6C636B, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete all access rights using parent Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAllAccessRights(Id) -> FK Id
****************************************************************/
exports.k6C7861636332676874 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964)  return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    if (c4964 <= 3)  return res.status(203).json({ message: o01x747874.e00x02, category:'error' });
    if (!(await o6D646C73.f666E64514644(o04x747874.q0usx015, ['UserId'], [o73716C.Int], [c4964])))  return res.status(203).json({ message: `Rights ${o01x747874.e00x03}`, category:'error' });
    if (!(await o6D646C73.f646C746177666C64(c4964, ['UserId'], o02x747874.t75737266726D))) return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete a specific access right by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAccessRight(Id)
****************************************************************/
exports.k6C7461636332676874 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964)  return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    const c67757372 = await o6D646C73.f676574(c4964, o02x747874.t75737266726D);
    if (parseInt(c67757372.UserId) <= 3) return res.status(203).json({ message: o01x747874.e00x02, category:'error' });
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t75737266726D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t75737266726D))) return res.status(500).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to add in bulk of access rights to the user
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : addBulk(data) with UserId or Null
****************************************************************/
exports.k6164626C6B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = (parseInt(req.params.Id, 10)===0)? null :parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const ar666C6464 = [], ar647473 = await req.body, ar69746D6E737274 = []; let c636E74 = 0, v634470;
    if (!Array.isArray(ar647473) || ar647473.length === 0) return res.status(203).send({ message: o01x747874.e00x07, category:'error' });
    if (await o6D646C73.f666E6451(o04x747874.q0usx016)){ if (!(await o6D646C73.f646C7451(o04x747874.q0usx017))) return res.status(500).json({ message: o01x747874.e00x01, category:'error' }); }
    for (const c64617461 of ar647473) {
        if(!c4964) v634470 = await o6D646C73.f666E64514644(o04x747874.q0usx018, ['FormId'], [o73716C.Int], [c64617461.FormId]);
        else v634470 = await o6D646C73.f666E64514644(o04x747874.q0usx020, ['c4964', 'FormId'], [o73716C.Int,o73716C.Int], [c4964, c64617461.FormId]);
        if (v634470) ar666C6464.push(c64617461.Form);
        else{ ar69746D6E737274.push(c64617461); c636E74++; }
    }
    if (ar69746D6E737274.length > 0) { if (!(await o61637372676874.f6164626C6B(c4964, ar69746D6E737274))) ar666C6464.push('failed to add.'); }
    return res.status(200).send({ message: `${c636E74} ${o03x747874.s616363616464}, ${ ar666C6464.length} failed`, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update a bulk of data by parent Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateBulk(Id, data)
****************************************************************/
exports.k75706474626C6B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), ar666C6464 = [], ar69746D6E737274 = [], ar647473 = await req.body, c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);  let c636E74 = 0;
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if(!c4964 || !ar647473) return res.status(203).send({ message: o01x747874.e00x08, category:'error' }); 
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t757372))) return res.status(203).send({ message: o01x747874.e00x04, category:'error' }); 
    if (!Array.isArray(ar647473) || ar647473.length === 0) return res.status(203).send({ message: o01x747874.e00x07, category:'error' });
    for (const c64617461 of ar647473) {
      const v634470 = await o6D646C73.f666E64514644(o04x747874.q0usx020, ['c4964', 'FormId'], [o73716C.Int, o73716C.Int], [c4964, c64617461.FormId]);
      if (v634470) { ar69746D6E737274.push(c64617461); c636E74++; } 
      else ar666C6464.push(c64617461.Form);
    }
    if (ar69746D6E737274.length > 0) {
      if (!(await o61637372676874.f75706474626C6B(c4964, ar69746D6E737274))) { ar666C6464.push('failed to add.');}
    } return res.status(201).send({ message: `${c636E74} ${o03x747874.s7570647464}, fail: ${ar666C6464}`, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update all null FK access rights by Id and UserId
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateAllNullIFK(UserId, data)
****************************************************************/
exports.k5706474414E6C46 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), ar64746C7374 = await req.body, c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0); let ar69746D6E737274=[], ar666C6464=[];
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 14, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!ar64746C7374) return res.status(203).json({ message: o01x747874.e00x06, category:'error'  });
    for (const c64617461 of ar64746C7374) {
      if (!(await o6D646C73.f666E64(c64617461.Id, o02x747874.t75737266726D))) { ar666C6464.push(c64617461); continue; }
      if (await o6D646C73.f666E64514644(o04x747874.q0usx020, ['c4964', 'FormId'], [o73716C.Int, o73716C.Int], [c4964, c64617461.FormId])) {
        ar666C6464.push(c64617461); continue;
      } ar69746D6E737274.push(c64617461);
    }
    if (!ar69746D6E737274 || ar69746D6E737274.length === 0)  return res.status(200).json({ message: o01x747874.e00x03, category:'error'});
    const c666C6564 = 'Failed: '+ ar666C6464.join(', ');
    if (!await o61637372676874.updateBulkAccessRights2(c4964, ar69746D6E737274)) return res.status(200).json({ message: `${o01x747874.e00x01} ${(!c666C6564)?'':c666C6564}'` , category:'error'});
    return res.status(200).json({ message: `${ar69746D6E737274.length} ${o03x747874.s7570647464}`, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAccessRight(Id, UserId)
****************************************************************/
exports.k67616373 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c63686C644964= parseInt(req.params.UserId, 10);
    if (!c4964 || !c63686C644964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'  });
    if (!(await o6D646C73.f666E64(c63686C644964, o02x747874.t757372))) return res.status(203).send({ message: o01x747874.e00x03, category:'error' });
    const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t75737266726D);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}; // END HERE

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all SysForm for form selection
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllSysForms()
****************************************************************/
exports.k67617366726D = async (req, res) => {
  try {
    const  o02x747874 = await f72646C6E(t747874);
    return res.status(200).json(d72736C74 = await o6D646C73.f67746C6C(o02x747874.t66726D)); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
};// END HERE