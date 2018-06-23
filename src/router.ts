import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import GirlsView from './views/GirlsView.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // children: [
      //   {
      //     path: "/home",
      //     name: 'Home',
      //     component: Home,
      //   },
      //   {
      //     path: "/girlsView",
      //     name: 'girlsView',
      //     component: GirlsView,
      //   },
      //   {
      //     path: "/about",
      //     name: 'About',
      //     component: About,
      //   },
      // ]
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    // },
    {
      path: '/girlsView',
      name: 'girlsView',
      component: GirlsView,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
