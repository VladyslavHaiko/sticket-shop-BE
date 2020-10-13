import {NextFunction, Request, Response} from 'express';
import {adminService} from '../../services';

export class AdminController {
    async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const admin = req.body;

            //todo hash password
            await adminService.createAdmin(admin);
            res.json(admin);
        } catch (err) {
            res.send(err.message);
        }
    }
}

export const adminController = new AdminController();
