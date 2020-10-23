import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';

import {adminService, authService, emailService, logService} from '../../services';
import {ActionEnum, LogsEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {IAdmin, IRequestExtended} from '../../interface';

import {compareHashData, hashData} from '../../helpers';
import {customErrors, ErrorHandler} from '../../errors';
import {newAdminValidator} from '../../validators';
import {Tokenizer} from '../../helpers/tokenizer';

export class AdminController {

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        const admin = req.body;

        const {error} = Joi.validate(admin, newAdminValidator);

        if (error) {
            return next(new Error(error.details[0].message));
        }

        admin.password = await hashData(admin.password);

        await adminService.createAdmin(admin);
        await emailService.sendEmail(admin.email, ActionEnum.ADMIN_REGISTER, {email: admin.email});
        await logService.createLog({event: LogsEnum.ADMIN_REGISTERED, adminId: 'superAdmin'});

        res.send(admin);
    }

    async loginAdmin(req: IRequestExtended, res: Response, next: NextFunction) {
        const {_id, password} = req.admin as IAdmin;
        const authPassword = req.body.password;

        const compareResult = await compareHashData(authPassword, password);

        if (!compareResult) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                customErrors.INVALID_PASSWORD.message
            ));
        }

        const {access_token, refresh_token} = Tokenizer(ActionEnum.ADMIN_LOGIN);

        await authService.createTokenPair({
            access_token,
            refresh_token,
            admin_id: _id
        });

        res.json({access_token, refresh_token});
    }

    async logoutAdmin(req: Request, res: Response, next: NextFunction) {
        const access_token = req.get(RequestHeadersEnum.AUTHORIZATION);
        await authService.deleteTokens({access_token});
        res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);

    }
}


export const adminController = new AdminController();
