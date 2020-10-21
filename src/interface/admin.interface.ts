import {IToken} from '../interface';

export interface IAdmin {
    _id: string;
    name: string
    email: string,
    password: string,
    status: boolean,
    tokens?: [IToken];
}
