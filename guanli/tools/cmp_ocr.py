# 两路 OCR 全量比对：RapidOCR(json) vs 豆包(txt)，去掉标点空白后做字符级 diff
import re,json,difflib,glob,os,sys
D=sys.argv[1]
def norm(t): return re.sub(r'[^一-鿿A-Za-z0-9]','',t)
HDR=re.compile(r'^(第[一二三四五六]篇.{0,8}|管理学必刷500题.{0,6}册\)?|\d{1,3})$')
def rapid_txt(p):
    items=json.load(open(p)); 
    return ''.join(i[1] for i in items)
res={}
for f in sorted(glob.glob(D+'/ark/*.txt')):
    b=os.path.basename(f)[:-4]
    a=norm(open(f,encoding='utf-8').read()); r=norm(rapid_txt(f'{D}/rapid/{b}.json'))
    segs=[]
    for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a,r,autojunk=False).get_opcodes():
        if tag=='equal': continue
        A,R=a[i1:i2],r[j1:j2]
        if HDR.match(A or R) and max(len(A),len(R))<=14 and (i1<30 or i2>len(a)-30 or j1<30 or j2>len(r)-30): continue  # 页眉页脚
        segs.append((a[max(0,i1-8):i1],A,R,a[i2:i2+6]))
    res[b]=(len(a),len(r),segs)
json.dump({k:[v[0],v[1],v[2]] for k,v in res.items()},open(D+'/cmp.json','w'),ensure_ascii=False)
tot=sum(len(v[2]) for v in res.values()); pg=sum(1 for v in res.values() if v[2])
print(f'{len(res)} 页；有差异的页 {pg}；差异片段共 {tot}')
import collections
c=collections.Counter(min(len(v[2]),10) for v in res.values()); print('每页差异片段数分布(10=10+):',sorted(c.items()))
big=sorted(res.items(),key=lambda kv:-len(kv[1][2]))[:12]
for b,v in big: print(b,'片段',len(v[2]),'豆包字数',v[0],'Rapid字数',v[1])
