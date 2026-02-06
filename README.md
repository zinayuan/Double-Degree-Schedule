# 中外合作办学项目日程管理系统

专业的中外合作办学项目管理看板，支持AI驱动的日程生成、里程碑追踪和文档总结。

## 功能特性

- 📅 **智能日程生成**：基于Google Gemini AI自动生成项目推进日程
- 📊 **可视化看板**：直观展示项目各阶段进度和关键里程碑
- ✅ **材料清单管理**：跟踪申报所需材料的准备状态
- 💡 **专家建议**：AI提供专业的项目推进建议
- 📱 **移动端优化**：支持PWA，可作为移动应用使用

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- Lucide React Icons

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

创建 `.env` 文件并添加你的 Google Gemini API Key：

```
VITE_GEMINI_API_KEY=your_api_key_here
```

### 3. 启动开发服务器

```bash
pnpm dev
```

### 4. 构建生产版本

```bash
pnpm build
```

## 部署到 Vercel

1. 在 Vercel 导入此 GitHub 仓库
2. 配置环境变量 `VITE_GEMINI_API_KEY`
3. 点击部署

## 项目结构

```
├── src/
│   ├── components/        # React组件
│   ├── services/          # API服务
│   ├── App.tsx           # 主应用组件
│   ├── types.ts          # TypeScript类型定义
│   └── main.tsx          # 应用入口
├── index.html            # HTML模板
├── vite.config.ts        # Vite配置
└── package.json          # 项目配置
```

## License

MIT
