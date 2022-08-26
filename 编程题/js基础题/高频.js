
/**
 * 面试中高频题
 * 部分题目没有具体代码，可以再其他文件中查找到，避免重复出现
 */

/**
 * 并发队列
 */

/**
 * 列表转树结构
 * 一级对象数组，处理为树结构
 * @param {*} list
 */
function listToTree(data) {
  let temp = {};
  let treeData = [];
  // 按照id分组
  for (let i = 0; i < data.length; i++) {
    temp[data[i].id] = data[i];
  }
  for (let i in temp) {
    if (+temp[i].parentId != 0) {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = [];
      }
      temp[temp[i].parentId].children.push(temp[i]);
    } else {
      treeData.push(temp[i]);
    }
  }
  return treeData;
}


/**
 * 版本号排序
 * 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
 * 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
 * @param {*} arr
 */
function versionSort(arr) {
  return arr.sort((a, b) => {
    let i = 0;
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    // 循环依次比较
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i];
      i++;
      // 长度
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      // 相等
      if (s1 === s2) continue;
      // 正常比较
      return s2 - s1;
    }
  });
}


/**
 * 发布订阅/eventbus/事件总线
 */
 class EventBus {
  // 定义所有事件列表,此时需要修改格式：
  // // {
  //   key: {
  //     D+id: Function,
  //     id: Function
  //   },
  //   key: Object,
  // } 
  // Array存储的是注册的回调函数
  constructor() {
    this.eventObj = {}; // 用于存储所有订阅事件
    this.callbcakId = 0; // 每个函数的ID
  }
  // 订阅事件,类似监听事件$on('key',()=>{})
  $on(name, callbcak) {
    // 判断是否存储过
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }
    // 定义当前回调函数id
    const id = this.callbcakId++;
    this.eventObj[name][id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }
  // 发布事件,类似于触发事件$emit('key')
  $emit(name, ...args) {
    // 获取存储的事件回调函数数组
    const eventList = this.eventObj[name];
    // 执行所有回调函数且传入参数
    for (const id in eventList) {
      eventList[id](...args);
      // 如果是订阅一次，则删除
      if(id.indexOf('D') !== -1) {
        delete eventList[id];
      }
    }
  }
  // 取消订阅函数，类似于$off('key1', id)
  $off(name, id) {
    console.log(this.eventObj)
    // 删除存储在事件列表中的该事件
    delete this.eventObj[name][id];
    console.info(`${id}id事件已被取消订阅`)
    // 如果这是最后一个订阅者，则删除整个对象
    if (!Object.keys(this.eventObj[name]).length) {
      delete this.eventObj[name];
    }
  }
  // 订阅事件，只会执行一次，为了方便，id上直接加上一个标识d
  $once(name, callbcak){
    // 判断是否存储过
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }
    // 定义当前回调函数id,添加D则代表只执行一次
    const id = "D" + this.callbcakId++;
    this.eventObj[name][id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }
}
// 初始化EventBus
let EB = new EventBus();


// 订阅事件
EB.$on('key1', (name, age) => {
  console.info("我是订阅事件A:", name, age);
})
EB.$once("key1", (name, age) => {
  console.info("我是订阅事件B:", name, age);
})
EB.$on("key2", (name) => {
  console.info("我是订阅事件C:", name);
})


// 发布事件key1
EB.$emit('key1', "小猪课堂", 26);
console.info("在触发一次key1")
EB.$emit('key1', "小猪课堂", 26);
// 发布事件
EB.$emit('key2', "小猪课堂");



/**
 * 数组拉平
 * 多种方式实现
 */



/**
 * 函数柯里化
 */
function currying(fn, ...args) {
  const length = fn.length;
  let allArgs = [...args];
  const res = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs];
    if (allArgs.length === length) {
      return fn(...allArgs);
    } else {
      return res;
    }
  };
  return res;
}

// 用法如下：
// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2,3))


/**
 * lazyMan
 */


/**
 * 防抖/节流
 */


/**
 * LRU算法
 * 最近最少使用算法
 */
//  一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看,map栈底新增的为最新的
class LRUCache {
  constructor(capacity) {
    this.secretKey = new Map();
    // 容量
    this.capacity = capacity;
  }
  get(key) {
    if (this.secretKey.has(key)) {
      let tempValue = this.secretKey.get(key);
      this.secretKey.delete(key);
      this.secretKey.set(key, tempValue);
      return tempValue;
    } else return -1;
  }
  // 
  put(key, value) {
    // key存在，仅修改值
    if (this.map.has(key)) { 
      this.map.delete(key) 
    }
    this.map.set(key, value)
    if(this.map.size > this.capacity){
      this.map.delete(this.map.keys().next().value)
    }
  }
}


/**
 * render函数-虚拟dom渲染
 */
function render(vnode, container) {
  // 如果是文本节点，则直接插入到container中
  if (typeof vnode === "string" || typeof vnode === "number") {
    container.appendChild(document.createTextNode(vnode));
  }
  // 如果是函数节点，则调用函数，获取新的虚拟dom
  else if (typeof vnode === "function") {
    const vnode = vnode();
    render(vnode, container);
  }
  // 如果是对象节点，则创建元素，并且插入到container中
  else if (typeof vnode === "object") {
    const element = document.createElement(vnode.tagName);
    // 如果有属性，则添加属性
    if (vnode.attrs) {
      Object.keys(vnode.attrs).forEach(key => {
        element.setAttribute(key, vnode.attrs[key]);
      });
    }
    // 如果有子节点，则添加子节点
    if (vnode.children) {
      vnode.children.forEach(child => {
        render(child, element);
      });
    }
    container.appendChild(element);
  }
}


/**
 * 模板字符串解析
 * '我是{{name}}，年龄{{age}}，性别{{sex}}';  - 我是姓名，年龄18，性别undefined
 */
 function render(template, data) {
  let computed = template.replace(/\{\{(\w+)\}\}/g, function (match, key) {
    return data[key];
  });
  return computed;
}

/**
 * 大数相加
 */


/**
 * 浮点数千分位格式化
 */


/**
 * 手写实现promise及相关API
 */

/**
 * 实现高阶函数map
 */
 Array.prototype.myMap = function(fn) {
  let arr = Array.prototype.slice.call(this);
  let mappedArr = Array()
  for(let i = 0; i < arr.length; i++) {
    if(!arr.hasownProperty(i)) continue;
    mappedArr[i] = fn.call(this, arr[i], i, this);
  }
  return mappedArr;
}

// reduce
Array.prototype.reduce = function(fn, prev) {
  for(let i = 0; i < this.length; i++) {
    // 初始值不传时的处理
    if (typeof prev === 'undefined') {
      // 明确回调函数的参数都有哪些
      prev = fn(this[i], this[i+1], i+1, this);
      ++i;
    } else {
      prev = fn(prev, this[i], i, this)
    }
  }
  // 函数的返回结果会作为下一次循环的 prev
  return prev;
};

/**
 * 对象拉平
 */
 function flatten(obj) {
  function isObject(val) {
    return typeof val === "object" && val !== null;
  }
  if (!isObject(obj)) {
    return;
  }
  // 结果
  let res = {};
  // 递归
  const dfs = (cur, prefix) => {
    // 判断是否是对象
    if (isObject(cur)) {
      // 数组
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        // 对象
        for (let k in cur) {
          dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
        }
      }
    } else {
      // 普通类型值
      res[prefix] = cur;
    }
  };
  dfs(obj, "");

  return res;
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

// 括号生成
function generateParenthesis(n) {
  let res = [];
  const dfs = (left, right, str) => {
    if (left === 0 && right === 0) {
      res.push(str);
    }
    if (left > 0) {
      dfs(left - 1, right, str + "(");
    }
    if (right > left) {
      dfs(left, right - 1, str + ")");
    }
  }
  dfs(n, n, "");
  return res;
}