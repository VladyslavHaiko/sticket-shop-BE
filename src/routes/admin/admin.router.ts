import {Router} from 'express';
import {adminController} from '../../controller';
import {checkIsEmailExist} from '../../middleware';
const router = Router();

router.post('/create',checkIsEmailExist, adminController.createAdmin);

export const adminRouter = router;
