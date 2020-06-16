<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item of panelList" :key="item.code">
      <div class="card-panel" @click="handleSetLineChart(item.code)">
        <div class="card-panel-icon-wrapper" :class="`icon-${item.iconType}`">
          <svg-icon :icon-class="item.iconClass" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{item.text}}</div>
          <count-to :start-val="0" :end-val="item.value" :duration="duration" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import countTo from 'vue-count-to';

export default {
  name: 'panelGroup',
  components: {
    countTo,
  },
  props: {
    panelList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      duration: 3200,
    };
  },
  methods: {
    handleSetLineChart(code) {
      this.$emit('set-data', code);
    },
  },
};
</script>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba($color: #000000, $alpha: .05);
    border-color: rgba($color: #000000, $alpha: .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-cyan {
        background: #40c9c6;
      }
      .icon-blue {
        background: #36a3f7;
      }
      .icon-red {
        background: #f4516c;
      }
      .icon-green {
        background: #34bfa3;
      }
    }
    .icon-cyan {
        color: #40c9c6;
    }
    .icon-blue {
      color: #36a3f7;
    }
    .icon-red {
      color: #f4516c;
    }
    .icon-green {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      border-radius: 6px;
      transition: all 0.38s ease-out;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba($color: #000000, $alpha: 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
