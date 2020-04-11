---
title: ECMAScript6 相关
date: 2016-08-08 21:24:07
categories: web前端
tags: [ECMAScript, es6]
description: "自己总结了一些 ES6 相关的知识点，不定时更新……"
---
## ES6 语法

在 ES6 中，我们可以使用 `for...of` 遍历数组,伪数组和字符串

1. 推荐在循环对象属性的时候，使用`for...in`,在遍历数组的时候的时候使用`for...of`
2. `for...in`循环出的是key，`for...of`循环出的是value
3. **注意：**`for...of`是ES6新引入的特性。修复了ES5引入的`for...in`的不足
4. **注意：** 作用于数组的for-in循环除了遍历数组自身元素以外,还会遍历自定义属性

```js
let aArray = ['a', 123, {
    a: '1',
    b: '2'
}]
aArray.name = 'demo'
for (let index in aArray) {
    console.log(aArray[index]); // a, 123, {a: '1', b: '2'}, demo
    console.log(`${aArray[index]}`) // a, 123, [object Object], demo
}
for (var value of aArray) {
    console.log(value) // a, 123, {a: '1', b: '2'}, demo
}
```

> `for...of`不能循环普通的对象，需要通过和`Object.keys()`搭配使用

```js
var student = {
    name: 'wujunchuan',
    age: 22,
    locate: {
    country: 'china',
    city: 'xiamen',
    school: 'XMUT'
    }
}
for (var key of Object.keys(student)) {
    console.log(`${key}:`, student[key]) // name: 'wujunchuan', age: 22, locate: {...}
}
```

- 可以使用`Object.keys(obj)`遍历对象
- 当对象的键和值相同时,可以省略一项,只写一个

## 继承

ES6的Class之间可以通过 `extends` 关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```js
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
```

- 上面代码中，constructor 方法和 toString 方法之中，都出现了 `super` 关键字，它在这里表示父类的构造函数，用来新建父类的 `this` 对象。
- 子类必须在 constructor 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类没有自己的 `this` 对象，而是继承父类的 `this` 对象，然后对其进行加工。如果不调用 `super` 方法，子类就得不到 `this` 对象。

### 原生构造函数继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些。以前，这些原生构造函数是无法继承的。

Boolean()、Number()、String()、Array()、Date()、Function()、RegExp()、Error()、Object()

```js
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。这意味着，**ES6可以自定义原生数据结构**（比如Array、String等）的子类，**这是ES5无法做到的**。

### Class 的 Generator 方法

如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。

```js
class Foo {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}

for (let x of new Foo('hello', 'world')) {
    console.log(x);
}
// hello
// world
```

上面代码中， Foo 类的 `Symbol.iterator` 方法前有一个星号，表示该方法是一个 `Generator` 函数。 `Symbol.iterator` 方法返回一个 Foo 类的默认遍历器， `for...of` 循环会自动调用这个遍历器。

### Class 继承静态方法

父类的静态方法，可以被子类继承。

```js
class Foo {
    static classMethod() {
        return 'hello';
    }
}

class Bar extends Foo {
}

Bar.classMethod(); // 'hello'
```

## Promise

用来封装异步任务 `new Promise((resolve, reject) => { })`

```js
var promise = new Promise(function(resolve, reject) {
    // ... some code

    if (/* 异步操作成功 */){
    resolve(value);
    } else {
    reject(error);
    }
});
```

1. 通过resolve接收数据data
1. 通过reject接收错误err

Promise实例生成以后，可以用then方法分别指定Resolved状态和Rejected状态的回调函数。

- then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Rejected时调用。
- 其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值(有可能是成功的值或者失败的值)作为参数。
- 如果有第二个参数，那么发生错误走第二个函数捕获错误，不走`.catch()`，否则走`.catch()`捕获错误。

```js
promise.then(function(value) {
    // success
    console.log(value);
}, function(error) {
    // failure
    console.log(error);
}).catch(function(error) {
    console.log(error);
});
```

- `promise.then`永远返回一个promise对象,该对象`.then`可以接收上一个promise.then返回的值作为参数
- 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，例如：

```js
var p1 = new Promise(function (resolve, reject) {
    // ...
});

var p2 = new Promise(function (resolve, reject) {
    // ...
    resolve(p1);
})
```

- 注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

上面代码中，**调用resolve(1)以后，后面的console.log(2)还是会执行，并且会*首先打印出来*。这是因为立即 resolved 的 Promise 是在*本轮事件循环的末尾执行*，总是*晚于本轮循环的同步任务*。**

***一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。***

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

Promise 新建后就会立即执行。

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，**Promise 新建后立即执行，所以首先输出的是Promise。然后，*then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行*，所以resolved最后输出**。

> Promise.all()

- Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
- `var p = Promise.all([p1, p2, p3]);`
- p的状态由p1、p2、p3决定，分成两种情况。
    1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
    1. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

***注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。***

## Generator & yield

- Generator
  - Generator函数是一个状态机，内部封装了多个状态
  - 执行Generator函数会返回一个遍历器对象（遍历器对象生成函数）
  - 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态

> Generator函数是一个普通函数，但是有两个特征：

1. function关键字与函数名之间有一个星号
2. 函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

> Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是所谓的的遍历器对象（Iterator Object）。

Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
// 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。
// 但是，函数f是一个 Generator 函数，会返回一个遍历器对象，只有调用next方法时，函数f才会执行。
```

- yield
  - Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
  - 遍历器对象的next方法的运行逻辑如下：
    1. 遇到yield表达式，就暂停执行后面的操作，并将**紧跟在yield后面的那个表达式的值**（包括yield后面所有内容），作为返回的对象的value属性值。
    1. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
    1. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
    1. 如果该函数没有return语句，则返回的对象的value属性值为undefined。
  - *每next一次对应一个yield表达式的值*，为一个对象，例如 **{value: 10, done: false}**
  - ***yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。***
  - ***yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。***
  - yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
  - yield表达式本身没有返回值，或者说总是返回**undefined**。***next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。***
- yield*
  - 在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
  - 这里就需要用到yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。

> 从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。

如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象。

> 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。

## async & await

1. 箭头函数：没有{ }时不写 return 也有返回值
2. `new Promise().then().then().catch()` ：第一个then触发条件：是 Promise() 实例化时resolve()触发， 第二个及以后的then() 触发条件是前一个then() 执行完成，并且将return值作为下一个then的参数
3. async：表明一个异步函数
4. await：后面必须跟Promise对象，若非Promise，则不会拦截后面代码执行。当promise对象resolve过后并且执行完then里面的代码，就执行下一步代码，不resolve不会触发下一行代码执行。

需注意：如果then()中需要异步操作，不会等then中的异步执行完过后再执行下一个then()的函数。***原因就是，异步函数中，没有时间让你return值给下一个then()回调函数***。解决方案是使用 `async` 函数包裹 `then` 中的回调函数，将其中的异步操作用`new Promise((res, rej) => { 异步操作 })`包裹，并用await等待异步操作完成。
