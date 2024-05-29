/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
 */

import Joi from 'joi';

export const audittrail_schema = Joi.object({
    UserId: Joi.number().integer().required(),
    Action: Joi.string().required(),
    Record: Joi.number().integer().allow(null).optional(),
    RecordTable: Joi.string().max(50).allow(null).optional()
});

