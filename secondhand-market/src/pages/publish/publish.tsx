import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './publish.scss'

export default function Publish() {
  return (
    <View className="publish-page">
      <View className="placeholder">
        <Text>发布页面</Text>
        <Button onClick={() => Taro.chooseImage({ count: 9 })}>
          选择图片
        </Button>
      </View>
    </View>
  )
}
