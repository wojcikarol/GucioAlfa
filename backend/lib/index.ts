import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Server } from 'http';
import { WebSocketServer } from 'ws';
import Controller from './interfaces/controller.interface';
import { config } from './config';
// import logRequest from './middlewares/logRequest.middleware';

class Index {
  public app: express.Application;
  private server: Server;
  private wss: WebSocketServer;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.server = new Server(this.app); 
    this.wss = new WebSocketServer({ server: this.server }); 

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeWebSocket();
    this.connectToDatabase();
  }

  public listen(): void {
    this.server.listen(config.port, () => {
      console.log(`App listening on the port ${config.port}`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
 
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    this.app.use(express.static('public'));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeWebSocket(): void {
    this.wss.on('connection', (ws) => {
      console.log('New WebSocket connection established');

      ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`); 
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });
    });

    this.wss.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(config.databaseUrl);
      console.log('Connection with database established');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
  }
}

export default Index;
