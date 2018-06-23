<template>
  <div id="home">
    <van-tabs v-model="active" sticky>
      <van-tab v-for="index in 5" :title="tabTitles[index-1] === 'all'? 'All' : tabTitles[index-1]" :key="index">
        <HomeList :tabIndex="active" :tabTitle="tabTitles[active]"/>
    </van-tab>
  </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeList from '../components/HomeList.vue';

@Component({
  components: {
    HomeList,
  },
})
export default class Home extends Vue {
  private active: number = 0;
  private readonly tabTitles: string[] = ['all', '前端', 'IOS', 'Android', '拓展资源'];
}
</script>
