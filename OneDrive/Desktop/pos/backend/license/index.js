//INCLUDE NECESSARY LIBRARY
const { exec } = require('child_process');
const bcrypt = require('bcrypt');

function getBiosSerialNumber() { // Function to get the BIOS serial number
  return new Promise((resolve, reject) => {
    exec('wmic bios get serialnumber', (error, stdout) => {
      if (error) {  reject(error); return;
      }

      const lines = stdout.trim().split('\n'), biosSerialNumber = lines[1].trim(); // Extract the BIOS serial number
      resolve(biosSerialNumber);
    });
  });
}

// Function to get the primary storage device serial number
function getStorageSerialNumber() {
  return new Promise((resolve, reject) => {
    exec('wmic diskdrive get serialnumber', (error, stdout) => {
      if (error) { reject(error); return;
      }

      const lines = stdout.trim().split('\n'), storageSerialNumber = lines[1].trim(); // Extract the serial number
      resolve(storageSerialNumber);
    });
  });
}

async function XOREncryption(CodeKey, DataIn) {
  let strDataOut = '';
  for (let lonDataPtr = 0; lonDataPtr < DataIn.length; lonDataPtr++) {
      const intXOrValue1 = DataIn.charCodeAt(lonDataPtr);
      const intXOrValue2 = CodeKey.charCodeAt(lonDataPtr % CodeKey.length);

      const temp = (intXOrValue1 % 256) ^ (intXOrValue2 % 256); // Ensure ASCII values by taking the modulo 256
      let tempstring = temp.toString(16).toUpperCase();
      
      if (tempstring.length === 1) tempstring = '0' + tempstring; // Pad with leading zero if necessary
      strDataOut += tempstring;
  } return strDataOut;
}

async function XORDecryption(CodeKey, DataIn) {
    let strDataOut = '', intXOrValue1, intXOrValue2;
    for (let lonDataPtr = 0; lonDataPtr < DataIn.length; lonDataPtr += 2) {
        intXOrValue1 = parseInt(DataIn.substr(lonDataPtr, 2), 16);
        intXOrValue2 = CodeKey.charCodeAt(lonDataPtr / 2 % CodeKey.length);
        strDataOut += String.fromCharCode(intXOrValue1 ^ intXOrValue2);
    } return strDataOut;
}


// Function to concatenate and encrypt BIOS and storage serial numbers
async function encryptBiosAndStorageSerialNumbers(biosSerialNumber, storageSerialNumber) {
  try {
    // Concatenate the BIOS and storage serial numbers
    const combinedSerialNumbers = biosSerialNumber + storageSerialNumber;

    // Generate a salt for bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the combined serial numbers using bcrypt
    const encryptedSerialNumbers = await bcrypt.hash(combinedSerialNumbers, salt);

    return encryptedSerialNumbers;
  } catch (error) {
    throw error;
  }
}

async function concatenateStrings(str1, str2) {
  // Concatenate the strings
  const result = str1 + str2;
  // Remove white spaces and special characters using regular expressions
  return result.replace(/[^\w]/g, '').replace(/[^a-zA-Z0-9\s]/g, '');
}
module.exports = {
  
  getBiosSerialNumber,
  getStorageSerialNumber,
  encryptBiosAndStorageSerialNumbers,
  XORDecryption,
  XOREncryption,
  concatenateStrings
};
