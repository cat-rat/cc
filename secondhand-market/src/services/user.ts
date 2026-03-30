import Taro from '@tarojs/taro'

/**
 * 微信登录并获取用户信息
 */
export async function login(userInfo?: {
  nickName?: string
  avatarUrl?: string
  gender?: number
}) {
  try {
    // 微信登录
    const { code } = await Taro.login()

    // 调用云函数
    const result = await Taro.cloud.callFunction({
      name: 'login',
      data: userInfo || {}
    })

    if (result.result?.success) {
      return result.result.data
    } else {
      throw new Error(result.result?.error || '登录失败')
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * 获取用户信息
 */
export async function getUserInfo(openid: string) {
  try {
    const res = await Taro.cloud.callFunction({
      name: 'getUserInfo',
      data: { openid }
    })
    return res.result
  } catch (error) {
    console.error('Get user info error:', error)
    throw error
  }
}

/**
 * 更新用户信息
 */
export async function updateUserInfo(data: Record<string, any>) {
  try {
    const res = await Taro.cloud.callFunction({
      name: 'updateUserInfo',
      data
    })
    return res.result
  } catch (error) {
    console.error('Update user info error:', error)
    throw error
  }
}
