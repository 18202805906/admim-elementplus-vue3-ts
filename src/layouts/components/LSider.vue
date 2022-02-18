<template>
    <el-aside :width="collapse ? siderCloseWidth : siderOpenWidth" style="transition: width .75s;">
    <div class="x-sider">
      <el-menu class="menu-box" unique-opened :collapse="collapse" :default-active="selectedKeys" :default-openeds="localOpeneds">
        <template v-for="item in menus">
          <template v-if="!item.hide">
            <el-sub-menu :key="item.id" :index="item.url" v-if="item.children && item.children.length >= 1">
              <template #title>
                <el-icon class="menu-ico" :size="20">
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subItem in item.children">
                <el-menu-item :key="subItem.id" :index="subItem.url" @click="changeUrl(subItem.url)" v-if="!subItem.hide">
                  <template #title>
                    <el-icon class="menu-ico" :size="20" v-if="subItem.icon">
                      <component :is="subItem.icon"></component>
                    </el-icon>
                    <span>{{ subItem.name }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item :key="item.id" @click="changeUrl(item.url)" :index="item.url" v-else>
              <template #title>
                <el-icon class="menu-ico" :size="20" v-if="item.icon">
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import config from '@/config';

import { IMenu } from '@/types/interface/system';
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array as PropType<IMenu[]>,
      required: true
    },
    openKeys: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    selectedKeys: {
      type: String,
      default: () => ''
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  emits: ['update:collapse'],
  setup(props, { emit }) {
    const router = useRouter();
    let localOpeneds = ref<string[]>([]);
    watchEffect(() => {
      localOpeneds.value = props.openKeys;
    });
    return {
      localOpeneds,
      siderOpenWidth: config.siderOpenWidth,
      siderCloseWidth: config.siderCloseWidth,
      handleCollapse() {
        emit('update:collapse', !props.collapse);
      },
      changeUrl(url) {
        router.push(url);
      }
    };
  }
});
</script>

<style lang="less" scoped>
.x-sider {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
}

.menu-box {
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 60px);
  width: calc(100% + 17px);
  // transition: width 0.5s ease;
}
.menu-ico {
  margin-right: 6px;
  font-size: 16px;
}
</style>
