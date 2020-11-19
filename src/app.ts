import express, {Express} from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use( (request, response, next) => {
      console.log('new request');
      next();
    })
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
