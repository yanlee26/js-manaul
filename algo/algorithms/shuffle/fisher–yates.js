import { swap } from '../../util';

// 乱序
export function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    // 返回数据范围: [0, currentIndex - 1]
    currentIndex--;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}