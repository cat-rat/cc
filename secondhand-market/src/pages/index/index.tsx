import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

// 分类数据
const categories = [
  { id: 1, name: '手机', icon: '/assets/icons/phone.png' },
  { id: 2, name: '电脑', icon: '/assets/icons/computer.png' },
  { id: 3, name: '家具', icon: '/assets/icons/furniture.png' },
  { id: 4, name: '服饰', icon: '/assets/icons/clothes.png' },
  { id: 5, name: '美妆', icon: '/assets/icons/beauty.png' },
  { id: 6, name: '书籍', icon: '/assets/icons/book.png' },
  { id: 7, name: '母婴', icon: '/assets/icons/baby.png' },
  { id: 8, name: '其他', icon: '/assets/icons/other.png' }
]

// 模拟商品数据
const mockProducts = [
  {
    id: 1,
    title: 'iPhone 13 Pro 256G 远峰蓝',
    price: 5800,
    originalPrice: 8799,
    image: '/assets/placeholder.png',
    location: '南山区',
    condition: '99 新'
  },
  {
    id: 2,
    title: 'MacBook Pro 2021 M1 Pro',
    price: 9500,
    originalPrice: 14999,
    image: '/assets/placeholder.png',
    location: '福田区',
    condition: '9 成新'
  },
  {
    id: 3,
    title: '宜家沙发 三人位',
    price: 800,
    originalPrice: 2999,
    image: '/assets/placeholder.png',
    location: '宝安区',
    condition: '8 成新'
  },
  {
    id: 4,
    title: 'Sony WH-1000XM4 耳机',
    price: 1200,
    originalPrice: 2499,
    image: '/assets/placeholder.png',
    location: '南山区',
    condition: '99 新'
  }
]

export default function Index() {
  const handleSearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' })
  }

  const handleCategory = (item) => {
    console.log('点击分类:', item.name)
    Taro.navigateTo({ url: `/pages/search/index?category=${item.id}` })
  }

  const handleProduct = (product) => {
    console.log('点击商品:', product.title)
    Taro.navigateTo({ url: `/pages/detail/index?id=${product.id}` })
  }

  return (
    <View className="index-page">
      {/* 搜索栏 */}
      <View className="search-bar" onClick={handleSearch}>
        <View className="search-input">
          <Text className="search-placeholder">搜索二手好物</Text>
        </View>
      </View>

      {/* 轮播图占位 */}
      <View className="banner">
        <View className="banner-placeholder">
          <Text>轮播图区域</Text>
        </View>
      </View>

      {/* 分类导航 */}
      <View className="category-section">
        <ScrollView scrollX className="category-scroll">
          <View className="category-grid">
            {categories.map((item) => (
              <View
                key={item.id}
                className="category-item"
                onClick={() => handleCategory(item)}
              >
                <View className="category-icon" />
                <Text className="category-name">{item.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 商品列表 */}
      <View className="product-section">
        <View className="section-header">
          <Text className="section-title">推荐商品</Text>
        </View>
        <View className="product-grid">
          {mockProducts.map((product) => (
            <View
              key={product.id}
              className="product-card"
              onClick={() => handleProduct(product)}
            >
              <View className="product-image" />
              <View className="product-info">
                <Text className="product-title" numberOfLines={2}>
                  {product.title}
                </Text>
                <View className="product-price-row">
                  <Text className="product-price">¥{(product.price / 100).toFixed(0)}</Text>
                  <Text className="product-original-price">
                    ¥{(product.originalPrice / 100).toFixed(0)}
                  </Text>
                </View>
                <View className="product-meta">
                  <Text className="product-condition">{product.condition}</Text>
                  <Text className="product-location">{product.location}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
