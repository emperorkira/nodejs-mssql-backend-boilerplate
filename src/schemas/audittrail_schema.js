import Joi from 'joi';

export const audittrail_schema = Joi.object({
    UserId: Joi.number().integer().required(),
    Action: Joi.string().required(),
    Record: Joi.number().integer().allow(null).optional(),
    RecordTable: Joi.string().max(50).allow(null).optional(),
    DateCreated: Joi.date().required(),
});
