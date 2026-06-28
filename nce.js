// ===== NCE 课程库 (独立于 words.js) =====
// 结构: NCE_COURSES = { 课程key: { name, lessons:[ {lid,title,text,words,phrases,grammar,explain} ] } }
//   lid     课次唯一id, 如 nce2_l6
//   title   标题(英文+中文)
//   text    课文正文(纯英文, 供精读切块)
//   words   生词 [{word,phonetic,pos,cn,tip,exampleEn,exampleCn}]
//   phrases 短语 [{phrase,cn,tip,type}]   type: phrasal/collocation/prep/other
//   grammar 语法 [{point,cn,example,topic}] topic: tense/word/sentence/other
//   explain 注释+参考译文(中文)
// 加新课: 在对应课程 lessons 数组里追加一个对象即可, 不动主程序
const NCE_COURSES = {
  "nce2": {
    "name": "新概念二",
    "lessons": [
      {
        "lid": "nce2_l1",
        "title": "NCE2 L1 A private conversation 私人谈话",
        "text": "Last week I went to the theatre. I had a very good seat. The play was very interesting. I did not enjoy it. A young man and a young woman were sitting behind me. They were talking loudly. I got very angry. I could not hear the actors. I turned round. I looked at the man and the woman angrily. They did not pay any attention. In the end, I could not bear it. I turned round again. 'I can't hear a word!' I said angrily. 'It's none of your business,' the young man said rudely. 'This is a private conversation!'",
        "words": [
          {
            "word": "private",
            "phonetic": "/'praɪvɪt/",
            "pos": "adj.",
            "cn": "私人的",
            "exampleEn": "This is a private matter, so please don't ask.",
            "exampleCn": "这是私事，请不要问。"
          },
          {
            "word": "conversation",
            "phonetic": "/ˌkɒnvə'seɪʃən/",
            "pos": "n.",
            "cn": "谈话",
            "exampleEn": "We had a long conversation about our future.",
            "exampleCn": "我们就未来进行了一次长谈。"
          },
          {
            "word": "theatre",
            "phonetic": "/'θɪətə/",
            "pos": "n.",
            "cn": "剧场，戏院",
            "exampleEn": "They went to the theatre to see a new play.",
            "exampleCn": "他们去剧院看一出新戏。"
          },
          {
            "word": "seat",
            "phonetic": "/siːt/",
            "pos": "n.",
            "cn": "座位",
            "exampleEn": "Please take your seat; the show is about to start.",
            "exampleCn": "请就座，演出马上开始。"
          },
          {
            "word": "play",
            "phonetic": "/pleɪ/",
            "pos": "n.",
            "cn": "戏",
            "exampleEn": "The play lasted nearly three hours.",
            "exampleCn": "这出戏持续了将近三个小时。"
          },
          {
            "word": "loudly",
            "phonetic": "/'laʊdli/",
            "pos": "adv.",
            "cn": "大声地",
            "exampleEn": "The children were laughing loudly in the garden.",
            "exampleCn": "孩子们在花园里大声笑着。"
          },
          {
            "word": "angry",
            "phonetic": "/'æŋgri/",
            "pos": "adj.",
            "cn": "生气的",
            "exampleEn": "She was angry because nobody listened to her.",
            "exampleCn": "她很生气，因为没人听她说话。"
          },
          {
            "word": "angrily",
            "phonetic": "/'æŋgrɪli/",
            "pos": "adv.",
            "cn": "生气地",
            "exampleEn": "He slammed the door angrily and left.",
            "exampleCn": "他生气地摔门离开了。"
          },
          {
            "word": "attention",
            "phonetic": "/ə'tenʃən/",
            "pos": "n.",
            "cn": "注意",
            "exampleEn": "Please pay attention to what I am saying.",
            "exampleCn": "请注意我说的话。"
          },
          {
            "word": "bear",
            "phonetic": "/beə/",
            "pos": "v.",
            "cn": "容忍",
            "exampleEn": "I cannot bear the noise any longer.",
            "exampleCn": "我再也无法忍受这噪音了。"
          },
          {
            "word": "business",
            "phonetic": "/'bɪznɪs/",
            "pos": "n.",
            "cn": "事",
            "exampleEn": "What I do after work is my own business.",
            "exampleCn": "我下班后做什么是我自己的事。"
          },
          {
            "word": "rudely",
            "phonetic": "/'ruːdli/",
            "pos": "adv.",
            "cn": "无礼地，粗鲁地",
            "exampleEn": "He answered the teacher rudely.",
            "exampleCn": "他粗鲁地回答了老师。"
          }
        ],
        "phrases": [
          {
            "phrase": "go to the theatre",
            "cn": "去看戏",
            "tip": "固定搭配，theatre 前用定冠词 the",
            "type": "collocation"
          },
          {
            "phrase": "get angry",
            "cn": "生气",
            "tip": "get + 形容词，表示变得…；课文 got angry 为过去式",
            "type": "collocation"
          },
          {
            "phrase": "turn round",
            "cn": "转身",
            "tip": "也可用 turn around",
            "type": "phrasal"
          },
          {
            "phrase": "pay attention",
            "cn": "注意",
            "tip": "pay attention to sth. 注意某事",
            "type": "collocation"
          },
          {
            "phrase": "none of your business",
            "cn": "不关你的事",
            "tip": "口语，表示对方无权过问",
            "type": "other"
          }
        ],
        "grammar": [
          {
            "point": "I could not bear it. 中 it 的指代",
            "cn": "it 指上文中那对男女大声说话又不理会作者愤怒目光这件事",
            "example": "I could not bear it. 我无法忍受（这种情形）。",
            "topic": "sentence"
          }
        ],
        "explain": "【课文注释】\n1. go to the theatre 去看戏。\n2. got angry 生气。\n3. turn round 转身，也可用 turn around。\n4. pay attention 注意。\n5. I could not bear it. 我无法忍受。其中的 it 是指上文中那对男女大声说话又不理会作者的愤怒目光。\n6. none of your business 不关你的事。\n\n【参考译文】\n上星期我去看戏。我的座位很好，戏很有意思，但我却无法欣赏。一青年男子与一青年女子坐在我的身后，大声地说着话。我非常生气，因为我听不见演员在说什么。我回过头去怒视着那一男一女，他们却毫不理会。最后，我忍不住了，又一次回过头去，生气地说：“我一个字也听不见了！”\n“不关你的事，”那男的毫不客气地说，“这是私人间的谈话！”"
      },
      {
        "lid": "nce2_l2",
        "title": "NCE2 L2 Breakfast or lunch? 早餐还是午餐？",
        "text": "It was Sunday. I never get up early on Sundays. I sometimes stay in bed until lunchtime. Last Sunday I got up very late. I looked out of the window. It was dark outside. 'What a day!' I thought. 'It's raining again.' Just then, the telephone rang. It was my Aunt Lucy. 'I've just arrived by train,' she said. 'I'm coming to see you.' 'But I'm still having breakfast,' I said. 'What are you doing?' she asked. 'I'm having breakfast,' I repeated. 'Dear me!' she said. 'Do you always get up so late? It's one o'clock!'",
        "words": [
          {
            "word": "until",
            "phonetic": "/ʌn'tɪl/",
            "pos": "prep.",
            "cn": "直到",
            "exampleEn": "I waited until the rain stopped.",
            "exampleCn": "我一直等到雨停。"
          },
          {
            "word": "outside",
            "phonetic": "/ˌaʊt'saɪd/",
            "pos": "adv.",
            "cn": "在外面",
            "exampleEn": "It was cold and dark outside.",
            "exampleCn": "外面又冷又黑。"
          },
          {
            "word": "ring",
            "phonetic": "/rɪŋ/",
            "pos": "v.",
            "cn": "（铃、电话等）响",
            "exampleEn": "The phone rang just as I sat down.",
            "exampleCn": "我刚坐下电话就响了。"
          },
          {
            "word": "aunt",
            "phonetic": "/ɑːnt/",
            "pos": "n.",
            "cn": "姑，姨，婶，舅母",
            "exampleEn": "My aunt is coming to visit us next week.",
            "exampleCn": "我姑姑下周要来看我们。"
          },
          {
            "word": "repeat",
            "phonetic": "/rɪ'piːt/",
            "pos": "v.",
            "cn": "重复",
            "exampleEn": "Could you repeat the question, please?",
            "exampleCn": "请你把问题再说一遍好吗？"
          }
        ],
        "phrases": [
          {
            "phrase": "on Sundays",
            "cn": "每个星期日",
            "tip": "星期几的前面用介词 on；复数表示每逢",
            "type": "prep"
          },
          {
            "phrase": "get up",
            "cn": "起床",
            "tip": "动副结构",
            "type": "phrasal"
          },
          {
            "phrase": "stay in bed",
            "cn": "躺在床上不起",
            "tip": "stay in + 处所",
            "type": "collocation"
          },
          {
            "phrase": "look out of the window",
            "cn": "向窗外看",
            "tip": "look out of 从…向外看",
            "type": "collocation"
          },
          {
            "phrase": "arrive by train",
            "cn": "乘火车到达",
            "tip": "by + 交通工具，中间不加冠词",
            "type": "prep"
          }
        ],
        "grammar": [
          {
            "point": "What a day! 感叹句（省略）",
            "cn": "完整应为 What a day it is！英语感叹句常用 What 开头，后接名词或名词性短语，再接主语和谓语（含连系动词），句尾用感叹号",
            "example": "What a beautiful garden (it is)! 多么美的花园啊！",
            "topic": "sentence"
          },
          {
            "point": "现在进行时表将来",
            "cn": "现在进行时可表示近期按计划或安排要进行的动作",
            "example": "I'm coming to see you. 我这就来看你。",
            "topic": "tense"
          },
          {
            "point": "Dear me! 感叹句",
            "cn": "Dear me! 天哪！也是一个感叹句，表示惊讶",
            "example": "Dear me! It's already one o'clock! 天哪！已经一点了！",
            "topic": "sentence"
          }
        ],
        "explain": "【课文注释】\n1. on Sundays 指每个星期日。星期几的前面用介词 on。\n2. What a day! 多么糟糕的天气！这是一个省略的感叹句。完整的句子应该是 What a day it is! 英语中的感叹句常用 What 开头，后面紧跟一个名词或名词性短语，然后是主语和谓语（包括连系动词），句尾用感叹号。\n3. I'm coming to see you. 在这句话中现在进行时用来表示近期按计划或安排要进行的动作。\n4. Dear me! 天哪！这也是一个感叹句。\n\n【参考译文】\n那是个星期天，而在星期天我是从来不早起的，有时我要一直躺到吃午饭的时候。上个星期天，我起得很晚。我望望窗外，外面一片昏暗。“鬼天气！”我想，“又下雨了。”正在这时，电话铃响了。是我姑母露西打来的。“我刚下火车，”她说，“我这就来看你。”\n“但我还在吃早饭，”我说。\n“你在干什么？”她问道。\n“我正在吃早饭，”我又说了一遍。\n“天啊，”她说，“你总是起得这么晚吗？现在已经 1 点钟了！”"
      },
      {
        "lid": "nce2_l3",
        "title": "NCE2 L3 Please send me a card 请给我寄一张明信片",
        "text": "Postcards always spoil my holidays. Last summer, I went to Italy. I visited museums and sat in public gardens. A friendly waiter taught me a few words of Italian. Then he lent me a book. I read a few lines, but I did not understand a word. Every day I thought about postcards. My holidays passed quickly, but I did not send cards to my friends. On the last day I made a big decision. I got up early and bought thirty-seven cards. I spent the whole day in my room, but I did not write a single card!",
        "words": [
          {
            "word": "send",
            "phonetic": "/send/",
            "pos": "v.",
            "cn": "寄，送",
            "exampleEn": "Please send me a postcard from Rome.",
            "exampleCn": "请从罗马给我寄张明信片。"
          },
          {
            "word": "postcard",
            "phonetic": "/'pəʊstkɑːd/",
            "pos": "n.",
            "cn": "明信片",
            "exampleEn": "I bought a postcard of the old bridge.",
            "exampleCn": "我买了一张那座古桥的明信片。"
          },
          {
            "word": "spoil",
            "phonetic": "/spɔɪl/",
            "pos": "v.",
            "cn": "使索然无味，损坏",
            "exampleEn": "The bad weather spoiled our trip.",
            "exampleCn": "坏天气把我们的旅行搞砸了。"
          },
          {
            "word": "museum",
            "phonetic": "/mjuː'zɪəm/",
            "pos": "n.",
            "cn": "博物馆",
            "exampleEn": "We spent the morning in the art museum.",
            "exampleCn": "我们在艺术博物馆度过了一个上午。"
          },
          {
            "word": "public",
            "phonetic": "/'pʌblɪk/",
            "pos": "adj.",
            "cn": "公共的",
            "exampleEn": "The park is open to the public.",
            "exampleCn": "这个公园向公众开放。"
          },
          {
            "word": "friendly",
            "phonetic": "/'frendli/",
            "pos": "adj.",
            "cn": "友好的",
            "exampleEn": "The waiter was very friendly to us.",
            "exampleCn": "那位服务员对我们很友好。"
          },
          {
            "word": "waiter",
            "phonetic": "/'weɪtə/",
            "pos": "n.",
            "cn": "服务员，招待员",
            "exampleEn": "The waiter brought us the menu.",
            "exampleCn": "服务员给我们拿来了菜单。"
          },
          {
            "word": "lend",
            "phonetic": "/lend/",
            "pos": "v.",
            "cn": "借给",
            "exampleEn": "Can you lend me your pen for a moment?",
            "exampleCn": "你能把笔借我用一会儿吗？"
          },
          {
            "word": "decision",
            "phonetic": "/dɪ'sɪʒən/",
            "pos": "n.",
            "cn": "决定",
            "exampleEn": "She made a quick decision to leave.",
            "exampleCn": "她很快决定离开。"
          },
          {
            "word": "whole",
            "phonetic": "/həʊl/",
            "pos": "adj.",
            "cn": "整个的",
            "exampleEn": "He read the whole book in one day.",
            "exampleCn": "他一天就读完了整本书。"
          },
          {
            "word": "single",
            "phonetic": "/'sɪŋgəl/",
            "pos": "adj.",
            "cn": "唯一的，单一的",
            "exampleEn": "I didn't write a single word all day.",
            "exampleCn": "我一整天连一个字都没写。"
          }
        ],
        "phrases": [
          {
            "phrase": "a few words of Italian",
            "cn": "几句意大利语",
            "tip": "a few 修饰可数名词复数，表示肯定的少量",
            "type": "other"
          },
          {
            "phrase": "lend sb. sth.",
            "cn": "把某物借给某人",
            "tip": "= lend sth. to sb.；lend 是借出",
            "type": "collocation"
          },
          {
            "phrase": "think about",
            "cn": "考虑，想着",
            "tip": "think about sth./doing sth.",
            "type": "phrasal"
          },
          {
            "phrase": "make a decision",
            "cn": "做决定",
            "tip": "动词用 make，不用 do",
            "type": "collocation"
          },
          {
            "phrase": "the whole day",
            "cn": "一整天",
            "tip": "the whole + 单数名词 = all the …",
            "type": "collocation"
          }
        ],
        "grammar": [
          {
            "point": "lend 与 borrow 的区别",
            "cn": "lend 是借出，常用 lend sb. sth. 或 lend sth. to sb.；borrow 是借入，常用 borrow sth. 或 borrow sth. from sb.",
            "example": "He lent me a book. = He lent a book to me. 他借给我一本书。/ I borrowed a book from him. 我从他那儿借了一本书。",
            "topic": "word"
          }
        ],
        "explain": "【课文注释】\n1. a few words 几句话。\n2. lent me a book 中，lent 是借出的意思。我们常说 lend sb. sth. 或 lend sth. to sb.。borrow 是借入的意思，常用的结构是 borrow sth. 或 borrow sth. from sb.。\n\n【参考译文】\n明信片总搅得我假日不得安宁。去年夏天，我去了意大利。我参观了博物馆，还去了公园。一位好客的服务员教了我几句意大利语，之后还借给我一本书。我读了几行，但一个字也不懂。我每天都想着明信片的事。假期过得真快，可我还没有给我的朋友们寄过一张明信片。到了最后一天，我作出了一项重大决定。我早早起了床，买来了 37 张明信片。我在房间里关了整整一天。然而竟连一张明信片也没写成！"
      },
      {
        "lid": "nce2_l4",
        "title": "NCE2 L4 An exciting trip 激动人心的旅行",
        "text": "I have just received a letter from my brother, Tim. He is in Australia. He has been there for six months. Tim is an engineer. He is working for a big firm and he has already visited a great number of different places in Australia. He has just bought an Australian car and has gone to Alice Springs, a small town in the centre of Australia. He will soon visit Darwin. From there, he will fly to Perth. My brother has never been abroad before, so he is finding this trip very exciting.",
        "words": [
          {
            "word": "exciting",
            "phonetic": "/ɪk'saɪtɪŋ/",
            "pos": "adj.",
            "cn": "令人兴奋的",
            "exampleEn": "Starting a new job is always exciting.",
            "exampleCn": "开始一份新工作总是令人兴奋的。"
          },
          {
            "word": "receive",
            "phonetic": "/rɪ'siːv/",
            "pos": "v.",
            "cn": "接受，收到",
            "exampleEn": "I received your letter yesterday.",
            "exampleCn": "我昨天收到了你的信。"
          },
          {
            "word": "firm",
            "phonetic": "/fɜːm/",
            "pos": "n.",
            "cn": "商行，公司",
            "exampleEn": "He works for a large engineering firm.",
            "exampleCn": "他在一家大型工程公司工作。"
          },
          {
            "word": "different",
            "phonetic": "/'dɪfərənt/",
            "pos": "adj.",
            "cn": "不同的",
            "exampleEn": "We visited many different places on our trip.",
            "exampleCn": "旅途中我们去了许多不同的地方。"
          },
          {
            "word": "centre",
            "phonetic": "/'sentə/",
            "pos": "n.",
            "cn": "中心",
            "exampleEn": "The town lies in the centre of the country.",
            "exampleCn": "这个小镇位于该国的中心。"
          },
          {
            "word": "abroad",
            "phonetic": "/ə'brɔːd/",
            "pos": "adv.",
            "cn": "在国外",
            "exampleEn": "She has never travelled abroad before.",
            "exampleCn": "她以前从未出过国。"
          }
        ],
        "phrases": [
          {
            "phrase": "a great number of",
            "cn": "许多",
            "tip": "用于修饰复数可数名词",
            "type": "other"
          },
          {
            "phrase": "in the centre of",
            "cn": "在…中部",
            "tip": "in the centre of + 处所",
            "type": "prep"
          },
          {
            "phrase": "work for",
            "cn": "为…工作，受雇于",
            "tip": "work for + 公司/人",
            "type": "phrasal"
          },
          {
            "phrase": "fly to",
            "cn": "飞往",
            "tip": "fly to + 地点",
            "type": "collocation"
          },
          {
            "phrase": "be abroad / go abroad",
            "cn": "在国外 / 出国",
            "tip": "abroad 是副词，前面不加介词 to",
            "type": "collocation"
          }
        ],
        "grammar": [
          {
            "point": "现在完成时",
            "cn": "He has been there for six months. 他在那儿已经住了 6 个月了。表示从过去持续到现在的动作或状态，常与 for / since 连用。可参看第 1 册第 83-87 课。",
            "example": "He has been there for six months. 他在那儿已经待了六个月了。",
            "topic": "tense"
          },
          {
            "point": "a great number of 的用法",
            "cn": "a great number of 意为许多，用于修饰复数可数名词",
            "example": "a great number of different places 许多不同的地方",
            "topic": "word"
          }
        ],
        "explain": "【课文注释】\n1. He has been there for six months. 他在那儿已经住了 6 个月了。关于动词的现在完成时，可以参看第 1 册第 83-87 课。\n2. a great number of …, 许多……，用于修饰复数可数名词。\n3. in the centre of …, 在……中部。\n\n【参考译文】\n我刚刚收到弟弟蒂姆的来信，他正在澳大利亚。他在那儿已经住了 6 个月了。蒂姆是个工程师，正在为一家大公司工作，并且已经去过澳大利亚的不少地方了。他刚买了一辆澳大利亚小汽车，现在去了澳大利亚中部的小镇艾丽斯普林斯。他不久还将到达尔文去，从那里，他再飞往珀斯。我弟弟以前从未出过国，因此，他觉得这次旅行非常激动人心。"
      },
      {
        "lid": "nce2_l5",
        "title": "NCE2 L5 No wrong numbers 无错号之虞",
        "text": "Mr. James Scott has a garage in Silbury and now he has just bought another garage in Pinhurst. Pinhurst is only five miles from Silbury, but Mr. Scott cannot get a telephone for his new garage, so he has just bought twelve pigeons. Yesterday, a pigeon carried the first message from Pinhurst to Silbury. The bird covered the distance in three minutes. Up to now, Mr. Scott has sent a great many requests for spare parts and other urgent messages from one garage to the other. In this way, he has begun his own private 'telephone' service.",
        "words": [
          {
            "word": "pigeon",
            "phonetic": "/'pɪdʒɪn/",
            "pos": "n.",
            "cn": "鸽子",
            "exampleEn": "A pigeon landed on the roof of the garage.",
            "exampleCn": "一只鸽子落在车库的屋顶上。"
          },
          {
            "word": "message",
            "phonetic": "/'mesɪdʒ/",
            "pos": "n.",
            "cn": "信息",
            "exampleEn": "He sent me a short message this morning.",
            "exampleCn": "他今早给我发了一条简短的信息。"
          },
          {
            "word": "cover",
            "phonetic": "/'kʌvə/",
            "pos": "v.",
            "cn": "越过",
            "exampleEn": "The runner covered the distance in ten minutes.",
            "exampleCn": "这名跑者用十分钟跑完了全程。"
          },
          {
            "word": "distance",
            "phonetic": "/'dɪstəns/",
            "pos": "n.",
            "cn": "距离",
            "exampleEn": "The distance between the two towns is short.",
            "exampleCn": "这两个镇之间的距离很短。"
          },
          {
            "word": "request",
            "phonetic": "/rɪ'kwest/",
            "pos": "n.",
            "cn": "要求，请求",
            "exampleEn": "She made a request for more time.",
            "exampleCn": "她请求多给一些时间。"
          },
          {
            "word": "spare part",
            "phonetic": "/ˌspeə'pɑːt/",
            "pos": "n.",
            "cn": "备件",
            "exampleEn": "The garage was out of spare parts.",
            "exampleCn": "这家修理部的备件用完了。"
          },
          {
            "word": "service",
            "phonetic": "/'sɜːvɪs/",
            "pos": "n.",
            "cn": "业务，服务",
            "exampleEn": "The hotel offers excellent service.",
            "exampleCn": "这家酒店提供优质的服务。"
          }
        ],
        "phrases": [
          {
            "phrase": "from Silbury",
            "cn": "距锡尔伯里",
            "tip": "介词 from 作距、离讲，常与 away 连用：It is far (away) from here. 离这里很远。",
            "type": "prep"
          },
          {
            "phrase": "up to now",
            "cn": "到现在为止",
            "tip": "= up till now，作时间状语，句子时态多用现在完成时",
            "type": "other"
          },
          {
            "phrase": "a great many",
            "cn": "许多的",
            "tip": "great 表示数量很大；只能同可数名词复数连用",
            "type": "other"
          },
          {
            "phrase": "in this way",
            "cn": "就这样，以这种方式",
            "tip": "句首作状语",
            "type": "other"
          },
          {
            "phrase": "from one ... to the other",
            "cn": "从一个…到另一个",
            "tip": "两者之间用 one ... the other",
            "type": "other"
          }
        ],
        "grammar": [
          {
            "point": "from 作距、离讲",
            "cn": "介词 from 作距……、离……讲，常与 away 连用",
            "example": "It is far (away) from here. 离这里很远。",
            "topic": "word"
          },
          {
            "point": "up to now 与现在完成时",
            "cn": "up to now（= up till now）到现在为止，作时间状语时，句子的时态多用现在完成时",
            "example": "Up to now, he has sent many messages. 到目前为止，他已发了许多信息。",
            "topic": "tense"
          },
          {
            "point": "a great many 的用法",
            "cn": "a great many 许多的，其中 great 表示数量很大，只能同可数名词的复数连用",
            "example": "a great many requests 许多请求",
            "topic": "word"
          }
        ],
        "explain": "【课文注释】\n1. from Silbury, 介词 from 作距……、离……讲，常与 away 连用。如：It is far (away) from here. 离这里很远。\n2. up to now (= up till now), 到现在为止；作时间状语，句子的时态多用现在完成时。\n3. a great many, 许多的，其中 great 表示数量很大；只能同可数名词的复数连用。\n\n【参考译文】\n詹姆斯·斯科特先生在锡尔伯里有一个汽车修理部，现在他刚在平赫斯特买了另一个汽车修理部。平赫斯特离锡尔伯里只有 5 英里，但詹姆斯·斯科特先生未能为他新的汽车修理部搞到一部电话机，所以他买了 12 只鸽子。昨天，一只鸽子把第一封信从平赫斯特带到锡尔伯里。这只鸟只用了 3 分钟就飞完了全程。到目前为止，斯科特先生从一个汽车修理部向另一个发送了大量索取备件的信件和其他紧急函件。就这样，他开始了自己的私人“电话”业务。"
      }
    ]
  }
};
