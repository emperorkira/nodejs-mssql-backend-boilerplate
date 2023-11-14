const fs = require('fs').promises;
const path = require('path');

async function readTextFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error(`Error reading the file: ${err}`);
    return err;
  }
}

async function readFileLines(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n');
    return lines;
  } catch (error) {
    throw error;
  }
}

/*
const env = path.resolve(__dirname, '../../env.txt');
//Use await when calling the functions to get their results
(async () => {
  const lines = await readFileLines(env);
  let host = parseInt(lines[4]);
  console.log(host);
})();
*/

module.exports = {
  readFileLines,
  readTextFile
};
