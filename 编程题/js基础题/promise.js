
/**
 * 实现promise.all
 * @param {Iterable} promises 一个迭代结构，包含多个promise
 */
 Promise.prototype.all = function (promiseArr) {
  // resArr结果数组，count已成功的promise数量
  let resArr = [], count = 0, len = promiseArr.length;
  // 返回一个新的 Promise 实例
  return new Promise(function (resolve, reject) {
    for (let promise of promiseArr) {
      // 数组传进来的项可能不是一个Promise实例，使用Promise.resolve方法转换
      Promise.resolve(promise).then(function(res) {
        resArr[count] = res;
        count++;
        if (count === len) {
          return resolve(resArr);
        }
      }, function (err) {
        return reject(err);
      })
    }
  })
}


/**
 * 实现promise.race
 * @param {Iterable} promises 一个迭代结构，包含多个promise
 */
 Promise.prototype.race = function (promiseArr) {
  return new Promise(function (resolve, reject) {
      for (let promise of promiseArr) {
          if (typeof promise === 'object' && typeof promise.then === 'function') {
              // 数组传进来的项是一个Promise实例，执行then方法。
              // resolve只有一个，那个实例对象最先执行完就会使用这个resolve
              promise.then(resolve, reject);
          } else {
              // 不是Promise实例对象直接返回当前值
              resolve(promise);
          }
      }
  })
}


/**
 * 实现promise.any
 * Promise.any 只要传入的 promise 有一个是 fullfilled 则立即 resolve 出去，否则将所有 reject 结果收集起来并返回 AggregateError
 */
 MyPromise.any = function(promises){
  return new Promise((resolve,reject)=>{
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length
    // 用于收集所有 reject 
    let errs = []
    // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if(len === 0) return reject(new AggregateError('All promises were rejected'))
    promises.forEach((promise)=>{
      promise.then(value=>{
        resolve(value)
      },err=>{
        len--
        errs.push(err)
        if(len === 0){
          reject(new AggregateError(errs))
        }
      })
    })
  })
}


/**
 * 实现promise.allSettled
 */
 Promise.myAllSettled = (promises) => {
  return new Promise((rs, rj) => {
    let count = 0
    let result = []
    const len = promises.length
    // 数组是空的话，直接返回空数据
    if (len === 0) {
      return rs([])
    }

    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        count += 1
        // 成功属性设置 
        result[i] = {
          status: 'fulfilled',
          value: res
        }
        
        if (count === len) {
          rs(result)
        }
      }).catch((err) => {
        count += 1
        // 失败属性设置 
        result[i] = { 
          status: 'rejected', 
          reason: err 
        }

        if (count === len) {
          rs(result)
        }
      })
    })
  })
}


/**
 * 手写实现promise
 * then 需要支持链式调用，所以得返回一个新的 Promise；
 * 处理异步问题，所以得先用 onResolvedCallbacks 和 onRejectedCallbacks 分别把成功和失败的回调存起来；
 * 为了让链式调用正常进行下去，需要判断 onFulfilled 和 onRejected 的类型；
 * onFulfilled 和 onRejected 需要被异步调用，这里用 setTimeout 模拟异步；
 * 处理 Promise 的 resolve；
 */
//Promise/A+规范的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._status = PENDING     // Promise状态
    this._resolveQueue = []    // 成功队列, resolve时触发
    this._rejectQueue = []     // 失败队列, reject时触发

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (val) => {
      if(this._status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
      this._status = FULFILLED              // 变更状态

      // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
      // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
      // 依次执行
      while(this._resolveQueue.length) {    
        const callback = this._resolveQueue.shift()
        callback(val)
      }
    }
    // 实现同resolve
    let _reject = (val) => {
      if(this._status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
      this._status = REJECTED               // 变更状态
      while(this._rejectQueue.length) {
        const callback = this._rejectQueue.shift()
        callback(val)
      }
    }
    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }

  // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  then(resolveFn, rejectFn) {
    //return一个新的promise
    return new MyPromise((resolve, reject) => {
      //把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
      const fulfilledFn = value => {
        try {
          //执行第一个(当前的)Promise的成功回调,并获取返回值
          let x = resolveFn(value)
          //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
          //这里resolve之后，就能被下一个.then()的回调获取到返回值，从而实现-链式调用
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      //把后续then收集的依赖都push进当前Promise的成功回调队列中(_rejectQueue), 这是为了保证顺序调用
      // this._resolveQueue.push(fulfilledFn)
  
      //reject同理
      const rejectedFn  = error => {
        try {
          let x = rejectFn(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      // this._rejectQueue.push(rejectedFn)

      switch (this._status) {
        // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
        case PENDING:
          this._resolveQueue.push(fulfilledFn)
          this._rejectQueue.push(rejectedFn)
          break;
        // 当状态已经变为resolve/reject时,直接执行then回调
        case FULFILLED:
          fulfilledFn(this._value)    // this._value是上一个then回调return的值(见完整版代码)
          break;
        case REJECTED:
          rejectedFn(this._value)
          break;
      }

    })
  }
  
  //catch方法其实就是执行一下then的第二个回调
  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  //finally方法
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),             // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      reason => MyPromise.resolve(callback()).then(() => { throw reason })  // reject同理
    )
  }

  //静态的resolve方法
  static resolve(value) {
    if(value instanceof MyPromise) return value // 根据规范, 如果参数是Promise实例, 直接return这个实例
    return new MyPromise(resolve => resolve(value))
  }

  //静态的reject方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }


}