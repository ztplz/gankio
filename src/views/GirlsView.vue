<template>
  <div id="home">
    <div v-if="isLoading" class="loading-view">
      <van-loading type="spinner" color="black" />
      <span>正在加载...</span>
    </div>
    
    <!-- <div class="img-container"> -->
      <div v-else-if="!isLoading && data.length !== 0" class="img-container">
        <van-list 
        :loading = "isLoadingMore"
        @load="onLoad">
        <!-- <van-cell v-for="item in data" :key="item._id"> -->
          <img v-for="(item, index) in data" v-lazy="item.url" :key="index" />
        <!-- </van-cell> -->
      </van-list>
      </div>
      <div v-else></div>
      
      <!-- <ul
        v-waterfall-upper="loadMore"
        waterfall-offset="400"
      >
        <li v-for="item in data" :key="item._id">
          <img v-lazy="item.url" class="img-style"> -->
          <!-- <img :src="item.url" > -->
          <!-- <div  v-waterfall-lower="loadMore"
        waterfall-offset="400">
            <img v-for="item in data" v-lazy="item.url" :key="item._id" >
          </div> -->
          
        <!-- </li> 
      </ul> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  State,
  Action,
  namespace,
} from 'vuex-class';
import { GirlsItem } from '../types/girls';
import { Waterfall, Lazyload } from 'vant';
import { debounce } from 'lodash';

const Girls = namespace('Girls');
Vue.use(Lazyload);

@Component({
  directives: {
    WaterfallUpper: Waterfall('upper'),
  },
})
export default class GirlsView extends Vue {
  private currentTime!: number;
  private onLoad!: () => void;
  @Girls.State('isLoading') private isLoading!: boolean;
  @Girls.State('isLoadingMore') private isLoadingMore!: boolean;
  @Girls.State('data') private data!: GirlsItem[];
  @Girls.Action('getGirlsData') private getGirlsData!: () => void;
  @Girls.Action('getMoreGirlsData') private getMoreGirlsData!: () => void;

  private created(): void {
    this.onLoad = debounce(
      () => this.getMoreGirlsData(),
      500,
      {
        leading: true,
        trailing: false,
      },
    );
  }

  private mounted(): void {
    this.getGirlsData();
  }
}
</script>

<style lang="scss" scoped>
  #home {
    display: flex;
    align-items: center;
    justify-content: center;


    .loading-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 120px;

      span {
        margin-top: 20px;
      }
    }

    .img-container {
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;

      img {
        width: 100%;
      }
    }

    .img-style {
      width: 100%;
    }
  }
</style>

