# 2025 官方文本（无答案）：N.题干 / A.选项 / 材料X：…
import re
def parse(path):
    qs=[]; sec=None; cur=None; last=None; mat=''; inmat=False; mats=[]
    for ln in open(path,encoding='utf-8').read().replace('\f','').split('\n'):
        s=ln.strip()
        if not s: continue
        m=re.match(r'^([一二三四五])、(判断|单项|系列|多项|主观)',s)
        if m: sec={'判断':'tf','单项':'single','系列':'single','多项':'multi','主观':'essay'}[m.group(2)]; cur=None; inmat=False; mat=''; mats=[]; last=None; continue
        if re.match(r'^(共\s*\d+\s*题|每题|题，每题)',s) or re.match(r'^[\d、，, 分）题每共]+$',s): continue
        m=re.match(r'^材料([一二三四五六七八九十])[：:](.*)$',s)
        if m and sec=='single': mat=m.group(2); inmat=True; cur=None; continue
        if inmat and sec=='single' and not re.match(r'^\d+\.',s):
            if s.startswith('根据以上材料'): inmat=False
            else: mat+=s
            continue
        m=re.match(r'^(\d+)\.(.+)$',s)
        if m and sec:
            inmat=False; cur={'no':int(m.group(1)),'type':sec,'stem':(('【材料】'+mat+'\n') if (mat and sec=='single' and int(m.group(1))>=35) else '')+m.group(2).strip(),'opts':[],'ans':None}; qs.append(cur); last='s'; continue
        if cur is None: continue
        m=re.match(r'^([A-E])\.(.*)$',s)
        if m: cur['opts'].append(m.group(2).strip()); last='o'
        elif last=='o' and cur['opts']: cur['opts'][-1]+=s
        else: cur['stem']+=s
    for q in qs:
        if q['type']=='tf': q['opts']=[]
    return qs
if __name__=='__main__':
    import sys,collections
    q=parse(sys.argv[1]); print(len(q),collections.Counter(x['type'] for x in q)); print([x['no'] for x in q if x['type']in('single','multi') and len(x['opts'])!=4])
    print(sorted(x['no'] for x in q)[:3],'...',[n for n in range(1,max(x['no'] for x in q)+1) if n not in {x['no'] for x in q}])
