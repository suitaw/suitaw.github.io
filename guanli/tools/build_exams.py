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
exams.append({'year':2022,'src':'即刻题面 + 扫描解析OCR答案','hasAns':True,'qs':[item(2022,x,jans.get(x['no']) if x['type']!='essay' else None) for x in jq]})
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
                it={'id':f'q{p}-{pf}{q["no"]}','no':q['no'],'t':t,'q':re.sub(r'\s+',' ',st).strip(),'a':a,'o':[x[1] for x in o]}
                if e: it['e']=e[:1500]
                qs.append(it)
        if qs: exams.append({'year':f'q{p}','name':f'第{"一二三四五六"[p-1]}篇','title':f'500题 · {NAMES[p]}','group':'q500','ocr':True,'src':'500题 扫描件 OCR','hasAns':True,'qs':qs})
exams.sort(key=lambda e:(e.get('group')=='q500',str(e['year'])))
out=sys.argv[2] if len(sys.argv)>2 else '../exams-data.js'
open(out,'w',encoding='utf-8').write('const EXAMS='+json.dumps(exams,ensure_ascii=False,separators=(',',':'))+';\n')
for e in exams:
    from collections import Counter
    print(e['year'],len(e['qs']),dict(Counter(x['t'] for x in e['qs'])),'无答案:',sum(1 for x in e['qs'] if x['t']!='essay' and not x.get('a')),'选项<2:',sum(1 for x in e['qs'] if x['t'] in('single','multi') and len(x.get('o',[]))<4),'分歧:',sum(1 for x in e['qs'] if x.get('alt')))
