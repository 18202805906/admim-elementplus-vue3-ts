
// import TUploadFile from './uploadFile';
// import TQueryCondition from './queryCondition';
// import TSimpleForm from './simpleForm';
// import TCalendar from './calendar';
import TDescription from './description/index';
// import TTable from './table';
import { App } from 'vue';
// 存储组件列表
const components = [
  // TUploadFile,
  // TQueryCondition,
  // TSimpleForm,
  // TCalendar,
  TDescription,
  // TTable
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue: App) {
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));
};

// 按需引入
export {
  install,
  // TUploadFile,
  // TQueryCondition,
  // TSimpleForm,
  // TCalendar,
  TDescription,
  // TTable
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  ...components
};
