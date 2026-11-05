import re,glob,json,sys
sys.path.insert(0,'.')
import parse_jike as pj
S='/data/data/com.termux/files/usr/tmp/claude-10414/-data-data-com-termux-files-home-suitaw-github-io/05acc4af-a63d-4b21-ad38-017086eaeb12/scratchpad'
T=S+'/txt/'
txt='\n'.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob(S+'/y22/ark/p-*.txt')))
txt=re.sub(r'\n?\s*\d+\s*/\s*16\s*\n?','\n',txt)
parts=re.split(r'(?m)^(\d{1,2})\s+(?=本题|考查|主要考查)',txt)
blocks={int(parts[i]):parts[i+1] for i in range(1,len(parts),2)}
print('解析块',len(blocks),'缺号',[n for n in range(1,59) if n not in blocks])
ans={n:(re.search(r'正确答案(?:为|选)\s*([A-E]+)',b) or [None,None])[1] for n,b in blocks.items()}
def bg(s):
    s=re.sub(r'[^一-鿿A-Za-z0-9]','',s); return {s[i:i+2] for i in range(len(s)-1)}
q=[x for x in pj.parse(glob.glob(T+'x_209*')[0]) if x['type'] in('single','multi')]
def score(b,x):
    qb=bg(x['stem']+''.join(x['opts'])); return len(qb&bg(b))/max(1,len(qb))
mp={}
for n,b in blocks.items():
    mp[n]=max(q,key=lambda x:score(b,x))['no']
dup={}
for n,j in mp.items(): dup.setdefault(j,[]).append(n)
print('一对多',{k:v for k,v in dup.items() if len(v)>1},'未映射',[x['no'] for x in q if x['no'] not in dup])
if 49 in mp and mp[49]==30 or mp.get(28)==30: mp[49]=49
dup={}
for n,j in mp.items(): dup.setdefault(j,[]).append(n)
print('修正后一对多',{k:v for k,v in dup.items() if len(v)>1},'未映射',[x['no'] for x in q if x['no'] not in dup])
json.dump({'blocks':{str(k):v for k,v in blocks.items()},'ans':ans,'map':{str(k):v for k,v in mp.items()}},open(S+'/y22/parsed.json','w'),ensure_ascii=False)
src=open('../exams-data.js',encoding='utf-8').read(); d=json.loads(src[len('const EXAMS='):src.rindex(';')])
cur={x['no']:x.get('a') for e in d if e['year']==2022 for x in e['qs']}
diff=[(n,mp[n],ans[n],cur.get(mp[n])) for n in sorted(mp) if ans[n]!=cur.get(mp[n])]
print('新旧答案不一致(解析号,即刻号,新,旧):',diff)
