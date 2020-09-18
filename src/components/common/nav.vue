<template>
  <div style="text-align:center;" v-if="isShowFixed">
    <van-tabbar
      route
      :fixed="true"
      :safe-area-inset-bottom="true"
      :placeholder="true"
      z-index="100"
    >
      <van-tabbar-item to="/home">
        <span :style="{ color: active == 0 ? '#FAC04D' : '#AAAAAA' }"
          >指数</span
        >
        <template #icon="props">
          <img :src="active == 0 ? home.active : home.inactive" width="20" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/index">
        <span :style="{ color: active == 1 ? '#FAC04D' : '#AAAAAA' }"
          >大厅</span
        >
        <template #icon="props">
          <img :src="active == 1 ? index.active : index.inactive" width="20" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/search">
        <span
          :style="{ color: active == 2 ? '#FAC04D' : '#AAAAAA' }"
          class="search"
          >匹配 <span class="new" v-if="isHasNew"></span
        ></span>
        <template #icon="props">
          <img
            :src="active == 2 ? search.active : search.inactive"
            width="20"
          />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/user">
        <span :style="{ color: active == 3 ? '#FAC04D' : '#AAAAAA' }"
          >我的</span
        >
        <template #icon="props">
          <img :src="active == 3 ? user.active : user.inactive" width="20" />
        </template>
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  components: {},
  data() {
    return {
      home: {
        inactive: require("@img/tabbar_icon_trend.png"),
        active: require("@img/tabbar_icon_trend_active.png"),
      },
      index: {
        inactive: require("@img/tabbar_icon_index.png"),
        active: require("@img/tabbar_icon_index_active.png"),
      },
      search: {
        inactive: require("@img/tabbar_icon_match.png"),
        active: require("@img/tabbar_icon_match_active.png"),
      },
      user: {
        inactive: require("@img/tabbar_icon_mine.png"),
        active: require("@img/tabbar_icon_mine_active.png"),
      },
      isHasNew: true,
    };
  },
  computed: {
    active() {
      if (this.$store.state.path == "user") {
        // 会员中心
        return 3;
      }
      if (this.$store.state.path == "search") {
        // 匹配
        return 2;
      }
      if (this.$store.state.path == "index") {
        // 大厅
        return 1;
      }
      return 0;
    },
    isShowFixed() {
      return this.$store.state.isShowFixed;
    },
  },
  mounted() {},
  methods: {},

  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  .new {
    position: absolute;
    top: -0.48rem;
    right: -0.1rem;
    width: 0.16rem;
    height: 0.16rem;
    border-radius: 50%;
    background: #e02020;
  }
}
</style>
