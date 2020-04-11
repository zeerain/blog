---
title: Promise实践之连续加载图片
date: 2019-05-21 00:39:52
categories: web前端
tags: [JavaScript, Promise]
description: "在上一篇博文中， 我们采取代理模式实现了图片预加载功能， 本文更进一步， 完成一个能够连续加载多张图片的功能。 "
---

## 要实现的功能

1. 连续加载多张图片
2. 加载错误， 超时后显示加载失败图片

为了实现上述功能， 需要处理图片加载状态事件以及完成时的回调函数， 针对这种状态通知的特点， 适合采用 `Promise` 进行处理。

### 实现步骤

1. 完成一个加载图片的代理创建函数， 该函数具有处理图片加载失败、 成功、 超时监控、 取消加载超时监控的能力

    ```js
    function createLoadImgProxy() {
        var imgCache = new Image();
        var promise = new Promise(function(resolve, reject) {
            //加载完成事件处理，加载完成后进行resolve操作
            imgCache.onload = function() {
                resolve(this.src);
            };

            //加载终止事件处理，终止后进行reject操作
            imgCache.onabort = function() {
                reject("aborted");
            };

            //加载异常事件处理，异常后进行reject操作
            imgCache.onerror = function() {
                reject("error");
            };
        });

        var timeoutTimer;
        //开始加载超时监控，超时后进行reject操作
        function beginTimeoutWatcher() {
            timeoutTimer = setTimeout(function() {
                promise.reject('timeout');
            }, 10000);
        }

        //结束加载超时监控
        function endTimeoutWatcher() {
            if (!timeoutTimer) {
                return;
            }

            clearTimeout(timeoutTimer);
        }

        return function(eleImg, src) {
            // 加载本地图片
            loadImg(eleImg, '../images/loading.gif');
            imgCache.src = src;

            //开始进行超时加载监控
            beginTimeoutWatcher();

            return promise.then(function(src) {
                //                        alert('done end');
                //加载完成后，往图片元素上设置图片
                loadImg(eleImg, src);
            }).catch(function(msg) {
                //                        alert('fail end:' + msg);
                //加载失败后，往图片元素上设置失败图片
                loadImg(eleImg, '../images/loadFailed.jpg');
            }).finally(function() {
                //                        alert('always end');
                //加载完成或加载失败都要终止加载超时监控
                endTimeoutWatcher();
            });
        };
    }
    ```

2. 连续加载多张图片

    ```js
    //一张一张的连续加载图片
    //参数：srcs: 图片路径数组
    function doLoadImgs(srcs) {
        var index = 0;

        (function loadOneByOne() {
            //退出条件
            if (!(src = srcs[index++])) {
                return;
            }

            var eleImg = createImgElement();
            document.getElementById('imgContainer').appendChild(eleImg);

            //创建一个加载代理函数
            var loadImgProxy = createLoadImgProxy();

            //在当前图片加载或失败后，递归调用，加载下一张
            loadImgProxy(eleImg, src).then(loadOneByOne);
        })();
    }
    ```

做一个 `loadOneByOne` 的加载递归函数，内部先创建一个加载代理，在代理加载完图片，不管是成功还是失败后，递归调用 `loadOneByOne` 函数加载下一张图片。

关键就在于代理函数返回的 `promise` 对象，使用 `.then` 方法可在加载完成后（成功或失败）进行 `loadOneByOne` 递归调用加载下一张。

完整代码如下：

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>
  <button id='btnLoadImg'>加载图片</button>
  <br>
  <div id='imgContainer'>
  </div>
  <br>

  <script type='text/javascript' src="../script/jquery-1.9.1.js"></script>
  <script type='text/javascript'>
    var imgSrcs = [
      'https://i.postimg.cc/y6ZkTsrk/Yukee5.jpg',
      'https://i.postimg.cc/fL0T5fC6/Yukee12.png',
      'https://i.postimg.cc/bN5Vf096/Yukee16.jpg',
      'https://i.postimg.cc/Z5y7b9fJ/Yukee9.png',
      'https://i.postimg.cc/vBXXq5mt/Yukee10.png'
    ];

    $(document).ready(function () {
      $('#btnLoadImg').bind('click', function () {
        doLoadImgs(imgSrcs);
      });
    });

    //创建img标签
    //这里用自执行函数加一个闭包，是为了可以创建多个id不同的img标签。
    var createImgElement = (function () {
      var index = 0;

      return function () {
        var eleImg = document.createElement('img');
        eleImg.setAttribute('width', '200');
        eleImg.setAttribute('heght', '150');
        eleImg.setAttribute('id', 'img' + index++);
        return eleImg;
      };
    })();

    function loadImg(img, src) {
      img.src = src;
    }

    function createLoadImgProxy() {
      var imgCache = new Image();
      var promise = new Promise(function(resolve, reject) {
        //加载完成事件处理，加载完成后进行resolve操作
        imgCache.onload = function () {
          resolve(this.src);
        };

        //加载终止事件处理，终止后进行reject操作
        imgCache.onabort = function () {
          reject("aborted");
        };

        //加载异常事件处理，异常后进行reject操作
        imgCache.onerror = function () {
          reject("error");
        };
      });

      var timeoutTimer;
      //开始加载超时监控，超时后进行reject操作
      function beginTimeoutWatcher() {
        timeoutTimer = setTimeout(function () {
          promise.reject('timeout');
        }, 10000);
      }

      //结束加载超时监控
      function endTimeoutWatcher() {
        if (!timeoutTimer) {
          return;
        }

        clearTimeout(timeoutTimer);
      }

      return function (eleImg, src) {
        // 加载本地图片
        loadImg(eleImg, '../images/loading.gif');
        imgCache.src = src;

        //开始进行超时加载监控
        beginTimeoutWatcher();

        return promise.then(function (src) {
          //                        alert('success end');
          //加载完成后，往图片元素上设置图片
          loadImg(eleImg, src);
        }).catch(function (msg) {
          //                        alert('fail end:' + msg);
          //加载失败后，往图片元素上设置失败图片
          loadImg(eleImg, '../images/loadFailed.jpg');
        }).finally(function () {
          //                        alert('finally end');
          //加载完成或加载失败都要终止加载超时监控
          endTimeoutWatcher();
        });
      };
    }


    //一张一张的连续加载图片
    //参数：srcs: 图片路径数组
    function doLoadImgs(srcs) {
      var index = 0;

      (function loadOneByOne() {
        //退出条件
        if (!(src = srcs[index++])) {
          return;
        }

        var eleImg = createImgElement();
        document.getElementById('imgContainer').appendChild(eleImg);

        //创建一个加载代理函数
        var loadImgProxy = createLoadImgProxy();

        //在当前图片加载或失败后，递归调用，加载下一张
        loadImgProxy(eleImg, src).then(loadOneByOne);
      })();
    }
  </script>
</body>

</html>
```
