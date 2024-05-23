
import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'
import { err_msg, success_msg, tbl, QUERY } from '../../shared/index.js';
import { user_schema } from '../../schemas/index.js';
import { generateCode, hashPassword, isPermission, isDefaultRecord, isFound, find_by_fields } from '../../functions/index.js';
import { user_fields, ACTION } from '../../type/index.js';
import sql from 'mssql';

    const { Int, NVarChar, DateTime, } = sql;

    // WORKING AS EXPECTED
    export const current_user = async (req, res) => {
        try {
            if(!await isPermission(req.cookies.permissions, ACTION.a1.Id)) return res.status(400).json({ message: err_msg.e00x24});
            if (!req.user.user) return res.status(400).json({ message: err_msg.e00x26});
            const user = await GET.record_by_id(req.user.user, tbl.t014);
            if (!user) return res.status(400).json({ message: err_msg.e00x05});
            return res.status(400).json({ data: user, message: success_msg.s00x00});
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02});
        }
    } // END HERE

    // WORKING AS EXPECTED
    export const get_all_user = async (req, res) => {
        try {
            if(!await isPermission(req.cookies.permissions, ACTION.a2.Id)) return res.status(400).json({ message: err_msg.e00x24});
            const users = await GET.all_record(tbl.t014);
            if (!users) return res.status(400).json({ message: err_msg.e00x23});
            return res.status(400).json({ data:users, message: success_msg.s00x00});
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02});
        }
    } // END HERE

    // WORKING AS EXPECTED
    export const get_user = async (req, res) => {
        try {
            const { Id } = await req.params;
            if (!Id) return res.status(400).json({ message: err_msg.e00x07});
            if(!await isPermission(req.cookies.permissions, ACTION.a3.Id)) return res.status(400).json({ message: err_msg.e00x24});
            const user = await GET.record_by_id(Id, tbl.t014);
            if (!user) return res.status(400).json({ message: err_msg.e00x05});
            return res.status(200).json({ data:user, message: success_msg.s00x00});
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02});
        }
    } // END HERE

    // WORKING AS EXPECTED
    export const create_user = async (req, res) => {
        try {
            const body = await req.body;
            if (!req.user.user) return res.status(500).json({ message: err_msg.e00x26}); 
            const code = await generateCode(tbl.t014), current_user = req.user.user || 1, current_date = new Date().toISOString();
            if (!body.Middlename || body.Middlename === '') body.Middlename = null;
            if (!body.Image || body.Image === '') body.Image = null;
            body.Code = code; body.CreatedBy = current_user; body.DateCreated = current_date;
            const { error } = user_schema.validate(body);
            if (error) return res.status(400).json({ message: err_msg.e00x25});
           
            if(!await isPermission(req.cookies.permissions, ACTION.a4.Id)) return res.status(400).json({ message: err_msg.e00x24});
            if(await isFound(tbl.t014, ['Username'], [NVarChar(255)], [body.Username])) return res.status(400).json({ message: err_msg.e00x06});
            const types = [
                NVarChar(50), NVarChar(255), NVarChar(255), NVarChar(50), NVarChar(50), 
                NVarChar(50), NVarChar(50), DateTime, NVarChar(255), NVarChar(255), 
                NVarChar(50), Int, Int, Int, Int, DateTime, Int, DateTime
            ];
            body.Password = await hashPassword(body.Password);
            const data = [
                code, body.Username, body.Password, body.Firstname, body.Middlename, body.Lastname,
                body.Gender, body.Birthdate, body.Address, body.ContactNumber, body.Image,
                body.DepartmentId, body.RoleId, body.isDeactivated, current_user, current_date, null, null
            ];
            if (!(await ADD.record(tbl.t014, user_fields, types, data))) return res.status(400).json({ message: err_msg.e00x03});
            return res.status(400).json({ message: success_msg.s00x02 });
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02, error: error}); 
        }
    } // END HERE

    // WORKING AS EXPECTED
    export const remove_user = async (req, res) => {
        try {
            const { Id }  = await req.params; 
            if (!Id) return res.status(400).json({ message: err_msg.e00x07});
            if(!await isPermission(req.cookies.permissions, ACTION.a5.Id)) return res.status(400).json({ message: err_msg.e00x24});
            if(!(await isFound(tbl.t014, ['Id'], [Int], [Id]))) return res.status(400).json({ message: err_msg.e00x05});
            // valdiate if default or with transaction
            if(await isDefaultRecord(Id, tbl.t014) || await isFound(tbl.t003, ['UserId'], [Int], [Id])) return res.status(400).json({ message: err_msg.e00x04});
            if (!await DELETE.record_by_id(Id, tbl.t014)) return res.status(400).json({ message: err_msg.e00x03});
            return res.status(400).json({ message: success_msg.s00x03});
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02});
        }
    } // END HERE

    // WORKING AS EXPECTED
    export const update_user = async (req, res) => {
        try {
            if(!req.user.user) return res.status(400).json({ message: err_msg.e00x26});
            const update_user = req.user.user || 0, update_date = new Date().toISOString(), body = await req.body, {Id} = await req.params;
            if (!body.Middlename || body.Middlename === '') body.Middlename = null;
            if (!body.Image || body.Image === '') body.Image = null;
            if (!Id) return res.status(400).json({ message: err_msg.e00x07});
            const { error } = user_schema.validate( body);
            if (error) return res.status(400).json({ message: err_msg.e00x01, error: error});
            if (await find_by_fields(QUERY.q014x003, ['Username', 'Id'],[NVarChar(255), Int],[body.Username, Id])) return res.status(400).json({ message: err_msg.e00x27});
            if(!await isPermission(req.cookies.permissions, ACTION.a6.Id)) return res.status(400).json({ message: err_msg.e00x24});
            if (await isDefaultRecord(Id, tbl.t014)) return res.status(400).json({ message: err_msg.e00x10});
            const fieldsToRemove = ['Code', 'Password', 'CreatedBy', 'DateCreated'];
            const updated_user_fields = user_fields.filter(field => !fieldsToRemove.includes(field));
            const types = [
                NVarChar(255), NVarChar(50), NVarChar(50), NVarChar(50),
                NVarChar(50), DateTime, NVarChar(255), NVarChar(50), NVarChar(255), 
                Int, Int, Int, Int, DateTime
            ];
            const data = [
                body.Username, body.Firstname, body.Middlename, body.Lastname,
                body.Gender, body.Birthdate, body.Address, body.ContactNumber, body.Image,
                body.DepartmentId, body.RoleId, body.isDeactivated, update_user, update_date
            ];
            if (!await UPDATE.record(Id, tbl.t014, updated_user_fields, types, data))  return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(400).json({ message: success_msg.s00x04});
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02, error: error});
        }
    } // END HERE

    // WORKING AS EXPECTED
    export const change_pass = async (req, res) => {
        try {
            const { Id } = await req.params;
            if (!Id) return res.status(400).json({ message: err_msg.e00x07});
            if(!await isPermission(req.cookies.permissions, ACTION.a7.Id)) return res.status(400).json({ message: err_msg.e00x24});
            const { Password } = await req.body;
            if (!Password) return res.status(400).json({ message: err_msg.e00x25, error: error});
            const hashed = await hashPassword(Password);
            if (!await UPDATE.record(Id, tbl.t014, ['Password'], [NVarChar(255)], [hashed]))  return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(400).json({ message: success_msg.s00x04});
        } catch(error){
            return res.status(500).json({ message: err_msg.e00x02});
        }
    } // END HERE
    