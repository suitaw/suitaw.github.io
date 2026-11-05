# 即刻题库导出格式： "N 、 单选题 / 题面 / A ： ... / 正确答案： C"
import re
def norm(s): return re.sub(r'[\s（）()、，。,：:"“”]','',s)
def parse(path):
    t=open(path,encoding='utf-8').read().replace('\f','')
    t=re.sub(r'即刻题库 www\.jike\.vip','',t)
    blocks=re.split(r'(?m)^\s*(\d+) 、 (\S+题)\s*$',t)
    out=[]
    for i in range(1,len(blocks),3):
        no=int(blocks[i]); ty=blocks[i+1]; body=blocks[i+2]
        am=re.search(r'正确答案：\s*([A-E,，、 ]+)',body)
        body=re.split(r'正确答案：|解析：',body)[0]
        lines=[l.strip() for l in body.split('\n') if l.strip()]
        stem=[];opts=[];last='s'
        for l in lines:
            m=re.match(r'^([A-E]) ： ?(.*)$',l)
            if m: opts.append(m.group(2)); last='o'
            elif last=='o' and opts: opts[-1]+=l
            else: stem.append(l)
        sj=''.join(stem)
        if not opts and re.search(r'A：.+B：.+C：',sj):
            mm=re.split(r'(?<![A-Z])([A-E])：',sj); stem=[mm[0]]; opts=[mm[i+1].strip() for i in range(1,len(mm)-1,2)]
        out.append({'no':no,'type':{'单选题':'single','多选题':'multi','不定项选择题':'multi','判断题':'tf'}.get(ty,'essay'),'stem':''.join(stem),'opts':opts,'ans':re.sub(r'[^A-E]','',am.group(1)) if am else None})
    return out
