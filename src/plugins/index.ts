import { App } from 'vue';
import auth from './auth';

export default (app: App) => {
  app.use(auth);
};
