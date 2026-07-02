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
  docQuote: `Print objects to the text stream file, separated by sep and followed by end.`
},
// L02-L06 待追加进 LESSONS 数组（插入 L01 之后）

{
  id: "L02",
  stage: 1,
  stageName: "让 Agent 会说话",
  num: 2,
  title: "When It Breaks",
  titleZh: "当它崩溃时",
  agentVersion: "v0.1",
  agentNote: "Agent 第一次学会认错误",
  minutes: 15,
  code: `print("Debug Agent online.")`,
  output: `Debug Agent online.`,
  brief: "上一课 Agent 能说话了，这一课我们故意把它弄崩溃三次——这是它未来最重要的能力：读懂错误、报告错误。",
  words: [
    { word: "traceback", phonetic: "/ˈtreɪsbæk/", pos: "n.", cn: "错误追踪信息", tip: "文档统一叫 Traceback (most recent call last)，是报错的第一行" },
    { word: "quote", phonetic: "/kwoʊt/", pos: "n./v.", cn: "引号；引用", tip: "文档 quotation mark；缺引号是最常见的 SyntaxError 之一" },
    { word: "case", phonetic: "/keɪs/", pos: "n.", cn: "大小写", tip: "文档强调 Python is case-sensitive（区分大小写）" },
    { word: "indent", phonetic: "/ɪnˈdent/", pos: "v./n.", cn: "缩进", tip: "文档 indentation；Python 用缩进划分代码块，不是花括号" },
    { word: "undefined", phonetic: "/ˌʌndɪˈfaɪnd/", pos: "adj.", cn: "未定义的", tip: "NameError 常见描述：name 'x' is not defined" }
  ],
  breakIt: [
    `print("Debug Agent online.)`,
    `Print("Debug Agent online.")`,
    `    print("Debug Agent online.")`
  ],
  docQuote: `When an exception occurs, an exception object is created and the interpreter raises it.`
},

{
  id: "L03",
  stage: 1,
  stageName: "让 Agent 会说话",
  num: 3,
  title: "Quote Everything",
  titleZh: "各种引号用法",
  agentVersion: "v0.2",
  agentNote: "Agent 学会说更复杂的话",
  minutes: 15,
  code: `name = "Debug Agent"
print(f"Hi, I'm {name}, ready to help.")`,
  output: `Hi, I'm Debug Agent, ready to help.`,
  brief: "Agent 现在只会说一句固定的话。这一课教它用变量拼句子，用 f-string 让内容动态变化，还学会处理带撇号的句子。",
  words: [
    { word: "variable", phonetic: "/ˈveəriəbl/", pos: "n.", cn: "变量", tip: "文档反复出现的核心概念，指存储值的名字" },
    { word: "assign", phonetic: "/əˈsaɪn/", pos: "v.", cn: "赋值", tip: "文档 assignment statement；等号 = 就是在赋值" },
    { word: "concatenate", phonetic: "/kənˈkætɪneɪt/", pos: "v.", cn: "拼接（字符串）", tip: "文档 string concatenation；用 + 或 f-string 拼字符串" },
    { word: "format", phonetic: "/ˈfɔːrmæt/", pos: "v./n.", cn: "格式化", tip: "文档 Formatted String Literals，就是 f-string 的官方名字" },
    { word: "escape", phonetic: "/ɪˈskeɪp/", pos: "v.", cn: "转义", tip: "文档 escape sequence；用反斜杠处理引号冲突，如 \\'" }
  ],
  breakIt: [
    `name = "Debug Agent
print(f"Hi, I'm {name}")`,
    `print(f"Hi, I'm {nam}, ready to help.")`,
    `print('I'm Debug Agent')`
  ],
  docQuote: `Formatted string literals let you include the value of Python expressions inside a string.`
},

{
  id: "L04",
  stage: 1,
  stageName: "让 Agent 会说话",
  num: 4,
  title: "Do Some Math",
  titleZh: "做点数学题",
  agentVersion: "v0.3",
  agentNote: "Agent 学会计算",
  minutes: 15,
  code: `errors_found = 3
lines_checked = 42
print(f"Found {errors_found} errors in {lines_checked} lines.")`,
  output: `Found 3 errors in 42 lines.`,
  brief: "一个真正的 Debug Agent 得会数数——数出几个错误、扫了多少行代码。这一课学数字运算，以及数字和字符串搞混时会发生什么。",
  words: [
    { word: "integer", phonetic: "/ˈɪntɪdʒər/", pos: "n.", cn: "整数", tip: "文档缩写 int；不带小数点的数字类型" },
    { word: "float", phonetic: "/floʊt/", pos: "n.", cn: "浮点数", tip: "文档 float type；带小数点的数字，如 3.14" },
    { word: "operator", phonetic: "/ˈɒpəreɪtər/", pos: "n.", cn: "运算符", tip: "文档 arithmetic operators：+ - * / 等" },
    { word: "convert", phonetic: "/kənˈvɜːrt/", pos: "v.", cn: "转换（类型）", tip: "文档 type conversion；用 str()/int() 互相转换" },
    { word: "type", phonetic: "/taɪp/", pos: "n.", cn: "类型", tip: "文档 data type；每个值都有类型，如 int/str/float" }
  ],
  breakIt: [
    `errors_found = 3
lines_checked = "42"
print(errors_found + lines_checked)`,
    `print(f"Found {errors_found + } errors")`,
    `result = 10 / 0
print(result)`
  ],
  docQuote: `The type() function can be used to identify the type of an object.`
},

{
  id: "L05",
  stage: 1,
  stageName: "让 Agent 会说话",
  num: 5,
  title: "Leave Notes",
  titleZh: "留下注释",
  agentVersion: "v0.4",
  agentNote: "Agent 的代码开始有说明文档",
  minutes: 10,
  code: `# Debug Agent v0.4
# 统计本次检查发现的错误数
errors_found = 3  # 目前先手动赋值，后面会自动统计
print(f"Found {errors_found} errors.")`,
  output: `Found 3 errors.`,
  brief: "代码写多了，自己都会忘记为什么这么写。这一课学用 # 写注释，还学 Python 变量命名的规范写法（snake_case）。",
  words: [
    { word: "comment", phonetic: "/ˈkɒment/", pos: "n.", cn: "注释", tip: "文档 comments；# 后面的内容解释器完全忽略，只给人看" },
    { word: "readable", phonetic: "/ˈriːdəbl/", pos: "adj.", cn: "可读的", tip: "PEP 8（Python 代码规范文档）核心目标就是 readable code" },
    { word: "convention", phonetic: "/kənˈvenʃn/", pos: "n.", cn: "约定；规范", tip: "文档 naming convention；snake_case 是 Python 变量命名约定" },
    { word: "underscore", phonetic: "/ˈʌndərskɔːr/", pos: "n.", cn: "下划线", tip: "snake_case 里连接单词用的符号，如 errors_found" },
    { word: "docstring", phonetic: "/ˈdɒkstrɪŋ/", pos: "n.", cn: "文档字符串", tip: "文档 docstring；比 # 注释更正式，用三引号写在函数/模块开头" }
  ],
  breakIt: [
    `# 这行没问题
print("ok")  # 这个注释后面多打了一个引号"
print("test")`,
    `errorsFound = 3
print(f"Found {errors_found} errors.")`,
    `#忘记加空格的注释也能跑，但不符合规范
print("test")`
  ],
  docQuote: `Comments in Python start with the hash character, #, and extend to the end of the physical line.`
},

{
  id: "L06",
  stage: 1,
  stageName: "让 Agent 会说话",
  num: 6,
  title: "Make It a Real Script",
  titleZh: "让它成为真正的脚本",
  agentVersion: "v0.6",
  agentNote: "Debug Agent 正式建立，Stage 1 毕业",
  minutes: 20,
  code: `# debug_agent.py
# Debug Agent v0.6 — Stage 1 毕业版本

agent_name = "Debug Agent"
version = "0.6"
errors_found = 3
lines_checked = 42

print(f"{agent_name} v{version} starting up...")
print(f"Checked {lines_checked} lines, found {errors_found} errors.")`,
  output: `Debug Agent v0.6 starting up...
Checked 42 lines, found 3 errors.`,
  brief: "把这一课的代码存成 debug_agent.py，在终端里用 python debug_agent.py 运行它——这是它第一次离开浏览器，作为真正的脚本文件存在。Stage 1 到此结束。",
  words: [
    { word: "script", phonetic: "/skrɪpt/", pos: "n.", cn: "脚本", tip: "文档 script；一个可以直接运行的 .py 文件" },
    { word: "terminal", phonetic: "/ˈtɜːrmɪnl/", pos: "n.", cn: "终端", tip: "命令行窗口，运行 python debug_agent.py 的地方" },
    { word: "interpreter", phonetic: "/ɪnˈtɜːrprɪtər/", pos: "n.", cn: "解释器", tip: "文档 Python interpreter；逐行读取并执行你代码的程序" },
    { word: "execute", phonetic: "/ˈeksɪkjuːt/", pos: "v.", cn: "执行", tip: "文档 execute a script；运行代码的正式说法" },
    { word: "extension", phonetic: "/ɪkˈstenʃn/", pos: "n.", cn: "扩展名", tip: "文档 file extension；.py 就是 Python 文件的扩展名" }
  ],
  breakIt: [
    `# 文件名存成 debug_agent.txt 而不是 .py 会怎样？
print("test")`,
    `agent_name = "Debug Agent"
version = "0.6"
print(f"{agent_name} v{Version} starting up...")`,
    `# 终端里忘记打 python，直接打文件名
debug_agent.py`
  ],
  docQuote: `If you use Python interactively from a shell script or command file, that shell knows nothing about how to run Python programs, so you must run the interpreter explicitly.`
}
];

if (typeof module !== "undefined") module.exports = { LESSONS };
