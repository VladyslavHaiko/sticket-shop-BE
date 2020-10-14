import {NextFunction, Request, Response} from 'express';
import {adminService} from '../../services';
import * as Joi from 'joi';
import {newAdminValidator} from '../../validators';
import {hashData} from '../../helpers';

export class AdminController {
    async createAdmin(req: Request, res: Response, next: NextFunction) {
        const admin = req.body;

        const {error} = Joi.validate(admin, newAdminValidator);
        if (error) {
            return next(new Error(error.details[0].message));
        }
        admin.password = await hashData(admin.password);
        //todo hash password
        //todo send email you is admin now
        await adminService.createAdmin(admin);
        res.json(admin);
    }
}

export const adminController = new AdminController();
