
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
 * eventBus
 * 事件总线
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

