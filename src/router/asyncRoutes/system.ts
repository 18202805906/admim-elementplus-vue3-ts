import { RouteRecordRaw } from 'vue-router';
// 系统管理
export default [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/message',
    // component: () => import(/* webpackChunkName: "default-layout" */ '@/layouts/DefaultLayout.vue'),
    component: () => import(/* webpackChunkName: "vertical-layout" */ '@/layouts/VerticalLayout.vue'),
    meta: {
      permission: 'system',
      title: '系统配置'
    },
    children: [
      // 站内消息
      {
        path: '/system/message',
        name: 'message',
        component: () => import('@/views/system/message/List.vue'),
        meta: {
          permission: 'system/message',
          title: '站内消息'
        }
      },
      // 用户日志
      {
        path: '/system/log',
        name: 'log',
        component: () => import('@/views/system/log/List.vue'),
        meta: {
          permission: 'system/log',
          title: '用户日志'
        }
      }
    ]
  }
] as RouteRecordRaw[];
