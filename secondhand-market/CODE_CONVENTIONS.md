# 代码规范指南

> 本规范适用于二手物品交易小程序项目，基于各语言最新 LTS 版本制定。
> 核心原则：优先考虑可维护性、性能与安全性。

---

## 目录

1. [TypeScript 规范](#typescript-规范)
2. [JavaScript 规范](#javascript-规范)
3. [HTML/CSS 规范](#htmlcss-规范)
4. [Python 规范](#python-规范) (云函数备用)
5. [Java 规范](#java-规范) (后端备用)
6. [统一输出格式](#统一输出格式)

---

## TypeScript 规范

### 核心原则
- **类型安全至上，禁止使用 `any`**
- 强制开启 `strict` 模式
- 函数必须显式标注返回类型

### 命名原则

| 类型 | 规范 | 示例 |
|------|------|------|
| 接口/类 | PascalCase | `UserService`, `Product` |
| 变量/函数 | camelCase | `getUserById`, `userInfo` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_URL` |
| 枚举 | PascalCase | `OrderStatus`, `UserRole` |
| 类型别名 | PascalCase | `ProductList`, `ApiResponse` |

### 代码风格

```typescript
// ✅ 正确：使用 interface 定义对象类型
interface User {
  id: string
  name: string
  email: string
}

// ✅ 正确：使用联合类型替代枚举
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'

// ✅ 正确：使用 const enum
const enum ErrorCode {
  INVALID_INPUT = 1,
  NETWORK_ERROR = 2
}

// ✅ 正确：可选链和空值合并
const userName = user?.profile?.name ?? '匿名用户'

// ❌ 错误：禁止使用 any
interface BadExample {
  data: any  // 应使用 unknown 或具体类型
}
```

### 实践规范

```typescript
// ✅ 正确：显式返回类型
async function getUserInfo(id: string): Promise<User | null> {
  const res = await Taro.request({ url: `/api/users/${id}` })
  return res.data
}

// ✅ 正确：ES Modules 语法
import { User } from './types'
export const userService = { ... }
export default UserService

// ❌ 错误：CommonJS (除 Node.js 环境外)
const User = require('./types')
module.exports = UserService
```

---

## JavaScript 规范

### 核心原则
- 现代 ES6+ 语法
- 禁止使用 `var`
- 统一使用 `async/await`

### 变量声明

```javascript
// ✅ 正确：优先使用 const
const MAX_COUNT = 10
const userName = '张三'

// ✅ 正确：变量会修改时使用 let
let retryCount = 0
retryCount += 1

// ❌ 错误：禁止使用 var
var oldVar = 'deprecated'
```

### 异步处理

```javascript
// ✅ 正确：async/await
async function fetchData() {
  try {
    const res = await fetch('/api/data')
    return await res.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}

// ❌ 错误：回调地狱
fetch('/api/data', function(res) {
  res.json().then(function(data) {
    // ...
  })
})
```

### 对象操作

```javascript
// ✅ 正确：解构和扩展运算符
const { name, age } = user
const newUser = { ...user, name: '新名字' }

// ✅ 正确：全等比较
if (count === 0) return
if (value !== null) process(value)

// ❌ 错误：隐式转换
if (count == 0) return
```

---

## HTML/CSS 规范

### HTML 规范

```html
<!-- ✅ 正确：语义化标签、必需属性 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>二手市场</title>
</head>
<body>
  <header>
    <nav aria-label="主导航">
      <ul>
        <li><a href="/">首页</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <img src="product.jpg" alt="iPhone 13 Pro 二手手机" />
      <h1>商品标题</h1>
      <p>商品描述</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2026 二手市场</p>
  </footer>
</body>
</html>

<!-- ❌ 错误：缺少必需属性、非语义化 -->
<div class="header">
  <div onclick="jump()">点击</div>
  <img src="x.jpg">
</div>
```

### CSS/Tailwind 规范

```scss
// ✅ 正确：kebab-case 命名、BEM 风格
.product-card {
  &__image {
    width: 100%;
    height: 320rpx;
  }

  &__title {
    font-size: 28rpx;
    color: #333;
  }

  &--featured {
    border-color: #ff6b6b;
  }
}

// ✅ 正确：使用变量
$primary-color: #667eea;
$spacing-md: 24rpx;

.button {
  background-color: $primary-color;
  padding: $spacing-md;
}

// ❌ 错误：行内样式、!important
<div style="color: red; padding: 20px !important;">
```

### Tailwind 类名顺序

```html
<!-- 布局 → 间距 → 颜色 → 交互 -->
<button class="flex items-center justify-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
  提交
</button>
```

---

## Python 规范

> 适用于云函数（备选方案），基于 PEP 8

### 命名原则

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量/函数/模块 | snake_case | `calculate_total_price`, `user_service.py` |
| 类名 | PascalCase | `DataProcessor`, `UserService` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY`, `API_BASE_URL` |

### 实践规范

```python
# ✅ 正确：类型标注
from typing import Optional, List

def get_user_by_id(user_id: str) -> Optional[dict]:
    """根据 ID 获取用户信息"""
    return {"id": user_id, "name": "张三"}

# ✅ 正确：f-string 格式化
def greet(name: str) -> str:
    return f"你好，{name}！"

# ✅ 正确：上下文管理
def read_file(path: str) -> str:
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

# ✅ 正确：Google 风格文档字符串
def process_order(order_id: str, amount: float) -> bool:
    """
    处理订单支付

    Args:
        order_id: 订单 ID
        amount: 支付金额

    Returns:
        处理是否成功
    """
    pass
```

---

## Java 规范

> 适用于自建后端（备选方案），基于 Google Java Style

### 命名原则

| 类型 | 规范 | 示例 |
|------|------|------|
| 类/接口 | UpperCamelCase | `UserServiceImpl`, `ProductController` |
| 方法/变量 | lowerCamelCase | `getUserById`, `totalCount` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE` |

### 实践规范

```java
// ✅ 正确：Lombok 简化 POJO
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String name;
    private String email;
}

// ✅ 正确：构造函数注入
@Service
public class UserService {
    private final UserRepository userRepository;

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

// ✅ 正确：Stream API
public List<String> getActiveUserNames(List<User> users) {
    return users.stream()
        .filter(user -> user.isActive())
        .map(User::getName)
        .collect(Collectors.toList());
}

// ✅ 正确：Javadoc
/**
 * 根据 ID 获取用户信息
 *
 * @param userId 用户 ID
 * @return 用户信息，不存在返回 null
 * @throws UserNotFoundException 用户不存在时抛出
 */
public User getUserById(String userId) throws UserNotFoundException {
    return userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("用户不存在：" + userId));
}

// ❌ 错误：空捕获
try {
    doSomething();
} catch (Exception e) {
    // 什么都不做
}
```

---

## React/Taro 专项规范

### 组件结构

```tsx
/**
 * 用户信息卡片组件
 */
import { View, Text, Image } from '@tarojs/components'
import { useCallback } from 'react'
import { useUserStore } from '@/store/user'
import type { User } from '@/types'
import './UserProfile.scss'

// ✅ 正确：接口定义
interface UserProfileProps {
  user: User
  onEdit?: () => void
}

// ✅ 正确：常量定义
const DEFAULT_AVATAR = '/assets/default-avatar.png'

/**
 * 用户信息卡片
 */
export default function UserProfile({ user, onEdit }: UserProfileProps): JSX.Element {
  // ✅ 正确：Hooks 按顺序
  const { creditScore } = useUserStore()
  const handleClick = useCallback(() => {
    onEdit?.()
  }, [onEdit])

  // ✅ 正确：空值处理
  if (!user) return null

  return (
    <View className="user-profile" onClick={handleClick}>
      <Image src={user.avatarUrl || DEFAULT_AVATAR} mode="aspectFill" />
      <Text>{user.nickName}</Text>
    </View>
  )
}
```

### 状态管理

```typescript
// ✅ 正确：Zustand store
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null })
    }),
    { name: 'user-storage' }
  )
)
```

---

## 安全规范

### 通用安全

| 规则 | 说明 |
|------|------|
| 敏感信息 | 禁止硬编码密钥、Token，使用环境变量 |
| 用户输入 | 必须校验和转义，防止 XSS 和注入 |
| 权限验证 | 云函数必须验证用户身份和权限 |
| 错误处理 | 禁止暴露内部错误详情给客户端 |

### 云函数安全

```typescript
// ✅ 正确：权限验证
export async function updateProduct(event: UpdateProductEvent) {
  const { OPENID } = cloud.getWXContext()

  // 验证用户身份
  if (!OPENID) {
    throw new Error('未登录')
  }

  // 验证资源所有权
  const product = await db.collection('products').doc(event.productId).get()
  if (product.data._openid !== OPENID) {
    throw new Error('无权操作')
  }

  // 业务逻辑
  return db.collection('products').doc(event.productId).update({
    data: event.data
  })
}
```

---

## 统一输出格式

### 代码块

所有代码必须包裹在 Markdown 代码块中，并标注语言：

````markdown
```typescript
// TypeScript 代码
const name: string = 'Taro'
```

```scss
// SCSS 样式
.product {
  display: flex;
}
```
````

### 模块化

长代码应拆分为合理的模块：

```
src/
├── pages/           # 页面
├── components/      # 通用组件
├── services/        # API 服务
├── store/           # 状态管理
├── utils/           # 工具函数
├── types/           # 类型定义
└── constants/       # 常量
```

### 错误处理

```typescript
// ✅ 正确：防御性编程
function getProductPrice(price: number): string {
  if (price < 0) {
    console.error('价格不能为负数')
    return '¥0'
  }
  return `¥${(price / 100).toFixed(2)}`
}

// ✅ 正确：边界检查
function getItem<T>(items: T[], index: number): T | undefined {
  if (index < 0 || index >= items.length) {
    return undefined
  }
  return items[index]
}
```

### 依赖标注

```typescript
/**
 * 依赖：axios
 * npm install axios
 */
import axios from 'axios'

/**
 * 依赖：@tarojs/taro
 * Taro 内置
 */
import Taro from '@tarojs/taro'
```

---

## Git 提交规范

### Commit 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响代码逻辑） |
| `refactor` | 重构 |
| `test` | 测试相关 |
| `chore` | 构建/工具/配置 |

### 示例

```
feat(user): 添加用户登录功能

- 创建 login 云函数
- 实现微信授权登录
- 集成 Zustand 状态管理

Closes #123
```

```
fix(order): 修复订单金额计算错误

当商品数量为 0 时，订单总金额计算错误。

Fixes #456
```

---

## 检查清单

### 代码提交前

- [ ] ESLint 检查通过 (`npm run lint`)
- [ ] Prettier 格式化 (`npm run format`)
- [ ] 类型检查通过 (`tsc --noEmit`)
- [ ] 无 console.log 调试代码（生产代码）
- [ ] 关键函数有类型标注
- [ ] 空值和边界已处理

### 代码审查要点

- [ ] 命名清晰易懂
- [ ] 函数职责单一
- [ ] 无重复代码
- [ ] 错误处理完整
- [ ] 无安全漏洞
