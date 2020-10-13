"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require("express");
var cors = require("cors");
var rateLimit = require("express-rate-limit");
var helmet = require("helmet");
var dotenv = require("dotenv");
var morgan = require("morgan");
var path = require("path");
var mongoose = require("mongoose");
var config_1 = require("./config");
var routes_1 = require("./routes");
dotenv.config();
//rateLimit configure
var serverRequestLimit = rateLimit({
    windowMs: config_1.config.serverRateLimits.period,
    max: config_1.config.serverRateLimits.maxRequests
});
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.configureCors = function (origin, callback) {
            var whiteList = config_1.config.ALLOWED_ORIGIN.split(';');
            if (!origin) {
                return callback(null, true);
            }
            if (!whiteList.includes(origin)) {
                return callback(false, new Error('Cors not allowed'));
            }
            return callback(null, true);
        };
        global.appRoot = path.resolve(process.cwd(), '../');
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(serverRequestLimit);
        this.app.use(cors({
            origin: this.configureCors
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(global.appRoot, 'public')));
        this.app.use(this.customErrorHandler);
        this.mountRoutes();
        this.setupDB();
    }
    //setup mongo
    App.prototype.setupDB = function () {
        mongoose.connect(config_1.config.MONGODB_URL, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        });
        mongoose.connection.on('error', console.log.bind(console, 'MONGO ERROR'));
    };
    //error handler
    App.prototype.customErrorHandler = function (err, req, res, next) {
        res
            .status(err.status || 500)
            .json({
            message: err.message || 'Unknown Error',
            code: err.code
        });
    };
    App.prototype.mountRoutes = function () {
        this.app.use("/admin", routes_1.adminRouter);
    };
    return App;
}());
exports.app = new App().app;
//# sourceMappingURL=app.js.map