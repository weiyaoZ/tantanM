// 当前这个模块：API进行统一管理
import request from './request'
import mockRequest from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'GET' }) // 函数写法

// 获取 banner（首页轮播图接口）
export const reqGetBannerList = () => mockRequest.get('/banner') // 对象写法

// 获取 floor 组件的数据
export const reqGetFloorList = () => mockRequest({ url: '/floor', method: 'GET' })// 函数写法

// 获取 search 模块的数据 地址：/api/list 请求方式：POST
// 当前这个接口（获取 search 模块的数据），给服务器传递一个参数 reqData【 reqData 的默认值是一个空对象】
export const reqGetSearchInfo = (reqData) => request({ url: '/list', method: 'POST', data: reqData })

// 获取产品详情信息的接口 URL：/api/item/{skuId} 请求的方式：GET
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'GET' })

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })

// 获取购物车列表数据接口
export const reqCartList = () => request({ url: '/cart/cartList', method: 'GET' })

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 修改商品选中的状态
export const reqUpdateCheckedById = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

// 获取验证码
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 用户注册
export const reqUserRegister = (data) => request({ url: '/user/passport/register', data, method: 'POST' })

// 用户登录
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'POST' })

// 获取用户信息【带用户 token 向服务器请求用户信息】
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

// 退出登录
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'GET' })

// 获取用户地址信息
export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

// 获取商品清单
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'GET' })

// 提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => request({ url: `order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'POST', data })

// 获取支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

// 获取支付订单状态
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

// 获取个人中心得到数据
export const reqMyOrderList = (page,limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'GET' })