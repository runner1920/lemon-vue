import Vue from 'vue';
import Vuex from 'vuex';
import cookie from '@/utils/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: process.env.NODE_ENV === 'production' ? '/rxtx/platform' : '/api',
    widthType: 0,
    isLogin: false,
    conpanyInfo: {},
    baseInfo: {},
    thisPath: '',
    isEnt: false, // 是否有公司
    token: '',
    isSuper: false, // 是否是管理员
    hasOpenAccount: false,
  },
  mutations: {
    setWidthType(state, data) {
      state.widthType = data;
    },
    login: (state, data) => {
      state.isLogin = data;
    },
    isEnt: (state, data) => {
      state.isEnt = data;
    },
    isSuper: (state, data) => {
      state.isSuper = data;
    },
    hasOpenAccount: (state, data) => {
      state.hasOpenAccount = data;
    },
    conpanyInfo: (state, data) => {
      state.conpanyInfo = data;
    },
    baseInfo: (state, data) => {
      state.baseInfo = data;
    },
    setPath: (state, data) => {
      state.thisPath = data;
    },
    setToken: (state, data) => {
      state.token = data;
    },
    signOut: (state) => {
      state.isLogin = false;
      state.isEnt = false;
      state.isSuper = false;
      state.conpanyInfo = {};
      state.baseInfo = {};
      state.token = '';
      localStorage.removeItem('rongyitie_token');
      localStorage.removeItem('rongyitie_isLogin');
      localStorage.removeItem('rongyitie_userInfo');
      localStorage.clear();
      cookie.del('rongyitie_token');
    },
  },
  actions: {},
});
