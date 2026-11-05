# 500 题 OCR → 按「篇/题型」切节；上册取题干选项，下册取【答案】【解析】
import re,glob,os,sys,collections
OCR=sys.argv[1] if len(sys.argv)>1 else '.'
NOISE=re.compile(r'必刷|^[\s一\-—_=]{3,}\S{0,3}$|^\s*\d+\s*$')
CN='一二三四五六七八九十'
def read(prefix,skip1=True):
    fs=sorted(glob.glob(f'{OCR}/{prefix}-*.txt'))
    out=[]
    for f in fs[1:] if skip1 else fs:
        for ln in open(f,encoding='utf-8',errors='ignore').read().replace('\f','').split('\n'):
            if ln.strip() and not NOISE.search(ln.strip()): out.append(ln.rstrip())
    return out
def sections(lines):
    """→ {(篇,类型): [lines]}"""
    sec=collections.OrderedDict(); p=None; t=None
    for ln in lines:
        s=ln.strip()
        m=re.match(r'^第([一二三四五六])\s*篇',s)
        if m and len(s)<26:
            np_=CN.index(m.group(1))+1
            if np_!=p and not re.search(r'[一\-—]{2,}',s): p=np_; t=None
            continue
        m=re.match(r'^[一二三四五六七八九十]+\s*[、,，]\s*(单项|多项|案例|公文)',s)
        if m and p: t={'单项':'single','多项':'multi','案例':'case','公文':'case'}[m.group(1)]; sec[(p,t)]=[]; continue
        if p and t: sec[(p,t)].append(ln)
    return sec
NUM=r'^\s*(\d{1,3})\s*[\.．、,，]\s*'
def split_q(lines):
    qs=[]; exp=1
    for ln in lines:
        m=re.match(NUM+r'(.*)$',ln)
        if m and exp<=int(m.group(1))<=exp+3 and len(m.group(2).strip())>=4:
            n=int(m.group(1)); qs.append({'no':n,'raw':m.group(2)}); exp=n+1; continue
        if qs: qs[-1]['raw']+='\n'+ln.strip()
    return qs
def opts_of(raw):
    parts=re.split(r'(?<![A-Za-z0-9])([A-E])\s*[\.．、,，:：]\s*',raw)
    if len(parts)<5: return raw.strip(),[]
    stem=parts[0].strip(); o=[]; 
    for i in range(1,len(parts)-1,2): o.append((parts[i],re.sub(r'\s+',' ',parts[i+1]).strip()))
    return stem,o
def ans_items(lines):
    txt='\n'.join(lines); items={}
    parts=re.split(r'(?m)^\s*(\d{1,3})\s*[\.．、,，]?\s*[【\[\(]?\s*答\s*案\s*[】\]］\)]?\s*[:：]?\s*([A-E][A-E ,，、]*)',txt)
    for i in range(1,len(parts),3):
        n=int(parts[i]); items.setdefault(n,{'a':re.sub(r'[^A-E]','',parts[i+1]),'e':parts[i+2].strip()})
    return items
if __name__=='__main__':
    up=sections(read('u')); dn=sections(read('d'))
    print('上册节',[(k,len(v)) for k,v in up.items()]); print('下册节',[(k,len(v)) for k,v in dn.items()])
    tot=ok=0
    for k in up:
        if k[1]=='case': continue
        qs=split_q(up[k]); an=ans_items(dn.get(k,[]))
        bad=[q['no'] for q in qs if len(opts_of(q['raw'])[1])<(4 if k[1]=='single' else 4)]
        miss=[q['no'] for q in qs if q['no'] not in an]
        print(k,'题',len(qs),'答案',len(an),'选项不足',len(bad),bad[:8],'无答案',miss[:8],'答案无题',[n for n in an if n>len(qs)][:5])
        tot+=len(qs); ok+=len([q for q in qs if q['no'] in an and len(opts_of(q['raw'])[1])>=4])
    print('合计',tot,'可用',ok)
