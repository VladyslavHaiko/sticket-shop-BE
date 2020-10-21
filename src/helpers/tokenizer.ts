import * as jwt from 'jsonwebtoken';
import {ActionEnum} from '../constants';
import {config} from '../config';

export const Tokenizer = (action: ActionEnum): { access_token: string, refresh_token: string } => {
    let access_token = '';
    let refresh_token = '';

    switch (action) {
        case ActionEnum.ADMIN_LOGIN:
            access_token = jwt.sign({}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
            refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
    }

    return {access_token, refresh_token};
};
