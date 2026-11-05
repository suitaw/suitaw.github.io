# 数手册每个「考点」标题旁的绿色三角（星级）。用法: python3 -I stars.py <pdf> <工作目录>  → stars.json  [{page,label,y,stars}]
import sys,re,subprocess,json,os
from PIL import Image
import numpy as np
pdf,wd=sys.argv[1],sys.argv[2]; os.makedirs(wd,exist_ok=True)
subprocess.run(['pdftotext','-bbox-layout',pdf,wd+'/bbox.html'],check=True,stderr=subprocess.DEVNULL)
DPI=150
subprocess.run(['pdftoppm','-r',str(DPI),'-png',pdf,wd+'/pg'],check=True,stderr=subprocess.DEVNULL)
html=open(wd+'/bbox.html',encoding='utf-8').read()
pages=re.split(r'<page ',html)[1:]; res=[]
for pi,pg in enumerate(pages,1):
    im=np.array(Image.open(f'{wd}/pg-{pi:02d}.png').convert('RGB')).astype(int)
    for ln in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>',pg,re.S):
        txt=''.join(re.findall(r'>([^<]*)</word>',ln.group(5)))
        if not re.match(r'^考点\d',txt): continue
        x0,y0,x1,y1=[float(v)*DPI/72 for v in ln.groups()[:4]]
        band=im[int(y0)-4:int(y1)+6, int(x0):]
        g=(band[:,:,1]>140)&(band[:,:,0]<130)&(band[:,:,2]<110)&(band[:,:,1]-band[:,:,0]>50)
        col=g.sum(axis=0)
        # 三角：连续有绿色的列段，按宽度估数（单个三角宽约 0.11*DPI）
        w=0; segs=[]; start=None
        for i,v in enumerate(col>0):
            if v and start is None: start=i
            if not v and start is not None: segs.append((start,i)); start=None
        if start is not None: segs.append((start,len(col)))
        tot=sum(b-a for a,b in segs)
        res.append({'page':pi,'label':txt[:24],'greenW':tot,'segs':len(segs)})
json.dump(res,open(wd+'/stars.json','w'),ensure_ascii=False)
for r in res[:14]: print(r)
