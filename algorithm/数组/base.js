
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
function findDiagonalOrder(mat) {
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


/**
 * 数组去重 要求时间复杂度 O(n)
 * @param {number[]} nums
 */
function removeDuplicates(arr) {
  let map = new Map()
  for (let i = 0; i < arr.length;) {
    const item = arr[i];
    if(map.has(item)){
      arr.splice(i, 1)
    }else{
      map.set(item, true)
      // 截取的时候不累加
      i++
    }
  }
  return arr
}


/**
 * 长度最小的子数组
 * case:target = 7, nums = [2,3,1,2,4,3]  4+3=7
 * 双指针+滑动窗口：记录并更新 >=target 的最小长度
 */
function minSubArrayLen(nums, target) {
  let min = nums.length + 1
  let sum = 0

  let left = 0
  let right = 0

  while (right<nums.length) {
    sum += nums[right++]
    while(sum >= target){
      min = Math.min(min, right-left)
      sum -= nums[left++]
    }
  }
  return min > nums.length ? 0 : min
}


/**
 * 第 k 个缺失的正整数
 * 如果数组中没有小于k的数，那么第k个缺失的数字就是k
 * 数组中每出现一个 <= k 的数字, 意味着少了一个缺失的数字, 此时k+1
 * 最后返回k
 */
function findKthPositive(arr, k) {
    arr.sort((a, b) => a-b)
    arr = [...new Set(arr)]
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= k && arr[i] > 0) {
            k++
        }
    }

    return k
}


/**
 * 数组中的第K个最大元素
 * @param {number[]} nums 数组
 * @param {number} k 从0开始 第k大
 * @return {number}
 * @example
 * findKthLargest([3,2,1,5,6,4], 2) // 5
 * 遇到大的与最后一位交换，交换k次后，相当于只进行了后k个元素的排序，最后取倒数第k个元素
 */
function findKthLargest(nums, k) {
  for (let i = nums.length; i > nums.length - k - 1; i--) {
    for (let j = 0; j < i; j++) {
      console.log(i, j, nums[i], nums[j])
      if (nums[j] > nums[i]) {
        [nums[j], nums[i]] = [nums[i], nums[j]]
      }
    }
  }
  console.log(nums, nums.length)
  return nums[nums.length - k]
}


/**
 * 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 * @example
 * threeSum([-1,0,1,2,-1,-4]) // [[-1,-1,2],[-1,0,1]]
 */
function threeSum(nums) {
  if (!nums || nums.length < 3) return []
  // 排序
  nums.sort((a, b) => a-b)
  let sum = 0; // 三个数的和
  result = [];
  for (let i = 0; i < nums.length; i++) {
    if (i && nums[i] === nums[i - 1]) continue; // 若当前这一项和上一项相等则跳过
    // 左右指针
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      // 三指针求和
      sum = nums[i] + nums[left] + nums[right];
      // 如果大于0，则右指针左移
      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        // 如果小于0，则左指针右移
        left++;
      } else {
          // 如果和为0，则添加到结果中
          result.push([nums[i], nums[left], nums[right]]);
          // 存完之后，左右指针同时向右移动
          left++
          right--
          // 跳过重复的值
          while (nums[left] === nums[left - 1]) { // 一直找到不相同的那个坐标
              left++;
          }
          // 跳过重复的值
          while (nums[right] === nums[right + 1]) {
              right--;
          }
      }
    }
  }
  return result;

}


/**
 * 岛屿数量
 * @param {number[][]} grid
 * @return {number}
 * 深度优先遍历--遇到1进行深度优先遍历，并且把相邻的1变成0
 * 深度优先遍历的次数即为岛屿数量
 */
function numIslands(grid) {
  function dfs(x, y) {
    // 变为0
    grid[x][y] = 0
    // 左边
    if(grid[x - 1] && grid[x - 1][y] == 1) dfs(x-1, y)
    // 右边
    if(grid[x + 1] && grid[x + 1][y] == 1) dfs(x+1, y)
    // 上边
    if(grid[x][y - 1] == 1) dfs(x, y - 1)
    // 下边
    if(grid[x][y + 1] == 1) dfs(x, y + 1)
  }
  let count = 0
  for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j< grid[0].length; j++) {
        // 如果是1，则进行深度优先遍历
          if(grid[i][j] == 1) {
              dfs(i, j)
              count++
          }
      }
  }
  return count
}


/**
 * 算法：长度不限的二维数组[[a,b],[1,2]],求其所有排列组合[a1,a2,b1,b2]
 * 动态规划，下一次的结果，依赖上一次的结果
 * 
 * @param {array} arr 
 */
function permutate(arr) {
  // 第一次的结果就是二维数组的第0项
  // 第一次，默认结果就是第一项
  let res = arr[0].slice();
  for (let i = 1; i < arr.length; i++) { //arr.length
    // 每次拼接好的前缀
    const pre = res.slice();
    res = [];
    // 遍历拼接好的前缀，继续后续拼接
    pre.forEach(item => {  //res.length
      // 遍历后续数组，拼接
      arr[i].forEach(curr => {  // arr[i].length
        res.push(item + curr)
      })
    });
  }
  return res;
}


/**
 * 最长重复子数组
 * @param {*} A 
 * @param {*} B 
 * @returns 
 * nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
 * 双层遍历，遇到相同的，再看看后续的是否也相同，同时更新子串长度，直至两个都遍历完
 */
var findLength = function(A, B) {
  const m = A.length;
    const n = B.length;
    let res = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (A[i] == B[j]) { // 遇到相同项
          let subLen = 1;   // 公共子序列长度至少为1
          while (i + subLen < m && j + subLen < n && A[i + subLen] == B[j + subLen]) { //新的一项也相同
            subLen++; // 公共子序列长度每次增加 1，考察新的一项
          }
          res = Math.max(subLen, res);
        }
      }
    }
    return res;
  };


/**
 * 二分法-查找一元素的前后坐标
 */
const binarySearch = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

var searchRange = function(nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    } 
    return ans;
};


/**
 * 最长连续序列
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 */
 var longestConsecutive = function(nums) {
  let num_set = new Set();
  for (const num of nums) {
      num_set.add(num);
  }

  let longestStreak = 0;

  for (const num of num_set) {
      if (!num_set.has(num - 1)) {
          let currentNum = num;
          let currentStreak = 1;

          while (num_set.has(currentNum + 1)) {
              currentNum += 1;
              currentStreak += 1;
          }

          longestStreak = Math.max(longestStreak, currentStreak);
      }
  }

  return longestStreak;   
};


/**
 * 每日温度
 */
 const dailyTemperatures = (T) => {
  const res = new Array(T.length).fill(0);
  for (let i = 0; i < T.length; i++) {
      for (let j = i + 1; j < T.length; j++) {
          if (T[j] > T[i]) {
              res[i] = j - i;
              break;
          }
      }
  }
  return res;
}
