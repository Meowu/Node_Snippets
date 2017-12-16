

async function foo() {
  await new Promise(r => setTimeout(r, 1000))
  console.log('after 1 second.');
  const isHead = Boolean(Math.round(Math.random()))
  if (isHead) {
    return 'yoooo!'
  }
  throw new Error('Oops')
}

async function executeFoo() {
  try {
    foo()
  } catch (e) {
    console.log(e);
  }
}

executeFoo().then(e => console.log(e)) // undefined. 在这里我们将会直接返回一个fulfilled promise，不会等待1s，因为我们在executeFoo中没有await异步操作也没有return，所以直接返回同步执行后的结果。这样的代码是错误的。过了1s后会打印下面的after。。。

async function returnFoo() {
  try {
    return foo()
  } catch (e) {
    console.log(e);
  }
}

returnFoo().then(e => console.log(e)) // 这里会等待一秒，然后要么得到promise fullfill后的'yoooo!'要么得到promise reject后的 Error('Oops')。但是我们没有await它，只是返回它的值，所以抛出的错误永远不会被捕获。因为错误是被await抛出的。

async function awaitFoo() {
  try {
    await foo()
  } catch (e) {
    console.log(e);
  }
}

awaitFoo().then(e => console.log(e)) // 这里会等待一秒，然后要么得到promise fullfill后的'yoooo!'要么得到promise reject后的 Error('Oops')。但是只会在rejected的时候抛出错误而不会在fullfilled之后得到 'yoooo!'，因为我们没有return它的值。

async function returnAwaitFoo() {
  try {
    return await foo()
  } catch (e) {
    console.log(e);
  }
}
returnAwaitFoo().then(e => console.log(e)) // 这里会等待一秒，然后要么得到promise fullfill后的'yoooo!'要么得到promise reject后的 Error('Oops')。如果rejected了错误会被catch捕获到，如果fullfilled它的值将会被返回并且被async函数的隐式Promise.resolve处理，然后我们在then语句中可以得到它的值。这实际上相当于 const value = await foo()  return value。
 
// const arr1 =  new Array(5) => [empty x 5]
// arr.map((el, i) => console.log(i * 1000))
// const arr2 = Array.apply(null, Array(5)) => [undefined, undefined, undefined, undefined, undefined]
// arr2.map((el, i) => console.log(i * 1000)) => 0, 1000, 2000, 3000, 4000
// map, reduce这些方法会忽略空值，而find，findIndex，keys，for-of则会对空值进行迭代。
function sleepAndReturnVal(val, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val)
    }, ms);
  });
}
(async () => {
  const arr = Array.apply(null, Array(5))
  const promises = arr.map((pro, i) => sleepAndReturnVal(`promise ${i}`, i*1000))
  console.log(promises)

  for (const promise of promises) {
    const data = await promise
    console.log(data);
  }
})()