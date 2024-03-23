const { o69746D707263 } = require('../../models/master/itemPriceModels'), { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKINGWORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all data of ItemPrice table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemPrices()
****************************************************************/
exports.k676169746D707263 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json((await o6D646C73.f67746C6C(o02x747874.t69746D707263))); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });  
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all ItemPrice with a FK of temp/null
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllNullFK()
****************************************************************/
exports.k67616E6C6C666B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json((await o6D646C73.f6765744151(o02x747874.q0ipx03)));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });  
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get all item price of an Item
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), o03x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f676574(c4964, o03x747874.t69746D))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json((await o6D646C73.f676574514644(o02x747874.q0ipx02, ['ItemId'], [o73716C.Int], [c4964])));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKINGWORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : get one specific item price by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o03x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    const d72736C74 = await o6D646C73.f676574(c4964, o03x747874.t69746D707263);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });  
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!(await o6D646C73.f666E64(c4964, o03x747874.t69746D707263))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o02x747874.s63636E74666E, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : delete specific item price by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete (Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanDelete'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!(await o6D646C73.f666E64(c4964, o03x747874.t69746D707263)))  return res.status(203).json({ message: o01x747874.e00x06 , category:'error'});
    if (!(await o6D646C73.f646C74(c4964, o03x747874.t69746D707263))) return res.status(203).json({ message: o01x747874.e00x001, category:'error' });
    return res.status(200).json({ message: o02x747874.s646C764, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'  }); 
  }
};//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : DELETE ALL DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteAll (Id)
****************************************************************/
exports.k646C74616C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!(await o6D646C73.f666E64514644(o04x747874.q0ipx02, ['ItemId'], [o73716C.Int], [c4964])))  return res.status(203).json({ message: o01x747874.e00x03 , category:'error' }); 
    if (!(await o6D646C73.f646C746177666C64(c4964, 'ItemId', o03x747874.t69746D707263))) return res.status(203).json({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).json({ message: o02x747874.s646C764, category:'success'}); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' }); 
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKINGWORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : add a array/bulk of item price
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(q747874), ar647473 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const ar69746D6E737274 = [], ar666C6464 = [], ar72717264666C64 = ['PriceDescription', 'Price', 'TriggerQuantity']; let v634470517279, ar666C6473, ar666C64747970, ar666C64647461, c636E74 = 0;
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (await o6D646C73.f666E6451(o04x747874.q0ipx01)){ if (!(await o6D646C73.f646C7451(o04x747874.q0ipx04))) return res.status(500).json({ message: o01x747874.e00x01 , category:'error' }); }
    if (!Array.isArray(ar647473) || ar647473.length === 0) return res.status(202).json({ message: o01x747874.e00x07, category: 'error' });
    for (const c64617461 of ar647473) {
      if (c64617461.ItemId != null && c64617461.ItemId !== 0) { if (!await o6D646C73.f666E64(parseInt(c64617461.ItemId, 10), o03x747874.t69746D)) { ar666C6464.push(c64617461.PriceDescription); continue; } }
      if (!c64617461.ItemId) { v634470517279 = o04x747874.q0ipx05;  ar666C6473 = ['PriceDescription', 'Price', 'TriggerQuantity']; ar666C64747970 = [o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5)]; ar666C64647461 = [c64617461.PriceDescription, c64617461.Price, c64617461.TriggerQuantity]; } 
      else if( c64617461.ItemId != null){ v634470517279 = o04x747874.q0ipx06; ar666C6473 = ['ItemId', 'PriceDescription', 'Price', 'TriggerQuantity']; ar666C64747970 = [o73716C.Int, o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5)]; ar666C64647461 = [c64617461.ItemId, c64617461.PriceDescription, c64617461.Price, c64617461.TriggerQuantity]; }
      const v666E646E67 = await o6D646C73.f666E64514644(v634470517279, ar666C6473, ar666C64747970, ar666C64647461);
      if (v666E646E67) { ar666C6464.push(c64617461.PriceDescription); continue; }
      const c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null);
      if (c6D73736E67666C.length > 0) { ar666C6464.push(c64617461.PriceDescription); continue; }
      const c64706C637464740A = ar69746D6E737274.some(c69746D => c69746D.PriceDescription === c64617461.PriceDescription && c69746D.Price === c64617461.Price && c69746D.TriggerQuantity === c64617461.TriggerQuantity );
      if (c64706C637464740A) { ar666C6464.push(c64617461.PriceDescription); continue; }
      ar69746D6E737274.push(c64617461); c636E74++;
    } 
    if (ar69746D6E737274.length === 0) return res.status(202).json({ message: `${o01x747874.e00x07}. ${ar666C6464.length > 0 ? ar666C6464.join(', ') + ' failed to add' : ''}`, category: 'error' });
    if (!await o69746D707263.f616464(ar69746D6E737274)) return res.status(203).json({ message: o01x747874.e00x01, category: 'error' });
    return res.status(200).json({  message: `${c636E74} ${o02x747874.s616363616464}`, category: 'success' });
  } catch (error) {
    //return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
    return res.status(500).json({ message: error.message, category: 'error' });
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : update a specific item price by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, Data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(q747874), c64617461 = await req.body, c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const ar72717264666C64 = ['ItemId', 'PriceDescription', 'Price', 'TriggerQuantity']; 
    const c6D73736E67666C = ar72717264666C64.filter(c666C6473 => c64617461[c666C6473] === undefined || c64617461[c666C6473] === null);
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964 || !c64617461)  return res.status(404).json({ message: o01x747874.e00x08 , category:'error'});
    const ar01x666C6473 = ['ItemId', 'PriceDescription', 'Price', 'TriggerQuantity'];
    const ar01x666C64747970 = [o73716C.Int, o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5)];
    const ar03x666C64647461 = [c64617461.ItemId, c64617461.PriceDescription, c64617461.Price, c64617461.TriggerQuantity];
    if (!(await o6D646C73.f666E64(c4964, o03x747874.t69746D707263)))  return res.status(404).json({ message: o01x747874.e00x03, category:'error'});
    if (c6D73736E67666C.length > 0)  return res.status(400).json({ message: `Required fields [${c6D73736E67666C.join(', ')}] are missing.`, category:'error' });
    const ar02x666C6473 = ['Id', 'ItemId', 'PriceDescription', 'Price', 'TriggerQuantity'];
    const ar02x666C64747970 = [o73716C.Int, o73716C.Int, o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5)];
    const ar02x666C64647461 = [c4964, c64617461.ItemId, c64617461.PriceDescription, c64617461.Price, c64617461.TriggerQuantity];
    if (!c4964 || c4964 === null) {
      if ((await o6D646C73.f666E64514644(o04x747874.q0ipx08, ['Id', 'PriceDescription', 'Price', 'TriggerQuantity'], [o73716C.Int, o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5)], [c4964, c64617461.PriceDescription, c64617461.Price, c64617461.TriggerQuantity])))  return res.status(409).json({ message: o01x747874.e00x04, category:'error'});
    }else{
      if ((await o6D646C73.f666E64514644(o04x747874.q0ipx07, ar02x666C6473, ar02x666C64747970, ar02x666C64647461)))  return res.status(409).json({ message: o01x747874.e00x04, category:'error'});
    } 
    if (!(await o6D646C73.f75706474514644(c4964, o03x747874.t69746D707263, ar01x666C6473, ar01x666C64747970, ar03x666C64647461))) return res.status(500).json({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).json({ message: o02x747874.s7570647464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}//END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 01, 2024
  PURPOSE              : update a specific item price that has null FK item by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : updateNullFK(Id, Data)
****************************************************************/
exports.k757064746E6C6C66B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874), o04x747874 = await f72646C6E(q747874), ar64746C7374 = await req.body, c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0); let ar69746D6E737274=[], c636E74=0;
    if(!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if(!(await o617468.k6341637352(c7573724964, 5 , 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964 || !ar64746C7374)  return res.status(404).json({ message: o01x747874.e00x08, category:'error'});
    const ar736C637469746D = await o6D646C73.f676574(c4964, o03x747874.t69746D);
    if (ar736C637469746D.length< 0) return res.status(203).json({ message: `Item ${o01x747874.e00x03}`, category:'error'});
    for(const c64617461 of ar64746C7374){
      if(!await o6D646C73.f676574(c64617461.Id, o03x747874.t69746D707263)){ c636E74++; continue; }
      if (await o6D646C73.f666E64514644(o04x747874.q0ipx08, ['Id', 'PriceDescription', 'Price', 'TriggerQuantity'], [o73716C.Int, o73716C.NVarChar(255), o73716C.Decimal(18, 5), o73716C.Decimal(18, 5)], [c64617461.Id, c64617461.PriceDescription, c64617461.Price, c64617461.TriggerQuantity])) { c636E74++; continue; }
      ar69746D6E737274.push(c64617461);
    }
    if (!(await o69746D707263.f75706474626C6B(c4964, ar69746D6E737274))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).json({ message: `${o02x747874.s7570647464}, ${c636E74} failed`, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error' });
  }
}//END HERE
