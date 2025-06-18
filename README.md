# AI 学习助手

一个帮助开发者学习和探索 AI 相关项目的桌面应用。

## 功能特点

- 🔍 搜索 AI 相关项目
- ⭐ 收藏感兴趣的项目
- 📚 按类别浏览项目
- 🌙 支持暗色模式
- 🌐 支持中文界面

## 技术栈

- Tauri
- React
- TypeScript
- Mantine UI
- Zustand

## 开发环境要求

- Node.js 18+
- Rust 1.70+
- VS Code（推荐）

## 快速开始

1. 克隆项目：

```bash
git clone https://github.com/yourusername/ai-teacher.git
cd ai-teacher
```

2. 安装依赖：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm run tauri dev
```

## 构建应用

```bash
npm run tauri build
```

## 项目结构

```
src/
  ├── components/     # UI组件
  ├── pages/         # 页面组件
  ├── stores/        # 状态管理
  ├── services/      # API服务
  ├── types/         # 类型定义
  └── utils/         # 工具函数
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 提交 Pull Request

## 许可证

MIT
