const { f6E6372797074, f646372797074 } = require('../../database/function'), o617468 = require('../auth');
const { o6D646C73 } = require('../../models'), o73716C = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('../../database/function');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 16, 2024
  PURPOSE              : get all data from certain table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll()
****************************************************************/
exports.getAll = async (req, res, next) => {
  try {
    //return res.status(200).json('data');
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874);
    // access right
    const data = await o6D646C73.f67746C6C('[TrnDisbursement]');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[getAll()', message: error.message });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 16, 2024
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id)
****************************************************************/
exports.get = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(q747874), c4964 = parseInt(req.params.Id, 10);
    if (!c4964) return res.status(400).json({ message: 'Id is null or undefined' });
    const data = await o6D646C73.f676574514644('SELECT * FROM [TrnDisbursement] WHERE Id = @Id', ['Id'], [o73716C.Int], [c4964]);
    if (!data) return res.status(404).json({ message: 'Data not found' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[get(Id)]', message: error.message });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : November 29, 2023
  PURPOSE              : FIND ONE SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : find(Id)
****************************************************************/
exports.find = async (req, res) => {
  try {
    const c4964 = parseInt(req.params.Id, 10);
    if (!c4964) return res.status(400).json({ message: 'Id is null or undefined' });
    const data = await o6D646C73.f666E64(c4964, '[TrnDisbursement]');
    if (!data) return res.status(404).json({ message: 'Data not found.' });
    return res.status(200).json({ message: 'Collection found.' });
  } catch (error) {
    return res.status(500).json({ error: 'Controller Error[find(Id)]', message: error.message });
  }
};// END HERE
