# 微光札记

一个可直接部署到 GitHub Pages 的静态个人博客。无需安装依赖或构建工具。

## 本地预览

直接用浏览器打开 `index.html`，或在此目录运行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库，例如 `yourname.github.io`（个人主页）或 `quiet-notes`（项目主页）。
2. 将此目录全部文件上传并提交到 `main` 分支。
3. 在仓库 **Settings → Pages**，选择从分支部署，分支选 `main`，目录选 `/ (root)`，保存。
4. 稍等片刻后，个人主页会出现在 `https://yourname.github.io`；项目主页会出现在 `https://yourname.github.io/quiet-notes/`。

## 添加或编辑文章

编辑 `posts.js` 中的 `posts` 列表。每篇文章包含：

- `title`：标题
- `date`：日期
- `category`：分类（会自动出现在分类筛选中）
- `tags`：标签数组（会自动出现在标签筛选中）
- `excerpt`：摘要
- `body`：正文段落数组

首页文章区可通过“排序”选择最新优先或最早优先。请使用 `YYYY.MM.DD` 格式填写 `date`，以确保排序正确。

替换 `index.html` 里的 `hello@example.com` 为你的邮箱即可。
