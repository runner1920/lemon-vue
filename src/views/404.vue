<template>
  <div>
    <div class="Fover">
      <img src="~@img/web_404.png" alt />
      <p>页面走失了，请尝试点击下方按钮</p>
      <el-button type="primary" @click="goIndex"
        >返回首页 ({{ totalTime }})</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalTime: 3,
      clock: ''
    };
  },
  mounted() {
    this.clock = window.setInterval(() => {
      this.totalTime--;
      if (this.totalTime < 1) {
        // 当倒计时小于0时清除定时器
        window.clearInterval(this.clock);
        this.$router.push({ path: '/' });
        this.totalTime = 0;
      }
    }, 1000);
  },
  methods: {
    goIndex() {
      window.clearInterval(this.clock);
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="scss" scoped>
.Fover {
  width: 1028px;
  height: 304px;
  margin: 0 auto;
  margin-top: 35vh;
  text-align: center;
  img {
    width: 100%;
  }
  p {
    margin-top: 16px;
    margin-bottom: 24px;
    color: #666666;
    font-size: 14px;
  }
}
</style>
