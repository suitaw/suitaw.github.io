# 历年真题 → ../exams-data.js     用法: python3 -I build_exams.py <文字目录>
import sys,glob,json,re
sys.path.insert(0,'.')
import parse_official as po, parse_jike as pj, align22 as A, parse_2025 as p25
import os
T=sys.argv[1].rstrip('/')+'/'
def g(p): return glob.glob(T+p)[0]
exams=[]
def item(y,x,ans,exp='',alt=None):
    o={'id':f'{y}-{x["no"]}','no':x['no'],'t':x['type'],'q':x['stem'],'a':ans}
    if x['type']=='tf': o['o']=['正确','错误']
    elif x['opts']: o['o']=x['opts']
    exp=re.sub(r'uo25众\s*号\s*[：:]\s*big资源公\s*\d+\s*/\s*\d+|资?\s*源公众\s*\d+\s*/\s*\d+','',exp).strip()
    if exp: o['e']=re.sub(r'(?<=.)(?=[A-E]项(?:正确|错误|不|是|属于)|故(?:本题)?(?:正确答案|表述|说法))','\n',exp)
    if alt: o['alt']=alt
    return o
# 2018-2021 官方版；即刻版有的年份拿来对照答案
jk={2019:pj.parse(g('x_0-2019*')),2020:pj.parse(g('x_0-2020*'))}
for y in (2018,2019,2020,2021):
    q=po.parse_q(g(f'{y}*试[题卷].txt')); a=po.parse_a(g(f'{y}*解析*.txt'))
    jm={pj.norm(x['stem'])[:14]:x for x in jk.get(y,[])}
    qs=[]
    for x in q:
        r=a.get(x['no'],{}); ans=r.get('ans'); e=r.get('exp','')
        if x['type']=='tf': ans={'T':'A','F':'B'}.get(ans)
        if x['type']=='essay': ans=None
        alt=None; jx=jm.get(pj.norm(x['stem'])[:14])
        if jx and jx['ans'] and ans and jx['ans']!=ans and x['type']!='essay': alt=jx['ans']
        qs.append(item(y,x,ans,e,alt))
    exams.append({'year':y,'src':'官方解析版','hasAns':True,'qs':qs})
# 2022：题面用即刻版，答案来自扫描解析 OCR（按内容对齐）
q,ans,bl,res=A.run(); m={n:res[n][0]['no'] for n in res}; m[49]=49
jans={m[n]:ans[n] for n in m}
jq=pj.parse(g('x_209*'))
Y22=os.environ.get('Y22PARSED','')
y22e={}
if Y22 and os.path.exists(Y22):
    PP=json.load(open(Y22)); cjx=lambda z: re.sub(r'(?<=[\u4e00-\u9fff，。、；：？！”“（）]) +(?=[\u4e00-\u9fff，。、；：？！”“（）])','',z)
    for n,bl in PP['blocks'].items():
        t=re.sub(r'\s*\n\s*','',bl.strip()); t=re.sub(r'(?<=.)(?=[A-E]\s?项(?:正确|错误)|故(?:本题)?正确答案)','\n',t); t=re.sub(r'（备注.*$','',t,flags=re.S).strip()
        y22e[PP['map'][n]]=cjx(t)[:1800]
    jans2={PP['map'][n]:PP['ans'][n] for n in PP['blocks']}
    jans.update(jans2)
q22=[item(2022,x,jans.get(x['no']) if x['type']!='essay' else None,y22e.get(x['no'],'')) for x in jq]
exams.append({'year':2022,'src':'即刻题面 + 扫描解析（豆包识别，与旧 OCR 答案核对一致）','hasAns':True,'qs':q22})
# 2024：只有题
jq=pj.parse(g('x_206*'))
exams.append({'year':2024,'src':'即刻题面（无答案）','hasAns':False,'qs':[item(2024,x,None) for x in jq]})
q25=p25.parse(g('2025*试卷及答案*2.txt'))
for x in q25:
    if x['type']=='essay': x['no']=55+x['no']; x['stem']='（材料见本卷第 35–46 题）'+x['stem']
exams.append({'year':2025,'src':'官方文本（无答案；多选 47-55 缺）','hasAns':False,'qs':[item(2025,x,None) for x in q25]})

# 500 题（扫描件 OCR）：每篇一个条目；单选/多选各自编号，id 用 q<篇>-s<号> / q<篇>-m<号>
QDIR=os.environ.get('Q500OCR',T+'../q500/ocr')
if os.path.isdir(QDIR):
    sys.argv_bak=sys.argv; sys.argv=[sys.argv[0],QDIR]
    import importlib, parse_q500 as P; importlib.reload(P)
    sys.argv=sys.argv_bak
    up=P.sections(P.read('u')); dn=P.sections(P.read('d'))
    NAMES={1:'管理学基础',2:'组织行为学',3:'人力资源管理',4:'公共事业管理',5:'行政伦理学',6:'公文'}
    for p in range(1,7):
        qs=[]
        for t,pf in (('single','s'),('multi','m')):
            k=(p,t)
            if k not in up: continue
            an=P.ans_items(dn.get(k,[]))
            for q in P.split_q(up[k]):
                st,o=P.opts_of(q['raw'])
                if q['no'] not in an or len(o)<4: continue
                a=an[q['no']]['a']
                if (t=='single' and len(a)!=1) or (t=='multi' and len(a)<2): continue
                e=re.sub(r'^[\s\[【]*解\s*析\s*[\]】]\s*','',an[q['no']]['e']); e=re.sub(r'[ \t]+',' ',e); e=re.sub(r'\s*\n\s*','',e)
                e=re.sub(r'(?<=.)(?=[A-E]\s?项(?:正确|错误))','\n',e).strip()
                cj=lambda z: re.sub(r'(?<=[\u4e00-\u9fff，。、；：？！”“（）]) +(?=[\u4e00-\u9fff，。、；：？！”“（）])','',z)
                it={'id':f'q{p}-{pf}{q["no"]}','no':q['no'],'t':t,'q':cj(re.sub(r'\s+',' ',st).strip()),'a':a,'o':[cj(x[1]) for x in o]}
                if e: it['e']=cj(e)[:1800]
                qs.append(it)
        # 案例分析 / 公文写作（主观题）：每个案例/公文题一条，q=材料+问题，e=参考答案（逐问题）
        import parse_cases as C
        if (p,'case') in up and (p,'case') in dn:
            if p<=5:
                for c in C.cases(up[(p,'case')],dn[(p,'case')]):
                    e='\n\n'.join(f'【问题{n}】'+(f'（{kp}）' if kp else '')+'\n'+a for n,kp,a in c['answers'])
                    qs.append({'id':f'q{p}-c{c["no"]}','no':c['no'],'t':'essay','q':f'【{c["name"]}】\n'+c['material']+'\n\n问题：\n'+c['questions'],'a':None,'e':e[:6000]})
            else:
                for g in C.gongwen(up[(p,'case')],dn[(p,'case')]):
                    qs.append({'id':f'q{p}-g{g["no"]}','no':g['no'],'t':'essay','q':f'【{g["name"]}】\n'+g['stem'],'a':None,'e':g['demo'][:9000]})
        # d-114 的面试评分表：原文是表格，读取时分值被当页码滤掉、整表被拼成一行。这里照原页整理成逐行文字
        TBL=("面试评分表\n"
             "姓名 / 性别 / 年龄 / 应聘职位 / 籍贯 / 毕业院校 / 学历 / 专业 / 工作年限（应聘者信息栏）\n"
             "评分要素｜分值｜评分要点｜得分\n"
             "仪态举止｜5｜仪表端庄自然，服饰得体大方，举止稳重朴实，精神面貌良好\n"
             "沟通表达能力｜10｜言语清晰、标准，表达准确、流畅，以及良好的条理性、感染力与说服力\n"
             "诚实和忠诚度｜10｜对企业或个人真实无欺、遵守承诺，并且愿意为企业的发展贡献自己的一份力量\n"
             "逻辑思维能力｜10｜思维的敏捷性、条理性与广度、深度；逻辑性和严密性；判断分析问题是否全面、准确、辩证、深刻，有理有据\n"
             "协调与应变能力｜10｜反应的机敏程度；人际沟通、合作的意识、能力与技巧；面对压力的心理承受力和自制力\n"
             "专业素养｜20｜对销售理论及相关知识的了解、掌握程度，专业素养的高低\n"
             "解决实际问题的能力｜25｜能否理论联系实际；分析、处理问题的原则性、灵活性、有效性；适应岗位需求的实际工作能力与业务能力\n"
             "发展潜力｜10｜个人对本行业发展前瞻性的认识和创造能力、研究能力、完成能力；有无新观点、新思路、新办法\n"
             "合计｜100｜总分、评语及录用建议、考评者签名、日期\n")
        for it in qs:
            if it['id']=='q3-c3' and '面试评分表姓名性别' in it.get('e',''):
                e0=it['e']; i=e0.index('面试评分表姓名性别'); j=e0.index('日期：',i)+len('日期：')
                it['e']=e0[:i]+'\n'+TBL+e0[j:]
        if qs: exams.append({'year':f'q{p}','name':f'第{"一二三四五六"[p-1]}篇','title':f'500题 · {NAMES[p]}','group':'q500','ocr':True,'src':'500题 扫描件 OCR','hasAns':True,'qs':qs})
exams.sort(key=lambda e:(e.get('group')=='q500',str(e['year'])))
out=sys.argv[2] if len(sys.argv)>2 else '../exams-data.js'
open(out,'w',encoding='utf-8').write('const EXAMS='+json.dumps(exams,ensure_ascii=False,separators=(',',':'))+';\n')
for e in exams:
    from collections import Counter
    print(e['year'],len(e['qs']),dict(Counter(x['t'] for x in e['qs'])),'无答案:',sum(1 for x in e['qs'] if x['t']!='essay' and not x.get('a')),'选项<2:',sum(1 for x in e['qs'] if x['t'] in('single','multi') and len(x.get('o',[]))<4),'分歧:',sum(1 for x in e['qs'] if x.get('alt')))
