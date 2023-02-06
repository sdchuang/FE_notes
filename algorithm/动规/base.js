
/**
 * 斐波那契
 */
// 递归
function fibonacci(n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 迭代
function fib(n) {
  if(n<2) return n;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    let temp = curr;
    curr = curr + prev;
    prev = temp;
  }
  return curr;
}


/**
 * 阶乘
 */
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}


/**
 * 找零钱
 * @param {*} money 总金额
 * @param {*} coins 硬币种类
 */
function change(money, coins) {
  if (money === 0) {
    return 0;
  }
  if (coins.length === 0) {
    return -1;
  }
  let min = Number.MAX_VALUE;
  for (let i = 0; i < coins.length; i++) {
    let temp = change(money - coins[i], coins.slice(i + 1));
    if (temp !== -1) {
      min = Math.min(min, temp + 1);
    }
  }
  return min;
}


/**
 * 最大子序和
 * [-2,1,-3,4,-1,2,1,-5,4]  6  连续子数组 [4,-1,2,1] 的和最大，为 6 
 * f(i)=max{f(i−1)+nums[i],nums[i]}
 */
 var maxSubArray = function(nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};


/**
 * 买卖股票的最佳时机
*/
var maxProfit = function(prices) {
  let n = prices.length
  let dp = Array.from(new Array(n), () => new Array(2))

  dp[0][0] = 0; //第0天不持有
  // 第一天交易1次
  dp[0][1] = -prices[0]

  for(let i=1;i<n;i++){
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }

  return dp[n-1][0]
};


/**
 * 打家劫舍
 */
var rob = function(nums) {
  let n = nums.length;
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return nums[0];
  }
  let dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[n - 1];
}

// 最长公共子序列
// 输入：text1 = "abcde", text2 = "ace" 
// 输出：3  
// 两字符串相同: dp[i][j] = dp[i-1][j-1] + 1;
// 不同: dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
var longestCommonSubsequence = function(text1, text2) {
  let m = text1.length;
  let n = text2.length;
  let dp = Array.from({length: m+1},()=> new Array(n+1).fill(0));
  dp[0][0] = 0;
  for(let i = 1; i <=m; i++) {
      for(let j = 1; j <=n; j++) {
          if(text1[i-1] === text2[j-1]) {
              dp[i][j] = dp[i-1][j-1] + 1;
          } else {
              dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
          }
      }
  }
  return dp[m][n];
};


/**
 * 单词拆分
 * 入参 ： 'leetcode' ["leet","code"]
 */
function wordBreak(s, wordDict){
  const n = s.length;
    const wordDictSet = new Set(wordDict);
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}


// 最长上升子序列
function lengthOfLIS(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let dp = new Array(arr.length).fill(1);
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}


/**
 * 乘积最大子数组
 */
 var maxProduct = function(nums) {
  let max = min = nums[0], dp = [nums[0]]

  for (let i=1; i<nums.length; i++) {
      if (nums[i] < 0) {
         [max, min] = [min, max]
      }

      max = Math.max(max*nums[i], nums[i])
      min = Math.min(min*nums[i], nums[i])

      dp[i] = max
  }

  return Math.max(...dp)
};
