//变量缓存器，方便我们在不同的类中访问和修改变量
//全局只有一个 所以用单例
export class DataStore {

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
  //创建一个存储变量的容器
    constructor() {
        this.map = new Map();
    }
//链式操作put
    put(key, value) {
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }
//销毁资源 将资源制空
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}