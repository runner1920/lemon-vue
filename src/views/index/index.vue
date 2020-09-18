<template>
  <div class="index">
    <van-button type="primary" @click="toWei"
      >微信登陆（须在微信浏览器打开）</van-button
    >
    <h2 class="fwb">微信登陆逻辑</h2>
    <ol>
      <li>
        1.第一步需获取code验证是否注册过，如注册过能直接获取用户信息直接登陆，获取code方式为snsapi_base
      </li>
      <li>
        2.如未注册过需再获取code方式为snsapi_userinfo，此方式能获取微信用户一些基本信息，并进行保存
      </li>
      <li>3.注册完成后续登陆只需要获取一次code即可，未注册需走一二两个流程</li>
    </ol>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
Vue.use(Button);
import secret from "@/utils/secret";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    toWei() {
      this.$store.dispatch("getConfig", {
        url: secret.Base64("https://www.fichange.com"),
      });
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.index {
  padding: 2rem 0.8rem;
  line-height: 0.52rem;
  font-size: 0.28rem;
}
</style>
