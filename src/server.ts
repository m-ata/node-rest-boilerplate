import express from 'express';
import { connectMongoDB } from './db';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { once } from 'events';

const startServer = async (): Promise<void> => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); // parse the request into json
  dotenv.config();
  await connectMongoDB();
  const server = app.listen(process.env.PORT);
  await once(server, 'listening');
  console.info(`Server listening on port ${process.env.PORT}`);
};

void startServer();
