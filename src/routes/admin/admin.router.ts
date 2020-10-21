import {Router} from 'express';
import {adminController} from '../../controller';
import {checkIsAdminExist, checkIsEmailExist} from '../../middleware';

const router = Router();

router.post('/create', checkIsEmailExist, adminController.createAdmin);
router.post('/login', checkIsAdminExist, adminController.loginAdmin);

export const adminRouter = router;
