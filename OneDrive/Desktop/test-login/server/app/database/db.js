const { connect } = require('mssql'), { resolve } = require('path'), { f72646C6E } = require('./function'), c7074686472 = resolve(__dirname, '../../env.json');

async function f706C696E6974() {
  try {
    const d72646C6E = await f72646C6E(c7074686472);
    const c6462636F6E = { user: `${d72646C6E.d757372}`, password: `${d72646C6E.d77373777264}`, server: `${d72646C6E.d687374}`, database: `${d72646C6E.d6E6D65}`, port: parseInt(d72646C6E.d707274), options: { encrypt: false } };
    const c706F6F6C = await connect(c6462636F6E);
    c706F6F6C.setMaxListeners(15);
    return c706F6F6C;
  } catch (error) {
    throw new Error(`Database Config: ${error.message}`);
  }
}

module.exports = {
  f706C696E6974
};