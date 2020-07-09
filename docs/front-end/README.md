# 介绍

# css

## 浏览器有哪些内核

1. IE浏览器内核：Trident内核，也是俗称的IE内核；
2. Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；
3. Firefox浏览器内核：Gecko内核，俗称Firefox内核；
4. Safari浏览器内核：Webkit内核；

## IE盒模型和标准盒模型的区别

IE盒模型和标准盒模型的总宽度都是由四个部分组成的：margin，border，padding，content

不同点：

标准盒模型的宽度只有内容部分，是独立的。

IE盒模型： content + padding + border

## 水平垂直居中

已知高度宽度

1. absolute-margin

```css
.parent {
  position: relative;
}
.son {
  position: absolute; 
  top: 50%; 
  left: 50%; 
  margin-top: -50px; 
  margin-left: -50px;
}
```

2. absolute+calc
```css
.parent {
  position: relative;
}
.son {
  position: absolute; 
  top: calc(50% - 50px); 
  left: calc(50% - 50px);
}
```

未知高度宽度

1. flex

```css
.parent {
  display: flex;
  justify-content: center; 
  align-items: center;
}
```

2. absolute+margin+auto

```css
.parent {
  position: relative;
}
.son {
  position: absolute; 
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0; 
  margin: auto;
}
```

3. absolute+transform

```css
.parent {
  position: relative;
}
.son {
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
}
```

> transform 有哪些属性 ?  旋转，缩放，移动，倾斜
> transform (2D)  transform (3D)
> none	定义不进行转换。
> matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵。
> matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。
> translate(x,y)	定义 2D 转换。
> translate3d(x,y,z)	定义 3D 转换。
> translateX(x)	定义转换，只是用 X 轴的值。
> translateY(y)	定义转换，只是用 Y 轴的值。
> translateZ(z)	定义 3D 转换，只是用 Z 轴的值。
> scale(x[,y]?)	定义 2D 缩放转换。
> scale3d(x,y,z)	定义 3D 缩放转换。
> scaleX(x)	通过设置 X 轴的值来定义缩放转换。
> scaleY(y)	通过设置 Y 轴的值来定义缩放转换。
> scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。
> rotate(angle)	定义 2D 旋转，在参数中规定角度。
> rotate3d(x,y,z,angle)	定义 3D 旋转。
> rotateX(angle)	定义沿着 X 轴的 3D 旋转。
> rotateY(angle)	定义沿着 Y 轴的 3D 旋转。
> rotateZ(angle)	定义沿着 Z 轴的 3D 旋转。
> skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换。
> skewX(angle)	定义沿着 X 轴的 2D 倾斜转换。
> skewY(angle)	定义沿着 Y 轴的 2D 倾斜转换。
> perspective(n)	为 3D 转换元素定义透视视图。


## flex布局（详细）

### flex-grow和flex-shrink属性有什么用？

## rem布局

## grid布局

## css栅格布局如何实现

## css伪元素和css伪类

## 1px的问题

## 重绘和回流

## 常见的css布局

### 三栏布局

### 圣杯布局

### BFC

## position

## less/scss

## css原生模块化

## 浮动的原理

## 屏幕占满和未占满的情况下，使footer固定在底部，尽量多种方法。

## css扇形如何实现

## css三角形如何实现

## CSS有哪些选择器？优先级

# js

## es6的常用知识点

## 事件机制？ 什么叫事件委托？事件捕获和事件冒泡

## 阻止冒泡事件和默认事件

## window的onload事件和domcontentloaded谁先谁后？

## 任务队列/宏任务和微任务

### promise

## 原型、原型链、构造函数

## es6的class关键字

## 类型判断，`typeof`和`instanceof`的区别

## new关键字做了什么？如何手写一个new?

## bind和call做了什么事？如何手写一个bind和call函数？

## 下面代码输出什么？

## js模块化方案

## js拖拽原理

## js图片裁剪

## 函数声明和函数表达式有什么不同吗？

## 写一程序遍历一个DOM结构，遍历树

## 常见的正则表达式

### 正则表达式的复习

### 如何判断正确的url


# ts熟悉

# vue

## vue路由监听原理

# 小程序/小程序框架实现原理

## 小程序架构

# 源码分析

## vue源码

## lodash源码

## jquery源码

# webpack

## webpack插件

## webpack的loader

## webpack插件

## 如何编写一个webpack插件

## webpack如何调优

## webpack实现原理

## webpack tree shaking

# 工程化



# 微前端

# 数据结构和算法

## 时间复杂度和空间复杂度

## (字节)[https://leetcode-cn.com/explore/featured/card/bytedance/]

## 要求给你一个字符串”I love dog”变成”dog love I”

# 浏览器

## URL输入后整个流程

## 大列表大数据的渲染

## 浏览器缓存的机制？优先级是怎么样的

## 304状态码

## 跨域问题为什么会出现？ 有哪些解决方案？

## 你知道哪些状态码？

1xx：指示信息–表示请求已接收，继续处理。
2xx：成功–表示请求已被成功接收、理解、接受。
3xx：重定向–要完成请求必须进行更进一步的操作。
4xx：客户端错误–请求有语法错误或请求无法实现。
5xx：服务器端错误–服务器未能实现合法的请求。
平时遇到比较常见的状态码有:200, 204, 301, 302, 304, 400, 401, 403, 404, 422, 500(分别表示什么请自行查找)。



# 性能

## 项目优化

# 网络

## Http请求中的keep-alive有了解吗

## HTTP握手

## HTTP和HTTPS的区别

## DNS解析的过程

## TCP和UDP区别

## cdn：回源策略，为什么cdn能加速

# 常见的设计模式


# 安全



# electron开发

# git

# 项目

## 封装一个表格
## 封装SDK
## 封装vscode插件，迁移支付宝的新建页面和新建组件
## 封装webpack插件

# 前端团队

## 360奇舞团

## 京东凹凸实验室

## 百度前端团队

## 腾讯的前端团队叫啥

# 简历修改
