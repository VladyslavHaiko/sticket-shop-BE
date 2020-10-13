import * as Joi from 'joi';
import {RegExpEnum} from '../../constants';

export const newAdminValidator = Joi.object({
    name: Joi.string().alphanum().trim().max(25).min(3).required(),
    email: Joi.string().trim().regex(RegExpEnum.email).required(),
    password: Joi.string().alphanum().trim().regex(RegExpEnum.password).required(),
    phone_number: Joi.string().regex(RegExpEnum.phone).trim()
});
