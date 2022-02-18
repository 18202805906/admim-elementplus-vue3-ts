import TDescription from '../description/src/index.vue';
import { App } from 'vue';

/* istanbul ignore next */
TDescription.install = function (Vue:App) {
  Vue.component(TDescription.name, TDescription);
};

export default TDescription;
