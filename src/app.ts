import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as path from 'path';
import * as mongoose from 'mongoose';
import {config} from './config';
import {adminRouter} from './routes';

dotenv.config();

//rateLimit configure
const serverRequestLimit = rateLimit({
    windowMs: config.serverRateLimits.period,
    max: config.serverRateLimits.maxRequests
});

class App {
    public readonly app: express.Application = express();

    constructor() {
        (global as any).appRoot = path.resolve(process.cwd(), '../');
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(serverRequestLimit);
        this.app.use(cors({
            origin: this.configureCors
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded(
            {extended: true}));

        this.app.use(express.static(
            path.resolve((global as any).appRoot,
                'public')));


        this.app.use(this.customErrorHandler);
        this.mountRoutes();
        this.setupDB();
    }

    //setup mongo
    private setupDB(): void {
        mongoose.connect(config.MONGODB_URL, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        });

        mongoose.connection.on('error', console.log.bind(console, 'MONGO ERROR'));
    }

    //error handler
    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        res
            .status(err.status || 500)
            .json({
                message: err.message || 'Unknown Error',
                code: err.code
            });
    }

    private configureCors = (origin: any, callback: any) => {
        const whiteList = config.ALLOWED_ORIGIN.split(';');

        if (!origin) {
            return callback(null, true);
        }

        if (!whiteList.includes(origin)) {
            return callback(false, new Error('Cors not allowed'));
        }

        return callback(null, true);
    }

    private mountRoutes(): void {
        this.app.use(`/admin`, adminRouter);
    }

}

export const app = new App().app;
