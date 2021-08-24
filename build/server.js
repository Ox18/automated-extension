"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var app = express_1.default();
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
// Extended: https://swagger.io/specification/#infoObject
var swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:5500"]
        }
    },
    // ['.routes/*.js']
    apis: ["src/server.ts", "src/routes/*.ts"]
};
/** Logging */
app.use(morgan_1.default('dev'));
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express_1.default.json());
/** RULES OF OUR API */
app.use(function (req, res, next) {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Routes */
app.use(require('./routes'));
/** Error handling */
app.use(function (req, res, next) {
    var error = new Error('not found2');
    return res.status(404).json({
        message: error.message
    });
});
/** Server */
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("The server is running on port " + PORT); });
