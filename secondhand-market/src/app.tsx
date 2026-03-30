import { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import './app.scss'

function App({ children }) {
  useEffect(() => {
    console.log('App mounted')
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
