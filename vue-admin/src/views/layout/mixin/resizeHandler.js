import store from '@/store';

const { body } = document;
const WIDTH = 1024;
const RATID = 3;

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.handleClickOutSide();
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile');
      store.dispatch('closeSideBar', {
        withoutAnimation: true,
      });
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - RATID < WIDTH;
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop');
        if (isMobile) {
          store.dispatch('closeSideBar', {
            withoutAnimation: true,
          });
        }
      }
    },
    handleClickOutSide() {
      store.dispatch('closeSideBar', {
        withoutAnimation: false,
      });
    },
  },
};
