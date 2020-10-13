import {Document, model, Model, Schema} from 'mongoose';

import {IAdmin} from '../../interface';

export type AdminType = IAdmin & Document

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
    }
});

export const AdminModel: Model<any> = model<AdminType>(`admin`, AdminSchema);
