import Joi from 'joi';

export const ticketline_schema = Joi.object({
    TicketId: Joi.number().integer().allow(null), // FK of TicketSchema
    Action: Joi.string().allow(null),
    DateCalled: Joi.date().allow(null),
    DateFinished: Joi.date().allow(null),
});
