import {Request} from 'express';

import {IAdmin} from './admin.interface';

export interface IRequestExtended extends Request{
    admin?: IAdmin
    // product?: IProduct
}
