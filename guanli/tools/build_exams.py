# 历年真题 → ../exams-data.js     用法: python3 -I build_exams.py <文字目录>
import sys,glob,json,re
sys.path.insert(0,'.')
import parse_official as po, parse_jike as pj, align22 as A
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
exams.sort(key=lambda e:e['year'])
out=sys.argv[2] if len(sys.argv)>2 else '../exams-data.js'
open(out,'w',encoding='utf-8').write('const EXAMS='+json.dumps(exams,ensure_ascii=False,separators=(',',':'))+';\n')
for e in exams:
    from collections import Counter
    print(e['year'],len(e['qs']),dict(Counter(x['t'] for x in e['qs'])),'无答案:',sum(1 for x in e['qs'] if x['t']!='essay' and not x.get('a')),'选项<2:',sum(1 for x in e['qs'] if x['t'] in('single','multi') and len(x.get('o',[]))<4),'分歧:',sum(1 for x in e['qs'] if x.get('alt')))
