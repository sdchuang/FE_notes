
/**
 * 寻找数组的中心索引
 * @param {number[]} nums
 * 不算中心索引的值，其左右两侧的值的和都相等
 */
function findCenterIndex(nums) {
  let sum = nums.reduce((s, p) => s + p, 0)
  let len = nums.length
  let index = -1
  for(let i = 0;i < len;i++){
    let restSum = nums.slice(0, i).reduce((s, p) => s + p, 0)
    if(restSum == (sum - nums[i] - restSum)){
      return i
    }
  }
  return index
}


/**
 * 原地旋转矩阵
 * @param {number[][]} matrix
*/
function rotate(matrix) {
  const n = matrix.length;
  const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix_new[j][n - i - 1] = matrix[i][j];
    }
  }
  // 重新赋到原数组
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = matrix_new[i][j];
    }
  }
}


/**
 * TODO
 * 矩阵对角线遍历
 * @param {number[][]} matrix
 */
function findDiagonalOrder(matrix) {
  let nums = [];
  // 非空判定
  let m = mat.length;
  if (!m) return nums;
  let n = mat[0].length;
  if (!n) return nums;
  // 默认是右上
  let flag = true;
  // 为什么是<m + n - 1，举例来说1个3*3的矩阵，i的值最大是4 所以是小于m + n - 1=3+3-1
  for (let i = 0; i < m + n - 1; i++) {
    // m 和 n 的上界-因为要翻转奇数列推入顺序-因此边界要变化
    let limitM = flag ? m : n;
    let limitN = flag ? n : m;

    let x = i < limitM ? i : limitM - 1;
    let y = i - x;
    while (x >= 0 && y < limitN) {
      // 奇数列翻转推入
      nums.push(flag ? mat[x][y] : mat[y][x]);
      // 此消彼长
      x--;
      y++;
    }
    // 取相反，比方说右上变成左下，左下变成右上
    flag = !flag;
  }
  return nums;
}
