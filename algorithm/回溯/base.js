
/**
 * 组合
 * n=4 k=2
 * 1-4 其中任意两数的全部组合
 */
 var combine = function(n, k) {
  let res = []
  let back = function(start, n, k, list){
    if(list.length === k){
      res.push([...list])
      return
    }
    // 
    for(let i=start;i<=n;i++){
      list.push(i)
      back(i+1, n, k, list)
      list.pop()
    }
  }
  back(1,n,k,[])
  return res
};


/**
 * 全排列
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
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
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
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


// 组合总和
// 输入：candidates = [2,3,6,7], target = 7
// 输出：[[2,2,3],[7]]
var combinationSum = function(candidates, target) {
  let len = candidates.length
  let res = []
  let path = []

  let dfs = function(candidates, idx, target, path){
      if(target < 0){
          return
      }
      if(target == 0){
          res.push(path.length > 1 ? new Array(...path) : [path[0]])
          return
      }
      for(let i=idx;i<len;i++){
          path.push(candidates[i])
          dfs(candidates, i, target - candidates[i], path)
          path.pop()
      }
  }
  dfs(candidates, 0, target, path)
  return res
};

