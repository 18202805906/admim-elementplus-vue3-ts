import TQueryCondition from '../queryCondition/src/index.vue';
import { App } from 'vue';

/* istanbul ignore next */
TQueryCondition.install = function (Vue: App) {
  Vue.component(TQueryCondition.name, TQueryCondition);
};

export default TQueryCondition;
