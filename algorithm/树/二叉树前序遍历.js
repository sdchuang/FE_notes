/**
 * 二叉树前序遍历
 * @param {rootNode} root 树根节点 
 */
function preOrder(root) {
  if (root) {
    console.log(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
}
