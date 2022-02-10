// ms:理论执行总时间，这里测试用 5000 ms
function patchSetTimeout(interval = 1000, ms = 5000) {
  let count = 0;
  let timeCounter;
  const startTime = new Date().getTime();
  if (ms >= 0) {
    timerCounter = setTimeout(countDownStart, interval);
  }

  function countDownStart() {
    count++;
    const offset = new Date().getTime() - (startTime + count * interval);
    const nextTime = Math.max(interval - offset, 0);
    ms -= interval;
    if (ms < 0) {
      clearTimeout(timeCounter);
    } else {
      console.log(
        `第${count}次执行误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`
      );
      timeCounter = setTimeout(countDownStart, nextTime);
    }
  }

  return timeCounter
}

const myTimeout = patchSetTimeout()
// myTimeout()