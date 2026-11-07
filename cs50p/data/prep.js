LESSONS.prep = {"title": "第 0 步 · 准备", "steps": [
{"id": "how", "kicker": "准备 1/5", "title": "这套东西怎么用",
 "html": "<p>每一讲都按同样的 5 步走，一讲大约 4～5 天（每天 2～3 小时）：</p><ul><li><b>课前</b>：刷这一讲的 Anki 生词，混个脸熟。</li><li><b>分段看课</b>：中英字幕版视频切成 10～20 分钟一段。每段先看「注意什么」，看完在 Termux 里亲手敲代码、故意犯错，再做小题。</li><li><b>过关测验</b>：做这一讲的复习题，答对 8 成再往下。</li><li><b>练习题</b>：哈佛官方作业，配中文题意和一层层的提示。</li><li><b>英语遍</b>：原版视频只开英文字幕再看一遍，再刷原声语块卡。</li></ul><p><b>每天固定</b>：开始前刷 15 分钟 Anki。</p><p><b>英语怎么一步步撤字幕</b>：第 0～3 讲第二遍开英文字幕；第 4～6 讲第二遍试试不开字幕；第 7～9 讲第一遍就直接看英文字幕版，中英版只在卡住时查。</p><p class=\"tip\">一屏一步，做完点下面的「下一步」。有小题的那一屏，小题都答对了才能往下走。</p>"},
{"id": "anki", "kicker": "准备 2/5", "title": "装好 Anki 牌组",
 "html": "<ul><li>如果 Anki 里已经有旧的 CS50P 牌组，先删掉（长按牌组 → 删除），避免和新的混在一起。</li><li>打开手机「文件」→ <code>Download/转写/CS50P-全课/CS50P-全套.apkg</code>，用 AnkiDroid 打开就会导入。</li><li>导入后是 CS50P → 必背清单 / 第0讲…第9讲，每讲下面分<b>生词、语块、复习题</b>三组。</li><li>只点开正在学的那一讲来刷，不要点最外层的 CS50P（那样会把十讲混在一起）。</li></ul><h3>三种卡怎么刷</h3><ul><li><b>生词</b>：看词、听读音，想意思再翻面。背面例句有老师原声。</li><li><b>语块</b>：只听老师原声，说出意思再翻面。听不懂多点几遍，看完文字再回去听一遍。</li><li><b>复习题</b>：读代码猜输出。</li></ul>"},
{"id": "termux", "kicker": "准备 3/5", "title": "在 Termux 里写和运行代码",
 "html": "<ul><li>建练习文件夹：输入 <code>mkdir ~/cs50</code> 回车，再输入 <code>cd ~/cs50</code> 回车。以后每次打开 Termux 先 <code>cd ~/cs50</code>。</li><li><b>写文件</b>：<code>nano hello.py</code> 打开编辑器写代码；<b>Ctrl+O</b> 再回车保存，<b>Ctrl+X</b> 退出。Ctrl 在键盘上方那排键里。</li><li><b>运行</b>：<code>python hello.py</code>。</li><li><b>随手试一行</b>：只输入 <code>python</code> 回车，出现 <code>&gt;&gt;&gt;</code> 就能一行一行试，<code>exit()</code> 退出。</li></ul><p class=\"tip\">现在就试一遍：建文件夹、用 nano 写一行 <code>print(\"hi\")</code>、保存退出、运行，看到 hi 就成功了。</p>"},
{"id": "video", "kicker": "准备 4/5", "title": "看视频的地方",
 "html": "<ul><li><b>中英字幕版</b>在手机 <code>Download/转写/CS50P-全课/</code>，用相册或任意播放器打开。每一屏会写「看 12:50 – 20:10」，拖到对应时间就行。</li><li><b>英文原版</b>在 <a href=\"https://cs50.harvard.edu/python/2022/\" target=\"_blank\" style=\"color:var(--accent)\">CS50P 官网</a>，播放器能单独开英文字幕，英语遍用它。</li></ul>"},
{"id": "warm", "kicker": "准备 5/5", "title": "热身（可选）",
 "html": "<p>完全没碰过代码的话，先花 20 分钟点一遍下面两章，感受一下「读代码」是什么样：</p><p><a class=\"golink\" href=\"../learn-code.html\" target=\"_blank\">读代码入门 · 变量 ↗</a></p><p><a class=\"golink\" href=\"../learn-code-2.html\" target=\"_blank\">读代码入门 · 判断 ↗</a></p><p class=\"tip\">准备完了，点「完成」回到路线图，开始第 0 讲。</p>"}
]};
