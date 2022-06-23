import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块 uuid--> 生成一个随机的字符串（不能变）
import { getUUID } from '@/utils/uuid_token'
export default {
  namespaced: true,
  actions: {
    // 获取产品信息的 action
    async getGoodsInfo({ commit }, skuId) {
      let result = await reqGoodsInfo(skuId)
      if (result.code == 200) {
        commit('GETGOODINFO', result.data)
      }
    },
    // 加入购物车的 action
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      // 加入购物车返回的结果
      // 加入购物车以后（发请求），前台将参数带给服务器
      // 服务器写入数据成功之后，并没有返回其他的数据，只是返回 code = 200，代表请求成功
      // 因为服务器没有返回其余的数据，因此不需要三连环存储数据
      let result = await reqAddOrUpdateShopCart(skuId, skuNum)
      // 代表服务器加入购物车成功
      if (result.code == 200) {
        return 'ok'
      } else {
        // 代表加入购物车失败
        return Promise.reject(new Error('faile'))
      }
    }
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  state: {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
  },
  // 简化数据
  getters: {
    // 路径导航简化的数据
    categoryView(state) {
      // 比如：state.goodInfo 初始值是一个空对象，空对象没有categoryView属性，返回的就是undefined
      // 当前计算出来的 categoryView 属性值至少是一个空对象，假的报错就不会有了
      return state.goodInfo.categoryView || {}
    },
    // 产品信息的简化的数据
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}