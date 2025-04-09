
/**
 * 主要为原生js部分API等 手写实现
 */


/**
 * 手写实现call
 * @param {*} context
 * @param {*} args
 * ex:
 * fn.call(obj2, 1, 2)
 * obj2.fn(1, 2)
 */
 Function.prototype.call = function (context, ...args) {
  // 参数预处理
  context = context || window
  args = args || []
  // 获取this
  let fn = this
  // 给context添加属性-调用函数作为context的属性
  let syb = Symbol()
  context[syb] = fn
  // 执行调用函数
  let res = context[syb](...args)
  // 删除临时添加的属性
  delete context[syb]
  // 返回执行结果
  return res
}

/**
 * 手写实现bind
 * @param {*} context
 * @param {*} args
 * ex:
 * fn1 = fn.bind(obj, 1, 2)
 * fn1 = fn.call(obj, 1, 2)
 * fn1 = obj.fn(1, 2)
 * fn1(3, 4)
 */
Function.prototype.bind = function (context, ...args) {
  // 参数预处理
  context = context || window
  args = args || []
  // 获取this
  let fn = this
  // 返回一个函数
  return function (...args2) {
    // 将参数合并
    args = args.concat(args2)
    // 执行函数
    // return fn.call(context, ...args)
    // 等同于
    // 给context添加属性-调用函数作为context的属性
    let syb = Symbol()
    context[syb] = fn
    // 执行调用函数
    let res = context[syb](...args)
    // 删除临时添加的属性
    delete context[syb]
    // 返回执行结果
    return res
  }
}

/**
 * 手写实现new操作符
 * @param {*} constructor 构造函数
 * @param {*} args
 * ex:
 * obj = new Fn(1,2)
 * obj = _new(Fn, 1, 2)
 */
 function _new(constructor, ...args) {
  // 构造函数类型合法判断
  if(typeof constructor !== 'function') {
    throw new Error('constructor must be a function');
  }
  // 新建空对象实例
  let obj = new Object();
  // 将构造函数的原型绑定到新创的对象实例上
  obj.__proto__ = constructor.prototype;
  // 调用构造函数
  let res = constructor.apply(obj,  args);
  // 并判断返回值
  let isObject = typeof res === 'object' && res !== null;
  let isFunction = typeof res === 'function';
  // 如果有返回值且返回值是对象类型，那么就将它作为返回值，否则就返回之前新建的对象
  return isObject || isFunction ? res : obj;
};


/**
 * 实现instanceof
 * 在对应数据的原型上递归查找
 */
function myInstanceof(left, right) {
  while (true) {
    if (left === null) {
      return false;
    }
    if (left.__proto__ === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

/**
 * 实现instanceof
 */
function Instanceof(left, right) {
  let leftVal = Object.getPrototypeOf(left); //获取左侧对象的原型 __proto__
  const rightVal = right.prototype;

  while (leftVal !== null) {
    if (leftVal === rightVal)
        return true;
    leftVal = Object.getPrototypeOf(leftVal);
  }
  return false;
}


/**
 * Object.is()
 * Object.is不会转换被比较的两个值的类型，这点和===更为相似，他们之间也存在一些区别。
 * 1. NaN在===中是不相等的，而在Object.is中是相等的
 * 2. +0和-0在===中是相等的，而在Object.is中是不相等的
 */
function is(left, right) {
  if (left === right) {
    // 当前情况下，只有一种情况是特殊的，即 +0 -0
    // 如果 x !== 0，则返回true
    // 如果 x === 0，则需要判断+0和-0，则可以直接使用 1/+0 === Infinity 和 1/-0 === -Infinity来进行判断
    return left !== 0 || 1 / left === 1 / right;
  }
  // x !== y 的情况下，只需要判断是否为NaN，如果x!==x，则说明x是NaN，同理y也一样
  // x和y同时为NaN时，返回true
  return left !== left && right !== right;
}

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



