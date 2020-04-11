---
title: JS 可枚举与不可枚举
date: 2016-05-13 18:46:43
categories: web前端
tags: [JavaScript, 枚举]
description: "这篇文章介绍了 JS 可枚举属性与不可枚举属性。"
---
## JavaScript 可枚举与不可枚举属性

在 JavaScript 中，对象的属性分为可枚举和不可枚举之分，它们是由属性的 enumerable 值决定的。可枚举性决定了这个属性能否被 for...in 查找遍历到。

## 怎么判断属性是否可枚举

js中基本包装类型的原型属性是不可枚举的，如 Object, Array, Number 等，如果你写出这样的代码遍历其中的属性：

```js
var num = new Number();
for(var pro in num) {
console.log("num." + pro + " = " + num[pro]);
}
```

它的输出结果会是空。这是因为 Number 中内置的属性是不可枚举的，所以不能被 for...in 访问到。

Object 对象的 propertyIsEnumerable() 方法可以判断此对象是否包含某个属性，并且这个属性是否可枚举。

**需要注意的是**：如果判断的属性存在于 Object 对象的 *原型* 内，不管它是否可枚举都会返回 false。

## 枚举性的作用

属性的枚举性会影响以下三个函数的结果：

for...in

Object.keys()

JSON.stringify

先看一个例子，按如下方法创建kxy对象：

```js
function Person() {
    this.name = "KXY";
}
Person.prototype = {
    constructor: Person,
    job: "student",
};

var kxy = new Person();
Object.defineProperty(kxy, "sex", {
    value: "female",
    enumerable: false
});
```

其中用 defineProperty 为对象定义了一个名为 “sex” 的不可枚举属性

接下来做以下验证：

- 遍历结果如下:

```js
for(var pro in kxy) {
    console.log("kxy." + pro + " = " + kxy[pro]);
  }
```

![枚举遍历结果](/img/JavaScript可枚举1.png "枚举属性")

可以看到除了 “sex” 之外的属性都遍历到了。

- 结果:

```js
console.log(Object.keys(kxy));
```

![枚举遍历结果](/img/JavaScript可枚举2.png "枚举属性")

只包含 “name” 属性，说明该方法只能返回对象本身具有的可枚举属性。

- 结果:

```js
console.log(JSON.stringify(kxy));
```

![枚举遍历结果](/img/JavaScript可枚举3.png "枚举属性")

此方法也只能读取对象本身的可枚举属性，并序列化为 JSON 对象。
