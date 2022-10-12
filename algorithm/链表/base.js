
/**
 * 数组生成链表
 */
function arrayToList(array) {
  if (array.length === 0) {
    return null;
  }
  let head = {
    value: array[0],
    next: null
  };
  let current = head;
  for (let i = 1; i < array.length; i++) {
    current.next = {
      value: array[i],
      next: null
    };
    current = current.next;
  }
  return head;
}


/**
 * 环形链表
 */
function listCycle(head) {
  if (!head) {
    return false;
  }
  // 快慢指针
  let slow = head;
  let fast = head;
  // 快指针到达末尾时
  while (fast.next && fast.next.next) {
    // 快慢指针同时向后移动 慢+1 快+2
    slow = slow.next;
    fast = fast.next.next;
    // 两指针相遇时
    if (slow === fast) {
      return true;
    }
  }
  return false;
}


/**
 * 相交链表
 * hash表，依次遍历两链表，相遇时，返回相交点
 */
function getIntersectionNode(headA, headB) {
  const visited = new Set();
  let temp = headA;
  while (temp !== null) {
      visited.add(temp);
      temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
      if (visited.has(temp)) {
          return temp;
      }
      temp = temp.next;
  }
  return null;
}


/**
 * 删除链表中的重复元素
 * head = [1,1,2,3,3]
 * 输出：[1,2,3]
 */
 var deleteDuplicates = function(head) {
  if (!head) {
      return head;
  }

  let cur = head;
  while (cur.next) {
      if (cur.val === cur.next.val) {
          cur.next = cur.next.next;
      } else {
          cur = cur.next;
      }
  }
  return head;
};

/**
 * 删除链表中的重复元素
 * head = [1,1,2,3,3]
 * 输出：[2,3]
 */
 var deleteDuplicates = function(head) {
  if (!head) {
      return head;
  }
  let dumNode = new ListNode(0, head)

  let cur = dumNode;
  while (cur.next && cur.next.next) {
      if (cur.next.val === cur.next.next.val) {
          const x = cur.next.val
          while(cur.next && cur.next.val == x){
              cur.next = cur.next.next;  
          }
      } else {
          cur = cur.next;
      }
  }
  return dumNode.next;
};


/**
 * 删除链表的倒数第N个节点
 */
function removeNthFromEnd(head, n) {
  let temp = head;
  // 先找到链表的长度
  let count = 0;
  while (temp !== null) {
      count++;
      temp = temp.next;
  }

  // 边界情况处理
  // 如果链表只有一个节点，则直接返回null
  if (count === 1) {
      return null;
  }
  // 如果n大于链表长度，则直接返回head,相当于不删除
  if (n > count) {
    return head;
  }
  // 如果删除的是第一个节点，则直接返回head.next，相当于删除第一个节点
  if (n === count) {
      return head.next;
  }
  
  temp = head;
  let prev = null;
  // 先遍历到第n-1个节点
  while (count > n) {
    // 先保存下一个节点
      prev = temp;
      // 再移动到下一个节点
      temp = temp.next;
      // 减少计数器
      count--;
  }
  // 删除节点
  prev.next = temp.next;
  return head;
}


/**
 * 反转链表
 */
function reverseList(head) {
  if (!head) {
    return null;
  }
  // 确定出pre cur next三个节点
  let prev = null;
  let current = head;
  while (current !== null) {
    let next = current.next;
    // 调整当前节点的指针，反转指针
    current.next = prev;
    // 更新prev和current
    prev = current;
    current = next;
  }
  return prev;
}

// 反转指定区间链表
var reverseBetween = function(head, left, right) {
  // 制造预先的空节点
  const dummy_node = new ListNode(-1);
  dummy_node.next = head;

 // 遍历到左边界
 let pre = dummy_node;
 for (let i = 0; i < left - 1; ++i) {
     pre = pre.next;
 }
 // 依次遍历区间内节点
//  并把它们依次都放到左边界第一个位置，插入到左边界的边界点
 let cur = pre.next;
 for (let i = 0; i < right - left; ++i) {
      const next = cur.next;
      cur.next = next.next;
      next.next = pre.next;
      pre.next = next;
  }
  return dummy_node.next;
};



/**
 * 移除链表中的元素
 * 删除链表中等于给定值 val 的所有节点。
 */
// function removeElements(head, val) {


/**
 * 奇偶链表
 */
function oddEvenList(head) {
  if (!head) {
    return null;
  }
  // 确定好奇偶链表的头节点
  let odd = head;
  let even = head.next;
  let evenHead = even;
  // 先遍历到偶数链表的最后一个节点
  while (even !== null && even.next !== null) {
    // 构建奇数链表，删除偶数节点
    odd.next = odd.next.next;
    // 奇数链表，节点遍历后移
    odd = odd.next;
    even.next = even.next.next;
    even = even.next;
  }
  // 拼接奇偶链表
  odd.next = evenHead;
}


/**
 * 回文链表
 */
// 转数组，判断是否回文
function isPalindrome(head) {
  const vals = [];
    while (head !== null) {
        vals.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = vals.length - 1; i < j; ++i, --j) {
        if (vals[i] !== vals[j]) {
            return false;
        }
    }
    return true;
}


/**
 * 合并有序链表
 */
function mergeTwoLists(l1, l2) {
  if(l1 === null){
      return l2;
  }
  if(l2 === null){
      return l1;
  }
  if(l1.val < l2.val){
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
  }else{
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
  }
}


/**
 * 两链表相加
 */
function addTwoNumbers(l1, l2) {
  // 进位
  let carry = 0;
  // 结果链表
  let head = null;
  let current = null;
  // 遍历两个链表
  while (l1 !== null || l2 !== null) {
    let val1 = l1 === null ? 0 : l1.val;
    let val2 = l2 === null ? 0 : l2.val;
    // 计算两个数字的和
    let sum = val1 + val2 + carry;
    // 进位
    carry = sum >= 10 ? 1 : 0;
    // 当前位数字
    sum = sum % 10;
    // 构建结果链表
    if (head === null) {
      // 第一个节点
      head = new ListNode(sum);
      // 当前节点
      current = head;
    } else {
      // 下一个节点
      current.next = new ListNode(sum);
      // 当前节点
      current = current.next;
    }
    // 移动指针
    l1 = l1 === null ? null : l1.next;
    l2 = l2 === null ? null : l2.next;
  }
  // 补全进位
  if (carry > 0) {
    current.next = new ListNode(carry);
  }
  return head;
}


/**
 * 旋转链表
 */
function rotateRight(head, k) {
  // 如果链表为空，直接返回
  if (k === 0 || !head || !head.next) {
    return head;
  }
  // 链表长度
  let n = 1;
  let cur = head;
  while (cur.next) {
      cur = cur.next;
      n++;
  }

  // 计算旋转的位置
  let add = n - k % n;
  if (add === n) {
      return head;
  }

  // 首尾相连
  cur.next = head;
  // 找到旋转位置的前一个节点
  while (add) {
      cur = cur.next;
      add--;
  }

  // 旋转后的头节点，后半部分，此时是一个环
  const ret = cur.next;
  // 旋转后的尾节点
  cur.next = null;
  return ret;
}