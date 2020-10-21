import {TokensModel} from '../../dataBase';
import {IAdmin, IToken} from '../../interface';

class AuthService {
    createTokenPair(tokenObject: Partial<IToken>): Promise<IToken> {
        const tokensToCreate = new TokensModel(tokenObject);

        return tokensToCreate.save();
    }

    async findUserByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<IAdmin | null> {
        const tokenAndUser = await TokensModel
            .findOne(findObject)
            .populate('userId')
            .select({userId: 1, _id: 0}) as any;

        return tokenAndUser?.userId?.toJSON();
    }

    // removeToken(removeObject: { accessToken?: string, refreshToken?: string }): Promise<IAccessToken | null> {
    //     return AccessTokenModel.findOneAndDelete(removeObject).exec();
    // }
}

export const authService = new AuthService();
