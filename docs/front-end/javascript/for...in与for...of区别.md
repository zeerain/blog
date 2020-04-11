---
title: for...in 与 for...of 遍历的区别
date: 2016-12-13 20:19:31
categories: web前端
tags: [JavaScript, Array, 循环遍历]
description: "指出 for...in 与 for...of 循环遍历的一些区别。"
---

## 主要区别

1. 推荐在循环对象属性的时候，使用 `for...in`，在遍历数组的时候的时候使用 `for...of`。
1. `for...in` 循环出的是 `key`，`for...of` 循环出的是 `value`
1. 注意，`for...of` 是 ES6 新引入的特性。修复了 ES5 引入的 `for...in` 的不足
1. `for...of` 不能循环普通的对象，需要通过和 `Object.keys()` 搭配使用

> 假设我们要遍历一个数组的 value，`let Arr = ['a',123,{a:'1',b:'2'}]`

## 使用for...in循环

```js
for(let index in Arr){
    console.log({Arr[index]);
}
```

## 使用for...of循环

```js
for(var value of Arr){
    console.log(value);
}
```

咋一看似乎只是写法不一样而已，那为什么说 for...of 修复了 for...in 的缺陷和不足。
假设我们往数组添加一个属性 name：`Arr.name = 'demo'`，往数组的原型对象上添加一个属性 myArr：`Array.prototype.myArr = function() {}`，再分别查看上面写的两个循环：

```js
for(let index in Arr){
    console.log(Arr[index]); // demo 与 function 都被遍历出来了！！！
}
for(var value of Arr){
    console.log(value);
}
```

所以说，作用于数组的 for...in 循环除了遍历数组元素以外，**还会遍历自定义属性与数组原型对象上添加的属性**。

for...of 循环不会循环对象的 key，只会循环出数组的 value，因此 for...of 不能循环遍历普通对象,对普通对象的属性遍历推荐使用 for...in

如果非要想用 for...of 来遍历普通对象的属性的话，可以通过和 `Object.keys()` 搭配使用，先获取对象的所有key的数组，然后遍历

```js
var student={
    name: 'tom',
    age: 18,
    locate: {
        country:'US',
        city:'LA',
        school:'SSU'
    }
}
for(var key of Object.keys(student)){
    //使用Object.keys()方法获取对象 key 的数组
    console.log(key+": "+student[key])
}
```

> `Object.keys()` 只会遍历出对象本身含有的属性，不会遍历对象的构造函数的原型对象上的属性。
