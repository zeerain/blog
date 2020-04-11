---
title: JS 中 this 指向问题
date: 2015-03-23 15:39:15
categories: web前端
tags: [JavaScript, this]
description: "this 指向问题是 JavaScript 的一大难点，很多初学者都会懵在这一步，下面详细说明一下这个问题。"
---
## this指向

1. this 的指向是在函数被调用的时候确定的，也就是执行上下文被创建时确定的。
2. 在函数执行过程中，this 一旦被确定，就不可更改了
3. 如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。如果函数独立调用，那么该函数内部的 this，则指向 undefined。但是在非严格模式中，当 this 指向 undefined 时，它会被自动指向全局对象。
4. 当 obj 在全局声明时，无论 obj.c 在什么地方调用，这里的 this 都指向全局对象，而当 obj 在函数环境中声明时，这个 this 指向 undefined ，在非严格模式下，会自动转向全局对象。

```js
var a = 20;
var obj = {
    a: 10,
    c: this.a + 20,
    fn: function() {
        return this.a;
    }
}
console.log(obj.c); // 40
console.log(obj.fn()); // 10
```

```js
'use strict'
var a = 20;
function foo() {
    var a = 1;
    var obj = {
        a: 10,
        c: this.a + 20,
        fn: function() {
            return this.a;
        }
    }
    return obj.c;
}
console.log(foo()); // 运行会报错
```

- this 一般有以下几种调用场景：

例如：`var obj = {a: 1, b: function(){console.log(this);}}`

1. 作为函数直接调用(`var b = obj.b; b()`)。 // 代码被包裹在函数内部执行，直接调用函数名
    - 通过 `函数名(...)` 的方式调用
    - 直接调用并不是指在全局作用域下进行调用，在任何作用域下，直接通过 `函数名(...)` 来调用都称为直接调用
    - 此时 this 指向全局对象
2. bind 、 call 和 apply(`obj.b.apply(object, [])`)，指向当前的 object
    - `apply(obj, arguments)` 带有两个参数
    - 如果第一个参数为 null ，那么 this 指向全局变量
3. 作为对象调用(`obj.b()`)
    - 通过对象来调用其方法函数， 函数中 this 指向调用该方法的对象 obj
    - 函数的定义位置不影响其 this 指向，this 指向只和调用函数的对象有关
    - 多层嵌套的对象，内部方法的this指向离被调用函数最近的对象（window也是对象，其内部对象调用方法的this指向内部对象， 而非window）
4. 作为构造函数调用(`var b = new Func()`)
    - this 指向当前的实例对象

## 实例（360面试题）

```js
window.val = 1;
var obj = {
    val: 2,
    dbl: function () {
        this.val *= 2;
        val *= 2;
        console.log(val);
        console.log(this.val);
    }
};
// 说出下面的输出结果
obj.dbl(); // 2, 4
var func = obj.dbl;
func(); // 8 8
```

`obj.dbl()` 因为是被 obj 对象调用，所以 this 指向 obj，`this.val=2`，由于 `this.val*=2`，所以 `this.val=4`。val 变量没有指定对象前缀，默认从当前函数中找，找不到则从 window 中找全局变量，执行 `val*=2`，所以 val 等于2。

`func()` 因为是函数直接调用，所以 this 指向 window，this.val 结果即 window.val 受之前影响等于2，由于 `this.val*=2`，所以 `this.val=4`，即 `window.val=4`。val 变量仍旧从 window 中找全局变量，由于 `val*=2`，所以 `this.val=8`。**val 与 this.val 都等于 window.val**，等于8。

## 原型链中的 this

原型链中的方法的 this 仍然指向调用它的对象，与作为对象调用 this 一致。看个例子：

```js
var o = {
  f : function(){
    return this.a + this.b;
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

可以看出， 在 p 中没有属性 f，当执行 `p.f()` 时，会查找p的原型链，找到 f 函数并执行，但这与函数内部 this 指向对象 p 没有任何关系，只需记住谁调用指向谁。**如果 f 是箭头函数，则 this 指向 window！**

*以上对于函数作为 getter & setter 调用时同样适用*。

## DOM 事件处理函数中的 this & 内联事件中的 this

- DOM 事件处理函数

    1. 当函数被当做监听事件处理函数时，其 this 指向触发该事件的元素（针对于addEventListener事件）

- 内联事件

    1. 当代码被内联处理函数调用时，它的this指向监听器所在的DOM元素
    2. 当代码被包括在函数内部执行时，其this指向等同于**函数直接调用**的情况，即在非严格模式指向全局对象window， 在严格模式指向undefined

## 箭头函数 this

由于箭头函数不绑定 this，它会捕获其所在（即定义的位置）上下文的 this 值，作为自己的 this 值，

1. 所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
2. 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）

> 因为箭头函数可以捕获其所在上下文的 this 值，所以

```js
function Person() {
    this.age = 0;
    setInterval(() => {
        // 回调里面的 `this` 变量就指向了期望的那个对象了
        this.age++;
        console.log(this);
    }, 1000);
}

var p = new Person();
```

> 测试 call() 是否改变 this 指向(bind() & apply() 可以自行测试)

```js

var adder = {
  base : 1,

  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function inFun(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3，其内部的this并没有因为call() 而改变，其this值仍然为函数inFun的this值，指向对象adder
```

> 测试严格模式与否的 this 指向

```js
var f = () => {'use strict'; return this};
var p = () => { return this};
console.log(1,f() === window); // true
console.log(2,f() === p()); // true
```

***以上的箭头函数都是在方法内部，总之都是以非方法的方式使用，如果将箭头函数当做一个方法使用会怎样呢？***

```js
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();  // undefined window
obj.c();  // 10 {i: 10, b: ƒ, c: ƒ}
```

*可以看出，作为方法的箭头函数 this 指向全局 window 对象，而普通函数则指向调用它的对象*。
