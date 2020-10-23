import {TokensModel} from '../../dataBase';
import {IAdmin, IToken} from '../../interface';

class AuthService {
    createTokenPair(tokenObject: Partial<IToken>): Promise<IToken> {
        const tokensToCreate = new TokensModel(tokenObject);

        return tokensToCreate.save();
    }

    async findUserByToken(findObject: { access_token?: string, refresh_token?: string }): Promise<IAdmin | null> {
        const tokenAndUser = await TokensModel
            .findOne(findObject)
            .populate('admin_id')
            .select({admin_id: 1, _id: 0}) as any;

        return tokenAndUser?.admin_id?.toJSON();
    }

    deleteTokens(removeObject: { access_token?: string, refresh_token?: string }): Promise<IToken | null> {

        return TokensModel.findOneAndDelete(removeObject).exec();
    }
}

export const authService = new AuthService();
