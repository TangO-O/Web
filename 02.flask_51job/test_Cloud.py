#-*- codeing = utf-8 -*-
#@Time : 2020/3/13 8:23
#@Author : 汤小英
#@File : test_Cloud.py
#@Software : PyCharm

#-*- codeing = utf-8 -*-
#@Time : 2020/3/10 10:08
#@Author : 汤小英
#@File : test_Cloud.py
#@Software : PyCharm

import jieba     #分词
from matplotlib import pyplot as plt     #绘图，数据可视化
from wordcloud import WordCloud          #词云
from PIL import Image                   #图片处理
import numpy as np                       #矩阵运算
import sqlite3                          #数据库


#准备词云所需的文字（词）
con = sqlite3.connect('51job.db')
cur = con.cursor()
sql = 'select job from tablename'
data = cur.execute(sql)
text =""
for item in data:
    text = text + item[0]
    # print(item[0])
# print(text)
cur.close()
con.close()



cut = jieba.cut(text)
string = ' '.join(cut)
# print(string)
print(len(string))

img = Image.open(r'.\static\img\pikaqiu.jpg')
img_arry = np.array(img)  #将图片转换为数组
wc = WordCloud(
    background_color='white',
    mask=img_arry,
    font_path="HYGangYiTi-85W.ttf"

)
wc.generate_from_text(string)


#绘制图片

fig = plt.figure(1)
plt.imshow(wc)
plt.axis('off')  #是否显示坐标轴

# plt.show()  #显示生成的词云图片

plt.savefig(r'.\static\img\word.jpg',dpi=500)

