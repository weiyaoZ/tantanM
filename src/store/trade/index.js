import { reqAddressInfo, reqOrderInfo } from '@/api'
export default {
  namespaced: true,
  actions: {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo()
      if (result.code == 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },
    // 获取商品清单
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo()
      if (result.code == 200) {
        commit('GETORDERINFO', result.data)
      }
    }
  },
  mutations: {
    GETUSERADDRESS(state, addressInfo) {
      state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  state: {
    addressInfo: [],
    orderInfo: {}
  },
  getters: {

  }
}