import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log('Server on port ' + process.env.APP_PORT);
  });
});
