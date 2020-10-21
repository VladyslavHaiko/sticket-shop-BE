import {AdminModel} from '../../dataBase';
import {IAdmin} from '../../interface';

class AdminService {
    createAdmin(admin: Partial<IAdmin>) {
        return new AdminModel(admin).save();
    }

    findByEmail(params: Partial<IAdmin>): Promise<IAdmin | null> {
        return AdminModel.findOne(params).exec();
    }
}

export const adminService = new AdminService();
