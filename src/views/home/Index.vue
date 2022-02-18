<template>
  <div class="page-wrap">
    <el-card>
      <description-demo></description-demo>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DescriptionDemo from '@/views/demo/descriptionDemo.vue';

export default defineComponent({
  components: { DescriptionDemo },
  setup() {}
});
</script>
