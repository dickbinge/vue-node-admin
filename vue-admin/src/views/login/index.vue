<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" aria-autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-checkbox v-model="autoLogin" class="auto-login">{{ $t('login.nextAutoLogin') }}</el-checkbox>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom: 30px;"
        @click="handleLogin">
          {{ $t('login.logIn') }}
      </el-button>
    </el-form>
    <div class="social-content">
      <span>*{{ $t('login.thirdAuth') }}</span>
      <el-button type="primary" class="social-btn" @click="handleSocialLogin">{{ $t('login.thirdparty') }}</el-button>
    </div>
    <el-dialog
      :title="$t('login.thirdparty')"
      :visible.sync="socialVisible">
        <social-sign></social-sign>
    </el-dialog>
  </div>
</template>
<script>
import LangSelect from '@/components/langSelect';
import socialSign from './socialSign';

export default {
  name: 'login',
  components: {
    LangSelect,
    socialSign,
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('The password can not be less than 4 digits!'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword,
          },
        ],
      },
      passwordType: 'password',
      autoLogin: false,
      loading: false,
      redirect: undefined,
      socialVisible: false,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('loginByUsername', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
          }).catch((err) => {
            this.$message.error(err.msg);
            this.loading = false;
          });
          return true;
        }
        console.log('error submit');
        return false;
      });
    },
    handleSocialLogin() {
      this.socialVisible = true;
    },
  },
};
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not(cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/**reset element-ui css */
.login-container{
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      appearance: none; /*可以无视控件默认的样式*/
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor; /* 改变输入框光标的颜色，不改变输入内容的颜色 */
      &:-webkit-autofill {
        -webkit-box-shodow: 0 0 0px 1000px $bg insert !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    background:rgba($color: #000000, $alpha: 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .auto-login {
    margin: 15px auto;
    .el-checkbox__label {
      color: $light_gray;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container{
  min-height: 100%;
  width: 100%;
  background: $bg;
  overflow: hidden;
  .login-form{
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .set-language {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 24px;
    color: $light_gray;
    cursor: pointer;
  }
  .show-pwd {
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    position: absolute;
    right: 10px;
    top: 7px;
  }
  .social-content {
    width: 520px;
    margin: 0 auto;
    padding: 15px 35px;
    display: flex;
    justify-content: space-between;
    span {
      color: $light_gray;
      font-size: 12px;
    }
    .social-btn {
      width: 120px;
    }
  }
}
</style>
