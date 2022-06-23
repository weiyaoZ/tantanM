// 存储 token
export const setToken = (token) => localStorage.setItem('TOKEN', token)

// 读取 token
export const getToken = () => localStorage.getItem('TOKEN')

// 删除 token
export const removeToken = () => localStorage.removeItem('TOKEN')
