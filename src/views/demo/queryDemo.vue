<template>
  <div class="query-data">
    <t-query-condition :opts="opts" :add="true" @submit="conditionEnter" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
const ADDRESS_TYPES = [
  {
    label: '前纺一车间',
    key: 'W1'
  },
  {
    label: '前纺二车间',
    key: 'W2'
  },
  {
    label: '前纺三车间',
    key: 'W3'
  }
];
export default defineComponent({
  name: 'queryData',
  setup() {
    let queryData = {
      likeCargoNo: '',
      likeBookNo: '',
      likeTransportNo: '',
      likeCargoName: '',
      workshopNum: '',
      workshopNum1: '',
      date1: '',
      date2: '',
      date: ''
    };
    let opts = {
      likeCargoNo: {
        label: '货源编号',
        comp: 'el-input'
      },
      likeBookNo: {
        label: '订单编号',
        comp: 'el-input',
        bind: {}
      },
      likeTransportNo: {
        label: '运单编号',
        comp: 'el-input',
        bind: {}
      },
      likeCargoName: {
        label: '货品名称',
        comp: 'el-input',
        bind: {}
      },
      workshopNum1: {
        label: '车间2',
        comp: 'el-select',
        changeEvent: 'change',
        // defaultVal: 'W1',
        bind: {},
        child: ADDRESS_TYPES.reduce((acc: Object[], cur: {key: string, label: string}) => {
          acc.push({
            comp: 'el-option',
            bind: {
              label: cur.label,
              value: cur.key
            }
          });
          return acc;
        }, [])
      },
      workshopNum: {
        label: '车间',
        comp: 'el-select',
        changeEvent: 'change',
        // defaultVal: 'W1',
        bind: {},
        child: [
          {
            comp: 'el-option',
            bind: {
              label: '前纺一车间',
              value: 'W1'
            }
          },
          {
            comp: 'el-option',
            bind: {
              label: '前纺二车间',
              value: 'W2'
            }
          },
          {
            comp: 'el-option',
            bind: {
              label: '前纺三车间',
              value: 'W3'
            }
          }
        ]
      },
      date1: {
        label: '日期',
        comp: 'el-date-picker',
        changeEvent: 'change',
        bind: {
          type:'date',
          valueFormat: 'YYYY-MM-DD'
        }
      },
      date: {
        label: '日期范围',
        comp: 'el-date-picker',
        changeEvent: 'change',
        span: 2,
        bind: {
          type: 'daterange',
          rangeSeparator: '-',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          valueFormat: 'YYYY-MM-DD'
        }
      }
    };
    // 查询条件所需参数
    const getQueryData = () => {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date1, date } = queryData;
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        date1,
        beginDate: date ? date[0] : null,
        endDate: date ? date[1] : null
      };
    };
    // 点击查询按钮
    const conditionEnter = (data) => {
      queryData = data;
      console.log('查询条件', getQueryData());
    };
    return {
      conditionEnter,
      opts
    };
  }
});
</script>
