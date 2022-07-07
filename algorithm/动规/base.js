
/**
 * 斐波那契
 */
function fibonacci(n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fib(n) {
  if(n<2) return n;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    let temp = curr;
    curr = curr + prev;
    prev = temp;
  }
  return curr;
}


/**
 * 阶乘
 */
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}


/**
 * 找零钱
 * @param {*} money 总金额
 * @param {*} coins 硬币种类
 */
function change(money, coins) {
  if (money === 0) {
    return 0;
  }
  if (coins.length === 0) {
    return -1;
  }
  let min = Number.MAX_VALUE;
  for (let i = 0; i < coins.length; i++) {
    let temp = change(money - coins[i], coins.slice(i + 1));
    if (temp !== -1) {
      min = Math.min(min, temp + 1);
    }
  }
  return min;
}