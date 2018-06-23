<template>
  <div id="app">
    <van-nav-bar v-if="active !== 0" :title="tabNames[active]" :style="appHeaderStyle" fixed></van-nav-bar>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" url="#/">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" url="#/girlsView">福利</van-tabbar-item>
      <van-tabbar-item icon="info-o" url="#/about">关于</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './views/Home.vue';
import GirlsView from './views/GirlsView.vue';
import About from './views/About.vue';

@Component({
  components: {
    Home,
    GirlsView,
    About,
  },
})
export default class App extends Vue {
  private readonly appHeaderStyle: object = {
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#2da3e7',
    fontSize: '24px',
    color: '#ffffff',
  };
  private active: number = 0;
  private tabNames: string[] = ['首页', '福利', '关于'];

  private created(): void {
    if (this.$route.path === '/girlsView') {
      this.active = 1;
    } else if (this.$route.path === '/about') {
      this.active = 2;
    } else {
      this.active = 0;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app-header {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  background: #2da3e7,
}
</style>
