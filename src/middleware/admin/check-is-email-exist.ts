import {NextFunction, Request, Response} from 'express';
import {adminService} from '../../services';
import {customErrors,ErrorHandler} from '../../errors';


export const checkIsEmailExist = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    const {email} = req.body;
    const adminByEmail = await adminService.findByEmail({email});

    if (adminByEmail){
        throw next(new ErrorHandler(
            400,
            customErrors.ADMIN_IS_PRESENT.message,
            400));
    }
    next();
};
