import { reqGetSearchInfo } from '@/api'
// search 模块的小仓库
export default {
  namespaced: true,
  // action：处理 action，可以书写自己的业务逻辑，也可以处理异步
  actions: {
    // 获取 search 模块数据
    async getSearchList({ commit }, data = {}) {
      // 当前这个 reqGetSearchInfo 这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
      let result = await reqGetSearchInfo(data)
      if (result.code == 200) {
        commit('GETSEARCHLIST', result.data)
      }
    }
  },
  // mutations：修改仓库 state 的唯一手段
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList
    }
  },
  // state：仓库存储数据的地方
  state: {
    searchList: {}
  },
  // getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
  // 可以把我们将来在组件中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
  getters: {
    goodsList(state) {
      return state.searchList.goodsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList || []
    },
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    total(state) {
      return state.searchList.total
    }
  },
  
}