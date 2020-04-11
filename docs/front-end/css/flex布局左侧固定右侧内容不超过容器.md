# 业务需求

在一个 flex: 1 的容器中，如果文字内容很长并且不换行会超出容器范围，无法待在设置好的剩余动态空间中，下面举例说明:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .main {
      display: flex;
    }

    .logo {
      width: 100px;
      height: 100px;
      margin: 10px;
    }

    .content {
      flex: 1;
      /* width: 0; */
      overflow: hidden;
    }

    .content>* {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  </style>
</head>

<body>
  <div class="main">
    <img alt="" class="logo" src="../images/loadFailed.jpg">
    <div class="content">
      <h4 class="name">a name</h4>
      <p class="info">a info</p>
      <p class="notice">This is notice content.This is notice content.This is notice content.This is notice content.This is notice content.</p>
    </div>
  </div>
</body>

</html>
```

`.notice` 元素可能会非常长，一些设备下需要隐藏显示，即不换行，并留下省略符…作标记。这里会发现 `text-overflow: ellipsis` 不生效，省略符根本没有出现。而且因为设置了 `nowrap` 会发现文字会将 `content` 元素撑开，导致内容超出了屏幕。所以必须要解决这个问题。

## 方案一

flex 布局自身问题，省略符需要对父元素限定宽度。尝试对父元素 `.content` 设置 `width: 100%` 无效，但是设置 `width: 0` 可行。即:

```css
.content {
  flex: 1;
  width: 0;
}
```

## 方案二

如果不设置宽度， `.content` 可以被子节点无限撑开。因此， `.notice` 总有足够的宽度在一行内显示所有文本，也就无法触发截断省略的效果。测试还有一种方法可以达到效果:

```css
.content {
  flex: 1;
  overflow: hidden；
}
```

上面的两种方案都可以达到我们需要的效果，即给 `content` 设置了 `flex` 为 1 的时候，它会动态的获得父容器的剩余宽度，且不会被自己的子元素把内容撑开

经过测试，以下的方法是无效的:

1. 给 `html, body` 设置 `max-width` ，元素似乎能强行撑开页宽；
2. 给 `body` 设置 `overflow` ，页宽不能被撑开了，但元素宽度还在，即元素本身还是溢出；
3. 给 `html, body` 同时设置 `max-width` 和 `overflow` ，页宽限定在 `max-width` 内，元素本身还是溢出；
4. 给 `.main` 容器设置 `overflow: hidden` ，同理 `.main` 是不溢出了， `.notice` 本身还是溢出；
5. 给 `.notice` 元素设置 `width` 或 `max-width` ，虽然宽度受限，但在特定宽度下`省略符…`显示不全，有时只显示`两个点..`。
