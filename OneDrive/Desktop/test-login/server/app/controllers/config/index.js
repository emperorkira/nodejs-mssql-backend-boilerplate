//INCLUDE NECESSARY LIBRARY
const fs = require('fs').promises, o707468 = require('path'), bcrypt = require('bcrypt'), { f6C636E73766C64, f7772746A736E, f72646C6E, f677462696F73, f677473747267, f646372797074, f6E6372797074,} = require('../../database/function'), { resolve } = require('path');
const e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 05, 2024
  PURPOSE              : to set configurations of the database and connect
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : connect()
****************************************************************/
exports.k636F6E6E = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874);
    const { server, username, password, dbname, port } = await req.body;
    if (!server || !username || !password || !dbname || !port)  return res.status(400).json({ connection: false, message: o01x747874.e00x07, category: 'error' });
    if (!/^[a-zA-Z0-9\s]+$/.test(server)) return res.status(400).json({ connection: false, message: `Server ${o01x747874.e00x18}`, category: 'error' });
    if (!/^[a-zA-Z0-9\s]+$/.test(username)) return res.status(400).json({ connection: false, message: `User ${o01x747874.e00x18}`, category: 'error' });
    if (!/^[a-zA-Z0-9\s_]+$/.test(dbname)) return res.status(400).json({ connection: false, message: `Datbase ${o01x747874.e00x18}`, category: 'error' });
    if (/^[\s=]+$/.test(password)) return res.status(400).json({ connection: false, message: `Password ${o01x747874.e00x18}`, category: 'error' });
    if (!/^[0-9]+$/.test(port)) return res.status(400).json({ connection: false, message: `Port ${o01x747874.e00x18}`, category: 'error' });
    const c64617461 = { d687374: String(server), d757372: String(username), d77373777264: String(password), d6E6D65: String(dbname), d707274: String(port) };
    const c666C707468  = o707468.resolve(__dirname, '../../../env.json');
    if(!(await f7772746A736E(c666C707468, c64617461))) return res.status(200).json({ connection: false, message: o01x747874.e00x13, category: 'error' });
    return res.status(200).json({ connection: true, message: o02x747874.s6462636E, category: 'success' });
  } catch (error) { console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
};

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 05, 2024
  PURPOSE              : to input license key of the software
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : licensekey(data)
****************************************************************/
exports.k6C636E736B79  = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874);
    const { key } = await req.body; let c64617461, c666C707468 ;
    if (!key)  return res.status(400).json({ license: false, message: o01x747874.e00x07, category: 'error' });
    if (!/^[a-zA-Z0-9]+$/.test(key)) return res.status(200).json({ license: false, message: o01x747874.e00x15, category: 'error' });
    if(!(await f6C636E73766C64(key))) return res.status(200).json({ license: false, message: o01x747874.e00x15, category: 'error' });
    c64617461 = { LicenseKey: String(key) };
    c666C707468  = o707468.resolve(__dirname, '../../../licensekey.json');
    if(!await f7772746A736E(c666C707468 , c64617461)) return res.status(200).json({ license: false, message: o01x747874.e00x15, category: 'error' });
    return res.status(200).json({ license: true, message: o02x747874.s6462636E, category: 'success' });
  } catch (error) { console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
};// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 05, 2024
  PURPOSE              : to get the key of the unit/computer
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get-key()
****************************************************************/
exports.k67746B74 = async (req, res) => {
  try {
    const c62736E = await f677462696F73(), c53534E = await f677473747267(), o01x747874 = await f72646C6E(e747874);
    if(!c62736E || !c53534E) return res.status(200).json({ license: true, message: o01x747874.e00x13, category: 'success' });
    let c6B79 = `${c53534E}${c62736E}`;
    c6B79 = c6B79.replace(/[^\w]\s/g, '').replace('.','').replace('_','').replace('-',''); 
    return res.status(200).json({ license: true, key: c6B79, category: 'success' });
  } catch (error) { console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
};// END HERE

exports.k67746C6E6373 = async (req, res) => {
  try {
    const o01x747874 = await f72646C6E(e747874), o02x747874 = await f72646C6E(s747874), o03x747874 = await f72646C6E(t747874);
    const { key } = await req.body;
    if (!key)  return res.status(400).json({ license: false, message: o01x747874.e00x07, category: 'error' });
    const c736C74 = `${o03x747874.na00x02}${o03x747874.na00x01}`;
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(currentDate);
    const formattedDate = `${year}/${month}/${day}`;
    let c746D706B79  =`${String(key)}.${'retail'}.${'administrator'}.${'365'}.${formattedDate}`;
    let c746D706C6E736B = await f6E6372797074(c736C74, c746D706B79);
    c746D706C6E736B = (!c746D706C6E736B || c746D706C6E736B === null || c746D706C6E736B === undefined)?'NA':c746D706C6E736B;
    return res.status(200).json({ license: c746D706C6E736B , message: o02x747874.s6462636E, category: 'success' });
  } catch (error) { console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error', category: 'error' });
  }
};
