import express, { Express } from 'express';
import morgan from 'morgan';
const app: Express = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
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
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
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

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** Routes */
app.use(require('./routes'));

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found2');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */

const PORT: number = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));