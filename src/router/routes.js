/* 
路由懒加载
  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
  如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
  示例
  //将  import Home from './pages/Home'
  // 替换成
  const Home = () => import('./pages/Home')

  const router = createRouter({
    // ...
    routes: [{ path: '/home', component: Home }],
  })
*/
export default [
  // 路由重定向
  {
    path: '/',
    redirect: '/home',
    meta: { show: true }
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'), // 路由懒加载
    meta: { show: true }
  },
  {
    // path: '/search/:keyword?', // 给字符串类型的 params 参数指定占位符(?的作用：表示 params 参数可传可不传)
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/pages/Search'),
    meta: { show: true },
    // 布尔值写法：params(只能接收 params 参数)
    // props:true
    // 对象写法：额外的给路由组件传递一些 props
    // props:{a:1,b:2}
    // 函数写法：可以 params参数、query参数，通过 props 传递给路由组件
    props: ($route) => {
      return { keyword: $route.params.keyword }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    name:'register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true }
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车来
      if(from.path == '/shopCart') next()
      // 其他的路由组件而来停留在当前
      else next(false)
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if(from.path == '/trade') next()
      else next(false)
    }
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true }
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    // 二级路由组件
    children: [
      // 子路由路由重定向
      {
        path: '/center',
        redirect: 'myOrder'
      },
      {
        path: 'myOrder',
        component: () => import('@/pages/Center/myOrder')
      },
      {
        path: 'groupOrder',
        component: () => import('@/pages/Center/groupOrder')
      }
    ]
  }
]

