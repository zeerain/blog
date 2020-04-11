---
title: Promise.then 方法
date: 2018-01-18 15:01:26
categories: web前端
tags: [Promise, es6]
description: "简单谈一下 Promise.then 方法的实现逻辑。"
---

## then 方法

我们都知道 `Promise` 对象有一个 `then` 方法，用来处理 `Promise` 状态确定时相应的逻辑，因此，我们自己要实现 `Promise` 的话，`then` 方法需要写在原型链上，那么 `then` 方法为什么会返回一个 `Promise` 呢？

### 原因

关于上面谈到的问题，`Promise/A+` 标准并没有要求返回的一个新的 `Promise` 对象，但在 `Promise/A` 标准中，明确规定了要返回一个新的对象，但目前的实现中 `then` 几乎都是返回一个新的 `Promise`。

标准中说，如果 `promise2 = promise1.then(onResolved,onRejected)` 里的 `onResolved/onRejected` 返回一个 `Promise`，则 `promise2` 直接取这个 `Promise` 的状态和值为己用，就像如下代码：

```js
var promise1 = new Promise(function (resolve,reject) {
    resolve(1)
})

var promise2 = promise1.then(function foo(value){
  return Promise.reject(2)
})
```

此时，如果 `promise1` 执行了，则说明 `promise1` 的状态必然已经是 `resolved`。假如 `then` 返回了 `this`（即 **promise2 === promise1**），那么 `promise2` 与 `promise1` 就是同一个对象，而此时的 `promise1/2` 的状态已经确定，没有办法再取 `Promise.reject(2)` 的状态和结果为己用，因为 `Promise` 的状态确定后就无法再转换为其它状态。

而且，每个 `Promise` 都可以在其上多次调用 `then` 方法，而每个 `then` 返回的 `Promise` 的状态取决于那一次调用 `then` 时的参数的返回值，所以 `then` 不能返回 `this`，因为 `then` 每次返回的 `Promise` 的结果都有可能不同。
