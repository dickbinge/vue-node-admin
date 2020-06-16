<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'; // echarts theme
import { debounce } from '@/utils';

require('echarts/theme/macarons');

export default {
  name: 'pieChart',
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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.chartData.map(item => item.name),
        },
        calculable: true,
        series: [
          {
            name: 'weekly write articles',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.chartData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
          },
        ],
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
