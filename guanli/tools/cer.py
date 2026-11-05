# 字错率：去掉空白和标点后做编辑距离。用法: python3 cer.py ref.txt hyp.txt
import re,sys
def norm(t): return re.sub(r'[^一-鿿A-Za-z0-9]','',t)
def lev(a,b):
    p=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        c=[i]
        for j,y in enumerate(b,1): c.append(min(p[j]+1,c[j-1]+1,p[j-1]+(x!=y)))
        p=c
    return p[-1]
r=norm(open(sys.argv[1],encoding='utf-8').read()); h=norm(open(sys.argv[2],encoding='utf-8').read())
d=lev(r,h); print(f'字错率 {d/len(r)*100:.1f}%  (编辑距离 {d} / 参照 {len(r)} 字)')
