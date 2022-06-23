import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
export default {
  namespaced: true,
  actions: {
    // 获取购物车列表数据
    async getCartList({ commit }) {
      let result = await reqCartList()
      if (result.code === 200) {
        commit('GETCARTLIST', result.data)
      }
    },
    // 删除购物车的某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId);
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 修改购物车某一产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedById(skuId, isChecked)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除全部勾选的产品
    // context：可以理解为小仓库
    async deleteAllCheckedCart({ dispatch, getters }) {
      // 获取购物车中全部的商品（数组）
      let PromiseAll = []
      getters.carList.cartInfoList.forEach(item => {
        let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
        // 将每一次返回的 Promise 添加到数组中
        PromiseAll.push(promise)
      });
      return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    async updateAllCartChecked({ dispatch, getters }, isChecked) {
      let PromiseAll = []
      getters.carList.cartInfoList.forEach(item => {
        let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }
  },
  mutations: {
    GETCARTLIST(state, carList) {
      state.carList = carList
    }
  },
  state: {
    // 初始值为数组
    carList: []
  },
  getters: {
    // 先获取到数据当前上一级的对象
    carList(state) {
      return state.carList[0] || {}
    },
  }
}