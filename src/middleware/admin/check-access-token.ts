import {NextFunction, Response} from 'express';

import {RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {authService} from '../../services';
import {IRequestExtended} from '../../interface';
import {tokenChecker} from '../../helpers';

export const checkAccessToken = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.get(RequestHeadersEnum.AUTHORIZATION);

        if (!token) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                customErrors.BAD_TOKEN.message)
            );
        }

        await tokenChecker(token);

        const userByToken = await authService.findUserByToken({access_token: token});

        if (!userByToken) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                customErrors.BAD_TOKEN.message)
            );
        }

        next();
    }
    catch (e) {next(e);}

};
