
/**
 * 主要为原生js部分API等 手写实现
 */


/**
 * 手写实现call
 * @param {*} context
 * @param {*} args
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
 */
 function _new(constructor, ...args) {
  // 构造函数类型合法判断
  if(typeof constructor !== 'function') {
    throw new Error('constructor must be a function');
  }
  // 新建空对象实例
  let obj = new Object();
  // 将构造函数的原型绑定到新创的对象实例上
  obj.__proto__ = Object.create(constructor.prototype);
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
 * todo
 * 继承
 */
/**
 * 盗用构造函数-对象伪装-经典继承
 * 在子类 构造函数中调用父类构造函数
 */
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {
  SuperType.call(this);
  // 等同于父构造函数中的内容在子构造函数中执行（重写）了一边
  // this.colors = ["red", "blue", "green"];
}
let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black"

let instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"

/**
 * 组合继承
 * 使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方 法定义在原型上以实现重用，又可以让每个实例都有自己的属性和方法
 */
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age){ 
  // *继承属性 
  SuperType.call(this, name);
  this.age = age;
}
// *继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
  console.log(this.age);
};

let instance1 = new SubType("Nicholas", 29); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
instance1.sayName(); // "Nicholas"; 
instance1.sayAge(); // 29

let instance2 = new SubType("Greg", 27);
console.log(instance2.colors);  // "red,blue,green"
instance2.sayName();            // "Greg";
instance2.sayAge();             // 27

/**
 * 原型式继承
 */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

/**
 * 寄生式继承
 * 创建一个实现继承的函数，以某种 方式增强对象，然后返回这个对象
 */
function createAnother(original){
  let clone = object(original); // 通过调用函数创建一个新对象 
  clone.sayHi = function() { // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone; // 返回这个对象 
}

/**
 * 寄生组合式继承
 * 子类构造函数和父类构造函数
 * 第一步是创建父类原型的一个副本。
 * 然后，给返回的 prototype 对象设置 constructor 属性，解决由于重写原型导致默认 constructor 丢失的问题。
 * 最后将新创建的对象赋值给子类型的原型
 */
// 
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象 
  prototype.constructor = subType; // 增强对象 
  subType.prototype = prototype; // 赋值对象
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



