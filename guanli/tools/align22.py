import re,sys,glob; sys.path.insert(0,'.')
import parse_jike as pj, parse_ocr22 as po
T='/data/data/com.termux/files/usr/tmp/claude-10414/-data-data-com-termux-files-home-suitaw-github-io/05acc4af-a63d-4b21-ad38-017086eaeb12/scratchpad/txt/'
def bg(s):
    s=re.sub(r'[^一-鿿A-Za-z0-9]','',s); return {s[i:i+2] for i in range(len(s)-1)}
def blocks(path):
    t=open(path,encoding='utf-8').read(); t=re.sub(r'biguo|资源天?注?微信公众号','',t)
    segs=re.split(r'(故正确答案[为选][A-E]+。?)',t); b={}; ans={}
    for i in range(0,len(segs)-1,2):
        n=i//2+1; b[n]=segs[i]; ans[n]=re.search(r'[A-E]+',segs[i+1][4:]).group(0)
    return b,ans
def run():
    q=[x for x in pj.parse(glob.glob(T+'x_209*')[0]) if x['type'] in('single','multi')]
    bl,ans=blocks(T+'ocr22.txt')
    res={}
    for n,t in bl.items():
        tb=bg(t); sc=[(len(bg(x['stem']+''.join(x['opts']))&tb)/max(1,len(bg(x['stem']+''.join(x['opts'])))),x) for x in q]
        sc.sort(key=lambda z:-z[0]); res[n]=(sc[0][1],sc[0][0],sc[1][0])
    return q,ans,bl,res
if __name__=='__main__':
    q,ans,bl,res=run()
    used={}
    for n in sorted(res):
        x,s1,s2=res[n]; used.setdefault(x['no'],[]).append(n)
        print(n,'→即刻',x['no'],f'{s1:.2f}/{s2:.2f}',ans.get(n),x['stem'][:22])
    print('重复映射:',{k:v for k,v in used.items() if len(v)>1}); print('未用即刻题:',[x['no'] for x in q if x['no'] not in used])
