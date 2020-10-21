import {NextFunction, Response} from 'express';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';
import {adminService} from '../../services';
import {IRequestExtended} from '../../interface';

export const checkIsAdminExist =
    async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void | NextFunction> => {

        const {email} = req.body;
        const adminByEmail = await adminService.findByEmail({email});

        if (!adminByEmail) {
            throw next(new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                customErrors.NO_ADMIN.message,
                customErrors.NO_ADMIN.code
            ));
        }
        req.admin = adminByEmail;
        next();
    };
