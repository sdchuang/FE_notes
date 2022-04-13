
/**
 * 浅拷贝
 */
function shallowClone(obj) {
  var newObj = {};
  for (let key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
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
// 函数引用
function deepClone(obj, map = new Map()) {
  var newObj = Array.isArray(obj) ? [] : {};
  // 如果是map中存在，直接返回
  if(map.get(obj)){
    return map.get(obj)
  }
  // 为object的存入map中
  map.set(obj, newObj)
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      // todo
      if(typeof obj === 'function'){
        newObj[key] = new Function(`return ${obj[key].toString()}`)
      }else if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          newObj[key] = deepClone(obj[key], map);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  return newObj;
}

// 解决层数过多-爆栈问题-跌代写法
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



