
// 分治算法：【全排列算法】

function arrageArray(list) {
    const len = list.length
    const res = [] 

    function arrange(collector, arrToSplice) {
      if (collector.length === len) { 
        res.push(collector.join('')) 
      } else {
            arrToSplice.forEach((item, index) => {
                const newCollector = [...collector,item]
                const temp = arrToSplice.slice(0)
                temp.splice(index, 1)
                arrange(newCollector, temp) 
        })
      }
    }

    arrange([], list)

    return res
}


console.log(arrageArray(['a', 'b', 'c','d']));
