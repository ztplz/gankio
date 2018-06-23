<template>
  <div id="home-list">
    <div v-if="state[tabIndex].isLoading" class="loading-view">
      <van-loading type="spinner" color="black" />
      <span>正在加载...</span>
    </div>
    <div v-else-if="state[tabIndex].isLoading === false && state[tabIndex].data.length !== 0">
      <van-pull-refresh v-model="state[tabIndex].isRefreshing" @refresh="onRefresh">
        <van-list
        :loading="state[tabIndex].isLoadingMore"
        :offset="50"
        @load="onLoad"
        :immediate-check="true"
       >
        <div class="item-container" 
          v-for="(item, index) in state[tabIndex].data" 
          v-if="item.type !== '福利'" 
          @click="itemClick(item.url)"
          :key="item._id + index">
          <div class="item-desc">
            {{item.desc}}
          </div>
          <div class="item-footer">
            <span>{{time2String(item.createdAt, item.who)}}</span>
            <div>
              <van-tag type="primary">{{item.type}}</van-tag>
            </div>
          </div>
          <div class="item-dividline"></div>
        </div>
        <!-- <van-cell v-for="item in state[tabIndex].data" :key="item._id" :title="item.desc" /> -->
      </van-list>
      </van-pull-refresh>
       
    </div>
    <div v-else>
      test
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State,
  Action,
  namespace,
} from 'vuex-class';
import { debounce } from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-cn';

const Home = namespace('Home');

@Component
export default class HomeList extends Vue {
  private onLoad!: () => void;
  @Prop() private readonly tabIndex!: number; 
  @Prop() private readonly tabTitle!: string;
  @Home.State((state) => state) private state!: any;
  @Home.Action('getHomeData') private getHomeData!: (
    {tabIndex, tabTitle}: { tabIndex: number, tabTitle: string},
  ) => void;
  @Home.Action('refreshHomeData') private refreshHomeData!: (
    {tabIndex, tabTitle}: { tabIndex: number, tabTitle: string},
  ) => void;
  @Home.Action('getMoreHomeData') private getMoreHomeData!: (
    {tabIndex, tabTitle}: { tabIndex: number, tabTitle: string},
  ) => void;

  private time2String(time: Date, author: string): string {
    return `${moment(time).format('ll')} • ${author}`;
  }

  private onRefresh(): void {
    this.refreshHomeData({
      tabIndex: this.tabIndex, 
      tabTitle: this.tabTitle === 'IOS' ? 'iOS' : this.tabTitle, 
    });
  }

  private itemClick(url: string): void {
    window.location.href = url;
  }

  private created(): void {
    this.onLoad = debounce(
      () => this.getMoreHomeData({ 
        tabIndex: this.tabIndex,
        tabTitle: this.tabTitle === 'IOS' ? 'iOS' : this.tabTitle, 
      }),
      500, {
        leading: true,
        trailing: false,
      },
    );
  }

  private mounted() {
    this.getHomeData({
      tabIndex: this.tabIndex,
      tabTitle: this.tabTitle === 'IOS' ? 'iOS' : this.tabTitle,
    });
  }
}
</script>

<style lang="scss" scoped>
#home-list {
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 80px;

      span {
        margin-top: 20px;
      }
    }

  .item-container {
    display: flex;
    flex-direction: column;
    padding: 10px 12px 8px 12px;
    
    .item-desc {
      // margin-top: 10px;
      font-size: 16px;
      text-align:left;
      font-weight: 500;
    }

    .item-footer {
      margin-top: 8px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        font-size: 14px;
      }
    }

    .item-dividline {
      margin-top: 8px;
      height: 1px;
      background: #4d4343;
    }
  }
}

</style>
