import {AdminModel} from '../../helpers/dataBase';
import {IAdmin} from '../../interface';

class AdminService {
    createAdmin(admin: Partial<IAdmin>) {
        const adminToCreate = new AdminModel(admin);

        return adminToCreate.save();
    }
}

export const adminService = new AdminService();
