---
title: JS 生成[n, m]随机数
date: 2019-03-18 12:48:09
categories: web前端
tags: JavaScript
description: "实际开发者经常用到各种各样的随机数， 这里总结一下。"
---

## Math 的一些方法

1. `Math.ceil()` : 向上取整
2. `Math.floor()` : 向下取整
3. `Math.round()` : 四舍五入
4. `Math.random()` : 0.0 ~ 1.0 之间的一个伪随机数， 包含0但不包含1
5. `Math.ceil(Math.random()*10)` 获取从1到10的随机整数， 取0的概率极小
6. `Math.round(Math.random())` 可均衡获取0到1的随机整数
7. `Math.floor(Math.random()*10)` 可均衡获取0到9的随机整数
8. `Math.round(Math.random()*10)` 基本均衡获取0到10的随机整数， 其中获取最小值0和最大值10的几率少一半。 ***因为结果在 0~0.4 为0， 0.5到1.4为1...8.5到9.4为9， 9.5到9.9为10。 所以头尾的分布区间只有其他数字的一半***

## 生成 [n, m] 的随机整数

多用于 js 生成验证码或者随机选取数组中某一项

```js
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10)
            break
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
            break
        default:
            return 0
            break
    }
}
```

## 生成 [min, max) 的随机数

```js
parseInt(Math.random() * (max - min) + min, 10)
Math.floor(Math.random() * (max - min) + min)
```

[参考文章](http://www.cnblogs.com/starof/p/4988516.html)
