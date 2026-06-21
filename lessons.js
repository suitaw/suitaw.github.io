// Codepath 课程骨架。每节只存"骨架"，逐行讲解/报错解释/批改由 AI 现场生成+缓存。
// 加一节课 = 往这个数组里加一个对象。永久存仓库，不依赖任何会话。
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
    // 这节课要造的核心代码（学习者最终会运行它）
    code: `print("Debug Agent online.")`,
    output: `Debug Agent online.`,
    // 一句话讲这节在造什么（开场钩子，AI 会据此展开）
    brief: "你的 debug agent 诞生了。这一行让它第一次开口——这是它将来报告错误、给你建议的能力起点。",
    // 要掌握的英文词（学完进 SRS，格式兼容 Vocab AI 的 words.js）
    words: [
      { word: "print", phonetic: "/prɪnt/", pos: "v.", cn: "打印；输出", tip: "日常指印刷，编程里指把内容显示到屏幕" },
      { word: "online", phonetic: "/ˈɒnlaɪn/", pos: "adj.", cn: "在线的；上线", tip: "程序里常表示某模块已启动可用" },
      { word: "output", phonetic: "/ˈaʊtpʊt/", pos: "n.", cn: "输出（结果）", tip: "和 input 输入相对，程序产生的东西" }
    ],
    // 故意弄坏它的几种方式（AI 会逐个解释报错怎么读）
    breakIt: [
      `print("Debug Agent online.)`,
      `Print("Debug Agent online.")`,
      `print(Debug Agent online)`
    ]
  }
];

if (typeof module !== "undefined") module.exports = { LESSONS };
