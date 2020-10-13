import * as express from 'express';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as path from 'path';
// import * as mongoose from 'mongoose';

import {NextFunction, Request, Response} from 'express';

dotenv.config();

const serverRequestLimit = rateLimit({
    windowMs: 200,
    max:  200
});

class App {
    public readonly app: express.Application = express();

    constructor() {
        (global as any).appRoot = path.resolve(process.cwd(), '../');
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(serverRequestLimit);
        this.app.use(cors({
            // origin: this.configureCors
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));


        this.app.use(this.customErrorHandler);

        // this.setupDB();
    }

    // private setupDB(): void {
    //     mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true});
    //
    //     mongoose.connection.on('error', console.log.bind(console, 'MONGO ERROR'));
    // }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        res
            .status(err.status || 500)
            .json({
                message: err.message || 'Unknown Error',
                code: err.code
            });
    }

    // private configureCors = (origin: any, callback: any) => {
    //     const whiteList = config.ALLOWED_ORIGIN.split(';');
    //
    //     if (!origin) {
    //         return callback(null, true);
    //     }
    //
    //     if (!whiteList.includes(origin)) {
    //         return callback(false, new Error('Cors not allowed'));
    //     }
    //
    //     return callback(null, true);
    // }

}

export const app = new App().app;
