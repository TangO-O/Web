//上半部分铅笔
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class UpPencil extends Pencil {

    constructor(top) {
        const image = Sprite.getImage('pencilUp');
        super(image, top);
    }
// 铅笔的左上角高度 为top-图像高度 是一个负值
    draw() {
        this.y = this.top - this.height;
        super.draw();
    }

}