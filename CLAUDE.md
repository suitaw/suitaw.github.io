# suitaw.github.io

个人项目仓库，GitHub Pages 托管。项目互不依赖，**改任何文件前先确认改的是哪个项目**。

- 根目录 `index.html` 是导航页，加新项目要往里补一条
- `suitaw.github.io/daily/` 是**另一个仓库** `suitaw/daily`（本地 `~/daily`），不在这里改
- 截图用法见 `~/CLAUDE.md`；截图容器被重置了照 `DEBIAN-CONTAINER.md` 重装

## electrician/ 与 lowvolt/ —— 两本不同的电工书，互不依赖

- `electrician/`：《零基础学电工》，规则在 `electrician/CLAUDE.md`（进目录自动加载）
- `lowvolt/`：曹振华《低压电工入门考证视频教程》（6 章 + 附录 32 节）。
  **做下一节前先读 `lowvolt/OUTLINE.md`**（进度、文件清单、设计理由、坑）
  - 加新节只改 `lv-book.js` 里 BOOK 那一行的 `f`
  - 原理图/接线图/符号用内联 SVG 重画（`lv-figs.js`）；**实物照片从书页照片裁成 `img/*.webp`**（2026-10-01 起，他要「弄得清晰点」）
  - **正文图号是可点芯片**（他明确要求），加新图要写 `<a data-fig="x-y">`；每张图配一句「怎么看这张图」
  - **SVG 子图标签容易顶出 viewBox 被裁**，加完必须截图看（1-27/1-30/1-31 都栽过）。
    用 `/sdcard/webdev/lowvolt/_figtest.html`（图）和 `_symtest.html`（符号）截，比整页快
  - 书上二维码用 `zbarimg` 能解（视频 mp4 / PDF 有文本层），解法见 OUTLINE.md「2026-10-01 改版」

## exam-quiz.html

609 题题库，8 章。**只改 `exam-quiz.html`，永远不要动 `questions.js`。**
