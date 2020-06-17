# FlyFish

此为在FlappyBird小游戏上进行的UI更改和部分功能添加



FlappyBird

微信小游戏开发流程、注意事项、API等详情见微信开放社区、微信公众平台 https://developers.weixin.qq.com/miniprogram/dev/index.html


微信小游戏FlappyBird

主要思想为js的面向对象思想

几个主要js的作用如下:

game.js:游戏全局的入口文件,必须有的一个文件

Main.js:程序主类,主要用来初始化canvas和一些全局对象,各个精灵和绑定点击事件

Director.js: 控制游戏逻辑和精灵的创建与销毁,控制游戏主循环

DataStore.js: 存储游戏需要长期保存的变量和需要定时销毁的变量

Resources.js:游戏资源

ResourceLoader.js:资源加载器,保证游戏是在图片加载完再开始主循环

Sprite.js:游戏精灵的基类,其他背景都是它的子类

Background.js:背景类

Land.js: 陆地类

UpPencil.js:上部分铅笔类

DownPencil.js:下部分铅笔类

Bird.js:小鸟类

Score.js: 计分器类

StartButton.js:重新开始按钮类

由于感觉发布到微信上有点麻烦,就没去申请了,这里直接在微信开发者工具上调试运行,效果如下


![image](https://github.com/29DCH/FlappyBird/blob/master/img/1.png)

![image](https://github.com/29DCH/FlappyBird/blob/master/img/2.png)

![image](https://github.com/29DCH/FlappyBird/blob/master/img/3.png)
