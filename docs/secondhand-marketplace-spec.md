# 二手物品交易小程序 - 方案设计文档

> 文档版本：v1.0
> 最后更新：2026-03-24

---

## 一、项目概述

### 1.1 项目背景
基于微信小程序生态的 C2C 二手物品交易平台，面向中小规模用户群体，支持快速上线和低成本运营。

### 1.2 目标用户
- 个人卖家：闲置物品变现
- 个人买家：低价购买二手商品
- 校园用户：校内二手交易
- 社区用户：邻里闲置互换

### 1.3 核心价值
- 快速发布：拍照上传，一分钟发布商品
- 本地交易：优先展示附近商品
- 微信生态：无需下载，即用即走
- 低成本：云开发架构，月成本 < 50 元

---

## 二、技术选型

### 2.1 方案对比

| 方案 | 前端框架 | 后端服务 | 覆盖平台 | 开发成本 |
|------|----------|----------|----------|----------|
| **方案 A** | 微信小程序原生 | 微信云开发 | 微信小程序 | 低 |
| **方案 B** | Taro + React | 微信云开发 | 微信/支付宝/H5/App | 中 |
| **方案 C** | uni-app + Vue | 微信云开发 | 全平台 + App | 中 |
| **方案 D** | Flutter | 自建后端 | iOS/Android | 高 |

### 2.2 推荐方案 (多端适配)

**前端框架：Taro 3 + React**

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端框架** | Taro 3 + React | 一套代码多端运行 |
| **UI 组件库** | NutUI / Taroify | 多端通用组件 |
| **状态管理** | Redux Toolkit / Zustand | 跨平台状态管理 |
| **后端服务** | 微信云开发 | 免服务器、免运维 |
| **数据库** | 云数据库 (JSON) | 文档型存储，灵活扩展 |
| **文件存储** | 云存储 + CDN | 图片/视频自动加速 |
| **云函数** | Node.js 运行时 | 业务逻辑、权限控制 |

### 2.3 多端能力对比

| 平台 | 支持程度 | 说明 |
|------|----------|------|
| 微信小程序 | ✅ 完整支持 | 原生体验 |
| 支付宝小程序 | ✅ 完整支持 | 需单独配置 |
| 百度小程序 | ✅ 支持 | - |
| H5 移动端 | ✅ 支持 | 响应式布局 |
| iOS App | ⚠️ 需编译 | 通过 Taro-React-Native |
| Android App | ⚠️ 需编译 | 通过 Taro-React-Native |

### 2.4 选型理由

| 方案 | 优势 | 劣势 |
|------|------|------|
| **Taro** | 多端适配好、React 生态、社区活跃 | App 端需额外配置 |
| **uni-app** | 支持平台最多、App 端成熟 | Vue 技术栈、包体积较大 |
| **Flutter** | 原生体验最佳、性能最好 | 开发成本高、需自建后端 |
| **React Native** | 原生体验、生态成熟 | 仅支持 iOS/Android |

### 2.5 成本估算

| 资源 | 免费额度 | 超量价格 | 预估月成本 |
|------|----------|----------|------------|
| 云数据库 | 2GB | ¥0.02/GB/天 | - |
| 云存储 | 5GB | ¥0.043/GB/天 | ¥5 |
| 云函数 | 10 万次调用 | ¥0.013/万次 | ¥10 |
| CDN 流量 | - | ¥0.21/GB | ¥20 |
| **合计** | - | - | **¥35-50/月** |

### 2.6 最终建议

**阶段一 (MVP)**: 微信小程序原生 + 云开发
- 快速验证商业模式
- 开发成本最低
- 1-2 周可上线

**阶段二 (扩展)**: 迁移到 Taro + 云开发
- 一套代码多端运行
- 扩展 H5 和支付宝小程序
- 开发成本增加 30%

**阶段三 (成熟)**: 根据需求选择
- 需要原生 App → Taro-React-Native 或 Flutter
- 业务复杂 → 自建后端 (NestJS + MySQL)

### 2.3 成本估算

| 资源 | 免费额度 | 超量价格 | 预估月成本 |
|------|----------|----------|------------|
| 云数据库 | 2GB | ¥0.02/GB/天 | - |
| 云存储 | 5GB | ¥0.043/GB/天 | ¥5 |
| 云函数 | 10 万次调用 | ¥0.013/万次 | ¥10 |
| CDN 流量 | - | ¥0.21/GB | ¥20 |
| **合计** | - | - | **¥35-50/月** |

---

## 三、系统架构

### 3.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        前端客户端层                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ 微信小程序   │  │ H5 移动端    │  │ 支付宝小程序│              │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │ iOS App     │  │ Android App │                               │
│  └─────────────┘  └─────────────┘                               │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Taro 跨端框架 (一套代码多端运行)               │  │
│  │   页面层 / 组件层 / 服务层 (API/状态管理/本地缓存)          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     微信云开发平台                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  云函数      │  │  云数据库    │  │  云存储      │             │
│  │  (Node.js)  │  │  (MongoDB)  │  │  (CDN)      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │  内容安全    │  │  微信支付    │                               │
│  │  (鉴黄审核)  │  │  (交易闭环)  │                               │
│  └─────────────┘  └─────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 多端适配策略

| 适配层级 | 策略 | 说明 |
|----------|------|------|
| **UI 适配** | 响应式布局 + rpx 单位 | 不同屏幕尺寸自动适配 |
| **平台差异** | 条件编译 | `#ifdef MP-WEIXIN` 等 |
| **API 兼容** | Taro 统一 API | `Taro.login()` 自动兼容各端 |
| **组件差异** | 多端组件库 | NutUI 支持多端渲染 |
| **支付对接** | 条件判断 | 微信用云支付，H5 用第三方支付 |

### 3.3 条件编译示例

```jsx
// 只在微信小程序显示
#ifdef MP-WEIXIN
<WXLoginButton />
#endif

// 只在 H5 显示
#ifdef H5
<H5NavBar />
#endif

// 只在 App 显示
#ifdef APP
<NativeTabBar />
#endif

// 通用 API 调用
Taro.login()  // 自动兼容各端
```

### 3.2 数据模型设计

#### 数据库集合 (Collections)

```
┌─────────────────────────────────────────────────────────┐
│ products          商品信息                                │
│ users             用户信息                                │
│ orders            订单记录                                │
│ messages          聊天消息                                │
│ favorites         收藏记录                                │
│ categories        商品分类                                │
│ reports           举报记录                                │
└─────────────────────────────────────────────────────────┘
```

#### 数据表结构

**products - 商品表**
```javascript
{
  _id: "auto",
  _openid: "user_openid",
  title: "iPhone 13 Pro 256G 远峰蓝",
  description: "99 新，无划痕，箱说全",
  price: 5800,              // 单位：分
  originalPrice: 8799,      // 原价
  images: ["cloudId1", "cloudId2"],
  categoryId: "electronics_phone",
  categoryName: "手机",
  condition: "99 新",        // 全新/99 新/9 成新/8 成新/其他
  status: "on_sale",        // on_sale/sold/out
  viewCount: 128,
  favoriteCount: 15,
  location: {
    province: "广东省",
    city: "深圳市",
    district: "南山区"
  },
  sellerId: "user_openid",
  createdAt: "2026-03-24T10:00:00Z",
  updatedAt: "2026-03-24T10:00:00Z"
}
```

**users - 用户表**
```javascript
{
  _id: "user_openid",
  nickName: "小明",
  avatarUrl: "cloudId",
  gender: 1,               // 0-未知 1-男 2-女
  phone: "138****1234",
  realName: "张三",        // 实名认证
  idCard: "encrypted",     // 加密存储
  creditScore: 100,        // 信用分
  totalSold: 5,
  totalBought: 3,
  createdAt: "2026-03-24T10:00:00Z"
}
```

**orders - 订单表**
```javascript
{
  _id: "order_xxx",
  orderNo: "20260324100001",
  productId: "product_xxx",
  productInfo: { title, price, images },
  buyerId: "buyer_openid",
  sellerId: "seller_openid",
  amount: 5800,
  status: "pending",       // pending/paid/shipped/completed/cancelled
  payTime: null,
  shipTime: null,
  completeTime: null,
  remark: "买家留言",
  createdAt: "2026-03-24T10:00:00Z"
}
```

**messages - 消息表**
```javascript
{
  _id: "msg_xxx",
  conversationId: "buyer_seller",  // 会话 ID
  senderId: "sender_openid",
  receiverId: "receiver_openid",
  type: "text",           // text/image/product
  content: "还在吗？",
  productId: null,        // 商品卡片关联
  isRead: false,
  createdAt: "2026-03-24T10:00:00Z"
}
```

**favorites - 收藏表**
```javascript
{
  _id: "fav_xxx",
  userId: "user_openid",
  productId: "product_xxx",
  createdAt: "2026-03-24T10:00:00Z"
}
```

### 3.4 云函数列表

| 函数名 | 描述 | 权限 |
|--------|------|------|
| `login` | 微信登录获取用户信息 | 公开 |
| `getProductList` | 获取商品列表 (分页/筛选) | 公开 |
| `getProductDetail` | 获取商品详情 | 公开 |
| `createProduct` | 发布商品 | 已登录 |
| `updateProduct` | 编辑商品 | 仅卖家 |
| `deleteProduct` | 删除商品 | 仅卖家 |
| `toggleFavorite` | 收藏/取消收藏 | 已登录 |
| `getFavorites` | 获取我的收藏 | 仅自己 |
| `createOrder` | 创建订单 | 已登录 |
| `updateOrderStatus` | 更新订单状态 | 相关用户 |
| `sendMessage` | 发送聊天消息 | 已登录 |
| `getMessages` | 获取聊天记录 | 会话参与者 |
| `checkContentSecurity` | 内容安全检测 | 内部 |
| `uploadImage` | 获取上传凭证 | 已登录 |

---

## 四、API 接口设计

### 4.1 接口规范

#### 请求格式
```typescript
// 通用请求结构
interface Request<T> {
  data: T;              // 业务数据
  timestamp: number;    // 时间戳 (防重放)
  sign?: string;        // 签名 (敏感接口)
}

// 通用响应结构
interface Response<T> {
  code: number;         // 状态码: 0-成功, 非0-失败
  message: string;      // 提示信息
  data: T;              // 业务数据
  timestamp: number;    // 服务端时间戳
}
```

#### 状态码定义
| code | 说明 |
|------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 未登录 |
| 1003 | 权限不足 |
| 1004 | 资源不存在 |
| 2001 | 内容审核失败 |
| 2002 | 商品已售出 |
| 3001 | 支付失败 |
| 5000 | 系统错误 |

### 4.2 商品模块 API

#### 获取商品列表
```typescript
// 请求
POST /getProductList
{
  page: 1,                    // 页码
  pageSize: 20,               // 每页数量
  category?: "electronics",   // 分类 (可选)
  keyword?: "iPhone",         // 搜索关键词 (可选)
  minPrice?: 100,             // 最低价格 (可选)
  maxPrice?: 10000,           // 最高价格 (可选)
  condition?: "99 新",        // 成色 (可选)
  location?: {                // 地区 (可选)
    city: "深圳市"
  },
  sortBy: "latest",           // 排序: latest/price_asc/price_desc
  sellerId?: "openid"         // 卖家 ID (可选)
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    list: [
      {
        _id: "product_xxx",
        title: "iPhone 13 Pro",
        price: 5800,
        images: ["url1", "url2"],
        condition: "99 新",
        categoryName: "手机",
        sellerInfo: {
          nickName: "小明",
          avatarUrl: "url"
        },
        createdAt: "2026-03-24"
      }
    ],
    total: 100,
    page: 1,
    pageSize: 20,
    hasMore: true
  }
}
```

#### 获取商品详情
```typescript
// 请求
POST /getProductDetail
{
  productId: "product_xxx"
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    _id: "product_xxx",
    title: "iPhone 13 Pro 256G 远峰蓝",
    description: "99 新，无划痕...",
    price: 5800,
    originalPrice: 8799,
    images: ["url1", "url2", "url3"],
    category: { id: "phone", name: "手机" },
    condition: "99 新",
    status: "on_sale",
    viewCount: 128,
    favoriteCount: 15,
    isFavorited: false,         // 当前用户是否收藏
    seller: {
      _id: "seller_xxx",
      nickName: "小明",
      avatarUrl: "url",
      creditScore: 100,
      totalSold: 5
    },
    location: { city: "深圳市" },
    createdAt: "2026-03-24T10:00:00Z",
    similarProducts: [...]      // 相似商品推荐
  }
}
```

#### 发布商品
```typescript
// 请求
POST /createProduct
{
  title: "iPhone 13 Pro",
  description: "99 新，无划痕",
  price: 5800,
  originalPrice: 8799,
  images: ["cloudId1", "cloudId2"],
  categoryId: "electronics_phone",
  condition: "99 新",
  location: {
    province: "广东省",
    city: "深圳市",
    district: "南山区"
  }
}

// 响应
{
  code: 0,
  message: "发布成功",
  data: {
    productId: "product_xxx",
    status: "pending_review"   // 待审核或直接 on_sale
  }
}
```

### 4.3 用户模块 API

#### 微信登录
```typescript
// 请求
POST /login
{
  code: "wx_login_code",      // wx.login() 获取
  userInfo?: {                // 用户信息 (可选)
    nickName: "小明",
    avatarUrl: "url",
    gender: 1
  }
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    openid: "user_openid",
    token: "jwt_token",       // 自定义登录态
    userInfo: {
      nickName: "小明",
      avatarUrl: "url",
      phone: "",
      isNewUser: true         // 是否新用户
    }
  }
}
```

#### 获取用户信息
```typescript
// 请求
POST /getUserInfo
{
  userId?: "openid"           // 不传则获取自己的信息
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    _id: "user_xxx",
    nickName: "小明",
    avatarUrl: "url",
    creditScore: 100,
    totalSold: 5,
    totalBought: 3,
    favoritedCount: 10,
    products: [...]            // 在售商品
  }
}
```

### 4.4 订单模块 API

#### 创建订单
```typescript
// 请求
POST /createOrder
{
  productId: "product_xxx",
  remark: "希望能面交",
  address: {                  // 收货地址
    name: "张三",
    phone: "13812345678",
    province: "广东省",
    city: "深圳市",
    district: "南山区",
    detail: "某某小区1栋101"
  }
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    orderId: "order_xxx",
    orderNo: "20260324100001",
    amount: 5800,
    status: "pending_payment",
    paymentUrl: "wx_pay_url"  // 微信支付参数
  }
}
```

#### 订单列表
```typescript
// 请求
POST /getOrderList
{
  type: "buyer",              // buyer-买家订单, seller-卖家订单
  status?: "pending_payment", // 状态筛选 (可选)
  page: 1,
  pageSize: 20
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    list: [
      {
        _id: "order_xxx",
        orderNo: "20260324100001",
        productInfo: {
          title: "iPhone 13 Pro",
          image: "url",
          price: 5800
        },
        amount: 5800,
        status: "pending_payment",
        statusText: "待付款",
        seller: { nickName: "小明" },
        buyer: { nickName: "买家" },
        createdAt: "2026-03-24"
      }
    ],
    total: 10,
    hasMore: false
  }
}
```

### 4.5 消息模块 API

#### 发送消息
```typescript
// 请求
POST /sendMessage
{
  receiverId: "receiver_openid",
  type: "text",               // text/image/product
  content: "还在吗？",
  productId?: "product_xxx"   // 商品卡片 (可选)
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    messageId: "msg_xxx",
    conversationId: "buyer_seller"
  }
}
```

#### 获取聊天记录
```typescript
// 请求
POST /getMessages
{
  conversationId: "buyer_seller",
  lastMessageId?: "msg_prev", // 分页游标
  limit: 50
}

// 响应
{
  code: 0,
  message: "success",
  data: {
    messages: [
      {
        _id: "msg_xxx",
        senderId: "sender_openid",
        type: "text",
        content: "还在吗？",
        isRead: true,
        createdAt: "2026-03-24T10:00:00Z"
      }
    ],
    hasMore: true,
    conversationInfo: {
      peerUser: {
        nickName: "小明",
        avatarUrl: "url"
      }
    }
  }
}
```

---

## 四、功能需求详述

### 4.1 C 端用户功能

#### 模块 1: 首页
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| H01 | 轮播图 | 展示活动/热门商品，支持点击跳转 | P0 |
| H02 | 分类导航 | 9 宫格入口：手机/电脑/家具/服饰/美妆/书籍/母婴/其他 | P0 |
| H03 | 搜索框 | 点击跳转搜索页，显示热门搜索 | P0 |
| H04 | 推荐列表 | 瀑布流商品卡片，下拉刷新，上拉加载 | P0 |
| H05 | 发布按钮 | 悬浮按钮，点击跳转发布页 | P0 |
| H06 | 筛选排序 | 综合/最新/价格升序/价格降序 | P1 |
| H07 | 定位切换 | 显示当前位置，可切换城市 | P1 |

#### 模块 2: 商品发布
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| P01 | 图片上传 | 最多 9 张，支持预览/删除/重排 | P0 |
| P02 | 图片裁剪 | 上传前裁剪，自动压缩 | P1 |
| P03 | 图片鉴黄 | 自动检测违规图片 | P0 |
| P04 | 标题输入 | 最多 30 字，必填 | P0 |
| P05 | 价格输入 | 支持原价对比显示 | P0 |
| P06 | 分类选择 | 二级联动选择器 | P0 |
| P07 | 成色选择 | 全新/99 新/9 成新/8 成新/其他 | P0 |
| P08 | 详情描述 | 多行文本，最多 500 字 | P0 |
| P09 | 联系方式 | 默认微信，可填写手机 | P0 |
| P10 | 位置获取 | 自动获取当前位置 | P1 |
| P11 | 文本审核 | 标题/描述敏感词过滤 | P0 |
| P12 | 发布成功 | 跳转商品详情或首页 | P0 |

#### 模块 3: 商品详情
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| D01 | 图片轮播 | 支持手势滑动，点击放大 | P0 |
| D02 | 基本信息 | 标题/价格/成色/分类 | P0 |
| D03 | 商品描述 | 富文本展示 | P0 |
| D04 | 卖家信息 | 头像/昵称/信用/在售商品 | P0 |
| D05 | 发布信息 | 发布时间/浏览量/收藏数 | P0 |
| D06 | 收藏按钮 | 收藏/取消，显示已收藏状态 | P0 |
| D07 | 分享按钮 | 生成海报/分享给好友 | P0 |
| D08 | 联系卖家 | 跳转聊天页面 | P0 |
| D09 | 立即购买 | 跳转订单确认页 | P0 |
| D10 | 举报功能 | 选择举报原因并提交 | P1 |
| D11 | 推荐商品 | 底部推荐相似商品 | P2 |

#### 模块 4: 消息/聊天
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| M01 | 会话列表 | 显示最近会话，按时间排序 | P0 |
| M02 | 未读计数 | 红点 + 数字提示 | P0 |
| M03 | 文字消息 | 发送/接收，支持表情 | P0 |
| M04 | 图片消息 | 发送/接收，点击放大 | P1 |
| M05 | 商品卡片 | 发送商品链接，显示缩略图 | P1 |
| M06 | 输入框 | 支持文字/表情/图片 | P0 |
| M07 | 快捷回复 | "还在吗"/"最低多少"/"面交吗" | P2 |
| M08 | 输入状态 | "对方正在输入..."提示 | P2 |

#### 模块 5: 订单管理
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| O01 | 订单列表 | 全部/待付款/待发货/待收货/已完成 | P0 |
| O02 | 订单详情 | 商品信息/价格/状态/时间线 | P0 |
| O03 | 创建订单 | 确认商品 - 填写地址 - 提交 | P0 |
| O04 | 微信支付 | 调起支付，处理结果 | P0 |
| O05 | 取消订单 | 待付款订单可取消 | P0 |
| O06 | 确认收货 | 买家手动确认 | P0 |
| O07 | 订单评价 | 交易完成后评分 + 文字 | P1 |
| O08 | 退款申请 | 填写原因，上传凭证 | P2 |
| O09 | 订单提醒 | 模板消息通知 | P1 |

#### 模块 6: 个人中心
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| U01 | 用户信息卡片 | 头像/昵称/绑定手机 | P0 |
| U02 | 我的发布 | 出售中/已售出/下架 | P0 |
| U03 | 我的订单 | 购买订单入口 | P0 |
| U04 | 我的收藏 | 收藏商品列表 | P0 |
| U05 | 我的浏览 | 最近浏览记录 | P1 |
| U06 | 消息通知 | 系统消息列表 | P0 |
| U07 | 设置 | 隐私/缓存/清除/关于 | P1 |
| U08 | 客服中心 | 联系方式/常见问题 | P1 |
| U09 | 实名认证 | 姓名 + 身份证号 (可选) | P2 |

#### 模块 7: 搜索功能
| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| S01 | 关键词搜索 | 标题/描述模糊匹配 | P0 |
| S02 | 搜索历史 | 展示最近 10 条，可清除 | P1 |
| S03 | 热门搜索 | 平台热门标签 | P1 |
| S04 | 分类筛选 | 选择商品分类 | P0 |
| S05 | 价格筛选 | 价格区间选择 | P0 |
| S06 | 成色筛选 | 选择成色条件 | P1 |
| S07 | 地区筛选 | 选择城市/区域 | P1 |

### 4.2 B 端管理后台

| 模块 | 功能 | 描述 | 优先级 |
|------|------|------|--------|
| 商品管理 | 商品列表 | 搜索/筛选/查看详情 | P0 |
| 商品管理 | 商品下架 | 违规商品强制下架 | P0 |
| 商品管理 | 审核管理 | 待审核商品列表 | P0 |
| 用户管理 | 用户列表 | 搜索/查看用户详情 | P0 |
| 用户管理 | 封禁/解封 | 违规用户处理 | P0 |
| 订单管理 | 订单列表 | 全部订单查询 | P0 |
| 订单管理 | 订单详情 | 查看订单完整信息 | P0 |
| 订单管理 | 异常处理 | 处理纠纷订单 | P1 |
| 内容审核 | 图片审核 | 待审核图片列表 | P0 |
| 内容审核 | 文本审核 | 敏感词检测结果 | P0 |
| 举报管理 | 举报列表 | 用户举报记录 | P1 |
| 举报管理 | 处理举报 | 核实并处理 | P1 |
| 数据统计 | 核心指标 | 用户数/商品数/GMV | P1 |
| 数据统计 | 趋势图表 | 日活/订单量趋势 | P2 |
| 系统设置 | 分类管理 | 添加/编辑/删除分类 | P2 |

---

## 五、云函数实现示例

### 5.1 登录云函数 (login)

```javascript
// cloudfunctions/login/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { code, userInfo } = event

  try {
    // 获取 openid (云开发环境自动获取)
    const openid = wxContext.OPENID

    // 查询用户是否存在
    const db = cloud.database()
    const userCollection = db.collection('users')
    const userResult = await userCollection.where({ _id: openid }).get()

    let user
    let isNewUser = false

    if (userResult.data.length === 0) {
      // 新用户，创建记录
      isNewUser = true
      user = {
        _id: openid,
        openid: openid,
        nickName: userInfo?.nickName || '微信用户',
        avatarUrl: userInfo?.avatarUrl || '',
        gender: userInfo?.gender || 0,
        phone: '',
        creditScore: 100,
        totalSold: 0,
        totalBought: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await userCollection.add({ data: user })
    } else {
      // 已有用户，更新信息
      user = userResult.data[0]
      if (userInfo) {
        await userCollection.doc(openid).update({
          data: {
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            updatedAt: new Date()
          }
        })
        user.nickName = userInfo.nickName
        user.avatarUrl = userInfo.avatarUrl
      }
    }

    // 返回用户信息
    return {
      code: 0,
      message: 'success',
      data: {
        openid,
        userInfo: {
          nickName: user.nickName,
          avatarUrl: user.avatarUrl,
          phone: user.phone || '',
          creditScore: user.creditScore,
          isNewUser
        }
      }
    }
  } catch (error) {
    console.error('login error:', error)
    return {
      code: 5000,
      message: '登录失败',
      data: null
    }
  }
}
```

### 5.2 商品列表云函数 (getProductList)

```javascript
// cloudfunctions/getProductList/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const {
    page = 1,
    pageSize = 20,
    category,
    keyword,
    minPrice,
    maxPrice,
    condition,
    location,
    sortBy = 'latest',
    sellerId
  } = event

  const db = cloud.database()
  const collection = db.collection('products')

  try {
    // 构建查询条件
    let query = collection.where({
      status: 'on_sale'  // 只查询在售商品
    })

    // 分类筛选
    if (category) {
      query = query.where({ categoryId: category })
    }

    // 价格筛选
    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter = {}
      if (minPrice !== undefined) priceFilter['price >='] = minPrice
      if (maxPrice !== undefined) priceFilter['price <='] = maxPrice
      query = query.where(priceFilter)
    }

    // 成色筛选
    if (condition) {
      query = query.where({ condition })
    }

    // 地区筛选
    if (location?.city) {
      query = query.where({
        'location.city': location.city
      })
    }

    // 卖家筛选
    if (sellerId) {
      query = query.where({ sellerId })
    }

    // 关键词搜索
    if (keyword) {
      query = query.where({
        title: db.RegExp({
          regexp: keyword,
          options: 'i'  // 忽略大小写
        })
      })
    }

    // 排序
    let orderBy = 'createdAt'
    let order = 'desc'
    if (sortBy === 'price_asc') {
      orderBy = 'price'
      order = 'asc'
    } else if (sortBy === 'price_desc') {
      orderBy = 'price'
      order = 'desc'
    }

    // 计算总数
    const countResult = await query.count()
    const total = countResult.total

    // 分页查询
    const skip = (page - 1) * pageSize
    const listResult = await query
      .orderBy(orderBy, order)
      .skip(skip)
      .limit(pageSize)
      .field({
        _id: true,
        title: true,
        price: true,
        images: true,
        condition: true,
        categoryName: true,
        sellerId: true,
        createdAt: true,
        location: true
      })
      .get()

    // 获取卖家信息
    const sellerIds = [...new Set(listResult.data.map(item => item.sellerId))]
    const sellersResult = await db.collection('users')
      .where({ _id: db.command.in(sellerIds) })
      .field({ _id: true, nickName: true, avatarUrl: true })
      .get()

    const sellerMap = {}
    sellersResult.data.forEach(seller => {
      sellerMap[seller._id] = seller
    })

    // 组装数据
    const list = listResult.data.map(product => ({
      ...product,
      sellerInfo: sellerMap[product.sellerId] || null,
      images: product.images?.slice(0, 3) || []  // 只返回前3张
    }))

    return {
      code: 0,
      message: 'success',
      data: {
        list,
        total,
        page,
        pageSize,
        hasMore: skip + pageSize < total
      }
    }
  } catch (error) {
    console.error('getProductList error:', error)
    return {
      code: 5000,
      message: '获取商品列表失败',
      data: null
    }
  }
}
```

### 5.3 发布商品云函数 (createProduct)

```javascript
// cloudfunctions/createProduct/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  const {
    title,
    description,
    price,
    originalPrice,
    images,
    categoryId,
    categoryName,
    condition,
    location
  } = event

  const db = cloud.database()

  try {
    // 参数校验
    if (!title || title.length > 30) {
      return { code: 1001, message: '标题不能为空且不超过30字' }
    }
    if (!price || price < 0) {
      return { code: 1001, message: '价格无效' }
    }
    if (!images || images.length === 0) {
      return { code: 1001, message: '请上传至少一张图片' }
    }
    if (!categoryId) {
      return { code: 1001, message: '请选择商品分类' }
    }

    // 内容安全检测
    const securityResult = await cloud.callFunction({
      name: 'checkContentSecurity',
      data: {
        text: `${title} ${description}`,
        images
      }
    })

    if (securityResult.result.code !== 0) {
      return {
        code: 2001,
        message: '内容审核失败，请修改后重新提交'
      }
    }

    // 创建商品
    const product = {
      title,
      description: description || '',
      price,
      originalPrice: originalPrice || price,
      images,
      categoryId,
      categoryName,
      condition: condition || '其他',
      status: 'on_sale',  // 审核通过直接上架
      viewCount: 0,
      favoriteCount: 0,
      sellerId: openid,
      location: location || {},
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('products').add({ data: product })

    // 更新用户统计
    await db.collection('users').doc(openid).update({
      data: {
        totalSold: db.command.inc(1),
        updatedAt: new Date()
      }
    })

    return {
      code: 0,
      message: '发布成功',
      data: {
        productId: result._id,
        status: 'on_sale'
      }
    }
  } catch (error) {
    console.error('createProduct error:', error)
    return {
      code: 5000,
      message: '发布失败',
      data: null
    }
  }
}
```

### 5.4 内容安全检测云函数 (checkContentSecurity)

```javascript
// cloudfunctions/checkContentSecurity/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { text, images } = event

  try {
    // 文本安全检测
    if (text) {
      const textResult = await cloud.openapi.security.msgSecCheck({
        content: text
      })
      
      if (textResult.errCode !== 0) {
        console.log('文本审核失败:', textResult)
        return { code: 2001, message: '文本内容违规' }
      }
    }

    // 图片安全检测
    if (images && images.length > 0) {
      for (const imageUrl of images) {
        // 获取图片临时链接
        const fileResult = await cloud.openapi.cloud.getTempFileURL({
          fileList: [imageUrl]
        })
        
        const tempUrl = fileResult.fileList[0].tempFileURL
        
        // 图片内容安全检测
        const imageResult = await cloud.openapi.security.imgSecCheck({
          media: {
            contentType: 'image/jpeg',
            value: Buffer.from(tempUrl)
          }
        })
        
        if (imageResult.errCode !== 0) {
          console.log('图片审核失败:', imageResult)
          return { code: 2001, message: '图片内容违规' }
        }
      }
    }

    return { code: 0, message: '审核通过' }
  } catch (error) {
    console.error('checkContentSecurity error:', error)
    // 审核失败时返回失败
    return { code: 2001, message: '内容审核失败' }
  }
}
```

### 5.5 收藏功能云函数 (toggleFavorite)

```javascript
// cloudfunctions/toggleFavorite/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { productId, action } = event  // action: 'add' 或 'remove'

  const db = cloud.database()
  const _ = db.command

  try {
    // 查询当前收藏状态
    const existing = await db.collection('favorites')
      .where({
        userId: openid,
        productId
      })
      .get()

    if (action === 'add') {
      // 添加收藏
      if (existing.data.length > 0) {
        return { code: 0, message: '已收藏', data: { isFavorited: true } }
      }

      await db.collection('favorites').add({
        data: {
          userId: openid,
          productId,
          createdAt: new Date()
        }
      })

      // 更新商品收藏数
      await db.collection('products').doc(productId).update({
        data: { favoriteCount: _.inc(1) }
      })

      return { code: 0, message: '收藏成功', data: { isFavorited: true } }
    } else {
      // 取消收藏
      if (existing.data.length === 0) {
        return { code: 0, message: '未收藏', data: { isFavorited: false } }
      }

      await db.collection('favorites')
        .where({
          userId: openid,
          productId
        })
        .remove()

      // 更新商品收藏数
      await db.collection('products').doc(productId).update({
        data: { favoriteCount: _.inc(-1) }
      })

      return { code: 0, message: '取消收藏成功', data: { isFavorited: false } }
    }
  } catch (error) {
    console.error('toggleFavorite error:', error)
    return { code: 5000, message: '操作失败', data: null }
  }
}
```

### 5.6 发送消息云函数 (sendMessage)

```javascript
// cloudfunctions/sendMessage/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const senderId = wxContext.OPENID
  const { receiverId, type, content, productId } = event

  const db = cloud.database()

  try {
    // 参数校验
    if (!receiverId || !content) {
      return { code: 1001, message: '参数错误' }
    }

    // 不能给自己发消息
    if (senderId === receiverId) {
      return { code: 1001, message: '不能给自己发消息' }
    }

    // 生成会话 ID (两个 openid 排序拼接)
    const conversationId = [senderId, receiverId].sort().join('_')

    // 创建消息
    const message = {
      conversationId,
      senderId,
      receiverId,
      type: type || 'text',
      content,
      productId: productId || null,
      isRead: false,
      createdAt: new Date()
    }

    const result = await db.collection('messages').add({ data: message })

    // 发送订阅消息通知 (如果用户订阅了)
    try {
      await cloud.openapi.subscribeMessage.send({
        touser: receiverId,
        page: `/pages/chat/index?conversationId=${conversationId}`,
        data: {
          thing1: { value: content.substring(0, 20) },
          thing2: { value: type === 'text' ? '文字消息' : '图片消息' },
          time3: { value: new Date().toLocaleString() }
        },
        templateId: 'TEMPLATE_ID'  // 替换为实际模板 ID
      })
    } catch (msgError) {
      // 订阅消息失败不影响消息发送
      console.log('subscribeMessage error:', msgError)
    }

    return {
      code: 0,
      message: '发送成功',
      data: {
        messageId: result._id,
        conversationId
      }
    }
  } catch (error) {
    console.error('sendMessage error:', error)
    return { code: 5000, message: '发送失败', data: null }
  }
}
```

---

## 五、项目目录结构

### 5.1 Taro 多端项目结构

```
secondhand-market/
├── cloudfunctions/              # 云函数目录
│   ├── login/
│   ├── getProductList/
│   ├── createProduct/
│   └── ...
│
├── src/                         # 源代码目录
│   ├── pages/
│   │   ├── index/               # 首页
│   │   │   ├── index.config.ts
│   │   │   ├── index.tsx
│   │   │   └── index.scss
│   │   ├── publish/             # 发布页
│   │   ├── detail/              # 商品详情
│   │   ├── chat/                # 聊天列表
│   │   ├── order-list/          # 订单列表
│   │   ├── user/                # 个人中心
│   │   └── search/              # 搜索页
│   │
│   ├── components/              # 通用组件
│   │   ├── product-card/
│   │   ├── image-upload/
│   │   └── loading/
│   │
│   ├── services/                # API 服务
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── user.ts
│   │
│   ├── store/                   # 状态管理
│   │   ├── user.ts
│   │   └── index.ts
│   │
│   ├── utils/                   # 工具函数
│   │   ├── request.ts
│   │   └── storage.ts
│   │
│   ├── assets/                  # 静态资源
│   ├── styles/                  # 全局样式
│   ├── app.config.ts
│   ├── app.tsx
│   └── index.html
│
├── config/                      # 编译配置
│   ├── dev.ts
│   ├── prod.ts
│   └── index.ts
│
├── package.json
└── README.md
```

### 5.2 多端编译输出

```bash
# 编译微信小程序
npm run build:weapp

# 编译 H5
npm run build:h5

# 编译支付宝小程序
npm run build:alipay

# 编译 App (React Native)
npm run build:rn
```

---

## 六、前端组件设计

### 6.1 核心组件列表

| 组件名 | 职责 | Props | 状态 |
|--------|------|-------|------|
| ProductCard | 商品卡片展示 | product, onClick | 无状态 |
| ImageUploader | 图片上传组件 | maxCount, onChange | fileList |
| CategoryPicker | 分类选择器 | onSelect | visible |
| PriceInput | 价格输入组件 | value, onChange | 无状态 |
| ConditionPicker | 成色选择 | value, onChange | 无状态 |
| SearchBar | 搜索栏组件 | onSearch | keyword |
| NavBar | 导航栏组件 | title, back | 无状态 |
| TabBar | 底部标签栏 | activeIndex | 无状态 |
| Loading | 加载状态组件 | type, text | 无状态 |
| EmptyState | 空状态展示 | type, message | 无状态 |
| ActionSheet | 操作面板 | options, onSelect | visible |
| SwipeCell | 滑动操作单元格 | actions | 无状态 |

### 6.2 商品卡片组件 (ProductCard)

```tsx
// src/components/product-card/index.tsx
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface ProductCardProps {
  product: {
    _id: string
    title: string
    price: number
    images: string[]
    condition: string
    categoryName: string
    sellerInfo?: {
      nickName: string
      avatarUrl: string
    }
    createdAt: string
  }
  onClick?: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // 格式化价格
  const formatPrice = (price: number) => {
    return price >= 10000 
      ? `${(price / 10000).toFixed(1)}万` 
      : price.toString()
  }

  // 格式化时间
  const formatTime = (date: string) => {
    const now = new Date()
    const created = new Date(date)
    const diff = now.getTime() - created.getTime()
    
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    if (diff < 2592000000) return `${Math.floor(diff / 86400000)}天前`
    return created.toLocaleDateString()
  }

  return (
    <View 
      className='product-card' 
      onClick={() => onClick?.(product._id)}
    >
      <View className='product-card__image-wrapper'>
        <Image 
          className='product-card__image' 
          src={product.images[0] || '/assets/default.png'}
          mode='aspectFill'
          lazyLoad
        />
        {product.condition !== '其他' && (
          <View className='product-card__condition'>
            {product.condition}
          </View>
        )}
      </View>
      
      <View className='product-card__content'>
        <Text className='product-card__title' numberOfLines={2}>
          {product.title}
        </Text>
        
        <View className='product-card__price'>
          <Text className='product-card__price-current'>
            ¥{formatPrice(product.price)}
          </Text>
        </View>
        
        {product.sellerInfo && (
          <View className='product-card__seller'>
            <Image 
              className='product-card__seller-avatar' 
              src={product.sellerInfo.avatarUrl}
            />
            <Text className='product-card__seller-name'>
              {product.sellerInfo.nickName}
            </Text>
          </View>
        )}
        
        <Text className='product-card__time'>
          {formatTime(product.createdAt)}
        </Text>
      </View>
    </View>
  )
}

export default ProductCard
```

```scss
// src/components/product-card/index.scss
.product-card {
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;

  &__image-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__condition {
    position: absolute;
    top: 4px;
    left: 4px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
  }

  &__content {
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 14px;
    color: #333;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  &__price {
    margin-bottom: 8px;
  }

  &__price-current {
    font-size: 16px;
    color: #ff5722;
    font-weight: bold;
  }

  &__seller {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  &__seller-avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 4px;
  }

  &__seller-name {
    font-size: 12px;
    color: #999;
  }

  &__time {
    font-size: 12px;
    color: #999;
  }
}
```

### 6.3 图片上传组件 (ImageUploader)

```tsx
// src/components/image-upload/index.tsx
import React, { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro, { chooseImage, uploadFile } from '@tarojs/taro'
import './index.scss'

interface ImageUploaderProps {
  maxCount?: number           // 最大上传数量
  value?: string[]            // 已上传图片列表
  onChange?: (files: string[]) => void
  onUpload?: (localPath: string) => Promise<string>  // 自定义上传
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxCount = 9,
  value = [],
  onChange,
  onUpload
}) => {
  const [uploading, setUploading] = useState(false)

  // 选择图片
  const handleChoose = async () => {
    if (uploading) return
    if (value.length >= maxCount) {
      Taro.showToast({ title: `最多上传${maxCount}张`, icon: 'none' })
      return
    }

    try {
      setUploading(true)
      
      // 选择图片
      const result = await chooseImage({
        count: maxCount - value.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      // 上传图片
      const uploadPromises = result.tempFilePaths.map(async (path) => {
        if (onUpload) {
          return await onUpload(path)
        }
        // 默认上传到云存储
        const uploadResult = await Taro.cloud.uploadFile({
          cloudPath: `products/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`,
          filePath: path
        })
        return uploadResult.fileID
      })

      const newFiles = await Promise.all(uploadPromises)
      const allFiles = [...value, ...newFiles]
      
      onChange?.(allFiles)
      Taro.showToast({ title: '上传成功', icon: 'success' })
    } catch (error) {
      console.error('upload error:', error)
      Taro.showToast({ title: '上传失败', icon: 'none' })
    } finally {
      setUploading(false)
    }
  }

  // 删除图片
  const handleDelete = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange?.(newFiles)
  }

  // 预览图片
  const handlePreview = (index: number) => {
    Taro.previewImage({
      current: value[index],
      urls: value
    })
  }

  return (
    <View className='image-upload'>
      <View className='image-upload__list'>
        {value.map((url, index) => (
          <View key={url} className='image-upload__item'>
            <Image 
              className='image-upload__image' 
              src={url}
              mode='aspectFill'
              onClick={() => handlePreview(index)}
            />
            <View 
              className='image-upload__delete' 
              onClick={() => handleDelete(index)}
            >
              ×
            </View>
          </View>
        ))}
        
        {value.length < maxCount && (
          <View 
            className='image-upload__add' 
            onClick={handleChoose}
          >
            {uploading ? (
              <Text className='image-upload__loading'>上传中...</Text>
            ) : (
              <Text className='image-upload__add-icon'>+</Text>
            )}
          </View>
        )}
      </View>
      
      <Text className='image-upload__tip'>
        最多上传{maxCount}张图片，支持jpg/png格式
      </Text>
    </View>
  )
}

export default ImageUploader
```

### 6.4 搜索栏组件 (SearchBar)

```tsx
// src/components/search-bar/index.tsx
import React, { useState } from 'react'
import { View, Input, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onSearch?: (keyword: string) => void
  onFocus?: () => void
  hotKeywords?: string[]
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索商品',
  value = '',
  onSearch,
  onFocus,
  hotKeywords = []
}) => {
  const [keyword, setKeyword] = useState(value)
  const [showHot, setShowHot] = useState(false)

  const handleSearch = () => {
    if (!keyword.trim()) {
      Taro.showToast({ title: '请输入搜索关键词', icon: 'none' })
      return
    }
    onSearch?.(keyword.trim())
  }

  const handleClear = () => {
    setKeyword('')
  }

  const handleHotClick = (word: string) => {
    setKeyword(word)
    onSearch?.(word)
    setShowHot(false)
  }

  return (
    <View className='search-bar'>
      <View className='search-bar__input-wrapper'>
        <Image 
          className='search-bar__icon' 
          src='/assets/icons/search.png'
        />
        <Input 
          className='search-bar__input'
          placeholder={placeholder}
          value={keyword}
          onInput={(e) => setKeyword(e.detail.value)}
          onConfirm={handleSearch}
          onFocus={() => {
            setShowHot(true)
            onFocus?.()
          }}
        />
        {keyword && (
          <View className='search-bar__clear' onClick={handleClear}>
            ×
          </View>
        )}
        <View className='search-bar__btn' onClick={handleSearch}>
          搜索
        </View>
      </View>

      {showHot && hotKeywords.length > 0 && (
        <View className='search-bar__hot'>
          <Text className='search-bar__hot-title'>热门搜索</Text>
          <View className='search-bar__hot-list'>
            {hotKeywords.map((word) => (
              <View 
                key={word} 
                className='search-bar__hot-item'
                onClick={() => handleHotClick(word)}
              >
                {word}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

export default SearchBar
```

### 6.5 空状态组件 (EmptyState)

```tsx
// src/components/empty-state/index.tsx
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface EmptyStateProps {
  type?: 'no-data' | 'no-result' | 'no-order' | 'no-message' | 'error'
  message?: string
  actionText?: string
  onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  message,
  actionText,
  onAction
}) => {
  const config = {
    'no-data': {
      image: '/assets/empty/no-data.png',
      defaultMessage: '暂无数据'
    },
    'no-result': {
      image: '/assets/empty/no-result.png',
      defaultMessage: '没有找到相关商品'
    },
    'no-order': {
      image: '/assets/empty/no-order.png',
      defaultMessage: '暂无订单'
    },
    'no-message': {
      image: '/assets/empty/no-message.png',
      defaultMessage: '暂无消息'
    },
    'error': {
      image: '/assets/empty/error.png',
      defaultMessage: '加载失败'
    }
  }

  const { image, defaultMessage } = config[type]

  return (
    <View className='empty-state'>
      <Image 
        className='empty-state__image' 
        src={image}
        mode='aspectFit'
      />
      <Text className='empty-state__message'>
        {message || defaultMessage}
      </Text>
      {actionText && (
        <View className='empty-state__action' onClick={onAction}>
          {actionText}
        </View>
      )}
    </View>
  )
}

export default EmptyState
```

---

## 七、状态管理设计

### 7.1 状态结构

```typescript
// src/store/index.ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

// 全局状态类型定义
interface AppState {
  // 用户状态
  user: {
    openid: string | null
    userInfo: {
      nickName: string
      avatarUrl: string
      phone: string
    } | null
    isLoggedIn: boolean
  }
  
  // 商品相关
  products: {
    list: Product[]
    current: Product | null
    loading: boolean
    hasMore: boolean
  }
  
  // 订单相关
  orders: {
    list: Order[]
    current: Order | null
    loading: boolean
  }
  
  // 消息相关
  messages: {
    conversations: Conversation[]
    currentMessages: Message[]
    unreadCount: number
  }
  
  // UI 状态
  ui: {
    loading: boolean
    theme: 'light' | 'dark'
    location: {
      city: string
      province: string
    } | null
  }
}

// Actions
interface AppActions {
  // 用户操作
  setUser: (user: UserState) => void
  logout: () => void
  
  // 商品操作
  setProductList: (list: Product[], hasMore: boolean) => void
  appendProducts: (list: Product[]) => void
  setCurrentProduct: (product: Product) => void
  clearProducts: () => void
  
  // 订单操作
  setOrderList: (list: Order[]) => void
  
  // 消息操作
  addMessage: (message: Message) => void
  setUnreadCount: (count: number) => void
  
  // UI 操作
  setLoading: (loading: boolean) => void
  setLocation: (location: Location) => void
}
```

### 7.2 Zustand Store 实现

```typescript
// src/store/user.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  openid: string | null
  userInfo: {
    nickName: string
    avatarUrl: string
    phone: string
    creditScore: number
  } | null
  isLoggedIn: boolean
  token: string | null
}

interface UserActions {
  login: (data: { openid: string; userInfo: any }) => void
  logout: () => void
  updateInfo: (info: Partial<UserState['userInfo']>) => void
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      // 初始状态
      openid: null,
      userInfo: null,
      isLoggedIn: false,
      token: null,

      // 登录
      login: (data) => set({
        openid: data.openid,
        userInfo: data.userInfo,
        isLoggedIn: true
      }),

      // 登出
      logout: () => set({
        openid: null,
        userInfo: null,
        isLoggedIn: false,
        token: null
      }),

      // 更新信息
      updateInfo: (info) => set((state) => ({
        userInfo: state.userInfo ? { ...state.userInfo, ...info } : null
      }))
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        openid: state.openid,
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn
      })
    }
  )
)
```

```typescript
// src/store/product.ts
import { create } from 'zustand'

interface ProductState {
  list: any[]
  current: any | null
  page: number
  hasMore: boolean
  loading: boolean
  filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    condition?: string
    keyword?: string
    sortBy: string
  }
}

interface ProductActions {
  setList: (list: any[], hasMore: boolean) => void
  appendList: (list: any[]) => void
  setCurrent: (product: any) => void
  setPage: (page: number) => void
  setLoading: (loading: boolean) => void
  setFilters: (filters: Partial<ProductState['filters']>) => void
  reset: () => void
}

const initialState: ProductState = {
  list: [],
  current: null,
  page: 1,
  hasMore: true,
  loading: false,
  filters: {
    sortBy: 'latest'
  }
}

export const useProductStore = create<ProductState & ProductActions>((set) => ({
  ...initialState,

  setList: (list, hasMore) => set({ list, hasMore }),
  
  appendList: (newList) => set((state) => ({
    list: [...state.list, ...newList]
  })),
  
  setCurrent: (product) => set({ current: product }),
  
  setPage: (page) => set({ page }),
  
  setLoading: (loading) => set({ loading }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
    page: 1,
    list: []
  })),
  
  reset: () => set(initialState)
}))
```

### 7.3 在组件中使用

```tsx
// src/pages/index/index.tsx
import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { useUserStore, useProductStore } from '@/store'
import { getProductList } from '@/services/product'
import ProductCard from '@/components/product-card'

const HomePage = () => {
  const { isLoggedIn } = useUserStore()
  const { 
    list, 
    page, 
    hasMore, 
    loading, 
    filters,
    setList, 
    appendList,
    setLoading,
    setPage 
  } = useProductStore()

  // 加载商品列表
  const loadProducts = async (pageNum: number) => {
    if (loading) return
    setLoading(true)
    
    try {
      const result = await getProductList({
        page: pageNum,
        pageSize: 20,
        ...filters
      })
      
      if (pageNum === 1) {
        setList(result.list, result.hasMore)
      } else {
        appendList(result.list)
        setPage(pageNum)
      }
    } catch (error) {
      console.error('loadProducts error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts(1)
  }, [filters])

  // 下拉刷新
  const onPullDownRefresh = async () => {
    await loadProducts(1)
    Taro.stopPullDownRefresh()
  }

  // 上拉加载更多
  const onReachBottom = async () => {
    if (hasMore && !loading) {
      await loadProducts(page + 1)
    }
  }

  return (
    <View className='home-page'>
      {/* 商品列表 */}
      <View className='product-list'>
        {list.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product}
            onClick={(id) => {
              Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })
            }}
          />
        ))}
      </View>

      {/* 加载状态 */}
      {!hasMore && list.length > 0 && (
        <View className='no-more'>没有更多了</View>
      )}
    </View>
  )
}

export default HomePage
```

---

## 八、路由配置

### 8.1 页面路由配置

```typescript
// src/app.config.ts
export default defineAppConfig({
  pages: [
    'pages/index/index',           // 首页
    'pages/search/index',          // 搜索页
    'pages/publish/index',         // 发布页
    'pages/detail/index',          // 商品详情
    'pages/chat/index',            // 聊天列表
    'pages/chat-detail/index',     // 聊天详情
    'pages/order-list/index',      // 订单列表
    'pages/order-detail/index',    // 订单详情
    'pages/user/index',            // 个人中心
    'pages/my-products/index',     // 我的发布
    'pages/favorite/index',        // 我的收藏
    'pages/settings/index',        // 设置页
    'pages/login/index',           // 登录页
  ],
  
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '二手交易',
    navigationBarTextStyle: 'black'
  },
  
  tabBar: {
    color: '#999',
    selectedColor: '#ff5722',
    backgroundColor: '#fff',
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
        iconPath: 'assets/icons/message.png',
        selectedIconPath: 'assets/icons/message-active.png'
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
```

### 8.2 页面配置示例

```typescript
// src/pages/detail/index.config.ts
export default definePageConfig({
  navigationBarTitleText: '商品详情',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundTextStyle: 'dark',
  backgroundColorTop: '#f5f5f5',
  backgroundColorBottom: '#f5f5f5'
})

// src/pages/publish/index.config.ts
export default definePageConfig({
  navigationBarTitleText: '发布商品',
  disableScroll: false,
  usingComponents: {
    'image-upload': '/components/image-upload/index'
  }
})
```

### 8.3 路由跳转封装

```typescript
// src/utils/router.ts
import Taro from '@tarojs/taro'

type RouteParams = Record<string, string | number>

/**
 * 页面路由工具
 */
export const router = {
  // 跳转到页面 (可返回)
  navigateTo: (url: string, params?: RouteParams) => {
    const fullUrl = params ? `${url}?${formatParams(params)}` : url
    return Taro.navigateTo({ url: fullUrl })
  },

  // 重定向页面 (不可返回)
  redirectTo: (url: string, params?: RouteParams) => {
    const fullUrl = params ? `${url}?${formatParams(params)}` : url
    return Taro.redirectTo({ url: fullUrl })
  },

  // 切换 Tab 页面
  switchTab: (url: string) => {
    return Taro.switchTab({ url })
  },

  // 返回上一页
  navigateBack: (delta = 1) => {
    return Taro.navigateBack({ delta })
  },

  // 重新启动到首页
  reLaunch: (url: string, params?: RouteParams) => {
    const fullUrl = params ? `${url}?${formatParams(params)}` : url
    return Taro.reLaunch({ url: fullUrl })
  }
}

// 格式化参数
const formatParams = (params: RouteParams) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
}

// 常用路由路径
export const ROUTES = {
  HOME: '/pages/index/index',
  SEARCH: '/pages/search/index',
  PUBLISH: '/pages/publish/index',
  DETAIL: '/pages/detail/index',
  CHAT: '/pages/chat/index',
  CHAT_DETAIL: '/pages/chat-detail/index',
  ORDER_LIST: '/pages/order-list/index',
  ORDER_DETAIL: '/pages/order-detail/index',
  USER: '/pages/user/index',
  MY_PRODUCTS: '/pages/my-products/index',
  FAVORITE: '/pages/favorite/index',
  SETTINGS: '/pages/settings/index',
  LOGIN: '/pages/login/index'
}
```

---

## 九、安全策略与性能优化

### 9.1 安全策略

#### 数据库权限规则

```json
// 云数据库安全规则配置
{
  "products": {
    "read": true,                        // 公开读取
    "write": "auth.openid == doc._openid" // 仅卖家可写
  },
  "users": {
    "read": "auth.openid == doc._id",    // 仅自己可读
    "write": "auth.openid == doc._id"    // 仅自己可写
  },
  "orders": {
    "read": "auth.openid == doc.buyerId || auth.openid == doc.sellerId",
    "write": "auth.openid == doc.buyerId || auth.openid == doc.sellerId"
  },
  "messages": {
    "read": "auth.openid in [doc.senderId, doc.receiverId]",
    "write": "auth.openid == doc.senderId"
  },
  "favorites": {
    "read": "auth.openid == doc.userId",
    "write": "auth.openid == doc.userId"
  }
}
```

#### 前端安全措施

```typescript
// src/utils/security.ts

/**
 * 敏感信息加密
 */
export const encryptData = (data: string): string => {
  // 使用 AES 加密 (示例)
  const key = 'APP_SECRET_KEY'
  // 实际项目应使用更安全的加密方案
  return data  // TODO: 实现加密
}

/**
 * 敏感信息脱敏
 */
export const maskPhone = (phone: string): string => {
  if (!phone || phone.length < 7) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export const maskIdCard = (idCard: string): string => {
  if (!idCard || idCard.length < 8) return idCard
  return idCard.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2')
}

/**
 * XSS 防护
 */
export const sanitizeHtml = (html: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  }
  const reg = /[&<>"'/]/g
  return html.replace(reg, (match) => map[match])
}

/**
 * 请求签名
 */
export const signRequest = (data: object): string => {
  const timestamp = Date.now()
  const nonce = Math.random().toString(36).slice(2)
  const payload = JSON.stringify({ ...data, timestamp, nonce })
  // 使用 HMAC-SHA256 签名
  // 实际项目需实现签名逻辑
  return `${timestamp}:${nonce}:${payload}`
}
```

#### 内容安全配置

```typescript
// src/config/security.ts
export const SECURITY_CONFIG = {
  // 敏感词列表 (示例)
  sensitiveWords: [
    '违禁词1', '违禁词2'
  ],
  
  // 图片审核阈值
  imageCheckThreshold: 0.8,
  
  // 文本审核配置
  textCheck: {
    maxLength: 500,
    minRiskScore: 0.7
  },
  
  // 举报类型
  reportTypes: [
    { value: 'fake', label: '虚假信息' },
    { value: 'fraud', label: '涉嫌诈骗' },
    { value: 'illegal', label: '违禁商品' },
    { value: 'harassment', label: '骚扰信息' },
    { value: 'other', label: '其他' }
  ]
}
```

### 9.2 性能优化策略

#### 图片优化

```typescript
// src/utils/image.ts
import Taro from '@tarojs/taro'

/**
 * 图片压缩
 */
export const compressImage = async (
  filePath: string,
  quality: number = 80
): Promise<string> => {
  return new Promise((resolve, reject) => {
    Taro.compressImage({
      src: filePath,
      quality,
      compressedWidth: 800,  // 最大宽度
      compressedHeight: 800  // 最大高度
    }).then((res) => {
      resolve(res.tempFilePath)
    }).catch(reject)
  })
}

/**
 * 图片懒加载配置
 */
export const LAZY_LOAD_CONFIG = {
  threshold: 200,  // 预加载距离
  placeholder: '/assets/loading.png'
}

/**
 * 获取图片 CDN 加速链接
 */
export const getCDNUrl = (url: string, width?: number): string => {
  if (!url) return ''
  
  // 云存储图片处理
  if (url.startsWith('cloud://')) {
    // 微信云存储会自动提供 CDN
    return url
  }
  
  // 其他 CDN 处理
  if (width) {
    return `${url}?imageView2/2/w/${width}`
  }
  return url
}
```

#### 数据缓存策略

```typescript
// src/utils/storage.ts
import Taro from '@tarojs/taro'

const CACHE_PREFIX = 'cache_'
const DEFAULT_EXPIRE = 3600 * 1000  // 1小时

/**
 * 缓存管理
 */
export const cache = {
  // 设置缓存
  set: (key: string, data: any, expire: number = DEFAULT_EXPIRE) => {
    const cacheKey = CACHE_PREFIX + key
    const cacheData = {
      data,
      expire: Date.now() + expire
    }
    Taro.setStorageSync(cacheKey, cacheData)
  },

  // 获取缓存
  get: (key: string): any | null => {
    const cacheKey = CACHE_PREFIX + key
    const cacheData = Taro.getStorageSync(cacheKey)
    
    if (!cacheData) return null
    
    // 检查过期
    if (cacheData.expire < Date.now()) {
      Taro.removeStorageSync(cacheKey)
      return null
    }
    
    return cacheData.data
  },

  // 删除缓存
  remove: (key: string) => {
    const cacheKey = CACHE_PREFIX + key
    Taro.removeStorageSync(cacheKey)
  },

  // 清除所有缓存
  clear: () => {
    const keys = Taro.getStorageInfoSync().keys
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        Taro.removeStorageSync(key)
      }
    })
  }
}

/**
 * API 缓存包装器
 */
export const withCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  expire: number = DEFAULT_EXPIRE
): Promise<T> => {
  // 先检查缓存
  const cached = cache.get(key)
  if (cached) return cached
  
  // 请求数据
  const data = await fetcher()
  
  // 存入缓存
  cache.set(key, data, expire)
  
  return data
}
```

#### 请求优化

```typescript
// src/services/request.ts
import Taro from '@tarojs/taro'
import { cache } from '@/utils/storage'

interface RequestConfig {
  url: string
  method?: 'GET' | 'POST'
  data?: any
  header?: Record<string, string>
  timeout?: number
  cache?: boolean
  cacheExpire?: number
}

/**
 * 请求封装
 */
export const request = async <T>(config: RequestConfig): Promise<T> => {
  const { url, method = 'POST', data, header, timeout = 10000, cache: useCache, cacheExpire } = config

  // 检查缓存
  const cacheKey = `${method}:${url}:${JSON.stringify(data)}`
  if (useCache) {
    const cached = cache.get(cacheKey)
    if (cached) return cached
  }

  // 发起请求
  try {
    const response = await Taro.request({
      url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      timeout
    })

    // 处理响应
    if (response.statusCode === 200) {
      const result = response.data as any
      
      if (result.code === 0) {
        // 缓存成功响应
        if (useCache) {
          cache.set(cacheKey, result.data, cacheExpire)
        }
        return result.data
      }
      
      // 业务错误
      throw new Error(result.message || '请求失败')
    }
    
    // HTTP 错误
    throw new Error(`HTTP错误: ${response.statusCode}`)
  } catch (error: any) {
    console.error('request error:', error)
    throw error
  }
}

/**
 * 批量请求
 */
export const batchRequest = async <T>(
  requests: Array<() => Promise<T>>
): Promise<T[]> => {
  return Promise.all(requests.map((req) => req().catch((e) => null)))
}

/**
 * 分页加载器
 */
export class PaginationLoader<T> {
  private page = 1
  private pageSize = 20
  private hasMore = true
  private loading = false

  constructor(
    private fetcher: (page: number, pageSize: number) => Promise<{ list: T[]; total: number }>
  ) {}

  async load(): Promise<T[]> {
    if (this.loading || !this.hasMore) return []
    
    this.loading = true
    try {
      const { list, total } = await this.fetcher(this.page, this.pageSize)
      
      this.hasMore = this.page * this.pageSize < total
      this.page++
      
      return list
    } finally {
      this.loading = false
    }
  }

  reset() {
    this.page = 1
    this.hasMore = true
    this.loading = false
  }

  getLoadingState() {
    return {
      loading: this.loading,
      hasMore: this.hasMore,
      page: this.page
    }
  }
}
```

### 9.3 云函数优化

#### 减少冷启动

```javascript
// cloudfunctions/common/index.js
// 云函数公共模块，预加载依赖

// 预加载常用模块
const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command

// 初始化只执行一次
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 导出公共方法
module.exports = {
  db,
  _,
  cloud,
  
  // 快速响应包装
  success: (data) => ({ code: 0, message: 'success', data }),
  error: (code, message) => ({ code, message, data: null }),
  
  // 获取 openid
  getOpenId: (context) => context.OPENID
}
```

#### 数据库查询优化

```javascript
// cloudfunctions/utils/query.js

/**
 * 分页查询封装
 */
exports.paginate = async (collection, query, page, pageSize, orderBy = 'createdAt', order = 'desc') => {
  const db = cloud.database()
  const skip = (page - 1) * pageSize
  
  // 先查总数
  const countResult = await collection.where(query).count()
  
  // 再查数据
  const listResult = await collection
    .where(query)
    .orderBy(orderBy, order)
    .skip(skip)
    .limit(pageSize)
    .get()
  
  return {
    list: listResult.data,
    total: countResult.total,
    hasMore: skip + pageSize < countResult.total
  }
}

/**
 * 创建复合索引建议
 * products: { categoryId, status, createdAt }
 * messages: { conversationId, createdAt }
 * orders: { buyerId, sellerId, status, createdAt }
 */
```

---

## 六、开发计划

### 6.1 迭代计划

| 阶段 | 时间 | 内容 | 交付物 |
|------|------|------|--------|
| **MVP** | Week 1-2 | 微信小程序 + 登录/发布/列表/详情 | 可发布版本 |
| **V1.1** | Week 3 | 聊天 + 收藏 + 搜索 | 核心功能完整 |
| **V1.2** | Week 4 | 订单 + 支付 + 个人中心 | 交易闭环 |
| **V1.3** | Week 5 | H5 端适配 + 管理后台 | 多端支持 |
| **V2.0** | Week 6-8 | App 端适配 + 评价 + 退款 | 完整版本 |

### 6.2 多端发布策略

| 阶段 | 目标用户 | 发布渠道 | 优先级 |
|------|----------|----------|--------|
| **Phase 1** | 种子用户 | 微信小程序 | P0 |
| **Phase 2** | 早期用户 | H5 移动端 | P1 |
| **Phase 3** | 扩展用户 | 支付宝小程序 | P2 |
| **Phase 4** | 大众用户 | iOS/Android App | P3 |

### 6.3 每日任务分解 (MVP 阶段)

| 天数 | 任务 |
|------|------|
| Day 1 | 环境搭建、Taro 初始化、云开发配置 |
| Day 2 | 登录功能、首页框架、商品列表 |
| Day 3 | 商品发布页、图片上传、表单验证 |
| Day 4 | 商品详情页、收藏功能 |
| Day 5 | 搜索功能、筛选功能 |
| Day 6 | 联调测试、Bug 修复 |
| Day 7 | 提交审核、准备上线 |

---

## 七、风险与注意事项

### 7.1 合规风险
| 风险 | 应对措施 |
|------|----------|
| 内容违规 | 必须接入内容安全 API，图片/文本双重审核 |
| 交易纠纷 | 明确平台定位，仅提供信息撮合 |
| 隐私泄露 | 用户数据加密，隐私政策合规 |
| 支付资质 | 需企业主体才能使用微信支付 |

### 7.2 技术风险
| 风险 | 应对措施 |
|------|----------|
| 云函数冷启动 | 关键函数设置定时保活 |
| 数据库查询性能 | 合理设计索引，避免复杂查询 |
| 图片加载慢 | 使用 CDN，图片压缩，懒加载 |
| 并发限制 | 云函数默认并发 1000，按需提升 |

### 7.3 运营建议
1. **冷启动**: 先邀请种子用户入驻，提供发布奖励
2. **内容审核**: 初期人工审核 + 自动审核结合
3. **用户激励**: 发布商品送积分，签到奖励
4. **推广渠道**: 社群运营、朋友圈分享、校园代理

---

## 八、附录

### 8.1 商品分类体系
```
一级分类          二级分类
├── 数码产品        ├── 手机
│                 ├── 电脑
│                 ├── 平板
│                 └── 配件
├── 家居家具        ├── 大家具
│                 ├── 小家具
│                 └── 家纺
├── 服饰鞋包        ├── 男装
│                 ├── 女装
│                 ├── 鞋靴
│                 └── 箱包
├── 美妆护肤        ├── 彩妆
│                 ├── 护肤
│                 └── 香水
├── 图书文娱        ├── 图书
│                 ├── 音像
│                 └── 乐器
├── 母婴用品        ├── 童装
│                 ├── 玩具
│                 └── 用品
└── 其他            ├── 运动户外
                    ├── 食品
                    └── 其他
```

### 8.2 订单状态流转
```
待付款 → 已付款 → 待发货 → 已发货 → 待收货 → 已完成
   │         │
   └─────────┴→ 已取消
```

### 8.3 参考资料
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [Vant Weapp 组件库](https://vant-ui.github.io/vant-weapp/)
- [微信内容安全 API](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/sec-check/security.msgSecCheck.html)
