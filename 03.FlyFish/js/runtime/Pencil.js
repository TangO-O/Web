/**
 * Created by ljq
 * 铅笔的基类
 */
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
import { Director } from "../Director.js";

export class Pencil extends Sprite {

  constructor(image, top) {
    super(image,
      0, 0,
      image.width, image.height,
      //刚好在右侧看不到的位置
      DataStore.getInstance().canvas.width, 0,
      image.width, image.height);
    this.top = top;
    this.pencilSpeed = Director.getInstance().moveSpeed;
    console.log("pencilSpeed ", this.pencilSpeed);
  }

  draw() {
    this.x = this.x - this.pencilSpeed;
    super.draw(this.img,
      0, 0,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height)
  }
}