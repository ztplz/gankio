import {  MutationTree, ActionTree } from 'vuex';
import { GirlsItem, GirlsData, State } from '../types/girls';
import { getData } from '../api/api';

const state: State = {
  isLoading: false,
  isLoadingMore: false,
  hasError: false,
  pageIndex: 1,
  data: [],
};

const actions: ActionTree<State, any> = {
  async getGirlsData({ commit }): Promise<void> {
    commit('getData');
    try {
      const res = await getData('http://gank.io/api/data/福利', 10, 1);
      if (res.status === 200 && res.data.results.length !== 0) {
        commit('getDataSuccess', res.data.results);
      }
    } catch (error) {
      commit('getDataFailure');
    }
  },
  async getMoreGirlsData({ commit }): Promise<void> {
    try {
      const res = await getData('http://gank.io/api/data/福利', 10, state.pageIndex);
      if (res.status === 200 && res.data.results.length !== 0) {
        commit('getMoreDataSuccess', res.data.results);
      }
    } catch (error) {
      commit('getMoreDataFailure');
    }
  },
};

const mutations: MutationTree<State> = {
  getData(state: State): void {
    state.isLoading = true;
    state.pageIndex = 1;
    state.hasError =  false;
  },
  getDataSuccess(state: State, res: GirlsItem[]): void {
    state.isLoading = false;
    state.hasError = false;
    state.pageIndex++;
    state.data = res;
  },
  getDataFailure(state: State): void {
    state.isLoading = false;
    state.hasError = true;
  },
  getMoreData(state: State): void {
    state.isLoadingMore = true;
    state.hasError =  false;
  },
  getMoreDataSuccess(state: State, res: GirlsItem[]): void {
    state.isLoadingMore = false;
    state.hasError = false;
    state.pageIndex++;
    state.data = (state.data as GirlsData['results']).concat(res);
  },
  getMoreDataFailure(state: State): void {
    state.isLoading = false;
    state.pageIndex--;
    state.hasError = true;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
