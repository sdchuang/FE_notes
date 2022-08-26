/**
 * 二叉树前序遍历
 * @param {rootNode} root 树根节点 
 */
// 递归
// 运行时直接打印结果
function preOrder(root) {
  if (root) {
    console.log(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
}

//运行后输出结果
function preOrder(root) {
  let res = []
  // 为了内部存储res数值，新建一个函数来执行递归
  let tre = function(root){
    if(!root) return null
    res.push(root.val)
    tre(root.left)
    tre(root.right)
  }
  tre(root)
  return res
} 

// 迭代
// 按照 根-左-右 的顺序，从前往后插入数组
function preOrder(root) {
  // 结果数组
  let res = []
  // 栈
  let stack = []
  // 根节点入栈
  stack.push(root)
  while(stack.length){
    // 根节点出栈
    let item = stack.pop()
    if(!item) break
    // 节点存储
    res.push(item.val)

    // 右节点入栈，出栈时，右节点后出栈
    if(item.right){
      stack.push(item.right)
    }
    // 左节点入栈
    if(item.left){
      stack.push(item.left)
    }
  }
  return res
}


/**
 * 二叉树中序遍历
 */
function inOrder(root) {
  if (root) {
    inOrder(root.left);
    console.log(root.val);
    inOrder(root.right);
  }
}

// 迭代
// 根节点及左子树入栈，左子树为空时，出栈并存储，访问右子树，（右有的话，放左子树，没有再出栈存储）
// 整体为根及左先入栈，根左遍历完后，出栈存储，再操作右子树
function inOrder(root) {
  let res = []
  let stack = []
  while(stack.length || root){
    if(root){
      stack.push(root)
      root = root.left
    }else{
      let node = stack.pop()
      res.push(node.val)
      root = node.right
    }
  }
  return res
}


/**
 * 二叉树后序遍历
 */
function postOrder(root) {
  if (root) {
    postOrder(root.left);
    postOrder(root.right);
    console.log(root.val);
  }
}

// 迭代
// 先序遍历的反向版本，按照 根-右-左 的顺序，从后往前（数组最后一项到第一项）插入数组
function preOrder(root) {
  // 结果数组
  let res = []
  // 栈
  let stack = []
  // 根节点入栈
  stack.push(root)
  while(stack.length){
    // 根节点出栈
    let item = stack.pop()
    if(!item) break
    // 节点存储，倒着存储
    res.unshift(item.val)

    // 左节点入栈，出栈时，做节点后出栈
    if(item.left){
      stack.push(item.left)
    }
    // 右节点入栈
    if(item.right){
      stack.push(item.right)
    }
  }
  return res
}


/**
 * 二叉树层序遍历
 * 层序遍历，按照层次遍历，每一层从左到右插入数组
 */
// 迭代
// 层序遍历，按照层次遍历，每一层从左到右插入数组
// 根节点入队，出队时，把下一层的节点也放到队列里面，之后按照入队顺序依次出队
function levelOrder(root) {
  if (!root) return []
  let res = []
  let queue = []
  queue.push(root)
  // 从上到下，遍历每一层（判断有没有下一层）
  while(queue.length){
    // 每层的数据
    let lev = []
    // 从左到右遍历每个节点
    for (let i = 0; i < queue.length; i++) {
      let item = queue.shift()
      lev.push(item.val)
  
      if(item.left){
        queue.push(item.left)
      }
      if(item.right){
        queue.push(item.right)
      }
    }
    res = res.concat(lev)
  }
  return res
}


/**
 * 二叉树深度
 */
function depth(root) {
  if (!root) return 0
  // 左右子树的深度
  return Math.max(depth(root.left), depth(root.right)) + 1
}


/**
 * 二叉树叶子节点的和
 */
function sumOfLeaves(root) {
  if (!root) return 0
  // 叶子节点的和
  if (!root.left && !root.right) return root.val
  // 遍历左右子树
  return sumOfLeaves(root.left) + sumOfLeaves(root.right)
}


/**
 * 输出二叉树叶子节点
 */
function printLeaves(root) {
  if (!root) return
  if (!root.left && !root.right) {
    console.log(root.val)
    return
  }
  printLeaves(root.left)
  printLeaves(root.right)
}


/**
 * 输出二叉树左边节点
 */
function printLeftNode(root) {
  if (!root) return
  console.log(root.val)
  if (root.left) {
    printLeftNodes(root.left)
  }
}


/**
 * 输出二叉树右边节点
 */
function printRightNode(root) {
  if (!root) return
  console.log(root.val)
  if (root.right) {
    printLeftNodes(root.right)
  }
}


/**
 * 对称二叉树
 * 判断一个二叉树是否是对称的，对称的二叉树的左右子树的结构是相同的
 */
const isSymmetric = (root) => {
  
  const check = (left, right) => {
      if (left == null && right == null) { // 两个子树都为null，是对称的
         return true;
      }
      if (left && right) { // 两个子树都存在，则需要：root值相同，且他们的子树也满足镜像
          return left.val == right.val && check(left.left, right.right) && check(left.right, right.left);
      }
      return false;        // 一个子树存在一个不存在，肯定不对称
  };

  if (root == null) {     // 如果传入的root就是null，对称
      return true;
  }           
  return check(root.left, root.right); // 否则，判断它的左右子树是否满足对称
};


/**
 * 路径总和
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
 * 这条路径可以经过多个节点，但不能经过根节点。
 * 思路：从上往下遍历，总和减去当前节点值，如果等于0，则说明找到了路径
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
function hasPathSum(root, sum) {
  if (!root) return false
  // 如果当前节点是叶子节点，则判断是否等于sum
  if (!root.left && !root.right) {
    return root.val === sum
  }
  // 如果当前节点不是叶子节点，则判断左右子树是否有路径，如果有，则返回true
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
}


/**
 * 从前序与中序遍历序列构造二叉树
 */
function buildTree(preorder, inorder) {
  let map = new Map()
  // 中序索引
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i)
  }
  let build = function (inorder, inStart, inEnd, preorder, postStart, postEnd) {
    if(inStart > inEnd || postStart > postEnd){
        return null
    }
    // 确定根节点
    let rootVal = preorder[postStart]
    // 确定在中序中的索引
    let index = map.get(rootVal)
    // 构建
    let root = new TreeNode(rootVal)
    // 确定左右子树  并递归
    // 确定左子树长度
    let leftLen = index - inStart
    root.left = build(inorder, inStart, index-1, preorder, postStart+1, postStart + leftLen)
    root.right = build(inorder, index+1, inEnd, preorder, postStart + leftLen+1, postEnd)

    return root
  }

  return build(inorder, 0, inorder.length-1, preorder, 0, preorder.length-1)
}
// 另一种写法
function buildTree(preorder, inorder) {
  if (!preorder.length || !inorder.length) return null
  // 取出根节点
  let root = new TreeNode(preorder[0])
  // 取出根节点在中序中的索引
  let index = inorder.indexOf(preorder[0])
  // 确定左右子树   并递归
  root.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
  root.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
  return root
}


/**
 * 从后序与中序遍历序列构造二叉树
 */
function buildTree(postorder, inorder) {
  let map = new Map()
  // 中序索引
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i)
  }
  let build = function (inorder, inStart, inEnd, postorder, postStart, postEnd) {
    if(inStart > inEnd || postStart > postEnd){
        return null
    }
    // 确定根节点
    let rootVal = postorder[postEnd]
    console.log(rootVal)
    // 确定在中序中的索引
    let index = map.get(rootVal)
    // 构建
    let root = new TreeNode(rootVal)
    // 确定左右子树  并递归
    let leftLen = index - inStart
    root.left = build(inorder, inStart, index-1, postorder, postStart, postStart + leftLen -1)
    root.right = build(inorder, index+1, inEnd, postorder, postStart + leftLen, postEnd-1)

    return root
  }

  return build(inorder, 0, inorder.length-1, postorder, 0, postorder.length-1)
}
// 另一种写法
function buildTree(postorder, inorder) {
  if (!postorder.length || !inorder.length) return null
  // 取出根节点
  let root = new TreeNode(postorder[postorder.length - 1])
  // 取出根节点在中序中的索引
  let index = inorder.indexOf(postorder[postorder.length - 1])
  // 确定左右子树   并递归
  root.left = buildTree(postorder.slice(0, index), inorder.slice(0, index))
  root.right = buildTree(postorder.slice(index, postorder.length - 1), inorder.slice(index + 1))
  return root
}


/**
 * 最近公共祖先
 * 遍历每个节点和目标值比较，如果有相等的，则返回该节点
 * 如果没有，继续下层遍历，
 * 如果左右都找到了，说明当前节点就是公共祖先，则返回当前节点
 * 如果其中一侧没有找到，说明这两个值都在另一侧上，则返回另一侧的祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 */
function lowestCommonAncestor(root, p, q) {
  if (!root) return null
  // 如果根节点是p或者q，则返回根节点
  if (root === p || root === q) return root
  // 如果根节点不是p或者q，则判断左右子树是否有p或者q，如果有，则返回根节点
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  // 如果左右子树都有p或者q，则返回根节点
  if (left && right) return root
  // 如果左右子树有一个有p或者q，则返回左右子树的公共祖先
  return left ? left : right
}


/**
 * 最大路径和
 */
 var maxPathSum = function(root) {
  let sum = Number.MIN_SAFE_INTEGER
  function tra(root){
      if(root == null) return 0
      // 遍历左右子树，并返回其中最大值
      let left = Math.max(tra(root.left) ,0) 
      let right = Math.max(tra(root.right) ,0) 
      // 回溯，计算并更新最大值
      sum = Math.max(left+right+root.val, sum)
      // 回溯完毕，返回当前节点的最大值
      return Math.max(left, right, 0) + root.val
  }
  tra(root)
  return sum
};
