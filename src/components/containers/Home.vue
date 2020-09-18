<template>
  <div class="Home">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.push({ name: $store.state.fromRoute || 'index' })"
      v-if="$route.meta.isNeedNavBar"
      style="margin-bottom:8px;"
      :border="false"
    >
      <template #left>
        <img src="~@img/icon_back.png" width="16" alt="" />
      </template>
    </van-nav-bar>
    <router-view class="routerView" :key="$route.fullPath" />
    <Nav v-if="$route.meta.isShowNav"></Nav>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
import Nav from "@common/nav.vue";
export default {
  components: { Nav },
  data() {
    return {
      screenHeight: window.innerHeight, // 这里是给到了一个默认值
      originHeight: window.innerHeight, // 默认高度在watch里拿来做比较
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight;
      })();
    };
  },
  watch: {
    screenHeight(newValue) {
      console.log("newValue", newValue);
      if (this.originHeight > newValue) {
        this.$store.commit("setShowFixed", false);
      } else {
        this.$store.commit("setShowFixed", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Home {
  height: 100%;
}
</style>
