//导演类，控制游戏的逻辑

import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

/*单例模式，是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例的特殊类。
　　通过单例模式可以保证系统中，应用该模式的类一个类只有一个实例。即一个类只有一个对象实例
*/
export class Director {

/*使用getInstance方法为定义一个单例对象，如果实例创建了则返回创建类
    若没有创建则创建instance*/

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    //创建背景音乐类
    createBackgroundMusic() {
        this.bgm = wx.createInnerAudioContext();
        this.bgm.autoplay = false;  //自动播放设置
        this.bgm.loop = true;    //loop 属性规定当视频结束后将重新开始播放。
        this.bgm.src = 'audios/bgm.mp3';//导入背景音
    }
    //创建bgm开始播放类
    playBgm() {
      this.bgm.play();//play()开始播放当前bgm
    }
    //停止bgm播放
    stopBgm() {
        this.bgm.stop();
    }

    //创建铅笔类。有个高度限制，这里取屏幕的2和8分之一，以一个数组的类型存储。
    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    //小鸟事件，为每只小鸟绑定相应事件
    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        //地板的撞击判断
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击地板啦');
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            wx.vibrateShort({
                success: function () {
                    console.log('振动成功');
                }
            });
            score.isScore = false;
            score.scoreNumber++;//分数增加
            this.moveSpeed += 0.3;//当分数增加时，进行加速操作
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            //数组的第一二个元素就是第一组铅笔，第三四个元素就是第二组
            //先判断如果第一个铅笔的左坐标加上铅笔宽度（就是右坐标）在屏幕之外，
            //而且铅笔数组长度为4时，推出前两个元素（第一组铅笔）
            //shift方法为将数组的第一个元素推出数组并将数组长度减一
            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 &&
                pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore = true;
            }

            //当铅笔在中间位置时，而且屏幕上只有两个铅笔，创建新的一组铅笔
            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
                pencils.length === 2) {
                this.createPencil();
            }

             //绘制铅笔组中的铅笔
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });

            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();

            //不断调用同一方法达到动画效果，刷新速率和浏览器有关，参数为回调函数。
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            this.stopBgm();//调用bgm结束
            this.moveSpeed = 2;//速度初始化为2初始速度
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
            //触发微信小游戏垃圾回收
            wx.triggerGC();
        }
    }
}