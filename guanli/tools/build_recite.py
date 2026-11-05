# recite.md + stars.json → ../recite-data.js
# 用法: python3 -I build_recite.py <stars.json> [输出]
import re,sys,json,html
md=open('../recite.md',encoding='utf-8').read().split('\n')
stars=json.load(open(sys.argv[1])); subs=[l.strip() for l in open('subs.txt',encoding='utf-8') if l.strip()]
def sv(g): n=max(1,min(3,round(g/25.5))); return n
star_list=[sv(x['greenW']) for x in stars]
def inline(t):
    t=html.escape(t.strip(),quote=False)
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    return t.replace(' // ','<br>')
def plain(t): return re.sub(r'\*\*|\s//\s',lambda m:'' if m.group(0)=='**' else ' ',t)
out=[]; pian=zhang=None; cur=None; si=0; rows=[]
def flush_rows():
    global rows
    if not rows: return
    span=[1]*len(rows)
    for i in range(len(rows)-1,0,-1):
        if len(rows[i])>1 and rows[i][0]=='' and not rows[i-1][0].startswith('!'): pass
    # 左列空 = 与上一行左列合并
    owner=None; skip=[False]*len(rows)
    for i,r in enumerate(rows):
        if len(r)>1 and r[0]=='' and owner is not None: span[owner]+=1; skip[i]=True
        else: owner=i
    h='<table>'
    for i,r in enumerate(rows):
        head=r[0].startswith('!'); cells=list(r)
        if head: cells[0]=cells[0][1:]; h+='<tr>'+''.join('<th>'+inline(c)+'</th>' for c in cells)+'</tr>'; continue
        h+='<tr>'
        for j,c in enumerate(cells):
            if j==0 and skip[i]: continue
            if j==0 and len(cells)>1: h+='<th'+(' rowspan="%d"'%span[i] if span[i]>1 else '')+'>'+inline(c)+'</th>'
            else: h+='<td>'+inline(c)+'</td>'
        h+='</tr>'
    cur['html']+=h+'</table>'; rows=[]
for ln in md:
    if not ln.strip(): continue
    if ln.startswith('# '):
        flush_rows(); p=[x.strip() for x in ln[2:].split('|')]; pian={'t':p[0],'meta':p[1:]}; continue
    if ln.startswith('## '):
        flush_rows(); p=[x.strip() for x in ln[3:].split('|')]; zhang={'t':p[0],'freq':p[1] if len(p)>1 else ''}; continue
    if ln.startswith('### '):
        flush_rows(); p=[x.strip() for x in ln[4:].split('|')]
        title=p[0]; isk=title.startswith('考点')
        if isk: st=star_list[si]; sb=subs[si]; si+=1
        else: st=3; sb=''
        cur={'id':len(out)+1,'pian':pian['t'],'pmeta':pian['meta'],'zhang':zhang['t'],'freq':zhang['freq'],'t':title,'sb':sb,'tag':p[1] if len(p)>1 else '','s':st,'html':'','text':''}
        out.append(cur); continue
    if ln.startswith('|'):
        cells=[c for c in ln.strip().strip('|').split(' | ')]
        cells=[c.strip() for c in re.split(r'(?<=\S)\s\|\s|^\|\s*',ln.strip().rstrip('|').strip()) if c is not None]
        cells=[c.strip() for c in ln.strip()[1:-1].split(' | ')] if ln.strip().endswith('|') else cells
        rows.append(cells); cur['text']+=' '+plain(' '.join(cells)); continue
    flush_rows(); cur['html']+='<p>'+inline(ln)+'</p>'; cur['text']+=' '+plain(ln)
flush_rows()
assert si==len(star_list)==len(subs),(si,len(star_list),len(subs))
for c in out: c['text']=re.sub(r'\s+',' ',c['text']).strip()
dst=sys.argv[2] if len(sys.argv)>2 else '../recite-data.js'
open(dst,'w',encoding='utf-8').write('const RECITE='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
from collections import Counter
print(len(out),'卡片; 星级分布',Counter(c['s'] for c in out),'; 字节',len(open(dst,encoding='utf-8').read()))
