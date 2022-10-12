
/**
 * 组合
 */
 var combine = function(n, k) {
  const ans = [];
  const dfs = (cur, n, k, temp) => {
      // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
      if (temp.length + (n - cur + 1) < k) {
          return;
      }
      // 记录合法的答案
      if (temp.length == k) {
          ans.push(temp);
          return;
      }
      // 考虑选择当前位置
      dfs(cur + 1, n, k, [...temp, cur]);
      // 考虑不选择当前位置
      dfs(cur + 1, n, k, temp);
  }
  dfs(1, n, k, []);
  return ans;
};


/**
 * 全排列
 */
var combinationSum = function(nums) {
  let res = []
  let len = nums.length

  let backtrack = function(nums, list){
    if(list.length == len){
      res.push(new Array(...list))
      return
    }
    for(let i=0;i<len;i++){
      // 剪枝，把已排过的树跳过
      if(list.includes(nums[i])) continue
      // 做选择
      list.push(nums[i])
      backtrack(nums, list)
      // 撤销选择
      list.pop()
    }
  }
  backtrack(nums, [])
  return res
};

/**
 * 子集
 */
const subsets = (nums) => {
  const res = [];

  const dfs = (index, list) => {
    res.push(list.slice());     // 调用子递归前，加入解集
    for (let i = index; i < nums.length; i++) { // 枚举出所有可选的数
      list.push(nums[i]);       // 选这个数
      dfs(i + 1, list);         // 基于选这个数，继续递归，传入的是i+1，不是index+1
      list.pop();               // 撤销选这个数
    }
  };
  dfs(0, []);
  return res;
};

