// vue 插件一定暴露一个对象
let myPlugins = {}

// 第一个参数：为 vue 函数
// 第二个参数：用户传入进来的配置项
myPlugins.install = function(Vue,options) {
  // Vue.prototype
  // Vue.directive
  // Vue.component
  Vue.directive(options.name,(element,params) => {
    element.innerHTML = params.value.toUpperCase();
  })
}
export default myPlugins