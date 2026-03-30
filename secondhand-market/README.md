# 二手物品交易小程序

基于 Taro + React + 微信云开发的跨平台二手交易平台。

## 技术栈

- **前端框架**: Taro 3 + React
- **UI 组件**: NutUI (计划)
- **状态管理**: Redux Toolkit / Zustand (计划)
- **后端服务**: 微信云开发

## 项目结构

```
secondhand-market/
├── cloudfunctions/          # 云函数目录
├── src/
│   ├── pages/              # 页面
│   │   ├── index/          # 首页
│   │   ├── publish/        # 发布页
│   │   ├── detail/         # 详情页
│   │   ├── chat/           # 聊天
│   │   ├── order-list/     # 订单列表
│   │   ├── user/           # 个人中心
│   │   └── search/         # 搜索
│   ├── components/         # 通用组件
│   ├── services/           # API 服务
│   ├── store/              # 状态管理
│   ├── utils/              # 工具函数
│   ├── assets/             # 静态资源
│   └── styles/             # 全局样式
├── config/                 # 配置文件
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 微信小程序
npm run dev:weapp

# H5
npm run dev:h5

# 支付宝小程序
npm run dev:alipay
```

### 构建

```bash
# 微信小程序
npm run build:weapp

# H5
npm run build:h5

# 支付宝小程序
npm run build:alipay
```

## 开发计划

详见 [plan.md](../plan.md)

## License

MIT
