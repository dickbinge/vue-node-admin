<template>
  <div class="mixin-page">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Buttons</span>
        </div>
        <div style="margin-bottom: 50px;">
          <el-col :span="4" class="text-center" v-for="btn in buttonList" :key="btn.code">
            <a class="pan-btn" :class="`${btn.color}-btn`" :href="btn.href">{{btn.name}}</a>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Material Design 的input</span>
          </div>
          <div class="card-content">
            <el-form :model="form" :rules="rules">
              <el-form-item prop="title">
                <md-input v-model="form.name" icon="search" name="name" type="text" placeholder="输入姓名">姓名</md-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>图片hover效果</span>
          </div>
          <div class="card-content">
            <pan-thumb :width="100" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
              <a href="#/dashboard">dashboard</a>
            </pan-thumb>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>波纹按钮效果</span>
          </div>
          <div class="card-content">
            <el-button type="primary" size="small" v-waves @click="handleClickWaveBtn">波纹按钮效果按钮</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>hover text</span>
          </div>
          <div class="card-content">
            <mill-ki class="millki-text" text="sdfafsafada" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mdInput from '@/components/mdInput';
import panThumb from '@/components/panThumb';
import millKi from '@/components/millKi';

export default {
  name: 'mixinPage',
  components: {
    mdInput,
    panThumb,
    millKi,
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'));
      } else {
        callback();
      }
    };
    return {
      buttonList: [
        {
          code: 'document',
          name: '文档',
          color: 'blue',
        },
        {
          code: 'icons',
          name: 'icons',
          color: 'light-blue',
        },
        {
          code: 'excel',
          name: 'Excel',
          color: 'red',
        },
        {
          code: 'table',
          name: 'Table',
          color: 'green',
        },
        {
          code: 'form',
          name: 'Form',
          color: 'pink',
        },
        {
          code: 'theme',
          name: 'Theme',
          color: 'yellow',
        },
      ],
      form: {
        name: '',
      },
      field: {
        name: 'name',
        type: 'text',
      },
      rules: {
        name: [{ required: true, trigger: 'change', validator: validate }],
      },
    };
  },
  methods: {
    handleClickWaveBtn() {
      console.log('点击了波纹按钮');
    },
  },
};
</script>
<style lang="scss" scoped>
.mixin-page {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 85px);
  .text-center {
    padding: 15px;
    .pan-btn {
      padding: 14px 40px;
      border-radius: 4px;
      color: #fff;
      transition: 600ms ease all;
      position: relative;
      &:hover {
        background-color: #fff;
        &:after,
        &:before {
          width: 100%;
          transition: 600ms ease all;
        }
      }
      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 2px;
        width: 0;
        transition: 400ms ease all;
      }
      &:after {
        right: inherit;
        top: inherit;
        left: 0;
        bottom: 0;
      }
    }
  }
  .el-row {
    margin-bottom: 30px;
    .box-card {
      margin-right: 15px;
      height: 200px;
    }
  }
}
</style>
