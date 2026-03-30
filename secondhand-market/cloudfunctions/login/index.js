// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext

  try {
    // 查找用户
    let user = await db.collection('users').doc(OPENID).get()

    if (!user.data) {
      // 创建新用户
      const now = new Date().toISOString()
      const userData = {
        _id: OPENID,
        _openid: OPENID,
        nickName: event.nickName || '用户',
        avatarUrl: event.avatarUrl || '',
        gender: event.gender || 0,
        phone: '',
        realName: '',
        idCard: '',
        creditScore: 100,
        totalSold: 0,
        totalBought: 0,
        createdAt: now,
        updatedAt: now
      }

      await db.collection('users').add({
        data: userData
      })

      user = { data: userData }
    } else {
      // 更新用户信息
      const updateData = {}
      if (event.nickName) updateData.nickName = event.nickName
      if (event.avatarUrl) updateData.avatarUrl = event.avatarUrl
      if (event.gender) updateData.gender = event.gender
      updateData.updatedAt = new Date().toISOString()

      await db.collection('users').doc(OPENID).update({
        data: updateData
      })
    }

    return {
      success: true,
      data: {
        openid: OPENID,
        appid: wxContext.APPID,
        userInfo: user.data
      }
    }
  } catch (err) {
    console.error('Login error:', err)
    return {
      success: false,
      error: err.message
    }
  }
}
