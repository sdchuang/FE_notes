
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
 */
class MyPromise {
  constructor(fn) {
    this.callbacks = [];
    this.state = "PENDING";
    this.value = null;

    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) =>
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve,
        reject,
      })
    );
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  _handle(callback) {
    if (this.state === "PENDING") {
      this.callbacks.push(callback);

      return;
    }

    let cb =
      this.state === "FULFILLED" ? callback.onFulfilled : callback.onRejected;
    if (!cb) {
      cb = this.state === "FULFILLED" ? callback.resolve : callback.reject;
      cb(this.value);

      return;
    }

    let ret;

    try {
      ret = cb(this.value);
      cb = this.state === "FULFILLED" ? callback.resolve : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject;
    } finally {
      cb(ret);
    }
  }

  _resolve(value) {
    if (value && (typeof value === "object" || typeof value === "function")) {
      let then = value.then;

      if (typeof then === "function") {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));

        return;
      }
    }

    this.state === "FULFILLED";
    this.value = value;
    this.callbacks.forEach((fn) => this._handle(fn));
  }

  _reject(error) {
    this.state === "REJECTED";
    this.value = error;
    this.callbacks.forEach((fn) => this._handle(fn));
  }
}

const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});

p2.then((result) => console.log(result)).catch((error) => console.log(error));