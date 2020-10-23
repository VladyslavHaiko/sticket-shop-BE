import {verify, VerifyErrors} from 'jsonwebtoken';

import {promisify} from 'util';
import {ResponseStatusCodesEnum} from '../constants';
import {customErrors, ErrorHandler} from '../errors';
import {config} from '../config';

const verifyPromise = promisify(verify);

export const tokenChecker = async (token: string): Promise<VerifyErrors | null> => {
    try {

        return await verifyPromise(token, config.JWT_SECRET) as Promise<VerifyErrors | null>;

    } catch (e) {
        throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, customErrors.BAD_TOKEN.message);
    }
};
