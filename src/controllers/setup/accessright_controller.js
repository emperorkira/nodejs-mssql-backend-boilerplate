import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'; import sql from 'mssql';
import { err_msg, success_msg, QUERY, tbl} from '../../shared/index.js';
import { accessrights_fields, ACTION} from '../../type/index.js';
import { accessright_schema } from '../../schemas/index.js';
import { isPermission } from '../../functions/index.js';

    const { Int, NVarChar, DateTime,  } = sql;

    // WORKING AS EXPECTED
    export const get_all_accessright = async (req, res) => {
        try {
           if(!await isPermission(req.cookies.permissions, ACTION.a8.Id)) return res.status(400).json({ message: err_msg.e00x24});
            const result = await GET.all_record(tbl.t001);
            if (!result) return res.status(200).json({ message: err_msg.e00x23 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }
    // WORKING AS EXPECTED
    export const get_accessright = async (req, res) => {
        try {
            if(!await isPermission(req.cookies.permissions, ACTION.a9.Id)) return res.status(400).json({ message: err_msg.e00x24});
            const { Id } = await req.params;
            if (!Id) return res.status(200).json({ message: err_msg.e00x07 });
            const result = await GET.record_by_id(Id, tbl.t001);
            if (!result) return res.status(200).json({ data: null, message: err_msg.e00x05 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const create_accessright = async (req, res) => {
        try {
            const body = await req.body;
            const { error } = accessright_schema.validate(body);
            if (error) return res.status(200).json({ message: err_msg.e00x03 });
            if (!body) return res.status(200).json({ message: err_msg.e00x08 });
            const isDuplicate = await GET.record_by_fields(QUERY.q00x001, ['Name'], [NVarChar(50)], [body.Name]);
            if (!isDuplicate) return res.status(200).json({ message: err_msg.e00x05 });
            const type = [NVarChar(50), NVarChar(50), NVarChar(50), Int, DateTime, Int, DateTime];
            const data = [body.Code, body.Name, body.Description, body.CreadtedBy, body.DateCreated, null, null];
            if (!(await ADD.record(tbl.t001, accessrights_fields, type, data))) return res.status(200).json({ message: err_msg.e00x01 });
            return res.status(200).json({ message: success_msg.s00x02 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const update_accessright = async (req, res) => {
        try {
            const body = await req.body;
            const { error } = accessright_schema.validate(body);
            if (error) return res.status(200).json({ message: err_msg.e00x03 });
            if (!body) return res.status(200).json({ message: err_msg.e00x08 });
            const isDuplicate = await GET.record_by_fields(QUERY.q00x001, ['Name'], [NVarChar(50)], [body.Name]);
            if (!isDuplicate) return res.status(200).json({ message: err_msg.e00x05 });
            const type = [NVarChar(50), NVarChar(50), NVarChar(50), Int, DateTime, Int, DateTime];
            const data = [body.Code, body.Name, body.Description, body.CreadtedBy, body.DateCreated, null, null];
            if (!(await ADD.record(tbl.t001, accessrights_fields, type, data))) return res.status(200).json({ message: err_msg.e00x01 });
            return res.status(200).json({ message: success_msg.s00x02 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const remove_accessright = async (req, res) => {
        try {
            const { Id } = req.params;
            if (!Id) return res.status(200).json({ message: err_msg.e00x07 });
            if (!(await GET.record_by_id(Id, tbl.t001))) return res.status(200).json({ message: err_msg.e00x05 });
            if (!(await DELETE.record_by_id(Id, tbl.t001))) return res.status(200).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const remove_multiple_accessright = async (req, res) => {
        try {
            const body = req.body, Ids = [];
            if (!body) return res.status(200).json({ message: err_msg.e00x07 });
            //check each Id if it exists
            for (Id in body) {
                if ((await GET.record_by_id(body[index].Id, tbl.t001))) Ids.push(body[index].Id)
            }
            if (!(await DELETE.record_by_ids(Ids, tbl.t001))) return res.status(200).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }