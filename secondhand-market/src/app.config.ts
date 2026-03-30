export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/publish/index',
    'pages/detail/index',
    'pages/chat/index',
    'pages/order-list/index',
    'pages/user/index',
    'pages/search/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '二手市场',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1989fa',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/publish/index',
        text: '发布',
        iconPath: 'assets/icons/publish.png',
        selectedIconPath: 'assets/icons/publish-active.png'
      },
      {
        pagePath: 'pages/chat/index',
        text: '消息',
        iconPath: 'assets/icons/chat.png',
        selectedIconPath: 'assets/icons/chat-active.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/icons/user.png',
        selectedIconPath: 'assets/icons/user-active.png'
      }
    ]
  }
})
