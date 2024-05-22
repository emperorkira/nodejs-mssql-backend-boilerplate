

import sql from 'mssql';
import { GET, ADD, DELETE, UPDATE} from '../../models/index.js';
import { err_msg, success_msg, sql_query} from '../../shared/index.js';
import { default_records, accessrights_fields } from '../type/index.js';
import { accessright_schema } from '../schema/index.js';
    const { Int, NVarChar, Decimal, Date, DateTime, Transaction, Request } = sql;

    export const get_records = async (req, res) => {
        try {
            const result = await GET.all_record(tbl.t001);
            if (!result) return res.status(200).json({ data: null, message: err_msg.e00x23 });
            return res.status(200).json({ data:acces_rights, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const get_record = async (req, res) => {
        try {
            const { Id } = req.params;
            if (!Id) return res.status(200).json({ message: err_msg.e00x07 });
            const result = await GET.record_by_id(Id, tbl.t001);
            if (!result) return res.status(200).json({ data: null, message: err_msg.e00x05 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const add_record = async (req, res) => {
        try {
            const body = await req.body;
            const { error } = accessright_schema.validate(body);
            if (error) return res.status(200).json({ message: err_msg.e00x03 });
            if (!body) return res.status(200).json({ message: err_msg.e00x08 });
            const isDuplicate = await GET.record_by_fields(sql_query.q00x001, ['Name'], [NVarChar(50)], [body.Name]);
            if (!isDuplicate) return res.status(200).json({ message: err_msg.e00x05 });
            const type = [NVarChar(50), NVarChar(50), NVarChar(50), Int, DateTime, Int, DateTime];
            const data = [body.Code, body.Name, body.Description, body.CreadtedBy, body.DateCreated, null, null];
            if (!(await ADD.record(tbl.t001, accessrights_fields, type, data))) return res.status(200).json({ message: err_msg.e00x01 });
            return res.status(200).json({ message: success_msg.s00x02 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }

    export const delete_record = async (req, res) => {
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

    export const delete_multiple_record = async (req, res) => {
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