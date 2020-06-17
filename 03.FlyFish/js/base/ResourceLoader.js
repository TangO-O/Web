//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染

import {Resources} from "./Resources.js";

export class ResourceLoader {
    constructor() {
      //直接this.map自动创建对象
        /*Map是一个数据类型，实质上是一个键值对，前面是名后面是值，
        可以通过set的方法来设置  m.set(o,'content')
        也可以直接传入一个数组来设置，这里传入Resource数组*/
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }

/*确保所有图片加载完毕*/
    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }
//静态工厂
    static create() {
        return new ResourceLoader();
    }
}