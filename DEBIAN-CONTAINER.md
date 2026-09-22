# debian 容器（截图环境）重装手册

> 从仓库 CLAUDE.md 挪出来（2026-09-22）。容器被重置、shot.js 跑不起来时照这个走。

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
