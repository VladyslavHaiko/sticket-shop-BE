import {LogsModel} from '../../dataBase';

import {ILogs} from '../../interface';

class LogsService {
    createLog(log: Partial<ILogs>): Promise<ILogs> {
        const logToCreate = new LogsModel(log);

        return logToCreate.save();
    }
}

export const logService = new LogsService();
