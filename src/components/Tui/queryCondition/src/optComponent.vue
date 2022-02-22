<template>
  <component v-if="comp!=='el-date-picker'" :is="comp" v-model="values" v-bind="{ clearable: true, filterable: true, ...bind }" :placeholder="getPlaceholder(opt)" v-on="cEvent">
    <OptComponent v-for="(cOpt, i) in child" :key="i" v-bind="cOpt" :value="cOpt.value" />
  </component>
  <el-date-picker v-if="comp=='el-date-picker'" v-model="values" v-bind="{ clearable: true, filterable: true, ...bind }" :placeholder="getPlaceholder(opt)" v-on="cEvent"></el-date-picker>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'OptComponent',
  props: {
    dataIndex: {
      type: String,
      default: ''
    },
    opt: {
      type: Object,
      default: () => ({})
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    //事件
    event: {
      type: Object,
      default: () => ({})
    },
    // 组件
    comp: {
      type: [String, Object],
      default: ''
    },
    child: {
      type: Array,
      default: () => []
    },
    // 参数值
    value: {
      type: [String, Number, Array, Date],
      default: ''
    },
    changeEvent: {
      type: String,
      default: 'input'
    }
  },
  setup(props, { emit }) {
    let values = ref(props.value);
    const cEvent = computed(() => {
      let event = { ...props.event };
      let changeEvent = {};
      if (props.changeEvent) {
        changeEvent[props.changeEvent] = (v) => {
          event[props.changeEvent] && event[props.changeEvent](v, arguments);
          emit('change', v, props.dataIndex, arguments);
        };
      }
      return { ...event, ...changeEvent };
    });
    // 得到placeholder的显示
    const getPlaceholder = (row: { comp: string|string[]; label: string; }) => {
      let placeholder = '';
      if (row.comp) {
        if (row.comp.includes('input')) {
          placeholder = '请输入' + row.label;
        } else if (row.comp.includes('select') || row.comp.includes('date')) {
          placeholder = '请选择' + row.label;
        } else {
          placeholder = row.label;
        }
      }
      return placeholder;
    };
    return {
      getPlaceholder,
      cEvent,
      values
    };
  }
});
</script>

<style lang="less" scoped>
</style>
