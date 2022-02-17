<template>
  <div class="breadcrumb-bar">
    <el-icon class="trigger" :size="16" @click="handleCollapse">
      <expand v-show="collapse" />
      <fold v-show="!collapse" />
    </el-icon>
    <el-breadcrumb separator=">" class="breadcrumb">
      <el-breadcrumb-item
        ><router-link to="/">首页</router-link></el-breadcrumb-item
      >
      <el-breadcrumb-item v-for="item in data" :key="item.id"
        ><router-link :to="item.url">{{ item.title }}</router-link></el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    }
  },
  emits: ['update:collapse'],
  setup(props, { emit }) {
    return {
      handleCollapse() {
        emit('update:collapse', !props.collapse);
      }
    };
  }
});
</script>
<style lang="less" scoped>
.breadcrumb-bar {
  display: flex;
  width: 100%;
  background-color: #fff;
  align-items: center;
}
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  color: #666;
  padding: 0 10px;
  &:hover {
    color: #333;
  }
}
.breadcrumb {
  padding: 0 10px;
  line-height: 48px;
  .home-ico {
    color: #d1e9ff;
    margin-right: 8px;
  }
}
</style>
