// Codepath 课程骨架。每节只存"骨架"，逐行讲解/报错解释/批改由 AI 现场生成+缓存。
// 加一节课 = 往这个数组里加一个对象。永久存仓库，不依赖任何会话。
// 选词原则：优先 Python 官方文档/课程高频术语，tip 标注文档里怎么用。
const LESSONS = [
  {
    id: "L01",
    stage: 1,
    stageName: "让 Agent 会说话",
    num: 1,
    title: "Your First Line",
    titleZh: "你的第一行代码",
    agentVersion: "v0.1",
    agentNote: "Agent 学会了开口说话",
    minutes: 15,
    code: `print("Debug Agent online.")`,
    output: `Debug Agent online.`,
    brief: "你的 debug agent 诞生了。这一行让它第一次开口——这是它将来报告错误、给你建议的能力起点。",
    // Python 文档/课程高频术语，每个 tip 标注文档里的用法
    words: [
      { word: "print", phonetic: "/prɪnt/", pos: "v.", cn: "打印；输出到屏幕", tip: "文档写作 print() 函数；日常指印刷，编程里指显示内容" },
      { word: "function", phonetic: "/ˈfʌŋkʃn/", pos: "n.", cn: "函数", tip: "文档里 print() 称作 a built-in function（内置函数）" },
      { word: "argument", phonetic: "/ˈɑːɡjumənt/", pos: "n.", cn: "参数（实参）", tip: "文档 print(*objects) 里你传进去的值就叫 argument" },
      { word: "string", phonetic: "/strɪŋ/", pos: "n.", cn: "字符串", tip: "文档缩写 str；引号括起来的文本就是 string" },
      { word: "statement", phonetic: "/ˈsteɪtmənt/", pos: "n.", cn: "语句", tip: "文档里一行可执行的代码叫 a statement" },
      { word: "output", phonetic: "/ˈaʊtpʊt/", pos: "n.", cn: "输出（结果）", tip: "和 input 相对；文档说 print writes to standard output" },
      { word: "syntax", phonetic: "/ˈsɪntæks/", pos: "n.", cn: "语法", tip: "报错 SyntaxError 就是它；指代码书写规则" },
      { word: "error", phonetic: "/ˈerə/", pos: "n.", cn: "错误", tip: "各种 ...Error 的词根；文档 errors 章节高频" },
      { word: "exception", phonetic: "/ɪkˈsepʃn/", pos: "n.", cn: "异常", tip: "文档把运行时错误统称 exceptions（异常）" },
      { word: "literal", phonetic: "/ˈlɪtərəl/", pos: "n./adj.", cn: "字面量", tip: "报错 string literal 即字符串字面量；直接写出的值" },
      { word: "built-in", phonetic: "/ˌbɪltˈɪn/", pos: "adj.", cn: "内置的", tip: "文档 Built-in Functions 一页列的就是 print 这类自带函数" },
      { word: "online", phonetic: "/ˈɒnlaɪn/", pos: "adj.", cn: "在线的；上线", tip: "程序里常表示某模块已启动可用" }
    ],
    breakIt: [
      `print("Debug Agent online.)`,
      `Print("Debug Agent online.")`,
      `print(Debug Agent online)`
    ],
    // "文档里长这样"：Python 官方文档 print() 说明里的真实原句
    docQuote: `Print objects to the text stream file, separated by sep and followed by end.`
  }
];

if (typeof module !== "undefined") module.exports = { LESSONS };
