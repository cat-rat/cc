# Git 工作流规范

> 基于 Git Flow 简化版，适用于敏捷开发团队

---

## 目录

1. [分支模型](#分支模型)
2. [分支命名](#分支命名)
3. [工作流程](#工作流程)
4. [代码提交规范](#代码提交规范)
5. [代码审查](#代码审查)
6. [版本发布](#版本发布)

---

## 分支模型

```
main (生产分支)
 │
 ├── develop (开发分支)
 │    │
 │    ├── feature/user-login (功能分支)
 │    ├── feature/product-list
 │    ├── bugfix/login-error
 │    └── hotfix/production-bug (紧急修复)
```

### 分支说明

| 分支 | 说明 | 保护级别 | 命名示例 |
|------|------|----------|----------|
| `main` | 生产环境分支，随时可发布 | 严格保护 | `main` |
| `develop` | 开发主分支，包含最新代码 | 保护 | `develop` |
| `feature/*` | 功能开发分支 | 开发者自治 | `feature/user-login` |
| `bugfix/*` | Bug 修复分支 | 开发者自治 | `bugfix/order-calc` |
| `hotfix/*` | 生产紧急修复 | 严格保护 | `hotfix/payment-error` |
| `release/*` | 预发布分支 | 保护 | `release/v1.0.0` |

---

## 分支命名

### 功能分支

```bash
# 格式
feature/<功能模块>-<功能描述>

# 示例
feature/user-login          # 用户登录
feature/product-list        # 商品列表
feature/chat-message        # 聊天消息
feature/order-manage        # 订单管理
```

### Bug 修复分支

```bash
# 格式
bugfix/<问题描述>

# 示例
bugfix/login-error          # 登录错误修复
bugfix/price-calculation    # 价格计算修复
```

### 紧急修复分支

```bash
# 格式
hotfix/<问题描述>

# 示例
hotfix/payment-crash        # 支付崩溃修复
hotfix/data-loss            # 数据丢失修复
```

### 发布分支

```bash
# 格式
release/v<主版本>.<次版本>.<修订版本>

# 示例
release/v1.0.0
release/v1.2.3
```

---

## 工作流程

### 1. 开始新功能

```bash
# 1. 切换到 develop 分支并更新
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/user-login

# 3. 开发并提交
git add .
git commit -m "feat(user): 实现微信登录功能"

# 4. 推送到远程
git push -u origin feature/user-login
```

### 2. 完成功能合并

```bash
# 1. 推送到远程后，在 GitHub 创建 Pull Request
#    源分支：feature/user-login
#    目标分支：develop

# 2. 等待代码审查 (Code Review)

# 3. 审查通过后合并到 develop

# 4. 删除功能分支
git branch -d feature/user-login
git push origin --delete feature/user-login
```

### 3. 生产发布流程

```bash
# 1. 从 develop 创建发布分支
git checkout -b release/v1.0.0 develop

# 2. 进行最后测试和版本调整
#    - 更新版本号
#    - 更新 CHANGELOG.md

# 3. 合并到 main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# 4. 合并回 develop
git checkout develop
git merge --no-ff release/v1.0.0

# 5. 删除发布分支
git branch -d release/v1.0.0
```

### 4. 紧急修复

```bash
# 1. 从 main 创建热修复分支
git checkout -b hotfix/payment-error main

# 2. 修复并提交
git commit -m "fix(payment): 修复支付回调处理错误"

# 3. 合并到 main 和 develop
git checkout main
git merge --no-ff hotfix/payment-error
git tag -a v1.0.1 -m "Hotfix version 1.0.1"

git checkout develop
git merge --no-ff hotfix/payment-error

# 4. 删除热修复分支
git branch -d hotfix/payment-error
```

---

## 代码提交规范

### Commit 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(user): 添加用户注册功能` |
| `fix` | Bug 修复 | `fix(order): 修复订单金额计算错误` |
| `docs` | 文档更新 | `docs(readme): 更新安装说明` |
| `style` | 代码格式（不影响逻辑） | `style(eslint): 修复代码缩进` |
| `refactor` | 重构 | `refactor(auth): 重构认证模块` |
| `perf` | 性能优化 | `perf(list): 优化列表渲染性能` |
| `test` | 测试相关 | `test(user): 添加登录单元测试` |
| `chore` | 构建/工具/配置 | `chore(deps): 更新依赖版本` |
| `ci` | CI 配置 | `ci(github): 添加 GitHub Actions` |
| `revert` | 回滚 | `revert: 回滚提交 abc123` |

### Scope 范围

| 范围 | 说明 |
|------|------|
| `user` | 用户模块 |
| `product` | 商品模块 |
| `order` | 订单模块 |
| `chat` | 聊天模块 |
| `search` | 搜索模块 |
| `admin` | 管理后台 |
| `cloud` | 云函数 |
| `ui` | UI 组件 |
| `config` | 配置文件 |
| `deps` | 依赖管理 |

### Subject 写法

- 使用祈使句：用 "add" 不是 "added" 或 "adds"
- 首字母小写
- 结尾不加句号
- 长度不超过 50 字

### Body 写法

- 描述变更动机和对比
- 复杂的变更需要详细说明
- 每行不超过 72 字

### Footer 写法

- **关联 Issue**: `Closes #123`, `Fixes #456`
- **Breaking Changes**: `BREAKING CHANGE: 修改登录 API 格式`

---

## 提交示例

### 功能提交

```bash
git commit -m "feat(user): 添加微信登录功能

- 创建 login 云函数
- 实现微信授权登录流程
- 集成 Zustand 状态管理

Closes #123"
```

### Bug 修复

```bash
git commit -m "fix(order): 修复订单金额计算错误

当商品数量大于 10 时，折扣计算逻辑错误。
修复后正确应用阶梯折扣。

Fixes #456"
```

### 文档更新

```bash
git commit -m "docs(readme): 更新项目启动说明

添加 Node.js 版本要求和 npm install 步骤"
```

### 重构

```bash
git commit -m "refactor(auth): 重构认证模块

- 提取公共验证逻辑到 utils
- 统一错误处理格式
- 减少代码重复

BREAKING CHANGE: login 函数返回值格式变更"
```

### 依赖更新

```bash
git commit -m "chore(deps): 更新 React 到 18.3.1"
```

---

## 代码审查 (Code Review)

### 审查清单

**代码质量**
- [ ] 代码符合规范 (ESLint/Prettier)
- [ ] 命名清晰易懂
- [ ] 函数职责单一
- [ ] 无重复代码 (DRY)

**功能正确**
- [ ] 实现需求功能
- [ ] 边界条件处理
- [ ] 错误处理完整
- [ ] 无安全漏洞

**可维护性**
- [ ] 代码有注释 (复杂逻辑)
- [ ] 单元测试通过
- [ ] 类型定义完整

**性能**
- [ ] 无性能问题
- [ ] 大数据量处理合理
- [ ] 无内存泄漏风险

### PR 模板

```markdown
## 变更说明
<!-- 描述本次变更的目的和内容 -->

## 变更类型
- [ ] 新功能 (feat)
- [ ] Bug 修复 (fix)
- [ ] 重构 (refactor)
- [ ] 文档更新 (docs)
- [ ] 性能优化 (perf)

## 测试
- [ ] 已自测通过
- [ ] 已添加单元测试

## 截图/录屏
<!-- 如有 UI 变更，提供截图 -->

## 关联 Issue
Closes #
```

---

## 版本发布

### 语义化版本

```
主版本。次版本.修订版本
  ↑      ↑      ↑
  |      |      └─ Bug 修复
  |      └─ 向后兼容的功能新增
  └─ 不兼容的 API 变更
```

### 版本号规则

| 变更类型 | 版本升级 | 示例 |
|----------|----------|------|
| 小 Bug 修复 | 修订版本 +1 | 1.0.0 → 1.0.1 |
| 新功能 (向后兼容) | 次版本 +1 | 1.0.1 → 1.1.0 |
| 破坏性变更 | 主版本 +1 | 1.2.0 → 2.0.0 |

### 发布检查清单

- [ ] 所有功能测试通过
- [ ] 代码审查通过
- [ ] CHANGELOG.md 已更新
- [ ] 版本号已更新
- [ ] 生产环境配置正确
- [ ] 回滚方案已准备

---

## Git 配置建议

### 全局配置

```bash
# 用户信息
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 默认行为
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global merge.ff false

# 别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

### .gitmessage (提交模板)

```bash
# ~/.gitmessage
# 标题（50 字以内）

# 详细描述（72 字每行）

# 关联 Issue
# Closes #
```

```bash
# 使用模板
git config --global commit.template ~/.gitmessage
```

---

## 分支保护规则 (GitHub)

### main 分支

- [ ] Require pull request reviews (至少 1 人)
- [ ] Require status checks to pass
- [ ] Require branches to be up to date
- [ ] Require conversation resolution
- [ ] Include administrators (管理员也需遵守)

### develop 分支

- [ ] Require pull request reviews (至少 1 人)
- [ ] Require status checks to pass
- [ ] Require branches to be up to date

---

## 常见问题

### Q: 如何同步 develop 分支到 feature 分支？

```bash
git checkout feature/user-login
git merge develop
# 或
git rebase develop
```

### Q: 如何撤销上一次的提交？

```bash
# 保留更改
git reset --soft HEAD~1

# 不保留更改
git reset --hard HEAD~1
```

### Q: 如何修改上一次的提交信息？

```bash
git commit --amend -m "新的提交信息"
```

### Q: 如何查看分支图谱？

```bash
git log --oneline --graph --all
```
