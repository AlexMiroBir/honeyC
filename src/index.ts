import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';
import ENV from '../config/env';
import log from './logger';
import unknownRoutesErrorHandler from './middlewares/unknown-routes-handling-middleware';
import errorHandler from './middlewares/error-handling-middleware';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import examRoutes from './routes/exam.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import principalRoutes from './routes/principal.routes';

const corsOptions: CorsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
};

dotenv.config();

const app: Express = express();

const SSLOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
};

const { port, host } = ENV.server;
const { port: dbPort, host: dbHost } = ENV.db;

mongoose
  .connect(`mongodb://${dbHost}:${+dbPort}`)
  .then(() => {
    log.info('Connected to MongoDB');
  })
  .catch((error) => {
    log.error('Error connecting to MongoDB', error);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/principal', principalRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/exam', examRoutes);
app.use('*', unknownRoutesErrorHandler);
app.use(errorHandler);

https.createServer(SSLOptions, app).listen(port, () => {
  log.info(`[server]: Server is running at https://${host}:${+port}`);
});
export default app;
