/* eslint-disable*/
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@containers/Home.vue';
// import Backstage from '@containers/Backstage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: {
        name: 'index'
      },
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@views/index'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@views/login'),
          meta: {
            title: '登录页'
          }
        },
        {
          path: '/regsiter',
          name: 'regsiter',
          component: () => import('@views/login/regsiter'),
          meta: {
            title: '注册页'
          }
        },
        {
          path: '/ResetPass',
          name: 'ResetPass',
          component: () => import('@views/login/ResetPass'),
          meta: {
            title: '忘记密码'
          }
        }
      ]
    },

    {
      path: '*',
      component: () => import('@views/404.vue')
    }
  ]
});
