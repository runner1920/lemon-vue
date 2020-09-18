<template>
  <div class="Home">
    <HomeHeader />
    <router-view class="routerView" />
    <HomeFooter />
  </div>
</template>

<script>
import HomeHeader from '@layout/HomeHeader.vue';
import HomeFooter from '@layout/HomeFooter.vue';

export default {
  components: {
    HomeHeader,
    HomeFooter
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.Home {
  min-width: 1200px;
}
.routerView {
  min-height: calc(100vh - 368px);
}
</style>
