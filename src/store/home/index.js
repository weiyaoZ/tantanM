// home 模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
export default {
  namespaced: true, // 开启命名空间
  // action：处理 action，可以书写自己的业务逻辑，也可以处理异步
  actions: {
    // 通过 api 的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategoryList({ commit }) {
      let result = await reqCategoryList()
      if (result.code == 200) {
        commit('GETCATEGORYLIST', result.data)
      }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
      let result = await reqGetBannerList()
      if (result.code == 200) {
        commit('GETBANNERLIST', result.data)
      }
    },
    // 获取 floor 的数据
    async getFloorList({ commit }) {
      let result = await reqGetFloorList()
      if (result.code == 200) {
        commit('GETFLOORLIST', result.data)
      }
    }
  },

  // mutations：修改仓库 state 的唯一手段
  mutations: {
    GETCATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList
    },
  },

  // state：仓库存储数据的地方
  state: {
    // state 中数据的默认初始值别乱写，服务器返回对象，服务器返回数组。【根据接口的返回值初始化数据】
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor 组件的数据
    floorList: []
  },

  // getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
  getters: {}
}