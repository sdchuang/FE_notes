
/**
 * 归并排序
 * @param {*} arr
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    // 数组分成两半
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    // 递归
    return merge(mergeSort(left), mergeSort(right));
}
// 按顺序合并左右两个数组
function merge(left, right){
  const res = []

  while(left.length && right.length){
    if(left[0] <= right[0]){
      res.push(left.shift())
    }else{
      res.push(right.shift())
    }
  }
  while(left.length){
    res.push(left.shift())
  }
  while(right.length){
    res.push(right.shift())
  }
  return res
}

/**
 * 快速排序
 * @param {*} arr
 */
function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let left = [];
    let right = [];
    // 取出一个值
    let pivot = arr.shift();
    // 数组中其他数与pivot比较，小的放左边，大的放右边
    while (arr.length) {
        if (arr[0] <= pivot) {
            left.push(arr.shift());
        } else {
            right.push(arr.shift());
        }
    }
    // 递归，拼接左右中间数据
    return quickSort(left).concat(pivot, quickSort(right));
}

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
    let len = arr.length;
    // 循环次数
    for (let i = 0; i < len; i++) {
      // 循环比较
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
              // 交换
              [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr;
}

/**
 * 插入排序
 */
function insertSort(arr) {
  let len = arr.length
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }
  return arr
}

/**
 * 选择排序
 * @param {*} arr
 */
function selectSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }
    return arr;
}