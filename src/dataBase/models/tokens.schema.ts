import {Document, model, Model, Schema} from 'mongoose';

import {IToken} from '../../interface';
import {TableNamesEnum} from '../../constants';

export type TokenType = IToken & Document


export const TokensSchema: Schema = new Schema<IToken>({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: TableNamesEnum.ADMIN
    }
}, {
    timestamps: true
});

export const TokensModel: Model<TokenType> = model<TokenType>(TableNamesEnum.TOKENS, TokensSchema);
