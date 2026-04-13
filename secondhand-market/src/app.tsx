import { useEffect } from 'react'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import './app.scss'

function App({ children }) {
  useEffect(() => {
    console.log('App mounted')

    // 初始化云开发环境
    Taro.cloud.init({
      env: 'develop', // 云环境 ID，可配置多个
      traceUser: true // 访问用户身份
    })

    console.log('Cloud init done')
  }, [])

  useDidShow(() => {
    console.log('App show')
  })

  useDidHide(() => {
    console.log('App hide')
  })

  return children
}

export default App
