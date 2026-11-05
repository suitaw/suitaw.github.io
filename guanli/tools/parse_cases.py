# 500 题「案例分析 / 公文写作」：上册=材料+问题，下册=参考答案 / 答题演示
import re
CN='一二三四五六七八九十'
END=re.compile(r'[。！？”）)；;:：]$')
LIST=re.compile(r'^(材料$|要求[：:]|答题演示|[（(]?\d{1,2}[）)\.．、]|[①-⑩]|[一二三四五六七八九十]+[、，]|第[一二三四五六七八九十]+[步点条]|[A-E]\s?项|【|[a-z][\.）)])')
def para(lines):
    """把按页宽折行的文字还原成段落：列表项/小标题另起一行；句末且该行明显短于版心则另起段"""
    ls=[l.strip() for l in lines if l.strip()]
    if not ls: return ''
    w=sorted(len(l) for l in ls)[int(len(ls)*0.8)] if len(ls)>4 else max(len(l) for l in ls)
    out=[ls[0]]
    for prev,cur in zip(ls,ls[1:]):
        newp = bool(LIST.match(cur)) or prev in ('材料','答题演示') or (END.search(prev) and len(prev)<w*0.82)
        if newp: out.append(cur)
        else: out[-1]+=cur if not re.search(r'[A-Za-z0-9]$',prev) or not re.match(r'^[A-Za-z0-9]',cur) else ' '+cur
    return '\n'.join(out)
def split_by(lines,rx):
    idx=[i for i,l in enumerate(lines) if rx.match(l.strip())]
    return [(lines[i].strip(),lines[i+1:(idx[k+1] if k+1<len(idx) else len(lines))]) for k,i in enumerate(idx)]
CASE=re.compile(r'^案例([一二三四五六七八九十]+)$')
def cases(up,dn):
    ud=dict(split_by(up,CASE)); dd=dict(split_by(dn,CASE)); res=[]
    for name,body in ud.items():
        k=CN.index(name[2])+1 if len(name)==3 else None
        ql=[i for i,l in enumerate(body) if re.match(r'^问题\s*[：:]?',l.strip())]
        if not ql: continue
        mat=para(body[:ql[0]]); qs=para([re.sub(r'^问题\s*[：:]?\s*','',body[ql[0]])]+body[ql[0]+1:])
        ans=[]
        for h,b in split_by(dd.get(name,[]),re.compile(r'^\d+[\.．]\s*【考点定位】')):
            n=re.match(r'^(\d+)',h).group(1); txt='\n'.join([h]+[l for l in b])
            kp=re.search(r'【关联知识点】(.*?)(?=【参考答案】)',' '.join(b),re.S)
            a=re.split(r'【参考答案】',txt,1)
            ans.append((n,(kp.group(1).strip() if kp else ''),para(a[1].split('\n') if len(a)>1 else [])))
        res.append({'no':k,'name':name,'material':mat,'questions':qs,'answers':ans})
    return res
GW=re.compile(r'^（([一二三四五六七八九十]+)）(\S{1,6})$')
def gongwen(up,dn):
    ud=split_by(up,GW); dd=dict(split_by(dn,GW)); res=[]
    for h,body in ud:
        m=GW.match(h); no=CN.index(m.group(1))+1; ft=m.group(2)
        d=dd.get(h,[]); k=[i for i,l in enumerate(d) if '答题演示' in l]
        res.append({'no':no,'name':f'公文写作 {ft}','stem':para(body),'demo':para(d[k[0]:] if k else d)})
    return res
