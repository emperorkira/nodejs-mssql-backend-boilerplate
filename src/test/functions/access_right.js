
import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'; import sql from 'mssql';
import 'dotenv/config'

import { err_msg, success_msg, QUERY, tbl} from '../../shared/index.js';
import { accessrights_fields, ACTION} from '../../type/index.js';
import { accessright_schema } from '../../schemas/index.js';
import { isPermission, generateCode, isFound, find_by_fields, isDefaultRecord } from '../../functions/index.js';

const { Int, NVarChar, DateTime,  } = sql;

export const accessright_list = async (UserId = 0 ) => {
    try {
        if (!UserId) return { test: false, controller: tbl.t001, message: err_msg.e00x26}; 
        if (!await isPermission(UserId, ACTION.t001.ls)) return { test: false, controller: tbl.t001, function: ACTION.t001.ls, message: err_msg.e00x24};
        const result = await GET.record_by_query(QUERY.q01x001);
        if (!result || result.length < 1) return{ test: false, controller: tbl.t001, function: ACTION.t001.ls, message: err_msg.e00x24};
        return { test: true, controller: tbl.t001, function: ACTION.t001.ls, message: success_msg.s00x00 };
    } catch(error) {
        return { test: false, controller: tbl.t001, function: ACTION.t001.ls, message: err_msg.e00x02};
    }
}


export const accessright_details = async (Id = 0, UserId = 0) => {
    try {
        if (!UserId) return json({ message: err_msg.e00x26}); 
        if(!await isPermission(UserId, ACTION.t001.gt)) return { test: false, controller: tbl.t001, function: ACTION.t001.gt, message: err_msg.e00x24};
        if (!Id) return { test: false, controller: tbl.t001, function: ACTION.t001.gt, message: err_msg.e00x07};
        const result = await GET.record_by_id(Id, tbl.t001);
        if (!result) return { test: false, controller: tbl.t001, function: ACTION.t001.gt, message: err_msg.e00x05};
        return { test: true, controller: tbl.t001, function: ACTION.t001.gt, message: success_msg.s00x00 };
    } catch(error) {
        return { test: false, controller: tbl.t001, function: ACTION.t001.gt, message: err_msg.e00x02};
    }
}; // END HERE*/

export const accessright_create = async (UserId = 0, Data={} ) => {
    try {
        const { Name, Description } = Data, code = await generateCode(tbl.t001), current_date = new Date().toISOString(), IsDeleted = 0;
        if (!UserId) return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: err_msg.e00x26};
        if(!await isPermission(UserId, ACTION.t001.cr8)) return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: err_msg.e00x24};
        const { error } = accessright_schema.validate({ Name, Description, IsDeleted });
        if (error) return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: err_msg.e00x25};
        if (await isFound(tbl.t001, ['Name'], [NVarChar(50)], [Name])) return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: err_msg.e00x06};
        const type = [NVarChar(50), NVarChar(50), NVarChar(50), Int, Int, DateTime, Int, DateTime];
        const data = [code, Name, Description, 0, UserId, current_date, null, null];
        if (!(await ADD.record(tbl.t001, accessrights_fields, type, data))) return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: err_msg.e00x25};
        return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: success_msg.s00x02 };
    } catch(error) {
        return { test: false, controller: tbl.t001, function: ACTION.t001.cr8, message: err_msg.e00x02};
    }
}; // END HERE
