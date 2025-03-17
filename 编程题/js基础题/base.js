/**
 * js基础场景问题
 */

/**
 * 浅拷贝
 */
// 浅拷贝的实现;
function shallowCopy(object) {
  // 只拷贝对象 基本类型直接返回
  if (!object || typeof object !== "object") return object;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }
  return newObject;
}


/**
 * 深拷贝
 */
// 简版
function deepClone(obj) {
  var newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          newObj[key] = deepClone(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  return newObj;
}
// 完整版
// 解决循环引用
function deepClone(obj, map = new Map()) {
  var newObj = Array.isArray(obj) ? [] : {};
  // 如果是map中存在，直接返回
  if(map.get(obj)){
    return map.get(obj)
  }
  // 为object的存入map中
  map.set(obj, newObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        newObj[key] = deepClone(obj[key], map);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}


// 解决层数过多-爆栈问题-迭代写法
const deepClone = (x) => {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key 为 undefined 则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

/**
 * 实现异步请求重试方法 fun(request, times)
 */
// 终版
function fun(request, times) {
  return new Promise((resolve, reject) => {
    request.then(resolve).catch(err => {
      if (times > 0) {
        fun(request, times - 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

// 实现
function fun (request, times) {
  return new Promise((resolve, reject) => {
    let n = times
    let newReq = function () {
      request()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          if (--n > 0) {
            newReq()
          } else {
            reject(err)
          }
        })
    }
    newReq()
  })
}


/**
 * 无限累加
 * sum(1,4)(2)(3)
 */
function add() {
  let res = [...arguments];
  function resultFn() {
    res = res.concat([...arguments]);
    return resultFn;
  }
  resultFn.valueOf = function() {
    return res.reduce((a,b) =>a+b);
  }
  return resultFn;
}


/**
 * 数组拉平
 * @param {number} layer 拉平层数
 */
Array.prototype.flatten = function(layer = 1){
  let arr = this || []
  console.log(layer)
  let res = layer > 0 ? arr.reduce((s, p) => {
    return s.concat(Array.isArray(p) ? p.flatten(layer-1) : p)
  }, []) : arr.slice()
  return res
}


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

/**
 * 下划线转驼峰
 * @param {string} str 下划线字符串
 */
function formatHump(str) {
  return str
    .split('_')
    .map((item) => item[0] && item[0].toUpperCase() + item.substr(1))
    .join('');
}


/**
 * 防抖
 * 触发高频事件 后 n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
 * @param {function} fn 需要防抖的函数
 * @param {number} delay 防抖时间
 */
function debounce(fn, delay) {
  let timer = null;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}


/**
 * 节流
 * 高频事件触发，但在n秒内只会执行一次
 * 先开启一个定时任务执行，定时任务完成后则清空，当再调用时，如果定时任务仍存在则不执行任何操作
 * @param {function} fn 需要节流的函数
 * @param {number} delay 节流时间
 */
function throttle(fn, delay) {
  let timer = null;
  return function() {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      clearTimeout(timer)
      timer = null;
    }, delay);
  };
}


/**
 * 洗牌算法
 * 遍历过的元素不再参与随机index的计算了
 * @param {array} arr 需要洗牌的数组
*/
function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    // i + i之后的剩余个数长度-中随机一个数
    const randomIndex = i + Math.round(Math.random() * ((arr.length - 1) - i));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  // 另一种写法
  let length = arr.length,
    randomIndex,
    temp;
  while (length) {
    randomIndex = Math.floor(Math.random() * length--);
    temp = arr[length];
    arr[length] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
}


/**
 * 使用 setTimeout 实现 setInterval
 * @param {function} fn 需要实现的函数
 * @param {number} delay 延迟时间
*/
function setInterval(fn, delay) {
  let timer = null;
  function loop() {
    timer = setTimeout(() => {
      loop();
      fn();
    }, delay);
  }
  loop();
  return timer;
}

// 另一种写法
let timeMap = {}
let id = 0 // 简单实现id唯一
const mySetInterval = (cb, time) => {
  let timeId = id // 将timeId赋予id
  id++ // id 自增实现唯一id
  let fn = () => {
    cb()
    timeMap[timeId] = setTimeout(() => {
      fn()
    }, time)
  }
  timeMap[timeId] = setTimeout(fn, time)
  return timeId // 返回timeId
}
// clear
const myClearInterval = (id) => {
  clearTimeout(timeMap[id]) // 通过timeMap[id]获取真正的id
  delete timeMap[id]
}


/**
 * js判断对象是否存在循环引用
 * @param {object} obj 需要判断的对象
 */
function isCycle(obj) {
  let seenObjects = [];
  let detect = function(obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  };
  return detect(obj);
}

// 另一种写法
function isCircle (obj, map = new Map()) {
  if(map.has(obj)){
    return true
  }
  map.set(obj, true)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if(typeof obj[key] === 'object') {
        let res = isCircle(obj[key], map)
        if(res){
          return true
        }
      }
    }
  }
  return false
}


/**
 * 实现一个浮点数的千分位格式化
 * @param {number} num 需要格式化的数字
 */
function thousandFormat(num) {
  // 正负数判断
  let flag = num > 0 ? '' : '-'
  // 整数和小数分开处理
  let [int, float] = String(Math.abs(num)).split('.')
  // 反转整数
  let intArr = int.split('').reverse()
  let intStr = intArr.reduce((s, c, i) => {
    // 每三位数字插入逗号
    if(i%3 === 0 && i != 0){
      // 倒序插入逗号
      s = c + ',' + s
    }else{
      s = c + s
    }
    return s
  }, '')
  // 拼接结果
  return flag + intStr + (float ? '.' + float : '')
}


/**
 * 大数相加
 * @param {string} num1 需要相加的数字
 * @param {string} num2 需要相加的数字
 */
function add(num1, num2) {
  let len1 = String(num1).length
  let len2 = String(num2).length
  // 计算两数最大长度
  let length = Math.max(len1, len2)
  // 初始化两数字的长度 往前补0
  let n1 = String(num1).padStart(length, '0')
  let n2 = String(num2).padStart(length, '0')
  // 计算后的进位
  let y = 0
  // 计算的结果
  let res = ''
  for (let i = length-1; i >= 0; i--) {
    // 取出两数相加+上次进位
    let sum = parseInt(n1[i]) + parseInt(n2[i]) + y
    // 计算进位
    y = Math.floor(sum/10)
    // 计算结果
    let s = sum%10
    // 拼接结果
    res = s + res + ''
  }
  // 最后一位相加 如果有进位 补位数
  return y>0 ? y + res : res
}


/**
 * 红绿灯问题
 * 提供红路灯对象数组,依次按照数组顺序展示红绿灯，循环不止
 * [{color, duration}]
 */
let count = 0;
function fn() {
  // 对数组的长度取余 获取当前要亮的灯的下标
  let index = count % arr.length;
  console.log(`${arr[index].color}要亮${arr[index].duration / 1000}秒`);
  setTimeout(() => {
    count++;
    fn();
  }, arr[index].duration);
}


/**
 * lazyMan函数
 * LazyMan('hank').eat('super').sleepFirst(3000).sleep(2000).eat('dinner')
 */
class LazyMan {
  constructor(name) {
    this.name = name;
    this.taskList = [];
    this.next();
  }
  next() {
    let task = this.taskList.shift();
    if (task) {
      task();
    }
  }
  sleep(time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`sleep ${time}miao`)
        this.next()
      }, time)
    }
    this.task.push(fn)
    return this
  }
  eat(food) {
    let fn = () => {
      setTimeout(() => {
        console.log(`eat ${food}fan`)
        this.next()
      },2000)
    }
    this.task.push(fn)
    return this
  }
  sleepFirst(time){
    let fn = () => {
      setTimeout(() => {
        console.log(`sleepFirst ${time}miao`)
        this.next()
      }, time)
    }
    this.task.unshift(fn)
    return this
  }
}
function LazyMan(){
  return new LazyManClass()
}


/**
 * 并发队列
 */
// class
class Scheduler {
  constructor() {
    this.queue = [];
    // 最大个数限制
    this.maxCount = 2;
    // 当前在执行的个数
    this.runCounts = 0;
  }
  add(promiseCreator) {
    // 一次性全部入队
    this.queue.push(promiseCreator);
  }
  taskStart() {
    // 先执行两个
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    // 取出一个任务
    this.queue.shift()()
    .then(() => {
      this.runCounts--;
      // 执行完成一个后，再执行一个
      this.request();
    });
  }
}

const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
const scheduler = new Scheduler();
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4
scheduler.taskStart()

// function
function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 先请求maxNum个，队列里面先放maxNum个
    while (count < maxNum) {
      next();
    }
    function next() {
      // 每次请求一个，count+1
      let current = count++;
      // 处理边界条件，如果已经请求完毕，则不再请求
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      // 取出当前要请求的url
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      // 发起请求
      fetch(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        });
    }
  });
}


