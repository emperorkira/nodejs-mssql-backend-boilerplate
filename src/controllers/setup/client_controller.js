import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'; import sql from 'mssql';
import { err_msg, success_msg, QUERY, tbl} from '../../shared/index.js';
import { client_fields, ACTION} from '../../type/index.js';
import { client_schema } from '../../schemas/index.js';
import { isPermission, generateCode, isFound, find_by_fields, isDefaultRecord } from '../../functions/index.js';

    const { Int, NVarChar, DateTime,  } = sql;

    // WORKING AS EXPECTED
    export const get_all_client = async (req, res) => {
        try {
            const crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.ls)) return res.status(400).json({ message: err_msg.e00x24});
            const result = await GET.record_by_query(QUERY.q04x001);
            if (!result) return res.status(400).json({ message: err_msg.e00x23 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const get_client = async (req, res) => {
        try {
            const { Id } = req.params, crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            
            if(!await isPermission(crntId, ACTION.t004.gt)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            const result = await GET.record_by_id(Id, tbl.t004);
            if (!result) return res.status(400).json({ message: err_msg.e00x05 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const create_client = async (req, res) => {
        try {
            const { Name, Address, Email, ContactPerson, MobileNumber, LandlineNumber, DateSoftwareAcceptance ,DateBCSRenewal, DateBCSExpiry } = req.body, code = await generateCode(tbl.t004), crntId = req.user.user, current_date = new Date().toISOString(), IsDeleted = 0;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.cr8)) return res.status(400).json({ message: err_msg.e00x24});
            const { error } = client_schema.validate({ Name, Address, Email, ContactPerson, MobileNumber, LandlineNumber, DateSoftwareAcceptance ,DateBCSRenewal, DateBCSExpiry, IsDeleted } );
            if (error) return res.status(400).json({ message: err_msg.e00x25});  
            if (await isFound(tbl.t004, ['Name'], [NVarChar(50)], [Name])) return res.status(400).json({ message: err_msg.e00x06 });
            const type = [
                NVarChar(50), NVarChar(50), NVarChar(255), NVarChar(50), NVarChar(50),
                NVarChar(50), NVarChar(50), DateTime, DateTime, DateTime,
                Int, Int, DateTime, Int, DateTime];
            const data = [
                code, Name, Address, Email, ContactPerson,
                MobileNumber, LandlineNumber, DateSoftwareAcceptance ,DateBCSRenewal, DateBCSExpiry,
                IsDeleted, crntId, current_date, null, null];
            if (!(await ADD.record(tbl.t004, client_fields, type, data))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x02 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const update_client = async (req, res) => {
        try {
            const { Name, Address, Email, ContactPerson, MobileNumber, LandlineNumber, DateSoftwareAcceptance ,DateBCSRenewal, DateBCSExpiry } =  req.body, { Id } = req.params, crntId = req.user.user, current_date = new Date().toISOString();
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.updt)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            if(!crntId) return res.status(400).json({ message: err_msg.e00x26});
            const { error } = client_schema.validate({Name, Address, Email, ContactPerson, MobileNumber, LandlineNumber, DateSoftwareAcceptance, DateBCSRenewal, DateBCSExpiry});
            if (error) return res.status(400).json({ message: err_msg.e00x25, error:error });
            if (await find_by_fields(QUERY.q04x002, ['Name', 'Id'], [NVarChar(50), Int], [Name, Id])) return res.status(400).json({ message: err_msg.e00x06 });
            const fieldsToRemove = ['Code', 'CreatedBy', 'DateCreated', 'IsDeleted', 'DeletedBy'];
            const updated_fields = client_fields.filter(field => !fieldsToRemove.includes(field));
            const type = [ NVarChar(50), NVarChar(255), NVarChar(50), NVarChar(50), NVarChar(50), NVarChar(50), DateTime, DateTime, DateTime, Int, DateTime ];
            const data = [ Name, Address, Email, ContactPerson, MobileNumber, LandlineNumber, DateSoftwareAcceptance ,DateBCSRenewal, DateBCSExpiry, crntId, current_date];
            if (!(await UPDATE.record(Id, tbl.t004, updated_fields, type, data))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x04 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const remove_client = async (req, res) => {
        try {
            const crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.rmv)) return res.status(400).json({ message: err_msg.e00x24});
            const { Id } = req.params;
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            if (!(await isFound(tbl.t004, ['Id'], [Int], [Id]))) return res.status(400).json({ message: err_msg.e00x05 });
            if (await isDefaultRecord(Id, tbl.t004) || await isFound(tbl.t009, ['AccessRightId'], [Int], [Id])) return res.status(400).json({ message: err_msg.e00x04});
            if (!(await DELETE.record_by_id(Id, tbl.t004))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const remove_multiple_client = async (req, res) => {
        try {
            const crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.rmvs)) return res.status(400).json({ message: err_msg.e00x24});
            const { Ids } = req.body, to_remove = [];
            if (!Ids || !Array.isArray(Ids) || Ids.length === 0) return res.status(400).json({ message: err_msg.e00x07 });
            for (let item of Ids) {
                const exists = await isFound(tbl.t004, ['Id'], [Int], [item.Id]);
                const isDefault = await isDefaultRecord(item.Id, tbl.t004);
                const hasTransactions = await isFound(tbl.t009, ['AccessRightId'], [Int], [item.Id]);
                if (exists  && !isDefault && !hasTransactions) to_remove.push(item.Id);
            }
            if (to_remove.length === 0) return res.status(200).json({ message: err_msg.e00x23 });
            if (!(await DELETE.record_by_ids(to_remove, tbl.t004))) return res.status(200).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const trash_client = async (req, res) => {
        try {
            const crntId = req.user.user, { Id } = req.params;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.rmv)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            if (!(await isFound(tbl.t004, ['Id'], [Int], [Id]))) return res.status(400).json({ message: err_msg.e00x05 });
            if (await isDefaultRecord(Id, tbl.t004) || await isFound(tbl.t009, ['AccessRightId'], [Int], [Id])) return res.status(400).json({ message: err_msg.e00x04});
            if (!(await UPDATE.record(Id, tbl.t004, ['IsDeleted','DeletedBy'], [Int, Int], [0, crntId]))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x09 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // MODELING
    export const trash_multiple_client = async (req, res) => {
        try {
            const crntId = req.user.user, { Ids } = req.body, to_move = [];
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(crntId, ACTION.t004.rmvs)) return res.status(400).json({ message: err_msg.e00x24});
            if (!to_move) return res.status(200).json({ message:' err_msg.e00x23' });
            if (!Ids || !Array.isArray(Ids) || Ids.length === 0) return res.status(400).json({ message: err_msg.e00x07 });
            for (let item of Ids) {
                const exists = await isFound(tbl.t004, ['Id'], [Int], [item.Id]);
                const isDefault = await isDefaultRecord(item.Id, tbl.t004);
                const hasTransactions = await isFound(tbl.t009, ['AccessRightId'], [Int], [item.Id]);
                if (exists  && !isDefault && !hasTransactions) to_move.push(item.Id);
            }
            if (to_move.length < 1) return res.status(200).json({ message: err_msg.e00x23 });
            if (!(await UPDATE.record_by_ids(to_move, tbl.t004, ['IsDeleted', 'DeletedBy'], [Int, Int],[1, crntId]))) return res.status(200).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x09 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE

    // CLIENT LINE