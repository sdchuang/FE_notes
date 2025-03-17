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

// 避免重复声明，去掉 let 关键字
instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29

instance2 = new SubType("Greg", 27);
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
