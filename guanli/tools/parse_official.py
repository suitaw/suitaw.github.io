# 解析 2018-2021 官方版（pdftotext -layout 的文本）：题面 + 解析 → json
import re, sys, json
WM=re.compile(r'biguo|资源公众|^\s*号[：:]|^\s*\d{1,2}\s*$|^\s*\d+\s*/\s*\d+\s*$')
def clean(t):
    t=t.replace('\f','')
    return '\n'.join(l for l in t.split('\n') if not WM.search(l))
def parse_q(path):
    sec=None; qs=[]; cur=None; last='stem'
    for ln in clean(open(path,encoding='utf-8').read()).split('\n'):
        s=ln.strip()
        if not s: continue
        m=re.match(r'^[一二三四五六七八九十]+、\s*(判断|单|多|案例|公文|主观|系列)',s)
        if m:
            sec={'判断':'tf','单':'single','多':'multi','案例':'essay','公文':'essay','主观':'essay','系列':'single'}[m.group(1)]
            cur=None; continue
        m=re.match(r'^(\d+)\s{2,}(\S.*)$',ln)
        if m and sec:
            cur={'no':int(m.group(1)),'type':sec,'stem':m.group(2).strip(),'opts':[]}; qs.append(cur); last='stem'; continue
        if cur is None: continue
        if re.match(r'^[A-E]、',s):
            for o in re.split(r'\s+(?=[A-E]、)',s):
                cur['opts'].append(o[2:].strip())
            last='opt'
        elif last=='opt' and cur['opts']: cur['opts'][-1]+=s
        else: cur['stem']+=s
    return qs
def parse_a(path):
    txt=clean(open(path,encoding='utf-8').read())
    parts=re.split(r'(?m)^\s{0,2}(\d+)\s{2,}(?=本题|【|\S)',txt)
    res={}
    for i in range(1,len(parts),2):
        no=int(parts[i]); body=parts[i+1]
        if no in res: continue
        m=re.search(r'正确答案(?:为|选)\s*([A-E]+)',body)
        tf=None
        if not m:
            if re.search(r'故(?:本题)?(?:表述|说法|该说法|题干)?(?:正确|对)[。.]?\s*$',body.strip().split('\n')[-1]) or re.search(r'故(?:表述|说法)正确',body): tf='T'
            elif re.search(r'故(?:表述|说法)?错误|故(?:该)?说法错误|故表述错误',body): tf='F'
        res[no]={'ans':m.group(1) if m else tf,'exp':re.sub(r'\n\s+','',body.strip())}
    return res
if __name__=='__main__':
    q=parse_q(sys.argv[1]); a=parse_a(sys.argv[2])
    print(len(q),'题',len(a),'解析', 'noans:',[x['no'] for x in q if not a.get(x['no'],{}).get('ans')][:30])
    print(sum(1 for x in q if x['type'] in('single','multi') and len(x['opts'])<4),'选项不足')
