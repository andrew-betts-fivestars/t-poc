import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
var bodyParser = require('body-parser')
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import cors from 'cors';
import BaseRouter from './routes';
import logger from '@shared/Logger';

const app = express();
const { BAD_REQUEST } = StatusCodes;

import { terminalApiRouter } from './routes/terminal-api';

import debug = require("debug");

/************************************************************************************
 *                              Set basic kafka settings
 ***********************************************************************************/

import httpTypesExpressMiddleware from "@meeshkanml/express-middleware";
import { HttpTypesKafkaProducer, KafkaConfig } from "@meeshkanml/http-types-kafka";
import { HttpExchange } from "http-types";

const debugLog = debug("express-app");

const KAFKA_TOPIC = "www";
const KAFKA_CONFIG: KafkaConfig = {
  brokers: ["localhost:9092"],
};

const httpTypesKafkaProducer = HttpTypesKafkaProducer.create({
    kafkaConfig: KAFKA_CONFIG,
    topic: KAFKA_TOPIC,
});

const kafkaExchangeTransport = async (exchange: HttpExchange) => {
    debugLog("Sending an exchange to Kafka");
    await httpTypesKafkaProducer.send(exchange);
};

const kafkaExchangeMiddleware = httpTypesExpressMiddleware({
    transports: [kafkaExchangeTransport],
});


app.use(kafkaExchangeMiddleware);

const connect = async () => await httpTypesKafkaProducer.connect()

connect()

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());

// // Show routes called in console during development
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// // Security
// if (process.env.NODE_ENV === 'production') {
//     app.use(helmet());
// }

// // Add APIs
// // app.use('/api', BaseRouter);

app.use(terminalApiRouter);        

// // Print API errors
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     logger.err(err, true);
//     return res.status(BAD_REQUEST).json({
//         error: err.message,
//     });
// });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// const SWAGGER_OPTIONS = {
//     customCss: '.swagger-ui .topbar { display: none }',
//     customSiteTitle: 'Tagr API'
// };

// export const configure = (): void => {
app.use(function (req, res, next) {
    req.headers['content-type'] = 'application/json';
    next();
});

app.use(cors());



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('index.html', {root: viewsDir});
// });

// Export express instance
export default app;
