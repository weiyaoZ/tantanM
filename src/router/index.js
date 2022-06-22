// 配置路由的地方
import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
// 使用插件
Vue.use(VueRouter)
// 引入 store
import store from "@/store"
// 先把 VuePouter 原型对象的 push，先保存一份
let originPush = VueRouter.prototype.push
// 先把 VuePouter 原型对象的 replace，先保存一份
let originReplace = VueRouter.prototype.replace

// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call || apply 的区别
    // 相同点：都可以调用函数一次，都可篡改函数的上下文一次
    // 不同点：call 与 apply 传递参数：call 传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // call || apply 的区别
    // 相同点：都可以调用函数一次，都可篡改函数的上下文一次
    // 不同点：call 与 apply 传递参数：call 传递参数用逗号隔开，apply方法执行，传递数组
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
// 配置路由
const router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为【让路由跳转的时候，始终让滚动条回到顶部的位置】
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to：可以获取到你要跳转到哪个路由信息
  // from：可以获取到你从哪个路由而来的信息
  // next：放行的函数  next()直接放行  next(path)放行到指定路由  next(false) 
  // next()
  // 用户登录了，才会有 token，未登录一定不会有 token
  let token = store.state.user.token
  // 获取用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户登录了，还想去 login【不能去，使其停留在首页】
    if (to.path == '/login') {
      next('/')
    } else {
      // 登录了，但是去的不是 login
      if (name) {
        // 有用户信息，直接放行
        next()
      } else {
        // 没有用户信息，派发 action 让仓库存储用户信息再跳转
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // token 失效了，清除 token，重新登录
          await store.dispatch('user/userLogout')
          next('/home')
        }
      }
    }
  } else {
    // 未登录，不能去交易组件、不能去支付组件、不能去个人中心
    // 当要去这些组件时，让其跳转到登录组件，如果不是去这些组件，直接放行
    let toPath = to.path
    if (toPath.includes('/trade') || toPath.includes('/pay') || toPath.includes('/center')) {
      // 在跳转 login 组件时，给其添加一个 query 参数，在登录完毕后，对其参数中的路径进行跳转
      next('/login?toPath=' + toPath)
    } else {
      next()
    }
  }
})

export default router