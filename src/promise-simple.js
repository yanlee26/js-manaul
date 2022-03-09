function Promise(fn) {
  this.cbs = [];

  const resolve = (value) => {
    setTimeout(() => { // 模拟异步
      this.data = value;
      this.cbs.forEach(cb => cb(value));
    });
  }

  fn(resolve);
}

// 返回新的 Promise 并放到 cbs 队列里
Promise.prototype.then = function(onResolved) {
  return new Promise((_resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);// 最新的 resolve data
      if (res instanceof Promise) {
        res.then(_resolve);
      } else {
        _resolve(res);
      }
    });
  });
};

// 构造链式调用的队列

new Promise((resolve1) => {
    setTimeout(() => {
      resolve1(1);
    }, 500);
  })
    .then((res) => {
      console.log(res); 
      // 需要处理为 Promise 的情况，让其执行
      return new Promise((resolve2) => {
        setTimeout(() => {
          resolve2(2);
        }, 500)
      }).then(()=>66);;
    })
    .then(x=>{console.log(x);return x})
    .then(()=>console.log(3));