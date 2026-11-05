# 2022 解析是扫描图，OCR 后按题头顺序取「故正确答案为X」
import re
def answers(path):
    cur=0; a={}
    for ln in open(path,encoding='utf-8').read().split('\n'):
        m=re.match(r'^(\d{1,2})(?![\d/])[”"。]?(?=本题|考查|应对|\(1\)|在重大)',ln)
        if m and int(m.group(1))==cur+1: cur+=1; continue
        m=re.search(r'故正确答案[为选]([A-E]+)',ln)
        if m:
            if cur in a: cur+=1
            a[cur]=m.group(1)
    return a
