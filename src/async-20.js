function asyncToGenerator(generatorFunc) {
  return function() {
    const gen = generatorFunc.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }
        const {
          value,
          done
        } = generatorResult
        console.log('done: ', done);
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
        }
      }
      step("next")
    })
  }
}

// test
const getData = (d) => new Promise(resolve => setTimeout(() => resolve(d), 1000))

function* testG() {
  // await被编译成了yield
  const data = yield getData('data1')
  console.log('data: ', data);
  const data2 = yield getData('data2')
  console.log('data2: ', data2);
  return 'success'
}

var gen = testG()

var dataPromise = gen.next()

dataPromise.value.then((value1) => {
  // data1的value被拿到了 继续调用next并且传递给data
  var data2Promise = gen.next(value1)

  // console.log('data: ', data);
  // 此时就会打印出data

  data2Promise.value.then((value2) => {
    // data2的value拿到了 继续调用next并且传递value2
    gen.next(value2)

    // console.log('data2: ', data2);
    // 此时就会打印出data2
  })
})

const run = asyncToGenerator(testG)

run()