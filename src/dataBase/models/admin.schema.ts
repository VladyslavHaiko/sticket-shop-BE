import {Document, model, Model, Schema} from 'mongoose';

import {IAdmin} from '../../interface';
import {TableNamesEnum} from '../../constants';

export type AdminType = IAdmin & Document

const tokenSubModel = {
    token: String,
    action: String
};


export const AdminSchema: Schema = new Schema<any>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
        required: true
    },
    tokens: [tokenSubModel]
},
{
    timestamps: true
});

export const AdminModel: Model<AdminType> = model<AdminType>(TableNamesEnum.ADMIN, AdminSchema);
