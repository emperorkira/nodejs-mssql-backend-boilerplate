const sql = require('mssql');
const path = require('path');
const config = require('./function');

const env = path.resolve(__dirname, '../../env.txt');

async function initializePool() {
  try {
    const lines = await config.readFileLines(env);

    const connection = {
      user: String(lines[1]).substring(0, lines[1].length - 1),
      password: String(lines[2]).substring(0, lines[2].length - 1),
      server: String(lines[0]).substring(0, lines[0].length - 1),
      database: String(lines[3]).substring(0, lines[3].length - 1),
      port: parseInt(lines[4], 10), // Parse the string to an integer
      options: {
        encrypt: false,
      },
    };

    const pool = await sql.connect(connection);
    return pool;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

module.exports = {
  initializePool,
};
