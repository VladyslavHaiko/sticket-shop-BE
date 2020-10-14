import {ActionEnum} from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
    [ActionEnum.ADMIN_REGISTER]: {
        subject: 'Вітаємо',
        templateFileName: 'admin-register'
    }
};
