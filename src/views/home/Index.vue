<template>
  <div class="page-wrap">
    <el-card>
      <description-demo></description-demo>
      <h5>查询示例</h5>
      <query-demo></query-demo>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DescriptionDemo from '@/views/demo/descriptionDemo.vue';
import queryDemo from '@/views/demo/queryDemo.vue';

export default defineComponent({
  components: { DescriptionDemo, queryDemo },
  setup() {}
});
</script>
