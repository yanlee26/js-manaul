// 值，类型；基本类型，复合类型
function equal(a, b) {
  if (a === b) return true;// 基本类型的值与类型相等，基本与复合类型类型的相等
  // 要求类型一致
  if (getType(a) !== getType(b)) return false;// 基本类型的类型不等，基本与复合类型的类型不等

  if (Array.isArray(a) || typeof a == 'object') { // 复合类型：对象或数组
    const [keysA,keysB] = [Object.keys(a),Object.keys(b)];
    let length = keysA.length;
    if (length != keysB.length) return false;// 复合类型形状长度不同
    while (length--) {
      const key = keysA[length];
      if (!(keysB.includes(key)) || !equal(a[key], b[key])) return false;// 复合类型形状或值不同
    }
  } else { 
    return a == b; // 基本类型值的相等
  }
  return true;
}

function getType(o) {
    return Object.prototype.toString.call(o)
}
console.log(equal(1, 1));
console.log(equal(1, 2));
console.log(equal({}, null));
console.log(equal([1, 2], [1, 2]));

var a = [1, 2, [3, 4],
  [5, [6, 7]]
];
var b = [1, 2, [3, 4],
  [5, [6, 7]]
];
console.log(equal(a, b));

var c = {
  x: [1, 2, 3],
  y: {
    z: {
      w: 1
    }
  },
  t: 2
};
var d = {
  x: [1, 2, 3],
  y: {
    z: {
      w: 1
    }
  },
  t: 2
};
console.log(equal(c, d));

// 拓展：处理循环引用