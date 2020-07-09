# 介绍

# css

## 盒模型IE和普通盒模型有什么区别

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
> transform 有哪些属性 ? 移动，缩放，旋转，倾斜
> transform (2D)  transform (3D)  

* translate/translateX/translateY/translateZ/translate3d 移动
* scale/scaleX/scaleY/scaleZ/scale3d/   缩放
* rotate/rotateX/rotateY/rotateZ/rotate3d   旋转
* skew/skewX/skewY/  倾斜
* perspective 为 3D 转换元素定义透视视图

## flex布局（详细）

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

### 容器的属性

一共有6个属性

* flex-direction: row | row-reverse | column | column-reverse;
  属性决定主轴的方向（即项目的排列方向）。

  row（默认值）：主轴为水平方向，起点在左端。
  row-reverse：主轴为水平方向，起点在右端。
  column：主轴为垂直方向，起点在上沿。
  column-reverse：主轴为垂直方向，起点在下沿。

* flex-wrap: nowrap | wrap | wrap-reverse;

  项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
  nowrap（默认）：不换行。
  wrap：换行，第一行在上方。
  wrap-reverse：换行，第一行在下方。

* flex-flow: flex-direction || flex-wrap;

  flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

* justify-content: flex-start | flex-end | center | space-between | space-around;

  属性定义了项目在主轴上的对齐方式。
  flex-start（默认值）：左对齐
  flex-end：右对齐
  center： 居中
  space-between：两端对齐，项目之间的间隔都相等。
  space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

* align-items: flex-start | flex-end | center | baseline | stretch;

  定义项目在交叉轴上如何对齐。
  flex-start：交叉轴的起点对齐。
  flex-end：交叉轴的终点对齐。
  center：交叉轴的中点对齐。
  baseline: 项目的第一行文字的基线对齐。
  stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

* align-content: flex-start | flex-end | center | space-between | space-around | stretch;

  属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  flex-start：与交叉轴的起点对齐。
  flex-end：与交叉轴的终点对齐。
  center：与交叉轴的中点对齐。
  space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
  space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  stretch（默认值）：轴线占满整个交叉轴。

### 项目的属性

* order: integer; 

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

* flex-grow: number;

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

* flex-shrink

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
flex-shrink： 0 时，空间不缩小

* flex-basis

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

* flex [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] 

属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

* align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。



### flex-grow和flex-shrink属性有什么用？

* flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

* flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。 flex-shrink： 0 时，空间不缩小


## rem布局

[Rem布局的原理解析 --颜海镜](https://yanhaijing.com/css/2017/09/29/principle-of-rem-layout/)

## grid布局

[CSS Grid 网格布局教程  --阮一峰](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## css栅格布局如何实现

[跟着写一个 CSS 栅格布局](https://juejin.im/entry/58c3d8bdda2f6056096b2b40)

如上图，是一个基本的栅格布局，它包含了：

* container: 包裹整个栅格系统的容器
* rows: 行
* columns: 列
* gutters: 各列的间的空隙


```html
 <div class="grid-container outline">
    <div class="row">
        <div class="col-1"><p>col-1</p></div> 
        <div class="col-1"><p>col-1</p></div> 
        <div class="col-1"><p>col-1</p></div> 
        <div class="col-1"><p>col-1</p></div> 
        <div class="col-1"><p>col-1</p></div> 
        <div class="col-1"><p>col-1</p></div> 
    </div> 
    <div class="row">
        <div class="col-2"><p>col-2</p></div> 
        <div class="col-2"><p>col-2</p></div> 
        <div class="col-2"><p>col-2</p></div> 
    </div> 
    <div class="row">
        <div class="col-3"><p>col-3</p></div> 
        <div class="col-3"><p>col-3</p></div> 
    </div> 
</div>
```

```css
    .grid-container{
        width: 100%; 
        max-width: 1200px;      
    }

    /*-- 使用 cleafix 清除浮动 -- */ 
    .row:before, 
    .row:after {
        content:"";
          display: table ;
        clear:both;
    }

    [class*='col-'] {
        float: left; 
        min-height: 1px; 
        width: 16.66%; 
        /*-- 设置列的左右间隙 -- */
        padding: 12px; 
        background-color: #FFDCDC;
    }

    .col-1{ width: 16.66%; }
    .col-2{ width: 33.33%; }
    .col-3{ width: 50%;    }
    .col-4{ width: 66.66%; }
    .col-5{ width: 83.33%; }
    .col-6{ width: 100%;   }

    .outline, .outline *{
        outline: 1px solid #F6A1A1; 
    }

    /*-- 列的额外内容样式 --*/
    [class*='col-'] > p {
        background-color: #FFC2C2; 
        padding: 0;
        margin: 0;
        text-align: center; 
        color: white; 
    }
```

## css伪元素和css伪类

[伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

## 1px的问题

[移动端1px解决方案](https://juejin.im/post/5d19b729f265da1bb2774865)

## 重绘和回流

[浏览器的回流与重绘](https://juejin.im/post/5a9923e9518825558251c96a)

在讨论回流与重绘之前，我们要知道：

1. 浏览器使用流式布局模型 (Flow Based Layout)。
2. 浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree。
3. 有了RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
4. 由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是为什么要避免使用table布局的原因之一。

一句话： 回流必将引起重绘，重绘不一定会引起回流。

会导致回流的操作：

* 页面首次渲染
* 浏览器窗口大小发生改变
* 元素尺寸或位置发生改变
* 元素内容变化（文字数量或图片大小等等）
* 元素字体大小变化
* 添加或者删除可见的DOM元素
* 激活CSS伪类（例如：:hover）
* 查询某些属性或调用某些方法


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

##  Ajax 是什么? 如何创建一个 Ajax？
```js
//1：创建Ajax对象
var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');// 兼容IE6及以下版本
//2：配置 Ajax请求地址
xhr.open('get','index.xml',true);
//3：发送请求
xhr.send(null); // 严谨写法
//4:监听请求，接受响应
xhr.onreadysatechange=function(){
     if(xhr.readySates==4&&xhr.status==200 || xhr.status==304 ) {
         console.log(xhr.responsetXML)
     }
}
```

## window的onload事件和domcontentloaded谁先谁后？

## 任务队列/宏任务和微任务

### promise

## 原型、原型链、构造函数

## es6的class关键字

let,const定义的变量，不是绑定在window下。

## js 有哪些基础数据类型

## 类型判断，`typeof`和`instanceof`的区别

## new做了那几件事，如何手写一个new

1. 它创建了一个全新的对象。
2. 将对象的__proto__ 链接到 函数的prototype上面
3. 将构造函数的作用域赋值给新对象 （也就是this指向新对象）
4. 执行构造函数中的代码（为这个新对象添加属性）
5. 返回新的对象，如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。

```js
  function aNew (fn) {
    if (typeof fn !== 'function') {
        throw Error('xxxx')
    }
    let res = {}
    if (fn.prototype !== null) {
        res.__proto__ = fn.prototype
    }
    let ret = fn.apply(res, [...arguments].slice.call(1))
    if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
        return ret;
    }
    return res;
  }
  var obj = New(A, 1, 2);
  // equals to
  var obj = new A(1, 2);
```

## call做了那几件事，如何手写一个call

call核心：
1. 指定this到函数，不传入参数，默认指向为 window
2. 传入给定参数执行函数
3. 删除这个函数
4. 返回执行结果

```js
Function.prototype.call2 = function(context = window) {
    if(typeof this != "function") {
        throw Error("not a function")
    }
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
```

## apply做了那几件事，如何手写一个apply

apply()的实现和call()类似，只是参数形式不同。apply是一个「数组」
1. 指定this到函数，不传入参数，默认指向为 window
2. 传入给定参数执行函数
3. 删除这个函数
4. 返回执行结果

```js
Function.prototype.apply2 = function(context = window) {
  if(typeof this != "function") {
      throw Error("not a function")
  }
  context.fn = this;
  let res;
  if (arguments[1]) {
    res = context.fn(...arguments[1])
  } else {
    res = context.fn()
  }
  delete context.fn;
  return res;
}
```

## bind做了那几件事，如何手写一个bind
bind方法 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
此外，bind实现需要考虑实例化后对原型链的影响。

需要考虑的点
1. 因为返回新的函数,要考虑到使用new去调用,并且new的优先级比较高,所以需要判断new的调用
2. 还有一个特点就是bind调用的时候可以传参,调用之后生成的新的函数也可以传参,效果是一样的

```js
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('not a function')
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOOP = function () {}
  var bindFn = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    self.apply(this instanceof fNOOP ? this : context, args.concat(bindArgs))
  }

  fNOOP.prototype = this.prototype
  bindFn.prototype = new fNOOP()

  return bindFn
}
```

## 防抖是啥，如何实现

你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行

总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行

最终版如下

```js
// 防抖函数  等你触发完事件 n 秒内不再触发事件
// this
// event对象
// 立即执行 和 返回值
// 取消功能
function debounce(func, wait, immediate) {
    var timeout, result
    var debounced = function () {
      var context = this
      var args = Array.prototype.slice(arguments)
      if (timeout) clearTimeout(timeout)
      if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout
          timeout = setTimeout(function(){
              timeout = null
          }, wait)
          if (callNow) {
            result = func.apply(context, args)
          } 
      } else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait)
      }
      return result
    }
    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}
```


分解版如下

```js
// 第一版代码
function debunce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
```

```js
// 第二版代码  注意this指向问题
function debunce (func, wait) {
  var timeout;
  return function () {
    var context = this
    clearTimeout(timeout)
    timeout = setTimeout(function(){
      func.apply(context)
    }, wait)
  }
}
```

```js
// 第三版代码  注意event对象
function debunce (func, wait) {
  var timeout;
  return function () {
    var context = this
    var args = Array.prototype.slice.call(arguments)
    clearTimeout(timeout)
    timeout = setTimeout (function () {
      func.apply(context, args)
    }, wait)
  }
}
```

## 节流是啥，如何实现

scroll 事件本身会触发页面的重新渲染，同时 scroll 事件的 handler 又会被高频度的触发, 因此事件的 handler 内部不应该有复杂操作，例如 DOM 操作就不应该放在事件处理中。
针对此类高频度触发事件问题（例如页面 scroll ，屏幕 resize，监听用户输入等），有两种常用的解决方法，防抖和节流。

节流的原理很简单：

如果你持续触发事件，每隔一段时间，只执行一次事件。

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

### 使用时间戳

让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

看了这个表述，是不是感觉已经可以写出代码了…… 让我们来写第一版的代码：

```js
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 使用
container.onmousemove = throttle(getUserAction, 1000);
```

### 使用定时器

接下来，我们讲讲第二种实现方式，使用定时器。

当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。

```js

// 节流(Throttling)实现
// 可以理解为事件在一个管道中传输，
// 加上这个节流阀以后，事件的流速就会减慢。
// 实际上这个函数的作用就是如此，它可以将一个函数的调用频率限制在一定阈值内，
// 例如 1s，那么 1s 内这个函数一定不会被调用两次
// https://github.com/mqyqingfeng/Blog/issues/22
function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}

```

## promise手写如何实现

我们来过一遍Promise/A+规范：

* 三种状态pending| fulfilled(resolved) | rejected
* 当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态
* 当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。

1、必须有一个then异步执行方法，then接受两个参数且必须返回一个promise：

```js

function myPromise(constructor){
  let self=this;
  self.status="pending"  //定义状态改变前的初始状态
  self.value=undefined; //定义状态为resolved的时候的状态
  self.reason=undefined; //定义状态为rejected的时候的状态
  function resolve(value){
    //两个==="pending"，保证了状态的改变是不可逆的
    if(self.status==="pending"){
      self.value=value;
      self.status="resolved";
    }
  }
  function reject(reason){
    //两个==="pending"，保证了状态的改变是不可逆的
    if(self.status==="pending"){
        self.reason=reason;
        self.status="rejected";
    }
  }
  //捕获构造异常
  try{
    constructor(resolve,reject);
  }catch(e){
    reject(e);
  }
}

// 同时，需要在myPromise的原型上定义链式调用的then方法：
myPromise.prototype.then=function(onFullfilled,onRejected){
  let self=this;
  switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
  }
}


// 测试一下：
var p=new myPromise(function(resolve,reject){resolve(1)});
p.then(function(x){console.log(x)})
```

## 函数科里化如何实现

[手写函数科里化](https://github.com/mqyqingfeng/Blog/issues/42)

```js
  function curry(fn, args) {
      var length = fn.length;
      args = args || [];
      return function() {
          var _args = args.slice(0);
          var arg, i;
          for (i = 0; i < arguments.length; i++) {
              arg = arguments[i];
              _args.push(arg);
          }
          if (_args.length < length) {
              return curry.call(this, fn, _args);
          } else {
              return fn.apply(this, _args);
          }
      }
  }

  var fn = curry(function(a, b, c) {
      console.log([a, b, c]);
  });
  fn("a", "b", "c") // ["a", "b", "c"]
  fn("a", "b")("c") // ["a", "b", "c"]
  fn("a")("b")("c") // ["a", "b", "c"]
  fn("a")("b", "c") // ["a", "b", "c"]

```

## 继承的有哪几种实现方式，es6的继承如何写

### 1.原型链继承

```js
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin

// 问题
// 1.引用类型的属性被所有实例共享
// 2.在创建 Child 的实例时，不能向Parent传参
```

### 2.借用构造函数(经典继承)

```js
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]

// 优点
// 1.避免了引用类型的属性被所有实例共享
// 2.可以在 Child 中向 Parent 传参

// 缺点
// 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
```

### 3.组合继承

原型链继承和经典继承双剑合璧。

```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);
    
    this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

// 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
// 缺点: 会调用两次父构造函数。
```

### 4.原型式继承

```js
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

### 5.寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}

// 缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
```

### 6.寄生组合式继承

```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
```
最后我们封装一下这个继承方法：

```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

引用《JavaScript高级程序设计》中对寄生组合式继承的夸赞就是：

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。


### es6 class 继承

[Class 的继承](https://es6.ruanyifeng.com/#docs/class-extends)

Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```js
class Point {
}

class ColorPoint extends Point {
}
```
上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。

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

## 数组的flat如何实现

[JavaScript专题之数组扁平化](https://github.com/mqyqingfeng/Blog/issues/36)

### 1.递归

```js
// 方法 1
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        }
        else {
            result.push(arr[i])
        }
    }
    return result;
}

console.log(flatten(arr))
```

### 2.toString
```js
// 如果数组的元素都是数字，那么我们可以考虑使用 toString 方法，因为：
[1, [2, [3, 4]]].toString() // "1,2,3,4"
```
```js
// 方法2
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.toString().split(',').map(function(item){
        return +item
    })
}

console.log(flatten(arr))
```

然而这种方法使用的场景却非常有限，如果数组是 [1, '1', 2, '2'] 的话，这种方法就会产生错误的结果。

### 3.reduce

既然是对数组进行处理，最终返回一个值，我们就可以考虑使用 reduce 来简化代码：

```js
// 方法3
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

console.log(flatten(arr))
```

### 4.扩展运算符...
```js
// 方法4
var arr = [1, [2, [3, 4]]];

function flatten(arr) {

    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

console.log(flatten(arr))
```

## 斐波那契数列如何实现

```js
function fib(n) {
    if (n == 1 || n == 2) {
        return 1
    };
    return fib(n - 2) + fib(n - 1);
}
fib(5)
```

## objToTree如何实现， Tree如何扁平为数组

## js冒泡排序如何实现

## js快排如何实现

## 对象的键值首字母大写如何实现，多层对象如何实现

## 阶乘如何实现   4 * 3 * 2 * 1

## 二叉树，前序遍历、中序遍历、后序遍历

## 广度优先搜索，深度优先搜索

## js二分查找

## 箭头函数

1、箭头函数并不会绑定一个 this 变量，它的作用域会如同寻常所做的一样一层层地去往上查找。 

2、箭头函数并不绑定 this，arguments，super(ES6)，new.target(ES6) 所有涉及它们的引用，都会沿袭向上查找外层作用域链的方案来处理。

3、函数表达式不适合对象方法，构造方法。箭头函数适合回调函数或者map、reduce、forEach等方法。

## setTimeout定时器，打印的若干问题
```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}

console.log(new Date, i);
// 第 1 个 5 直接输出，1 秒之后，输出 5 个 5
```
闭包
```js
for (var i = 0; i < 5; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000);
    })(i);
}

console.log(new Date, i);
```
```js
for (var i = 0; i < 5; i++) {
    setTimeout(function(j) {
        console.log(new Date, j);
    }, 1000, i);
}

console.log(new Date, i);
```

## 闭包的使用场景

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

## 腾讯的前端团队


