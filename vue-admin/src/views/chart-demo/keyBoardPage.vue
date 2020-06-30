<template>
  <div class="chart-container">
    <chart height="100%" width="100%"/>
  </div>
</template>
<script>
import chart from '@/components/chart/keyBoard';

export default {
  name: 'keyBoard',
  components: {
    chart,
  },
};
</script>
<style scoped>
.chart-container {
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
