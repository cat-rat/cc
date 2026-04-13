# 二手物品交易小程序

基于 Taro 的多端二手物品交易平台，后端使用微信云开发实现免服务器、免运维的低成本架构。

## 技术栈

| 类别 | 技术 |
|------|------|
| **前端框架** | Taro 4.1.11 + React 18.3.1 |
| **编程语言** | TypeScript 5.7.2 |
| **状态管理** | Zustand 5.0.12 |
| **后端服务** | 微信云开发 |
| **构建工具** | Webpack 5 |
| **样式方案** | SCSS + PostCSS |
| **代码规范** | ESLint + Prettier + Stylelint |
| **Git 规范** | Husky + Commitizen |

## 项目结构

```
secondhand-market/
├── src/
│   ├── pages/              # 页面目录
│   │   ├── index/          # 首页
│   │   ├── publish/        # 发布商品
│   │   ├── detail/         # 商品详情
│   │   ├── chat/           # 聊天消息
│   │   ├── order-list/     # 订单列表
│   │   ├── user/           # 个人中心
│   │   └── search/         # 搜索
│   ├── services/           # API 服务层
│   ├── store/              # Zustand 状态管理
│   ├── utils/              # 工具函数
│   ├── app.tsx             # 应用入口
│   └── app.config.ts       # 应用配置
├── cloudfunctions/         # 微信云函数
│   └── login/              # 登录云函数
├── config/                 # Taro 构建配置
└── docs/                   # 文档目录
```

## 功能模块

| 页面 | 功能描述 |
|------|----------|
| **首页** | 搜索栏、轮播图、分类导航、商品推荐列表 |
| **发布页** | 发布二手商品，支持图片上传、价格设置 |
| **商品详情** | 商品信息展示、收藏、联系卖家 |
| **消息** | 聊天消息功能 |
| **订单列表** | 订单管理 |
| **个人中心** | 用户信息、登录、我的发布/订单/收藏 |
| **搜索** | 商品搜索与筛选 |

## 快速开始

### 环境要求

- Node.js >= 18
- 微信开发者工具

### 安装依赖

```bash
cd secondhand-market
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

### 构建打包

```bash
# 微信小程序
npm run build:weapp

# H5
npm run build:h5

# 支付宝小程序
npm run build:alipay
```

## 开发规范

### 代码规范

```bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# Stylelint 检查
npm run stylelint

# Prettier 格式化
npm run format
```

### Git 提交规范

项目使用 Commitizen 规范化提交：

```bash
npm run commit
```

提交类型：
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式调整
- `refactor` - 代码重构
- `test` - 测试相关
- `chore` - 构建/工具相关

## 开发进度

项目当前处于 **MVP 开发阶段**：

- [x] 项目结构搭建
- [x] 登录功能
- [x] 首页 UI 框架
- [x] 用户中心 UI
- [ ] 商品发布功能
- [ ] 商品详情页
- [ ] 聊天消息
- [ ] 订单系统
- [ ] 支付功能

详细开发计划请参考 [plan.md](plan.md)。

## 文档

- [项目详细规格](docs/secondhand-marketplace-spec.md)
- [开发计划](plan.md)

## License

MIT