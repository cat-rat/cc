# 代码规范指南

## 命名规范

### 文件和目录
- **目录**: 小写 + 连字符 (kebab-case)，如 `components/`, `user-profile/`
- **文件**: 小写 + 连字符 (kebab-case)，如 `user-info.tsx`, `product-list.scss`
- **组件文件**: 与组件名一致，如 `UserProfile.tsx`

### 代码命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量/函数 | 小驼峰 (camelCase) | `userInfo`, `handleClick` |
| 组件/类 | 大驼峰 (PascalCase) | `UserProfile`, `ProductCard` |
| 常量 | 全大写 + 下划线 | `MAX_COUNT`, `API_URL` |
| CSS 类 | 小写 + 连字符 | `user-info`, `product-card` |
| 私有成员 | 下划线前缀 | `_internalValue` |

## 代码结构

### 组件文件顺序
1. Import 语句
2. 类型定义
3. 常量定义
4. 组件主函数
5. 子组件
6. 导出语句

### 组件内部顺序
```tsx
// 1. Props 和 State 类型
interface Props {
  title: string
}

// 2. 常量
const DEFAULT_VALUE = 'default'

// 3. 组件主函数
export default function Component(props: Props) {
  // 3.1 Hooks (按顺序)
  // - useState/useReducer
  // - useEffect/useLayoutEffect
  // - 自定义 hooks
  // - useMemo/useCallback

  // 3.2 事件处理函数

  // 3.3 渲染逻辑

  return <View />
}
```

## 编码规范

### TypeScript
- 使用 `interface` 定义对象类型，使用 `type` 定义联合/交叉类型
- 避免使用 `any`，必要时使用 `unknown`
- 导出公共类型，私有类型使用 `private` 或文件作用域

### React/Taro
- 使用函数组件 + Hooks
- 使用 `useCallback` 缓存事件处理函数
- 使用 `useMemo` 缓存计算结果
- 列表渲染必须添加 `key`

### CSS/SCSS
- 使用 BEM 或模块化命名
- 避免使用 `!important`
- 使用变量存储常用值（颜色、间距）

## 安全规范

- 不硬编码敏感信息（密钥、Token）
- 用户输入必须校验和转义
- 云函数必须验证用户权限

## 提交规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型:**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

**示例:**
```
feat(user): add login functionality

- 创建 login 云函数
- 实现用户状态管理
- 更新个人中心页面

Closes #123
```
