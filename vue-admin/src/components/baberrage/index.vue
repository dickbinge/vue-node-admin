<template>
  <div class="baberrage-content">
    <vue-baberrage
      :isShow="isShow"
      :barrageList="barrageList"
      :maxWordCount="maxWordCount"
      :throttleGap="throttleGap"
      :loop="barrageLoop"
      :boxHeight="boxHeight"
      :messageHeight="messageHeight"
    >
    </vue-baberrage>
  </div>
</template>
<script>
import { vueBaberrage } from 'vue-baberrage';

export default {
  name: 'baberrage',
  components: {
    vueBaberrage,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    barrageList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      barrageIsShow: true,
      messageHeight: 3,
      boxHeight: 150,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
    };
  },
};
</script>
<style lang="scss">
.baberrage-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.baberrage-content {
  .blue {
    border-radius: 100px;
    background: #e6ff75;
    color: #fff;
  }

  .green {
    border-radius: 100px;
    background: #75ffcd;
    color: #fff;
  }
  .red {
    border-radius: 100px;
    background: #e68fba;
    color: #fff;
  }
  .yellow {
    border-radius: 100px;
    background: #dfc795;
    color: #fff;
  }
  .baberrage-stage {
    position: absolute;
    width: 100%;
    height: 212px;
    overflow: hidden;
    top: 0;
    margin-top: 130px;
  }
}
</style>
