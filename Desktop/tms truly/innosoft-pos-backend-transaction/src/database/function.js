//INCLUDE NECESSARY LIBRARY

const o6673  = require('fs').promises, o707468 = require('path'),{ resolve } = require('path'), { exec } = require('child_process'), o626372797074 = require('bcrypt'), o63727079746F = require('crypto');
const e747874 = resolve(__dirname, '../texts/error.json'), s747874 = resolve(__dirname, '../texts/success.json'), q747874 = resolve(__dirname, '../texts/query.json'), t747874 = resolve(__dirname, '../texts/tables.json');

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : to upload an image, and copy the imagefile to a specified folder
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : uploadimage(image)
****************************************************************/
const f75706C64696D67 = async (c696D67707468 ) => {
  try {
    const c6D62 = 1048576, c696D67666C  = o707468 .parse(c696D67707468).base.replace(/\\/g, '/'), o01x747874 = await f72646C6E(e747874);
    const c747267746472  = o707468 .join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'images'); // IN PRODUCTION
    // const c747267746472  = o707468.join(__dirname, '..', '..', 'public', 'image'); // ONLY BACKEND
    const c74726774666C = o707468.join(c747267746472 , c696D67666C );
    const c696D67666C7470  = o707468 .extname(c74726774666C).toLowerCase();
    if (await o6673.stat(c696D67707468).then(c737473  => c737473 .isDirectory())) { console.log(o01x747874.e01x666E63746E); return null }
    if (!c696D67666C ) { console.log('Please select an image.'); return null }
    const c6578746E736E  = c696D67666C .slice(-4);
    if (c696D67666C7470 !== '.jpg' && c696D67666C7470  !== '.png' && c696D67666C7470  !== '.jpeg')  { console.log(o01x747874.e02x666E63746E); return null }
    const c696D67737473 = await o6673.stat(c696D67707468);
    if (c696D67737473.size > 2 * c6D62)  { console.log(o01x747874.e03x666E63746E); return null }
    const c696D676E77666C  = o63727079746F.createHash('md5').update(c696D67666C ).digest('hex') + Date.now() + c6578746E736E ;
    await o6673.copyFile(c696D67707468 , o707468.join(c747267746472, c696D676E77666C ));
    return c696D676E77666C ;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : to read text files
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : readTextFile(filepath)
****************************************************************/
async function f7264747874666C(c666C707468) {
  try {
    const d72736C74 = await o6673.readFile(c666C707468, 'utf8');
    if (!d72736C74 || d72736C74 === null || d72736C74 === undefined) return null;
    return d72736C74;
  } catch (err) {
    console.error(`Error reading the file: ${err}`); return null;
  }
}// END FUNCTION

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : append new data to a file
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : appendToFile(filepath, data)
****************************************************************/
async function f6170706E64(c666C707468, c64617461) {
  try {
    let cE64617461 = {};
    try {
      const c65787374636E74 = await o6673.readFile(c666C707468, 'utf-8');
      cE64617461 = JSON.parse(c65787374636E74);
    } catch (readError) {
      console.log(readError.message); return false;
    }
    const c6D7267646474 = { ...cE64617461, ...c64617461 };
    const c6A736F6E6474  = JSON.stringify(c6D7267646474, null, 2);
    await o6673.writeFile(c666C707468, c6A736F6E6474 , 'utf-8');
    return true;
  } catch (error) {
    console.log(error.message); return false;
  }
}// END FUNCTION

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : rewrite the whole file with a new data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : writeToJSONFile(filepath, data)
****************************************************************/
async function f7772746A736E(c666C707468, c64617461) {
  try {
    const c6A736F6E6474 = JSON.stringify(c64617461, null, 2);
    await o6673.writeFile(c666C707468, c6A736F6E6474 , 'utf-8');
    return true;
  } catch (error) {
    console.log(`Error writing file: ${error.message}`); return false;
  }
}// END FUNCTION

/****************************************************************
  STATUS               : FOR TESTING
  DATE CREATED/UPDATED : February 07, 2024
  PURPOSE              : to read the data of the file
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : readFileLines(filepath)
****************************************************************/
async function f72646C6E(c666C707468) {
  try {
    const c6A736F6E6474 = await o6673.readFile(c666C707468, 'utf8');
    if (!c6A736F6E6474.trim()) return null;
    return JSON.parse(c6A736F6E6474);
  } catch (error) {
    if (error instanceof SyntaxError && error.message.includes('Unexpected end of JSON input')) return null;
    console.log(error.message); return null;
  }
}

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to get motherboard BIOS Serial Number
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getBiosSerialNumber()
****************************************************************/
async function f677462696F73() { // Function to get the BIOS serial number
  return new Promise((resolve, reject) => {
    exec('wmic bios get serialnumber', (error, stdout) => { if (error) {  reject(error); return; }
      const d72646C6E = stdout.trim().split('\n'), c62696F737369  = d72646C6E[1].trim();
      resolve(c62696F737369);
    });
  });
}// END FUNCTION

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to get the primary storage device serial number
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getStorageSerialNumber()
****************************************************************/
async function f677473747267() {
  return new Promise((resolve, reject) => {
    exec('wmic diskdrive get serialnumber', (error, stdout) => { if (error) { reject(error); return; }
      const d72646C6E = stdout.trim().split('\n'), c62696F737369 = d72646C6E[1].trim();
      resolve(c62696F737369);
    });
  });
}//END FUNCTION

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to encrypt data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : XOREncryption(CodeKey, DataIn)
****************************************************************/
async function f6E6372797074(c63646B79, c64617461) {
  try{
    if (!c64617461 || !c64617461.length) return 'DataIn is undefined, null, or empty.';
    let d72736C74 = '';
    for (let lonDataPtr = 0; lonDataPtr < c64617461.length; lonDataPtr++) {
      const c76616C31 = c64617461.charCodeAt(lonDataPtr);
      const c76616C32 = c63646B79.charCodeAt(lonDataPtr % c63646B79.length);
      const c746D70 = (c76616C31 % 256) ^ (c76616C32 % 256);
      let c746D70737472 = c746D70.toString(16).toUpperCase();
      if (c746D70737472.length === 1) c746D70737472 = '0' + c746D70737472;
      d72736C74 += c746D70737472;
    } return d72736C74;
  } catch(error){
    console.log(error.message); return null;
  }
}// END FUNCTION

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to encrypt data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : XORDecryption(CodeKey, DataIn)
****************************************************************/
async function f646372797074(c63646B79, c64617461) {
  try{
    let d72736C74 = '', c76616C31, c76616C32;
    for (let lonDataPtr = 0; lonDataPtr < c64617461.length; lonDataPtr += 2) {
        c76616C31 = parseInt(c64617461.substr(lonDataPtr, 2), 16);
        c76616C32 = c63646B79.charCodeAt(lonDataPtr / 2 % c63646B79.length);
        d72736C74 += String.fromCharCode(c76616C31 ^ c76616C32);
    } return d72736C74;
  }catch(error){
    console.log(error.message); return null;
  }
}// END FUNCTION

// Function to concatenate and encrypt BIOS and storage serial numbers
async function encryptBiosAndStorageSerialNumbers(biosSerialNumber, storageSerialNumber) {
  const combinedSerialNumbers = biosSerialNumber + storageSerialNumber;
  const saltRounds = 10; // Generate a salt for bcrypt
  const salt = await o626372797074.genSalt(saltRounds);
  const encryptedSerialNumbers = await o626372797074.hash(combinedSerialNumbers, salt);
  return encryptedSerialNumbers;
}// END HERE

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to validate license-key
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : licenseValidator(Key) //boolean
****************************************************************/
async function f6C636E73766C64(c6B79){
  try{
    const c62736E = await f677462696F73(), c53534E = await f677473747267(), o01x747874 = await f72646C6E(t747874);
    if(!c62736E || !c53534E) return false;
    const c736C74 = `${o01x747874.na00x02}${o01x747874.na00x01}`
    const c6C636E736B79 = await f646372797074(c736C74, String(c6B79));
    const c70727473 = c6C636E736B79 .split('.');
    let c746D706B79 = `${c53534E}${c62736E}`; c746D706B79 = c746D706B79.replace(/[^\w]\s/g, '').replace('.','').replace('_','').replace('-','');
    if(String(c746D706B79) !== String(c70727473[0])) return false;
    let c746D706364 = (String(c70727473[1])==='retail')?'retail':((String(c70727473[1])==='restaurant')?'restaurant':((String(c70727473[1])==='hotel')?'hotel':'none'));
    let c746D70747970 = (String(c70727473[2])==='administrator')?'administrator':((String(c70727473[2])==='cashier')?'cashier':((String(c70727473[2])==='teller')?'teller':'none'));
    let c746D706472746E = (String(c70727473[3])==='7')?'7':(String(c70727473[3])==='14')?'14':((String(c70727473[3])==='30')?'30':((String(c70727473[3])==='90')?'90':((String(c70727473[3])==='365')?'365':'0')));
    const startDate = new Date(String(c70727473[4])); // Parse the start date
    const expiryDate = new Date(startDate.getTime() + parseInt(c746D706472746E, 10) * 24 * 60 * 60 * 1000);
    const currentDate = new Date(), formatter = new Intl.DateTimeFormat('en-PH', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(startDate);
    const formattedDate = `${year}/${month}/${day}`;
    if(currentDate >= expiryDate){console.log('license expired'); return false } 
    let c746D706C6E736B = `${c746D706B79}.${c746D706364}.${c746D70747970}.${c746D706472746E}.${formattedDate}`;
    let c746D706E63727074 = await f6E6372797074(c736C74, c746D706C6E736B);
    return (c746D706E63727074 === c6B79);
  }catch(error){
    console.log(error.message); return false;
  }
};// END FUNCTION

/****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : February 08, 2024
  PURPOSE              : to convert ASCII text to hexadecimal
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : stringToHex(data)
****************************************************************/
async function f7374726878(str) {
  try{
    let hex = '';
    for (let i = 0; i < str.length; i++) { hex += str.charCodeAt(i).toString(16).padStart(2, '0'); }
    if(!hex || hex ===null || hex === undefined) return null;
    return hex;
  }catch(error){
    console.log(error.message); return null;
  }
}// END FUNCTION


(async () => {
  //const env = o707468.resolve(__dirname, '../../env.txt');
  //const res = await f6C636E73766C64(data.key);
  //console.log(res)
})();


module.exports = {
  f75706C64696D67 ,
  f7264747874666C ,
  f6170706E64 	,
  f7772746A736E	,
  f72646C6E	,
  f677462696F73	,
  f677473747267	,
  f6E6372797074	,
  f646372797074	,
  f6C636E73766C64	,
  f7374726878
};
