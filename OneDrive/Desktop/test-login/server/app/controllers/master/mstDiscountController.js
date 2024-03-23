const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function'), o617468 = require('../auth');
const d747874 = resolve(__dirname, '../../texts/date.json'), e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all data of the discount table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.k67746C6C = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 8, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    return res.status(200).json(await o6D646C73.f6765744151(o02x747874.q0dx01));
  } catch (error) {
    return res.status(500).json({  message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get the latest discount Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getId()
****************************************************************/
exports.k676473636E746964 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    const c4964 = await o6D646C73.f6765744151(o02x747874.q0dx02);
    if (!c4964) return res.status(203).json({ Id: 1 });
    return res.status(200).json(parseInt(c4964[0].Id, 10));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'})
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get specific data in discount by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(id)
****************************************************************/
exports.k676574 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error' });
    const d72736C74 = await o6D646C73.f676574(c4964, o02x747874.t6473636E74);
    if (!d72736C74) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    return res.status(200).json(d72736C74);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : find specific data in discount by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.k666E64 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 8, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6473636E74))) return res.status(203).json({ message:  o01x747874.e00x03, category:'error' });
    return res.status(200).json({ message: o03x747874.s63636E74666E, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : delete specific data in discount by Id
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
****************************************************************/
exports.k646C74 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanView'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6473636E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0dx06, ['Id'], [o73716C.Int], [c4964]) || c4964 <= 4) return res.status(203).json({ message: o01x747874.e00x02, category:'error'});
    if (await o6D646C73.f666E64514644(o04x747874.q0dx05, ['Id','IsLocked'], [o73716C.Int, o73716C.Bit], [c4964, '1'])) return res.status(203).json({ message: o01x747874.e00x10, category:'error'});
    if (!(await o6D646C73.f646C74(c4964, o02x747874.t6473636E74))) return res.status(203).json({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).json({ message: o03x747874.s646C764, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : to add new data in discount table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
****************************************************************/
exports.k616464 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const ar666C6473 = [ 'DiscountCode', 'Discount', 'DiscountRate', 'IsVatExempt', 'IsDateScheduled', 'DateStart', 'DateEnd', 'IsTimeScheduled', 'TimeStart', 'TimeEnd', 'IsDayScheduled', 'DayMon', 'DayTue', 'DayWed', 'DayThu', 'DayFri', 'DaySat', 'DaySun', 'EntryUserId', 'EntryDateTime', 'IsLocked' ];
    const ar666C64747970 = [ o73716C.NVarChar(255), o73716C.NVarChar(50), o73716C.Decimal(18, 5), o73716C.Bit, o73716C.Bit, o73716C.DateTime, o73716C.DateTime, o73716C.Bit, o73716C.DateTime, o73716C.DateTime, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Int, o73716C.DateTime, o73716C.Bit ];
    const ar72717264666C64 = ['Discount', 'DiscountRate', 'IsVatExempt', 'IsDateScheduled', 'IsTimeScheduled', 'IsDayScheduled'];
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanAdd'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c647465747970 || !c647465) return res.status(203).json({ message: o01x747874.err02x000001, category:'error'});
    if (!c64617461) return res.status(203).json({ message: o01x747874.e00x07, category:'error'});
    const c67746364 = await o6D646C73.f6765744151(o04x747874.q0dx03);
    const c6364 = (!c67746364[0].DiscountCode)? 0 : c67746364[0].DiscountCode;
    const c6473636E746364 = String(parseInt(c6364) + 1).padStart(6, '0');
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: 'Required fields ' + c6D7376E67666C644E + ' are missing.', category:'error' })
    if (await o6D646C73.f666E64514644(o04x747874.q0dx04, ['Discount'], [o73716C.NVarChar(50)], [c64617461.Discount])) return res.status(203).send({ message: o01x747874.e00x04 , category:'error'});
    if (!/^[a-zA-Z0-9\s]+$/.test(c64617461.Discount)) return res.status(203).json({ message: o01x747874.e01x6473636E74, category: 'error' });
    if (!/^\d+(\.\d+)?$/.test(c64617461.DiscountRate)) return res.status(203).json({ message: o01x747874.e02x6473636E74, category: 'error' });
    const ar666C64647461 = [ c6473636E746364, c64617461.Discount, c64617461.DiscountRate || 0, c64617461.IsVatExempt, c64617461.IsDateScheduled, c64617461.DateStart || null, c64617461.DateEnd || null, c64617461.IsTimeScheduled, c64617461.TimeStart || null, c64617461.TimeEnd || null, c64617461.IsDayScheduled, c64617461.DayMon, c64617461.DayTue, c64617461.DayWed, c64617461.DayThu, c64617461.DayFri, c64617461.DaySat, c64617461.DaySun, c7573724964, c647465, 1 ];
    if (!(await o6D646C73.f616464514644('MstDiscount', ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s616363616464, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(id, data)
****************************************************************/
exports.k75706474 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), o04x747874 = await f72646C6E(q747874), o05x747874 = await f72646C6E(d747874), c4964 = parseInt(req.params.Id, 10), c64617461 = await req.body, c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    const c647465 = String(o05x747874.Date), c647465747970 = String(o05x747874.DateType);
    const ar666C6473 = [ 'Discount', 'DiscountRate', 'IsVatExempt', 'IsDateScheduled', 'DateStart', 'DateEnd', 'IsTimeScheduled', 'TimeStart', 'TimeEnd', 'IsDayScheduled', 'DayMon', 'DayTue', 'DayWed', 'DayThu', 'DayFri', 'DaySat', 'DaySun', 'UpdateUserId', 'UpdateDateTime' ];
    const ar666C64747970 = [ o73716C.NVarChar(50), o73716C.Decimal(18, 5), o73716C.Bit, o73716C.Bit, o73716C.DateTime, o73716C.DateTime, o73716C.Bit, o73716C.DateTime, o73716C.DateTime, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Bit, o73716C.Int, o73716C.DateTime ];
    const ar72717264666C64 = ['Discount', 'DiscountRate', 'IsVatExempt', 'IsDateScheduled', 'IsTimeScheduled', 'IsDayScheduled'];
    const c6D73736E67666C = ar72717264666C64.filter(field => c64617461[field] === undefined || c64617461[field] === null), c6D7376E67666C644E = c6D73736E67666C.join(', ');
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanEdit'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c647465747970 || !c647465) return res.status(203).json({ message: o01x747874.err02x000001, category:'error'});
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 <= 4) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6473636E74))) return res.status(203).json({ message: o01x747874.e00x03 , category:'error'});
    if (c6D73736E67666C.length > 0) return res.status(203).send({ message: 'Required fields ' + c6D7376E67666C644E + ' are missing.', category:'error' });
    if (await o6D646C73.f666E64514644(o04x747874.q0dx07, ['Id', 'Discount'], [o73716C.Int, o73716C.NVarChar(50)], [c4964, c64617461.Discount])) return res.status(203).json({ message: o01x747874.e00x04, category:'error'});
    if (!/^[a-zA-Z0-9\s]+$/.test(c64617461.Discount)) return res.status(203).json({ message: o01x747874.e01x6473636E74, category: 'error' });
    if (!/^\d+(\.\d+)?$/.test(c64617461.DiscountRate)) return res.status(203).json({ message: o01x747874.e02x6473636E74, category: 'error' });
    const ar666C64647461 = [ c64617461.Discount, c64617461.DiscountRate || 0, c64617461.IsVatExempt, c64617461.IsDateScheduled, c64617461.DateStart || null, c64617461.DateEnd || null, c64617461.IsTimeScheduled, c64617461.TimeStart || null, c64617461.TimeEnd || null, c64617461.IsDayScheduled, c64617461.DayMon, c64617461.DayTue, c64617461.DayWed, c64617461.DayThu, c64617461.DayFri, c64617461.DaySat, c64617461.DaySun, c7573724964, c647465 ];
    if (!(await o6D646C73.f75706474514644(c4964, o02x747874.t6473636E74, ar666C6473, ar666C64747970, ar666C64647461))) return res.status(203).send({ message: o01x747874.e00x01, category:'error' });
    return res.status(200).send({ message: o03x747874.s7570647464, category:'success' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : to lock specific data in discount table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(id)
****************************************************************/
exports.k6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanLock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 <= 4) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6473636E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if (!(await o6D646C73.f6C636B(c4964, o02x747874.t6473636E74))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s6C636B, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : to unlock specific data in discount table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock()
****************************************************************/
exports.k6E6C636B = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(t747874), o03x747874 = await f72646C6E(s747874), c4964 = parseInt(req.params.Id, 10), c7573724964 =  ((res.locals.user && res.locals.user.length > 0)? parseInt(await res.locals.user[0].Id):0);
    if (!c7573724964) return res.status(203).json({ message: o01x747874.err04x000002, category: 'error' });
    if (!(await o617468.k6341637352(c7573724964, 9, 'CanUnlock'))) return res.status(203).json({ message: o01x747874.e00x11 });
    if (!c4964) return res.status(203).json({ message: o01x747874.e00x06, category:'error'});
    if (c4964 <= 4) return res.status(203).json({ message: o01x747874.e00x09, category:'error'});
    if (!(await o6D646C73.f666E64(c4964, o02x747874.t6473636E74))) return res.status(203).json({ message: o01x747874.e00x03, category:'error'});
    if (!(await o6D646C73.f6E6C636B(c4964, o02x747874.t6473636E74))) return res.status(203).send({ message: o01x747874.e00x01, category:'error'});
    return res.status(200).send({ message: o03x747874.s6E6C636B, category:'success'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all item code in item table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllItemCode()
****************************************************************/
exports.k676169746D6364 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0dx08));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE

/****************************************************************
  STATUS               :  WORKING
  DATE CREATED/UPDATED : February 02, 2024
  PURPOSE              : get all discounted item in DiscountItem table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAllDiscountedItem()
****************************************************************/
exports.k676473636E7469746D = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(q747874);
    return res.status(200).json(await o6D646C73.f6765744151(o01x747874.q0dx09));
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', category:'error'});
  }
}// END HERE