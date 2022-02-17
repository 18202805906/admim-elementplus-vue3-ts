import { App } from 'vue';
import IconFont from './IconFont/index.vue';
import DeleteButton from './DeleteButton/index.vue';
//导入element 图标
import * as ElIconModules from '@element-plus/icons-vue';

// import BasisTable from './BasisTable/index.vue';
export default (app: App) => {
  // 统一注册Icon图标
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName];
      app.component(iconName, item);
    }
  }
  app.component('IconFont', IconFont);
  app.component('DeleteButton', DeleteButton);
  // app.component('BasisTable', BasisTable);
};
