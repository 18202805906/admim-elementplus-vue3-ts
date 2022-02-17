import { createStore } from 'vuex';

import user from './modules/user';
import config from '@/config';

const state = {
  theme: '',
  themeColor: '',
};
type TState = typeof state;
export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      theme: config.theme,
      themeColor: config.themeColor
    };
  },
  mutations: {
    SET_THEMECOLOR: (state: TState, themeColor: string):void => {
      state.themeColor = themeColor;
    }
  },
  actions: {
    setThemeColor:({commit}, themeColor):void=> {
      commit('SET_THEMECOLOR', themeColor);
    }
  },
  modules: {
    user
  }
});
