//1. 通过 Generator 函数为它加上这个接口
function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);
  
    for (let propKey of propKeys) {
      yield [propKey, obj[propKey]];
    }
  }
  
  let jane = { first: 'Jane', last: 'Doe' };
  
  for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
  }
// 2. 将 Generator 函数加到对象的Symbol.iterator属性上面
  function* objectEntriesProp() {
    let propKeys = Object.keys(this);
  
    for (let propKey of propKeys) {
      yield [propKey, this[propKey]];
    }
  }
  
  let tom = { first: 'tom', last: 'Doe' };
  
  tom[Symbol.iterator] = objectEntriesProp;
  
  for (let [key, value] of tom) {
    console.log(`${key}: ${value}`);
  }

// 部署 Iterator 接口
function* makeSimpleGenerator(array){
    var nextIndex = 0;
  
    while(nextIndex < array.length){
      yield array[nextIndex++];
    }
  }
  
  var gen = makeSimpleGenerator(['yo', 'ya']);
  
  gen.next().value // 'yo'
  gen.next().value // 'ya'
  gen.next().done  // true