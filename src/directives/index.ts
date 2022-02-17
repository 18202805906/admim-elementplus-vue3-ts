import { App } from 'vue';
import debounce from './debounce';
import bindEcharts from './bindEcharts';
export default (app: App) => {
  app.directive('bindEcharts', bindEcharts);
  app.directive('debounce', debounce);
};
