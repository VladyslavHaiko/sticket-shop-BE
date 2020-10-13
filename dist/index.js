"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var app_1 = require("./app");
var config_1 = require("./config");
var server = http.createServer(app_1.app);
server.listen(config_1.config.PORT, function () {
    console.log("Listen " + config_1.config.PORT);
});
process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});
process.on('uncaughtException', function (error) {
    console.log(error);
});
process.on('unhandledRejection', function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map