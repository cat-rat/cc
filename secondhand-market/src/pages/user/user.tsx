import { useEffect } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useUserStore } from '../../store/user'
import { login } from '../../services/user'
import './user.scss'

const menuItems = [
  { id: 1, title: '我的发布', path: '/pages/publish/list' },
  { id: 2, title: '我的订单', path: '/pages/order-list/index' },
  { id: 3, title: '我的收藏', path: '/pages/favorite/index' },
  { id: 4, title: '我的浏览', path: '/pages/history/index' },
  { id: 5, title: '联系客服', path: '' },
  { id: 6, title: '设置', path: '/pages/setting/index' }
]

export default function User() {
  const { userInfo, isLoggedIn, setUserInfo, clearUserInfo } = useUserStore()

  useEffect(() => {
    console.log('User page mounted, isLoggedIn:', isLoggedIn, userInfo)
  }, [])

  const handleLogin = async () => {
    try {
      // 获取用户信息
      const userProfile = await Taro.getUserProfile({
        desc: '用于完善用户资料'
      })

      const userInfo = userProfile.userInfo

      // 调用登录云函数
      const result = await login({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender
      })

      setUserInfo(result.userInfo)
      Taro.showToast({
        title: '登录成功',
        icon: 'success'
      })
    } catch (error: any) {
      if (error.errMsg.includes('auth deny')) {
        Taro.showToast({
          title: '已取消授权',
          icon: 'none'
        })
      } else {
        Taro.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    }
  }

  const handleMenuClick = (item: any) => {
    if (!isLoggedIn) {
      Taro.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    if (item.path) {
      Taro.navigateTo({ url: item.path })
    }
  }

  return (
    <View className="user-page">
      {/* 用户信息卡片 */}
      <View className="user-header">
        {isLoggedIn && userInfo ? (
          <View className="user-info">
            <Image
              className="user-avatar"
              src={userInfo.avatarUrl}
              mode="aspectFill"
            />
            <View className="user-details">
              <Text className="user-nickname">{userInfo.nickName}</Text>
              <View className="user-meta">
                <Text className="user-credit">信用分：{userInfo.creditScore}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="user-info" onClick={handleLogin}>
            <View className="user-avatar-placeholder">
              <Text className="icon">+</Text>
            </View>
            <View className="user-details">
              <Text className="user-nickname">点击登录</Text>
              <Text className="user-desc">登录后享受更多服务</Text>
            </View>
          </View>
        )}
      </View>

      {/* 数据统计 */}
      {isLoggedIn && (
        <View className="user-stats">
          <View className="stat-item">
            <Text className="stat-value">{userInfo?.totalSold || 0}</Text>
            <Text className="stat-label">已售出</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-value">{userInfo?.totalBought || 0}</Text>
            <Text className="stat-label">已买入</Text>
          </View>
        </View>
      )}

      {/* 菜单列表 */}
      <View className="user-menu">
        {menuItems.map((item) => (
          <View
            key={item.id}
            className="menu-item"
            onClick={() => handleMenuClick(item)}
          >
            <Text className="menu-title">{item.title}</Text>
            <Text className="menu-arrow">›</Text>
          </View>
        ))}
      </View>

      {/* 退出登录 */}
      {isLoggedIn && (
        <View className="logout-section">
          <Button
            className="logout-button"
            onClick={() => {
              clearUserInfo()
              Taro.showToast({
                title: '已退出登录',
                icon: 'none'
              })
            }}
          >
            退出登录
          </Button>
        </View>
      )}
    </View>
  )
}
