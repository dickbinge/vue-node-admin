<template>
  <div :class="className" :style="{height: height, width: width}" />
</template>

<script>
import echarts from 'echarts';
import { debounce } from '@/utils';

require('echarts/theme/macarons');

const animationDuration = 6000;
export default {
  name: 'barChart',
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    xAxisLabel: {
      type: Array,
      default: () => [],
    },
    chartData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisLabel,
            axisTick: {
              alignWidthLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false,
            },
          },
        ],
        series: this.chartData.map(item => ({
          name: item.code,
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: item.data,
          animationDuration,
        })),
      };
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.chart.setOption(this.options);
      },
    },
  },
  mounted() {
    this.initChart();
    this._resizeHanndler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', this._resizeHanndler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this._resizeHanndler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.setOption(this.options);
    },
  },
};
</script>
