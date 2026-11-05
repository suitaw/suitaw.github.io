# 三方核对：豆包(主文本 ark/*.txt) vs RapidOCR(rapid/*.json) vs GLM-OCR(glm/*.txt)
# 对每个「豆包与另两路不同」的位置投票：
#   R、G 都和豆包不同且彼此一致 → 豆包错，建议改成 R/G 的写法（auto）
#   R、G 都不同且彼此不一致   → 人工(manual)
#   只有一路不同             → 那一路错，忽略
#   豆包有、R/G 都没有       → 可能是豆包多写（页眉标签类），人工
#   豆包没有、R/G 都有       → 豆包漏，人工
import re,json,difflib,glob,os,sys
D=sys.argv[1]
def norm(t): return re.sub(r'[^一-鿿A-Za-z0-9]','',t)
def rapid_txt(p): return ''.join(i[1] for i in json.load(open(p)))
def glm_txt(p):
    t=open(p,encoding='utf-8').read(); return re.sub(r'<[^>]+>|\|[-: ]+\|','',t)
def segs(a,b):
    m={}
    for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes():
        if tag!='equal': m[(i1,i2)]=b[j1:j2]
    return m
out={'auto':[],'manual':[],'stats':{}}
cnt={'agree_all':0,'r_only':0,'g_only':0,'auto':0,'manual':0}
for f in sorted(glob.glob(D+'/ark/*.txt')):
    b=os.path.basename(f)[:-4]
    A=norm(open(f,encoding='utf-8').read()); R=norm(rapid_txt(f'{D}/rapid/{b}.json')); G=norm(glm_txt(f'{D}/glm/{b}.txt'))
    sr=segs(A,R); sg=segs(A,G)
    # 把 R、G 的差异按豆包位置区间聚合（区间有重叠视为同一处）
    spans=sorted(set(list(sr)+list(sg)))
    merged=[]
    for s in spans:
        if merged and s[0]<=merged[-1][1]: merged[-1]=(merged[-1][0],max(merged[-1][1],s[1]))
        else: merged.append(s)
    for (i1,i2) in merged:
        def rep(sm):
            # 取与区间重叠的差异，拼出该区间在对方文本里的对应写法
            xs=[(s,v) for s,v in sm.items() if s[0]<i2 and s[1]>i1 or (s[0]==s[1] and i1<=s[0]<=i2)]
            if not xs: return None
            return xs
        r=rep(sr); g=rep(sg)
        ctx=(A[max(0,i1-8):i1],A[i1:i2],A[i2:i2+6])
        edge = i1<25 or i2>len(A)-25
        if r and g:
            rv=''.join(v for _,v in sorted(r)); gv=''.join(v for _,v in sorted(g))
            if rv==gv:
                if edge and len(A[i1:i2])<=14 and not rv: continue
                if len(A[i1:i2])==0 and len(rv)<=2 and edge: continue
                out['auto'].append([b,ctx,rv]); cnt['auto']+=1
            else:
                out['manual'].append([b,ctx,rv,gv]); cnt['manual']+=1
        elif r: cnt['r_only']+=1
        elif g:
            gv=''.join(v for _,v in sorted(g))
            # GLM 不转页眉页码；这类只在页首页尾出现的忽略
            cnt['g_only']+=1
json.dump(out,open(D+'/vote.json','w'),ensure_ascii=False)
print(cnt); print('auto 示例:'); 
for x in out['auto'][:12]: print(' ',x[0],f'…{x[1][0]}[豆:{x[1][1]!r} → {x[2]!r}]{x[1][2]}')
print('manual 数',len(out['manual']))
