import { debounce } from '@/utils';

export default {
  data() {
    return {
      sidebarElm: null,
    };
  },
  mounted() {
    this._resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', this._resizeHandler);
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    if (this.sidebarElm) {
      // 监听左侧栏的过渡事件
      this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
    }
  },
  beforeDestory() {
    window.removeEventListener('resize', this._resizeHandler);
    this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this._resizeHandler();
      }
    },
  },
};
