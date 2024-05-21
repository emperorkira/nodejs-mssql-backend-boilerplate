const { o6D646C73 } = require('../../models'), { o6473636E7469746D } = require('../../models/master/discountItemModels'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all DiscountItem of a specific discount By Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll(Id)
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    return res.status(200).json(await o6D646C73.f676574514644(o02x747874.q0dix01, ['DiscountId'], [o73716C.Int], [c4964]));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' })
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to add new DiscountedItem to DiscountItem table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(t747874), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0), ar72717264666C64 = ['ItemId'];
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (await o6D646C73.f666E6451(o02x747874.q0dix02)){ if (!(await o6D646C73.f646C7451(o02x747874.q0dix03))) return res.status(500).json({ message: o01x747874.e00x01, category:'error' }); }
    if (!c64617461) return res.status(500).json({ message: o01x747874.e00x07, category: 'error' });
    let c6D73736E67666C, datalist=[], c636E74 =0, failed = '';
    for(const data of c64617461){
      c6D73736E67666C = ar72717264666C64.filter(c666C6473 => data[c666C6473] === undefined || data[c666C6473] === null);
      if (c6D73736E67666C.length > 0) { c636E74++; continue; }
      if (!(await o6D646C73.f666E64(data.ItemId, o04x747874.t69746D))) { c636E74++; continue; }
      if (!data.DiscountId) v634470 = await o6D646C73.f666E64514644(o02x747874.q0dix04, ['ItemId'], [o73716C.Int], [data.ItemId]);
      else v634470 = await o6D646C73.f666E64514644(o02x747874.q0dix05, ['DiscountId', 'ItemId'], [o73716C.Int, o73716C.Int], [data.DiscountId, data.ItemId]);
      if (v634470){ c636E74++; continue; }
      datalist.push(data);
    }// LOOP
    if(!datalist || datalist.length < 1) return res.status(500).json({ message: o01x747874.e00x07, category:'error' });
    if (!(await o6473636E7469746D.f616464(datalist))) return res.status(203).json({ message: o01x747874.e00x01, category: 'error' });
    if (c636E74 > 0) failed = `, ${c636E74} failed to add`;
    return res.status(200).json({ message: `${o03x747874.s616363616464}${failed}`, category: 'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to update
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data) FK -> Parent Id
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0), ar72717264666C64 = ['ItemId'];
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category: 'error' });
    if (!(await o6D646C73.f666E64(c4964, o04x747874.t6473636E74))) return res.status(203).json({ message: `Discount ${o01x747874.e00x03}`, category: 'error' });
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!c64617461) return res.status(500).json({ message: o01x747874.e00x07, category: 'error' });
    let c6D73736E67666C, datalist=[], c636E74 =0;
    for(const data of c64617461){
      c6D73736E67666C = ar72717264666C64.filter(c666C6473 => data[c666C6473] === undefined || data[c666C6473] === null);
      if (c6D73736E67666C.length > 0) { c636E74++; continue; }
      if (!(await o6D646C73.f666E64(data.Id, o04x747874.t6473636E7469746D))) { c636E74++; continue; }
      if (!(await o6D646C73.f666E64(data.ItemId, o04x747874.t69746D))) { c636E74++; continue; }
      if (await o6D646C73.f666E64514644(o02x747874.q0dix06, ['DiscountItemId', 'DiscountId', 'ItemId'], [o73716C.Int, o73716C.Int, o73716C.Int], [data.Id, data.DiscountId, data.ItemId])){ c636E74++; continue; }
      datalist.push(data);
    }// LOOP
    if(!datalist || datalist.length < 1) return res.status(500).json({ message: o01x747874.e00x07, category:'error' });
    if (c636E74 > 0) failed = `, ${c636E74} failed to update`;
    if (!(await o6473636E7469746D.f616464(datalist))) return res.status(203).json({ message: o01x747874.e00x01, category: 'error' });
    return res.status(200).json({ message: `${o03x747874.s7570647464}${failed}`, category: 'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
}// END HERE



/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get a specific DiscountItem by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874),o02x747874 = await f72646C6E(t747874), c63686C644964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c63686C644964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    const d72736C74 = await o6D646C73.f676574(c63686C644964, o02x747874.t6473636E7469746D);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json(d72736C74);
  } catch (error) {
   return res.status(500).json({ message: 'Internal Server Error', category:'error' }) ;
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to find a specific DiscountItem by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c63686C644964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c63686C644964) return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (!(await o6D646C73.f666E64(c63686C644964, o02x747874.t6473636E7469746D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete a specific DiscountItem by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c63686C644964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c63686C644964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c63686C644964, o02x747874.t6473636E7469746D)))  return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (!(await o6D646C73.f646C74(c63686C644964, o02x747874.t6473636E7469746D))) return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  });
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to delete all DiscountItem of a Discount by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAll(Id) -> FK parentId
****************************************************************/
exports.k646C74616C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6473636E74)))  return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (!(await o6D646C73.f646C74716664(c4964,'DiscountId','MstDiscountItem')))return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o03x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}// END HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : February 03, 2024
  PURPOSE              : to get all null FK of DiscountItem
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllNullFK()
****************************************************************/
exports.k67616E6C6C666B = async ( req, res ) => {
  try {
    const o01x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0dix07));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}// END HERE


/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : update a specific discounted item that has null FK discount by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateNullFK(Id, Data)
****************************************************************/
exports.k757064746E6C6C66B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(q747874), ar64746C7374 = await req.body, c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0); let ar69746D6E737274=[], c636E74=0;
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964 || !ar64746C7374)  return res.status(404).json({ message: o01x747874.e00x08, category:'error'});
    const ar736C637469746D = await o6D646C73.f676574(c4964, o03x747874.t6473636E74);
    if (ar736C637469746D.length< 0) return res.status(203).json({ message: `Discount ${o01x747874.e00x03}`, category:'error'});
    
    for(const c64617461 of ar64746C7374){
      if (!await o6D646C73.f676574(c64617461.Id, o03x747874.t69746D707263)){ c636E74++; continue; }
      if (!(await o6D646C73.f666E64(c64617461.ItemId, o02x747874.t69746D))){ c636E74++; continue; }
      if (await o6D646C73.f666E64514644(o04x747874.q0dix08, ['Id', 'ItemId'], [o73716C.Int, o73716C.Int], [c64617461.Id, c64617461.ItemId])) { c636E74++; continue; }
      ar69746D6E737274.push(c64617461);
    }
   
    if (!(await o6473636E7469746D.f75706474626C6BD(ar69746D6E737274))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'});
    return res.status(500).json({ message: 'here', category:'error' });
    return res.status(200).json({ message: `${o02x747874.s7570647464}, ${c636E74} failed`, category:'success'});
  } catch (error) {
    return res.status(500).json({ error:error.message, message: 'Internal Server Error', category:'error' });
  }
}//END HERE