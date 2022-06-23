// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
export default {
  namespaced: true,
  actions: {
    // 获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone)
      if (result.code == 200) {
        commit("GETCODE", result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户登录【token】
    async userLogin({ commit }, data) {
      let result = await reqUserLogin(data)
      if (result.code == 200) {
        // 用户已经登录成功且获取到 token
        commit('USERLOGIN', result.data.token)
        // 持久化存储 token
        setToken(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      let result = await reqUserInfo()
      if (result.code == 200) {
        commit('GETUSERINFO', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录
    async userLogout({ commit }) {
      // 只是向服务器发起一次请求，通知服务器清除 token
      let result = await reqLogout();
      // action 里面不能操作 state，提交 mutations 修改 state
      if (result.code == 200) {
        commit("CLEAR")
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code
    },
    USERLOGIN(state, token) {
      state.token = token
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR(state) {
      // 把仓库中相关的用户信息清空
      state.token = '',
      state.userInfo = {}
      // 本地存储数据清空
      removeToken()
    }
  },
  state: {
    code: '',
    token: getToken(),
    userInfo: {}
  },
  getters: {

  }
}