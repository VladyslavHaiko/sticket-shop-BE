import {Router} from 'express';
import {adminController} from '../../controller';
import {checkAccessToken, checkIsAdminExist, checkIsEmailExist} from '../../middleware';

const router = Router();

router.post('/create', checkIsEmailExist, adminController.createAdmin);
router.post('/login', checkIsAdminExist, adminController.loginAdmin);
router.post('/logout', checkAccessToken, adminController.logoutAdmin);

export const adminRouter = router;
