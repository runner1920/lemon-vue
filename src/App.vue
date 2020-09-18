<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" v-if="routerAlive" />
  </div>
</template>
<script>
export default {
  components: {},
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      routerAlive: true
    };
  },
  created() {
    // this.getPlatformFlag();
  },
  methods: {
    getPlatformFlag() {
      // 获取数据字典
      const obj = {};
      obj.dictCode = 'web_platform_config';
      obj.dataKey = 'credit_flag';
      console.log(obj);
      this.$http
        .post('/base/dict/get/value/v1', obj)
        .then((data) => {
          console.log(data);
          if (data.code === '000000') {
            this.$store.commit('SET_PLATFORM_CONFIG', +data.data);
          }
        })
        .catch();
    },
    reload() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: $fz14;
  min-height: 100vh;
  background: #f8f9fc;
}
#nprogress .bar {
  background: #3771D7 !important;
}
</style>
