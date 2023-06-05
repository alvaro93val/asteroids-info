import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import morgan from 'morgan';
import responseTime from 'response-time';
import logger from './logger';
import { handleError } from './middleware/handleError';
import { dateRequest, methodType, Morgan, statusCode } from './middleware/morgan.middleware';
import { notFound } from './middleware/notFound';
import { getVersion } from './middleware/version';
import asteroidRoute from './routes/asteroid.routes';

const name = process.env.npm_package_name?.toLocaleUpperCase();
const version = process.env.npm_package_version;

/**
 * Class the server
 */
export class ServerAsteroids {
  app: Application;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT ?? '3000');
    this.settings();
    this.middlewares();
    this.routes();
  }

  /**
   * Config settings
   */
  settings(): void {
    this.app.set('port', this.port);
    this.app.disable('x-powered-by');
  }

  /**
   * Config middlewares
   */
  middlewares(): void {
    morgan.token(Morgan.DATE_REQUEST, dateRequest);
    morgan.token(Morgan.STATUS_CODE, statusCode);
    morgan.token(Morgan.METHOD_TYPE, methodType);
    this.app.use(morgan(Morgan.LOGGER));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(responseTime());
    this.app.use(helmet());
    this.app.use(express.static('public'));
  }

  routes(): void {
    this.app.use('/asteroid', asteroidRoute);
    this.app.use('/version', getVersion);
    this.app.use(notFound);
    this.app.use(handleError);
  }

  /**
   * Start server
   */
  async listen(): Promise<void> {
    this.server = this.app.listen(this.app.get('port'));
    logger.info(`Server ${name} v${version} is listening on port ${this.app.get('port')}`);
  }

  /**
   * Close server
   */
  async close(): Promise<void> {
    if (this.server) {
      this.server.close();
      logger.info(`Server ${name} v${version} is not listening on port ${this.app.get('port')}`);
    }
  }
}
