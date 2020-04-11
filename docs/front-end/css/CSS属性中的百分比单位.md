# 百分比值的基数

CSS 的属性值中经常会出现百分比，搞清它们的基数是一件很重要的事情。我特意查看了一下 W3C 的 CSS2.1 标准，在此整理下：

## 百分比单位

1. 乘以包含块的宽度 `margin, padding, left, right, text-indent, width, max-width, min-width`

2. 乘以包含块的高度 `top, bottom, height, max-height, min-height`

关于包含块（containing block）的概念，不能简单地理解成是父元素。如果是静态定位和相对定位，包含块一般就是其父元素。但是对于绝对定位的元素，包含块应该是离它最近的 position 为 absolute、relative、或者 fixed 的祖先元素。对固定定位的元素，它的包含块是视口（viewport）。具体可以参考 W3Help。

`background-size`属性规定背景图片尺寸，如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。

1. 乘以元素的字体大小 `line-height`

2. 乘以元素的行高 `vertical-align`

背景定位中的百分比 `background-position` 分别设置水平方向和垂直方向上的两个值，如果使用百分比，那么百分比值会同时应用于元素和图像。例如 50% 50% 会把图片的（50%, 50%）这一点与框的（50%, 50%）处对齐，相当于设置了 center center。同理 0% 0% 相当于 left top，100% 100% 相当于 right bottom。

**字体大小中的百分比 font-size 中的百分比值应该乘以元素所继承到的字体大小，也就是父元素的字体大小**。

### 字体单位浅谈

既然说到了字体大小，顺便八一八其他的字体单位吧，有些可能平时并不会用，但是了解一下也没有坏处。有两个相对单位是：

em——相当于当前的字体高度，称作“全身方框”（em square）。如果在 font-size 上使用这个单位，应该乘以父元素的字体大小。用在 font-size 之外的属性上，则应该乘以元素自身的字体大小。 ex——相当于字体中的”x”的高度。 以下是绝对单位：

in——英寸（inch），相当于 2.54cm。 cm——厘米（centimeter）。 mm——毫米（millimeter）。 pt——磅（point）。1pt 相当于 1in 的 1/72。 pc——皮卡（pica）。1pc = 12pt。 px——像素（pixel unit）。1px = 0.75pt。

## 百分比的继承

如果某个元素设置了百分比的属性，则后代元素继承的是计算后的值。例如：

`p { font-size: 10px } p { line-height: 120% }`

*120% of ‘font-size‘*，那么p的子元素继承到的值是 `line-height: 12px`，而不是 line-height: 120%。

**注意**：*对于使用了 absolute 定位的元素，如果其父级元素没有设置 position:relative; 则百分比为页面可见高度的百分比*。
