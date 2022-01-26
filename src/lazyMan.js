class _LazyMan {
    constructor(name) {
        this.taskQueue = [];
        this.name = name;
        this.timer = null;
        this.sayHi();
    }
    // 每次调用时清楚timer，上一次设置的执行taskQueue就不会运行。
    // 重新设置timer,会在下一次调用完后进入执行。
    // 当所有调用结束后，就会顺利执行taskQueue队列里的事件
    next() {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
            // 执行taskQueue队列里的事件
            for (let i = 0; i < this.taskQueue.length; i++) {
                await this.taskQueue[i]();
            }
        });
        return this;
    }
    sayHi() {
        this.taskQueue.push(() => {
            console.log('Hi! This is ' + this.name);
        });
        return this.next();
    }
    eat(str) {
        this.taskQueue.push(() => {
            console.log('Eat ' + str);
        });
        return this.next();
    }
    beforSleep(time) {
        // unshift插入到事件的第一个
        this.taskQueue.unshift(() => this.sleepPromise(time));
        return this.next();
    }
    sleep(time) {
        this.taskQueue.push(() => this.sleepPromise(time));
        return this.next();
    }
    // sleep的Promise对象，用于给async/await来阻塞后续代码执行
    sleepPromise(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('wake up after ' + time);
                resolve();
            }, time * 1000);
        });
    }
}

function LazyMan(name) {
    return new _LazyMan(name);
}

LazyMan('Tom').eat('apple').sleep(2).eat('banana')