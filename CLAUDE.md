# suitaw.github.io

个人项目仓库，GitHub Pages 托管。每个项目都是独立的单文件 HTML，互不依赖。

改任何文件前先确认改的是哪个项目——它们共用一个仓库但没有共享代码。

---

## vocab-ai-v5.html

英语 SRS 词汇学习应用，约 4300 行。

**三层结构**：`words.js`（内置词库）+ `nce.js`（新概念课程库）+ 主 HTML。
数据全在 `localStorage`，无后端。

**关键实现**：
- **FSRS-6** 间隔重复算法（2026-08 从 SM-2 换过来），评分四档：忘了/困难/记得/秒答
- 页面切换靠手写的 `go()` 和 `render()`，四个一级页面：学习 / AI 助手 / 复习·库 / 统计
- AI 请求统一走 `callAI()` 和 `callAIStream()`
- 五个 provider：DeepSeek、Kimi、OpenRouter、Anthropic、OpenAI，key 分开存

**FSRS 相关约定**：
- 21 个参数和全部公式照抄 `open-spaced-repetition/py-fsrs` 的 `fsrs/scheduler.py`，**不要凭记忆改数值**，要改先去核对源码
- 只实现长期公式，没有 Anki 那套 learning/relearning 分步队列——本应用队列是"忘了就塞回队尾"，没有分步概念
- `srs` 每条含 `s`(稳定性)/`d`(难度)/`lr`(上次复习)，同时继续维护 `due`/`interval`/`reps`/`lapses` 供旧 UI 读取，**别删这几个兼容字段**
- 不需要"提前复习保护"补丁了：同日重刷时 elapsed=0 → R=1 → 稳定性增量恰好为 0，FSRS 天然覆盖
- 换算法时旧 SM-2 进度转存在 `vocab_v5_srs_sm2backup`，`vocab_v5_fsrs_reset` 是防重复重置的标记位

**踩过的坑，别再犯**：
- `callAIStream` 的 `onChunk` 收到的是**累积全文**，不是增量 —— 用 `=` 不是 `+=`
- 图片处理统一走 `readFileBytes`。vivo 相册交给浏览器的是 MediaStore 编号引用（`f.name` 是纯数字无扩展名）不是真实文件，用 `createObjectURL` 读一次失败后再用 `FileReader` 读同一个失效引用必然二次失败，还会吞掉真实错误。

---

## repay-tracker.html

多平台分期还款计划表。

- 覆盖平台：360、京东、美团、Apple、一加
- 按周分组，品牌色区分，白色极简风
- 有独立部署脚本 `deploy_repay.sh`

---

## exam-quiz.html

609 题题库应用，8 个章节。

**硬性约定：只改 `exam-quiz.html`，永远不要动 `questions.js`。**

---

## 够级记牌器

Android 悬浮窗 PWA，当前 v13（简化版，只记录对手出牌）。

- 三人手牌追踪，够级阈值触发金色徽章闪烁 + 震动
- 明暗主题，含出牌轮转逻辑

**游戏背景**（改逻辑前必须理解）：
够级是 6 人 6 副牌的老鹰变体。牌力：老鹰 > 大王 > 小王 > 2 > A > … > 5 > 4 > 3。
3 每种 6 张，其他点数在牌池里各 24 张。
机制包括：开点、打点、闷、憋四、烧牌、过牌、让牌、进供的各种变体、买三买四。

---

## codepath.html

40 课时的项目制 Python 课程，课程数据在 `lessons.js`。最终产物是 debug_agent。
