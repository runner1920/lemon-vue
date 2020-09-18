import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@containers/Home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: Home,
    redirect: {
      name: "index",
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@views/home"),
        meta: {
          title: "银票",
          isShowNav: true, //是否需要底部菜单
        },
      },
      {
        path: "/index",
        name: "index",

        component: () => import("@views/index"),
        meta: {
          title: "大厅",
          isShowNav: true, //是否需要底部菜单
          // isNeedNavBar: true, //是否需要顶部导航
        },
      },
      {
        path: "/search",
        name: "search",

        component: () => import("@views/search"),
        meta: {
          title: "我的报价匹配",
          isShowNav: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
