<template>
  <div class="guide-content">
    <p class="info-content">
      {{ $t('guide.description') }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>
    </p>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">{{ $t('guide.button') }}</el-button>
  </div>
</template>

<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import steps from './defineSteps';

export default {
  name: 'guide',
  data() {
    return {
      driver: null,
    };
  },
  mounted() {
    this.driver = new Driver();
    this.guide();
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    },
  },
};
</script>
<style lang="scss" scoped>
.guide-content {
  padding: 30px 15px;
  .info-content {
    background-color: rgba(66, 185, 131, 0.1);
    border-radius: 2px;
    padding: 1rem;
    word-spacing: .05rem;
    a {
      color: #42b983;
      font-weight: 600;
    }
  }
}
</style>
