<template>
  <div class="count-container">
    <p class="info-content">
      <a href="https://github.com/PanJiaChen/vue-countTo" target="_blank">countTo-component</a>
    </p>
    <div class="count-content">
      <count-to
        ref="countTo"
        class="count-to"
        :startVal="startVal"
        :endVal="endVal"
        :duration="duration"
        :autoplay="autoplay"
        :decimals="decimals"
        :separator="separator"
        :prefix="prefix"
        :suffix="suffix"/>
      <div class="input-content">
        <div>
          <label for="startVal">startVal:</label><input type="number" name="startVal" v-model.number="setStartVal" />
        </div>
        <div>
          <label for="endVal">endVal:</label><input type="number" name="endVal" v-model.number="setEndVal" />
        </div>
        <div>
          <label for="duration">duration:</label><input type="number" name="duration" v-model.number="setDuration" />
        </div>
        <div>
          <label for="decimals">decimals:</label><input type="number" name="decimals" v-model.number="setDecimals" />
        </div>
        <div>
          <label for="separator">separator:</label><input type="text" name="separator" v-model="setSeparator" />
        </div>
        <div>
          <label for="prefix">prefix:</label><input type="text" name="prefix" v-model="setPrefix" />
        </div>
        <div>
        <label for="suffix">suffix:</label><input type="text" name="suffix" v-model="setSuffix" />
        </div>
        <div class="button-content">
          <div class="btn start-btn" @click="start">开始</div>
          <div class="btn end-btn" @click="pauseResume">暂停/恢复</div>
        </div>
            <code>&lt;count-to :start-val=&#x27;{{ startVal }}&#x27; :end-val=&#x27;{{ endVal }}&#x27; :duration=&#x27;{{ duration }}&#x27;
            :decimals=&#x27;{{ decimals }}&#x27; :separator=&#x27;{{ separator }}&#x27; :prefix=&#x27;{{ prefix }}&#x27; :suffix=&#x27;{{ suffix }}&#x27;
            :autoplay=false&gt;</code>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from 'vue-count-to';

export default {
  name: 'countToPage',
  components: {
    countTo,
  },
  data() {
    return {
      setStartVal: 0,
      setEndVal: 2017,
      autoplay: true,
      setDuration: 3000,
      setDecimals: 0,
      setSeparator: ',',
      setPrefix: '￥ ',
      setSuffix: ' rmb',
    };
  },
  computed: {
    startVal() {
      if (this.setStartVal) {
        return this.setStartVal;
      }
      return 0;
    },
    endVal() {
      if (this.setEndVal) {
        return this.setEndVal;
      }
      return 0;
    },
    duration() {
      if (this.setDuration) {
        return this.setDuration;
      }
      return 100;
    },
    decimals() {
      if (this.setDecimals) {
        if (this.setDecimals < 0 || this.setDecimals > 20) {
          return 0;
        }
        return this.setDecimals;
      }
      return 0;
    },
    separator() {
      return this.setSeparator;
    },
    suffix() {
      return this.setSuffix;
    },
    prefix() {
      return this.setPrefix;
    },
  },
  methods: {
    start() {
      this.$refs.countTo.start();
    },
    pauseResume() {
      this.$refs.countTo.pauseResume();
    },
  },
  mounted() {
    const year = new Date().getFullYear();
    this.setEndVal = Number(year);
  },
};
</script>
<style lang="scss" scoped>
.count-container {
  padding: 15px;
  .count-content .count-to{
    display: block;
    font-size: 80px;
    margin: 10px 0;
    text-align: center;
    color: #f6416c;
    font-weight: 500;
  }
  .input-content {
    width: 60%;
    margin: 0 auto;
    &>div{
      display: inline-block;
      color: #2f2f4f;
      font-size: 16px;
      margin: 15px 30px 15px 0;
      input {
        width: 80px;
      }
    }
    .button-content {
      .btn {
        background-color: #fff;
        font-size: 20px;
        margin-right: 10px;
        text-align: center;
        border: 1px solid transparent;
        border-color: #d9d9d9;
        padding: 4px 15px;
        display: inline-block;
        touch-action: manipulation;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        line-height: 1.5;
      }
      .start-btn {
        color: #30B08F;
        &:hover {
          background-color: #30B08F;
          color: #fff;
        }
      }
      .end-btn {
        color: #E65D6E;
        &:hover {
          background-color: #E65D6E;
          color: #fff;
        }
      }
    }
  }
}
</style>
