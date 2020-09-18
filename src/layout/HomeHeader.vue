<template>
  <div class="HomeHeader">
    <div class="wrapper clearfix"></div>
    <div class="wrapper clearfix">
      <div class="logo fl" @click="$router.push({ name: 'index' })"></div>
      <div>
        <nav class="nav fl">
          <ul class="clearfix">
            <li class="fl active" @click="$router.push({ name: 'index' })">
              首页
            </li>
          </ul>
        </nav>
      </div>
      <div class="userInfo fr" v-if="!isLogin">
        <el-button
          class="C3"
          type="text"
          @click="$router.push({ name: 'login' })"
          >登录</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          class="C3"
          type="text"
          @click="$router.push({ name: 'regsiter' })"
          >注册</el-button
        >
      </div>
      <div class="userInfo fr" v-else>
        <el-button type="text" class="quit" @click="platform.signOut()"
          >退 出</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import platform from '@/utils/platform';
export default {
  data() {
    return {
      platform,
    };
  },
  computed: {
    isLogin() {
      console.log(this.$store.state.isLogin, 999);
      return this.$store.state.isLogin;
    },
    path() {
      if (this.$store.state.thisPath === '/index') {
        // 工作台
        return 1;
      }
      return 0;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.navpost {
  position: relative;
}

.HomeHeader {
  background: #fff;
  height: 64px;
  .logo {
    margin: 18px 34px 10px 0;
    @include wh(142px, 36px);
    @include cursor;
    @include buncc('~@img/ryt_logo.png');
    background-size: 100% 100%;
  }
  .back {
    color: #ccc;
    line-height: 64px;
    font-size: $fz14;
    @include cursor;
  }
  .nav {
    margin: 16px 0 0 125px;
    li {
      @include cursor;
      color: #333333;
      font-size: $fz16;
      margin-right: 64px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      &.active {
        color: $primary-color;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .userInfo {
    @extend .por;
    line-height: 64px;
    padding-left: 17px;
    padding-right: 36px;
    .need {
      margin-top: 16px;
      &:hover {
        color: #3771d7;
      }
      &:focus {
        color: #3771d7;
      }
    }
    .text {
      font-size: $fz14;
      color: rgba(255, 255, 255, 0.7);
      @include cursor;
      position: relative;
      .infoIcon {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #f5222d;
        border-radius: 50%;
        left: 56px;
        top: -4px;
        line-height: 16px;
        text-align: center;
      }
    }

    .el-button--primary.is-plain {
      background: #fff;
      border-color: #3771d7;
    }
    .userIcon {
      width: 16px;
      height: auto;
      vertical-align: middle;
      margin-left: 20px;
    }
    .userCompany {
      cursor: pointer;
      margin-left: 8px;
    }
    .C3 {
      color: #333;
    }
    .quit {
      color: #999;
    }
  }
}
</style>
