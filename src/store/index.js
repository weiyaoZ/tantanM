import Vue from "vue"
import Vuex from "vuex"

// 使用 Vuex 插件
Vue.use(Vuex)

// 引入小仓库
import home from "./home"
import search from "./search"
import detail from "./detail"
import shopCart from "./shopCart"
import user from "./user"
import trade from "./trade"
// 对外暴露 Store 类的一个实例
export default new Vuex.Store({
  // 实现 Vuex 仓库模块式开发存储数据
  modules:{
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})
