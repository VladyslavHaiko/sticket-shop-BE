import {IToken} from '../interface';

export interface IAdmin {
    name: string
    email: string,
    password: string,
    status: boolean,
    tokens?: [IToken];
}
