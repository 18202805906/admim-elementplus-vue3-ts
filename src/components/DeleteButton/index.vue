<template>
  <el-button type="danger" icon="el-icon-delete" plain size="mini" v-bind="$attrs" @click="handleClick">
    <slot>删除</slot>
  </el-button>
</template>

<script lang="tsx">
import { createVNode, defineComponent } from 'vue';
import { ElMessageBox } from 'element-plus';
export default defineComponent({
  name: 'DeleteButton',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    return {
      handleClick() {
        ElMessageBox.confirm(
          `${props.title ? createVNode(<span>您确定要删除【{<span class="text-primary">{props.title}</span>}】吗？</span>) : '您确定要删除该数据吗？'}`,
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true
          }
        ).then(() => {
          emit('confirm');
        });
      }
    };
  }
});
</script>
