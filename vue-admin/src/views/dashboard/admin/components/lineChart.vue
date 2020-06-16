<template>
  <div :class="className" :style="{ height: height, width: width }"/>
</template>

<script>
import echarts from 'echarts';
import { debounce } from '@/utils';

require('echarts/theme/macarons');

export default {
  name: 'lineChart',
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
      default: '350px',
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    xAxisLabel: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options() {
      return {
        xAxis: {
          data: this.xAxisLabel,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ['expected', 'actual'],
        },
        series: [
          {
            name: 'expected',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2,
                },
              },
            },
            smooth: true,
            type: 'line',
            data: this.chartData.expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut',
          },
          {
            name: 'actul',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2,
                },
                areaStyle: {
                  color: '#f3f8ff',
                },
              },
            },
            data: this.chartData.actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut',
          },
        ],
      };
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setOptions();
      },
    },
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this._resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener('resize', this._resizeHandler);
    }
    // 监听侧边栏的变化
    this.siderbarElm = document.getElementsByClassName('sidebar-container')[0];
    if (this.siderbarElm) {
      this.siderbarElm.addEventListener('transitionend', this.sidebarResizeHandler);
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this._resizeHandler);
    }
    if (this.siderbarElm) {
      this.siderbarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this._resizeHandler();
      }
    },
    setOptions() {
      this.chart.setOption(this.options);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
    },
  },
};
</script>
