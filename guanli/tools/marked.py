# 手册 xml → 每页「带 **绿色高亮** 的视觉行」文本，列间用 ¦ 分隔。用法: python3 -I marked.py <xml> <输出目录>
import re,sys,os,html
xml=open(sys.argv[1],encoding='utf-8').read(); out=sys.argv[2]; os.makedirs(out,exist_ok=True)
fonts={m.group(1):m.group(2) for m in re.finditer(r'<fontspec id="(\d+)"[^>]*color="(#\w+)"',xml)}
for pm in re.finditer(r'<page number="(\d+)"[^>]*>(.*?)</page>',xml,re.S):
    n=int(pm.group(1)); runs=[]
    for t in re.finditer(r'<text top="(\d+)" left="(\d+)" width="(\d+)" height="(\d+)" font="(\d+)">(.*?)</text>',pm.group(2)):
        top,left,w,h,f,tx=t.groups(); tx=html.unescape(re.sub(r'</?[bi]>','',tx))
        runs.append((int(top),int(left),int(w),fonts.get(f)=='#75bc42',tx))
    runs.sort(key=lambda r:(r[0]//1,r[1]))
    lines=[]
    for r in sorted(runs,key=lambda r:r[0]):
        for L in lines:
            if abs(L[0]-r[0])<=4: L[1].append(r); break
        else: lines.append([r[0],[r]])
    o=[]
    for top,rs in sorted(lines):
        rs.sort(key=lambda r:r[1]); s=''; prev=None
        for top_,left,w,g,tx in rs:
            if prev is not None and left-prev>45: s+=' ¦ '
            s+=('**'+tx+'**') if g else tx; prev=left+w
        s=s.replace('****','')
        o.append(f'{top:4d} {s}')
    open(f'{out}/p{n:02d}.txt','w',encoding='utf-8').write('\n'.join(o))
