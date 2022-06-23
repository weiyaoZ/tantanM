import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'

// 全局组件：第一个参数（组件名字）第二个参数（哪一个组件）
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册为全局组件
Vue.component(Button.name, Button)
// ElmentUI注册组件的时候，还有一种写法，挂载到原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入 MockServer.js --- mock数据
import '@/mock/mockServe'
// 引入 swiper 样式
import 'swiper/css/swiper.css'
// 引入所有的接口，统一接口 api 文件夹里面的全部请求函数【API为一个对象】
import * as API from '@/api'
// 引入插件【图片懒加载】
import VueLazyLoad from 'vue-lazyload'
// 注册插件
// 引入默认的图片
import lazyLoad from '@/assets/images/lazyLoad.webp'
Vue.use(VueLazyLoad,{
  // 懒加载的默认图
  loading: lazyLoad
})
// 引入表单校验插件
import '@/plugins/validate'

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {name:'upper'})

Vue.config.productionTip = false // 关闭生产提示

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  // 注册路由信息:当这里书写 router 的时候,组件身上都拥有 $route 和 $router 属性
  router,
  // 注册仓库：组件实例的身上会多一个属性($store) 
  store
}).$mount('#app')
