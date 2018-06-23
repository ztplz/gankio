import { MutationTree, ActionTree } from 'vuex';
import { DataItem, State } from '../types/home';
import { getData } from '../api/api';

const state: State[] = [
  {
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    hasError: false,
    pageIndex: 1,
    data: [],
  },
  {
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    hasError: false,
    pageIndex: 1,
    data: [],
  },
  {
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    hasError: false,
    pageIndex: 1,
    data: [],
  },
  {
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    hasError: false,
    pageIndex: 1,
    data: [],
  },
  {
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    hasError: false,
    pageIndex: 1,
    data: [],
  },
];

const actions: ActionTree<string[], any> = {
  async getHomeData(
    { commit },
    {tabIndex, tabTitle}: {tabIndex: number, tabTitle: string},
  ): Promise<void> {
    commit('getData', tabIndex);
    try {
      const url = `http://gank.io/api/data/${tabTitle}`;
      const res = await getData(url, 10, 1);
      if (res.status === 200 && res.data.results.length !== 0) {
          commit('getDataSuccess', {tabIndex, res: res.data.results});
      }
    } catch (error) {
      commit('getDataFailure', tabIndex);
    }
  },
  async refreshHomeData(
    { commit },
    {tabIndex, tabTitle}: {tabIndex: number, tabTitle: string},
  ): Promise<void> {
    commit('refreshData', tabIndex);

    try {
      const url = `http://gank.io/api/data/${tabTitle}`;
      const res = await getData(url, 10, 1);
      if (res.status === 200 && res.data.results.length !== 0) {
        commit('refreshDataSuccess', {tabIndex, res: res.data.results});
      }
    } catch (error) {
      commit('refreshDataFailure', tabIndex);
    }
  },
  async getMoreHomeData(
    { commit },
    {tabIndex, tabTitle, pageIndex}: {tabIndex: number, tabTitle: string, pageIndex: number},
  ): Promise<void> {
    commit('getMoreData', tabIndex);

    try {
      const url = `http://gank.io/api/data/${tabTitle}`;
      const res = await getData(url, 10, state[tabIndex].pageIndex);
      if (res.status === 200 && res.data.results.length !== 0) {
        commit('getMoreDataSuccess', {tabIndex, res: res.data.results});
      }
    } catch (error) {
      commit('getMoreDataFailure', tabIndex);
    }
  },
};

const mutations: MutationTree<State[]> = {
  getData(state: State[], tabIndex): void {
    state[tabIndex].isLoading = true;
    state[tabIndex].hasError = false;
    state[tabIndex].pageIndex = 1;
  },
  getDataSuccess(state: State[], {tabIndex, res}: {tabIndex: number, res: DataItem[]}): void {
    state[tabIndex].isLoading = false;
    state[tabIndex].hasError = false;
    state[tabIndex].pageIndex++;
    state[tabIndex].data = res;
  },
  getDataFailure(state: State[], tabIndex: number): void {
    state[tabIndex].isLoading = false;
    state[tabIndex].hasError = true;
  },
  refreshData(state: State[], tabIndex): void {
    state[tabIndex].isRefreshing = true;
    state[tabIndex].hasError = false;
    state[tabIndex].pageIndex = 1;
  },
  refreshDataSuccess(state: State[], {tabIndex, res}: {tabIndex: number, res: DataItem[]}): void {
    state[tabIndex].isRefreshing = false;
    state[tabIndex].hasError = false;
    state[tabIndex].pageIndex++;
    state[tabIndex].data = res;
  },
  refreshDataFailure(state: State[], tabIndex: number): void {
    state[tabIndex].isRefreshing = false;
    state[tabIndex].hasError = true;
  },
  getMoreData(state: State[], tabIndex: number): void {
    state[tabIndex].isLoadingMore = true;
    state[tabIndex].hasError =  false;
  },
  getMoreDataSuccess(state: State[], {tabIndex, res}: {tabIndex: number, res: DataItem[]}): void {
    state[tabIndex].isLoadingMore = false;
    state[tabIndex].hasError = false;
    state[tabIndex].pageIndex++;
    state[tabIndex].data = (state[tabIndex].data as DataItem[]).concat(res);
  },
  getMoreDataFailure(state: State[], tabIndex: number): void {
    state[tabIndex].isLoading = false;
    state[tabIndex].hasError = true;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
