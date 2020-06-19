<template>
  <section ref="box" :class="className" :style="boxStyle">
    <div ref="content" class="content" :style="contentStyle">
      <slot/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'stickyTop',
  props: {
    className: String,
    stickTop: {
      type: Number,
      default: 0,
    },
    stickLeft: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      active: false,
      position: '',
      contentHeight: 0,
      width: 0,
      height: 0,
    };
  },
  computed: {
    boxStyle() {
      return {
        height: `${this.contentHeight}px`,
        zIndex: this.zIndex,
      };
    },
    contentStyle() {
      return {
        top: `${this.stickTop}px`,
        zIndex: this.zIndex,
        position: this.position,
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: `${this.height}px`,
        isSticky: false,
      };
    },
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  activated() {
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 吸顶
    sticky() {
      if (this.active) {
        return;
      }
      this.position = 'fixed';
      this.active = true;
      this.isSticky = true;
    },
    reset() {
      if (!this.active) {
        return;
      }
      this.position = '';
      this.width = 'auto';
      this.active = false;
      this.isSticky = false;
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width;
      const offsetTop = this.$el.getBoundingClientRect().top;
      // 超过顶部的时候吸住
      if (offsetTop < this.stickyTop) {
        this.sticky();
        return;
      }
      this.reset();
    },
    handleResize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width;
      }
    },
  },
};
</script>
