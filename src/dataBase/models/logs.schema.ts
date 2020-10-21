import {Document, model, Model, Schema} from 'mongoose';

import {ILogs} from '../../interface';
import {TableNamesEnum} from '../../constants';

export type LogsType = ILogs & Document;


export const LogSchema: Schema = new Schema<any>({
    event: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },

    data: Schema.Types.Mixed,

    createdAt: {
        type: Date,
        default: new Date().toISOString()
    }
}, {
    timestamps: true
});

export const LogsModel: Model<LogsType> = model<LogsType>(TableNamesEnum.LOGS, LogSchema);
