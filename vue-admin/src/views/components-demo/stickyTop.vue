<template>
  <div class="sticky-top">
    <sticky class-name="sub-navbar">
      <el-dropdown trigger="click">
        <el-button plain>
          Platform<i class="el-icon-caret-bottom el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-border">
          <el-checkbox-group v-model="platform" style="padding: 5px; 15px;">
            <el-checkbox v-for="item in platformList" :label="item.key" :key="item.key">
            {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
       <el-dropdown trigger="click">
        <el-button plain>
          Link<i class="el-icon-caret-bottom el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-padding no-border" style="width:300px">
          <el-input v-model="url" placeholder="Please enter the content">
            <template slot="prepend">Url</template>
          </el-input>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" :picker-options="pickerOptions" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Release time"/>
      </div>

      <el-button style="margin-left: 10px;" type="success">publish
      </el-button>
    </sticky>
    <back-top></back-top>
    <div class="components-container">
      <code>Sticky header, {{ $t('components.stickyTips') }}</code>
      <div v-for="index of 100" :key="index">placeholder</div>
    </div>
  </div>
</template>
<script>
import sticky from '@/components/sticky';
import backTop from '@/components/backTop';

export default {
  name: 'stickyTop',
  components: {
    sticky,
    backTop,
  },
  data() {
    return {
      time: '',
      url: '',
      platform: [],
      platformList: [
        { key: 'a-platform', name: 'platformA' },
        { key: 'b-platform', name: 'platformB' },
        { key: 'c-platform', name: 'platformC' },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
};
</script>
<style scoped>
.sub-navbar >div,button {
  margin-right: 10px;
}
.time-container {
  display: inline-block;
}
</style>
