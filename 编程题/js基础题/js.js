
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

