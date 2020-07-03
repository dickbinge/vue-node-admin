<template>
  <div class="errpage-content">
    <el-button class="back-btn" @click="back">返回</el-button>
    <el-row>
      <div class="err-text-content">
        <h1 class="err-info">
          Oops!
        </h1>
        <p class="no-auth">你没有权限去该页面</p>
        <span>如有不满请联系领导</span>
        <div class="route-content">
          <ul>
            <li>或者你可以去</li>
            <li class="link-type"><router-link to="/dashboard">回首页</router-link>
            <li class="link-type"><a href="https://www.baidu.com/">百度一下</a></li>
            <li class="link-type"><a href="#" @click.prevent="dialogVisible=true;">随便看看</a></li>
          </ul>
        </div>
      </div>
      <div class="err-image-content">
        <img :src="errImg" alt="豆豆" width="313" height="428"/>
      </div>
    </el-row>
    <el-dialog v-dialogDrag :visible.sync="dialogVisible" title="随便看" top="6vh">
      <img :src="ewizardClap" class="pan-img" :width="700">
    </el-dialog>
  </div>
</template>
<script>
import errImg from '@/assets/images/401.gif';

export default {
  name: 'page401',
  data() {
    return {
      dialogVisible: false,
      errImg: `${errImg}?${new Date()}`,
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
    };
  },
  methods: {
    back() {
      this.$router.push('/dashboard');
    },
  },
};
</script>
<style scoped>
.errpage-content {
  width: 800px;
  max-width: 100%;
  margin: auto;
  margin-top: 60px;
}
.errpage-content .back-btn {
  background-color: #008489;
  color: #fff;
  border: none;
}
.err-text-content .err-info {
  font-size: 60px;
  color: #484848;
  font-weight: 700;
}
.err-text-content .no-auth {
  font-size: 24px;
  font-weight: bold;
}
.err-text-content span {
  font-size: 12px;
  font-weight: bold;
}
.err-text-content,
.err-image-content {
  width: 50%;
  float: left;
}
.route-content ul li {
  margin-bottom: 5px;
  font-size: 14px;
}
.route-content ul .link-type {
  color: #008489;
  text-decoration: none;
}
</style>
