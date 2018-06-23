import Vue from 'vue';
import Vuex from 'vuex';
import Home from './store/home';
import Girls from './store/girls';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Home,
    Girls,
  },
});
