---
title: JS 获取元素计算后的属性值
date: 2015-07-14 16:17:45
categories: web前端
tags: [JavaScript, DOM]
description: "关于 JS 获取 DOM 元素计算后属性值的兼容写法介绍。"
---
## 获取DOM元素计算后属性

本文介绍了 JS 获取 DOM 元素计算后属性值的兼容写法，并以之封装了简单的缓动滑动函数。

## 兼容IE和其他浏览器

1. IE：元素.currentStyle.属性名称
1. 其他高级浏览器：getComputedStyle(元素).属性名称

```js
// 简单判断
var box = document.getElementById('box')
if (box.currentStyle) {
    alert(box.currentStyle.width)  // 支持IE
} else {
    alert(getComputedStyle(box).width)  // 其他
}
```

## 简单的封装为函数

方便调用

```js
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj)[attr]
    }
}
```

三元表达式写法

```js
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
}
```

## 应用实例

缓动滑动函数的实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>左右滑动函数</title>
    <style>
        #box {
            position: absolute;
            width: 80px;
            height: 80px;
            left: 20px;
            top: 50px;
            background: #f00;
            color: #fff;
            font-size: 50px;
            line-height: 80px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="box"></div>
    <input type="button" value="向左" id="btn">
    <input type="button" value="向右" id="btn2">
    <script>
    const oBox = document.getElementById('box')
    const oBtn = document.getElementById('btn')
    const oBtn2 = document.getElementById('btn2')

    oBtn.onclick = function() {
        move(oBox, 'left', -200)
    }
    oBtn2.onclick = function() {
        move(oBox, 'left', 800)
    }

    function move(obj, attr, target) {
        clearInterval(obj.timer)
        obj.timer = setInterval(function() {
            let curr = parseInt(getStyle(obj, attr))
            let step = (target - curr) / 10

            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            curr += step
            obj.style[attr] = curr + 'px'

            if (curr === target) {
                clearInterval(obj.timer)
            }
            console.log('curr：' + curr, 'target：' + target, 'step：' + step)
        }, 20)

        function getStyle(obj, attr) {
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
        }
    }
    </script>
</body>
</html>
```
