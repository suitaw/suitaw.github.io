# suitaw.github.io

个人项目仓库，GitHub Pages 托管。项目之间互不依赖，**改任何文件前先确认改的是哪个项目**。

都是单文件 HTML（数据放同目录的 `.js`）。

根目录没有 `index.html`，`https://suitaw.github.io/` 是 404，各项目要用完整路径访问。

---

## debian 容器（截图环境）—— 2026-08-17 重装记录

容器 rootfs 被重置过一次，连 `node`、`curl` 都没了。重装踩的坑按顺序记在这儿，
**下次再被重置，照这个走能省掉一整轮试错**。

**① 镜像源：北外和清华在这个网络下都 403，用阿里云或中科大。**
北外对 `pool/main/n/node-*` 和整个 debian-security 返回 403，
表现是 apt 下到一半报一串「无法下载 ... 403」然后**整批回滚**（apt 是原子的，
一个包下不来就全不装）—— 看着像装了半天什么都没装上。
换源前先用 Termux 这边的 `curl` 挨个探一遍再动手，别直接 apt 试。
原 `sources.list` 备份在容器 `/etc/apt/sources.list.bak-0817`。

**② proot 的 `--link2symlink` 会把 dpkg 的状态文件弄丢**（最坑的一个）。
症状：`dpkg: 无法恢复的致命错误，中止: 新建备份文件 '/var/lib/dpkg/status-old' 时出错: 不允许的操作`，
而且**每次 apt 都在同一处倒下**。
原理：dpkg 写状态时要 `link(status, status-old)`；proot 用
`.l2s.<名字><4位序号>` 这套文件来模拟硬链接。**如果目录里已经有同名的
`.l2s.status0001` 残留（上次中断留下的），转换就会失败，而原文件已经被移走了 ——
于是 `/var/lib/dpkg/status` 直接消失，apt 彻底不能用。**
- **`force-unsafe-io` 不解决这个，别浪费时间试**（它管的是 fsync，不是 link）
- 恢复：内容还在 `.l2s.status0001.000N` 里，挑 `grep -c '^Package:'` 最多、时间最新的那个
  → `cp` 出来备份 → **删掉所有 `.l2s.status*`** → 复原成 `status` → `dpkg --configure -a`
- 判据：清完残留后手动 `ln status status-old` 能成功，就修好了
- `libpam-systemd` / `libgtk-3-0t64` 配置失败是正常的（proot 里没 systemd），不影响 headless chromium

**③ npm 不用装**：`playwright-core` 是**零依赖**包，
`curl` 下 npmmirror 的 tarball（3MB）解压到 `/root/node_modules/playwright-core` 就能 require。
Debian 的 `npm` 包要拖一长串 `node-*` 依赖，正是 403 最密集的那批。

**④ 中文字体和 emoji 字体都得装**（`fonts-noto-cjk` + `fonts-noto-color-emoji`）。
少了 emoji 字体，页面里的 ⚡✅⛔ 会渲染成豆腐块 —— 而 **canvas 里的气泡文字也带 emoji，
宽度会算错**，等于截图白截。你手机上是有这些字体的，所以这纯粹是截图环境要补齐。

**shot.js 的新位置和用法**（放共享目录，容器再被重置也不会丢；模块在容器里，重装即可）：
```
~/deb-run.sh "node /root/sdcard/webdev/shot.js <输入> <输出.png> [选项] [选择器...]"
```
- **输入输出一律写绝对路径**（`/root/sdcard/webdev/xxx`）。`cd` 过去再传相对路径会拼成
  `file://circuit-basics.html/` 直接报 ERR_INVALID_URL
- `--vp` 只截视口那一屏 —— **验吸顶栏/sticky 必须加**，`fullPage` 对 fixed/sticky 会画错位
- 末尾可以跟**多个选择器**，按顺序依次点击（每次等 400ms），
  用来验「点两下才出现」的状态：`'.tab[data-i="1"]' '#b1 button[data-s="C"]'`
- 有 JS 报错会打 `CONSOLE ERRORS`（`pageerror` 也接了）

---

## exam-quiz.html

609 题题库应用，8 个章节。

**硬性约定：只改 `exam-quiz.html`，永远不要动 `questions.js`。**
