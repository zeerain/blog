---
title: 使用Proxy实现双向数据绑定
date: 2019-04-29 15:34:15
categories: web前端
tags: [JavaScript, es6, Vue]
description: "Proxy是在对目标对象的操作之前提供了拦截， 这样我们可以对外界的操作进行过滤和改写， 从而修改某些操作的默认行为， 即不直接操作对象本身， 而是通过操作对象的代理对象来间接操作对象， 达到预期目的。 Vue3.0放弃了Object.defineProperty, 选择使用更快的元素Proxy。 "
---

 `ES6` 原生提供 `Proxy` 语法： `let proxy = new Proxy(target, handler)`

 `target` 参数表示所要拦截的目标对象， `handler` 参数也是一个对象， 用来定制拦截行为。

## Proxy 语法

作为构造函数， `Proxy` 接受两个参数。 第一个参数是所要代理的目标对象（下面例子中是一个空对象）， 即如果没有 `Proxy` 的介入， 操作原来要访问的就是这个空对象； 第二个参数是一个配置对象， 对于每一个被代理的操作， 需要提供一个对应的处理函数， 该函数将拦截对应的操作， 如果该对象为空， 则没有任何拦截效果， 访问 `proxy` 就等同于访问 `target` 。

```js
let obj = {}
let proxy = new Proxy(obj, {})

proxy.a = 1
proxy.fn = function() {
    console.log('it is a function')
}

console.log(proxy.a); // 1
console.log(obj.a); // 1
console.log(obj.fn()); // it is a function
```

再看一个例子：

```js
let obj = {
    a: 100
}
let proxyObj = new Proxy(obj, {
    get: function(target, prop, receiver) {
        console.log(receiver)
        return prop in target ? target[prop] : 0
    },
    set: function(target, prop, value, receiver) {
        target[prop] = 111;
    }
})

console.log(proxyObj.a); // 100
console.log(proxyObj.b); // 0

proxyObj.a = 10;
console.log(proxyObj.a); // 111
```

当我们试图去设置 `proxyObj` 属性值的时候， 总会返回 `111` ， 即便我们赋值 `proxyObj.a=10` ， 但是并不会生效， 依然会返回 `111` ！

## 双向数据绑定

```html
<! DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Proxy实现数据双向绑定</title>
</head>
<body>
    <div id="app">
        <h3 id="paragraph">Proxy</h3>
        <input type="text" id="input">
        <script>
            // 获取段落节点
            const paragraph = document.getElementById('paragraph');
            // 获取输入框节点
            const input = document.getElementById('input');
            // 需要代理的数据对象（相当于 vue 的 data 数据对象）
            const data = {
                text: 'hello world'
            }
            const handler = {
                // 监控 data 中的 text 属性变化
                set: function(target, prop, value) {
                    if (prop === 'text') {
                        // 更新值
                        target[prop] = value;
                        // 更新视图
                        paragraph.innerHTML = value;
                        input.value = value;
                        return true; // return 没啥实际作用， 结束函数执行
                    } else {
                        return false;
                    }
                }
            }
            // 添加 input 监听事件
            input.addEventListener('input', function(e) {
                myText.text = e.target.value; // 更新 myText 的值
            }, false)
            // 构造 proxy 对象
            const myText = new Proxy(data, handler);
            // 初始化值
            myText.text = data.text;
        </script>
    </div>
</body>
</html>
```
