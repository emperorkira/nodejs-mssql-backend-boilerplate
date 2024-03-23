//  INCLUDES
const { o6D646C73 } = require('../../models'), o6673  = require('fs').promises, { f646372797074, f6C636E73766C64, f72646C6E } = require('../../database/function');
const { f677473747267, f677462696F73, f7772746A736E } = require('../../database/function')
const o757372 = require('../master/mstUserController'), jwt = require('jsonwebtoken'), sql = require('mssql'), { resolve } = require('path');
const d747874 = resolve(__dirname, '../../texts/date.json'), e747874 = resolve(__dirname, '../../texts/error.json'), s747874 = resolve(__dirname, '../../texts/success.json'), q747874 = resolve(__dirname, '../../texts/query.json'), t747874 = resolve(__dirname, '../../texts/tables.json');
const env = resolve(__dirname, '../../env.txt'), o707468 = require('path');


exports.testing = async (req, res) => {
    try {
        const getusers = await o6D646C73.f67746C6C('TestUser')
      return res.status(200).json(getusers);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', category:'error'});
    }
  }// END HERE

  exports.register = async (req, res) => {
    try{
        const { name , email, password} =  req.body 
        if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'All fields are required', category:'error'});
        const finduser = await o6D646C73.f666E64514644(`SELECT * FROM [TestUser] WHERE [Email] = @Email`,['Email'],[sql.NVarChar(255)],[email])
        if (finduser) return res.status(400).json({ message: 'This email is already taken', category:'error'});
        const adduser = await o6D646C73.f616464514644('TestUSer',['Name','Email','Password'], [sql.NVarChar(255),sql.NVarChar(255),sql.NVarChar(255)], [name, email, password] )
        if (!adduser) return res.status(400).json({ message: 'Something went wrong', category:'error'});
        return res.status(500).json({ message: 'User registered', category:'error'});
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error', category:'error'});
    }
  }

  exports.pass = async (req, res) => {
    try {
        const data = req.body
        if (!data.name || !data.email || !data.password ) return res.status(200).json({ message: 'All fields are required', category:'error'});
        const finduser = await o6D646C73.f666E64514644(`SELECT * FROM [TestUser] WHERE [Email] = @Email`,['Email'],[sql.NVarChar(255)],[data.email])
        if (finduser) return res.status(200).json({ message: 'This email is already taken', category:'error'});
        const adduser = await o6D646C73.f616464514644('TestUSer',['Name','Email','Password'], [sql.NVarChar(255),sql.NVarChar(255),sql.NVarChar(255)], [data.name, data.email, data.password] )
        if (!adduser) return res.status(200).json({ message: 'Something went wrong', category:'error'});
        return res.status(200).json({ message: 'User registered', category:'success'});
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', category:'error'});
    }
  }// END HERE