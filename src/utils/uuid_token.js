// 引入并重命名
import { v4 as uuidv4 } from 'uuid'
// 生成一个随机的字符串，且每次执行不能发生变化，游客身份要持久存储
export const getUUID = () => {
  // 先从本地存储获取 uuid（看一下本地存储里面是否有）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    // 如果没有就生成
    uuid_token = uuidv4()
    // 本地存储存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}