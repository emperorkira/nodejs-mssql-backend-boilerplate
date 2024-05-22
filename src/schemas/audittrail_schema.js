import Joi from 'joi';

export const audittrail_schema = Joi.object({
    UserId: Joi.number().integer().required(),
    Action: Joi.string().required(),
    Record: Joi.number().integer().allow(null),
    RecordTable: Joi.string(50).allow(null),
    DateCreated: Joi.date().required(),
  });