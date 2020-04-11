---
title: JS 正则表达式简介
date: 2017-06-19 00:52:51
categories: web前端
tags: [JavaScript, RegExp]
description: "在实际工作中，正则表达式虽然不容易记忆，但是使用好了会给我们写代码带来莫大好处，这里简要介绍一下 JS 的正则表达式。"
---
## 语法

```js
/pattern/flags
new RegExp(pattern [, flags])
RegExp(pattern [, flags])
```

常用 flags 包括 g（全局匹配），i（忽略大小写），m（多行匹配； 将开始和结束字符（^和$）视为在多行上工作）。

## 正则表达式特殊字符含义

1. 字符类别

    - `.`: (点号，小数点) 匹配任意单个字符，但是行结束符除外：\n \r \u2028 或 \u2029。在字符集（如[xyz]）中，点( . )失去其特殊含义，并匹配一个字面点( . )。
    - `\d`: 匹配任意阿拉伯数字。等价于[0-9]。
    - `\D`: 匹配任意一个不是阿拉伯数字的字符。等价于[^0-9]。
    - `\w`: 匹配任意来自基本拉丁字母表中的字母数字字符，还包括下划线。等价于 [A-Za-z0-9_]。
    - `\W`: 匹配任意不是基本拉丁字母表中单词（字母数字下划线）字符的字符。等价于 [^A-Za-z0-9_]。
    - `\s`: 匹配一个空白符，包括空格、制表符、换页符、换行符和其他 Unicode 空格。
    - `\S`: 匹配一个非空白符。
    - `[\b]`: 匹配一个退格符（backspace）（不要与 \b 混淆）

2. 字符集合（字符组）

    - `[xyz]`: 匹配集合中的任意一个字符。你可以使用连字符'-'指定一个范围。例如，[abcd] 等价于 [a-d]。
    - `[^xyz]`: 一个反义或补充字符集，也叫反义字符组。也就是说，它匹配任意不在括号内的字符。

3. 边界

    - `^`与`$`: 匹配输入开始与结尾。
    - `\b`: 匹配一个零宽单词边界（zero-width word boundary），如一个字母与一个空格之间。例如，/\bno/ 匹配 "at noon" 中的 "no"，/ly\b/ 匹配 "possibly yesterday." 中的 "ly"。
    - `\B`: 匹配一个零宽非单词边界（zero-width non-word boundary），如两个字母之间或两个空格之间。例如，/\Bon/ 匹配 "at noon" 中的 "on"，/ye\B/ 匹配 "possibly yesterday." 中的 "ye"。

4. 分组与反向引用

    - `(x)`: 匹配 x 并且捕获匹配项。例如，/(foo)/ 匹配且捕获 "foo bar." 中的 "foo"。
    - `\n`: n 是一个正整数。一个反向引用（back reference），指向正则表达式中第 n 个括号（从左开始数）中匹配的子字符串。例如，/apple(,)\sorange\1/ 匹配 "apple, orange, cherry, peach." 中的 "apple,orange,"。
    - `(?:x)`: 匹配 x 不会捕获匹配项。

5. 数量词

    - `x*?`与`x+?`: 像上面的 * 和 + 一样匹配前面的模式 x，**然而匹配是最小可能匹配**。
    - `x?`: 匹配前面的模式 x 0 或 1 次。***如果在数量词 *、+、? 或 {}, 任意一个后面紧跟该符号（?），***会使数量词变为非贪婪（ non-greedy） ，即匹配次数最小化。反之，默认情况下，是贪婪的（greedy），即匹配次数最大化。
    - `x(?=y)`: 只有当 x 后面紧跟着 y 时，才匹配 x。
    - `x(?!y)`: 只有当 x 后面不是紧跟着 y 时，才匹配 x。
    - `x|y`: 匹配 x 或 y。
    - `x{n}`: n 是一个正整数。前面的模式 x 连续出现 n 次时匹配。例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。
    - `x{n,}`:n 是一个正整数。前面的模式 x 连续出现至少 n 次时匹配。例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。
    - `x{n,m}`: n 和 m 为正整数。前面的模式 x 连续出现至少 n 次，至多 m 次时匹配。例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。

## 常用方法

1. `regexObj.exec(str)`: str 是要匹配正则表达式的字符串。匹配成功返回一个数组，并更新正则表达式对象的属性。匹配失败，`exec()` 方法返回 null。类似于 `String.prototype.match()` 方法。

    ```js
    // Match "quick brown" followed by "jumps", ignoring characters in between
    // Remember "brown" and "jumps"
    // Ignore case

    var re = /quick\s(brown).+?(jumps)/ig;
    var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
    ```

    - result(数组)
        - `[0]`: 匹配的全部字符串 --> Quick Brown Fox Jumps
        - `[1], ...[n]`: 括号中的分组捕获 --> [1] = Brown, [2] = Jumps
        - `index`: 匹配到的字符位于原始字符串的基于0的索引值 --> 4
        - `input`: 原始字符串 --> `The Quick Brown Fox Jumps Over The Lazy Dog`
    - re(RegExp对象)
        - `lastIndex`: 下一次匹配开始的位置 --> 25
        - `ignoreCase`: 是否使用了'i'标记使正则匹配忽略大小写 --> true
        - `global`: 是否使用了'g'标记来进行全局的匹配 --> true
        - `multiline`: 是否使用了'm'标记使正则工作在多行模式 --> false
        - `source`: 正则匹配的字符串 --> `quick\s(brown).+?(jumps)`

2. `regexObj.test(str)`: 如果正则表达式与指定的字符串匹配 ，返回true；否则false。类似于 `String.prototype.search()` 方法，差别在于test返回一个布尔值，而 search 返回索引（如果找到）或者-1（如果没找到）。

## 贪婪模式与惰性模式

1. 贪婪模式：匹配尽可能多的字符
    贪婪量词：?   +   *   {n}   {n,m}   {n,}
2. 惰性模式：匹配尽可能少的字符
    惰性量词：??   +?   *?   {n}?   {n,m}?   {n,}?

### 邮箱的正则表达式

1. 只允许英文字母、数字、下划线、英文句号、以及中划线组成

    例如：zhangsan-001@gmail.com

    由于邮箱的基本格式为“名称@域名”，需要使用“^”匹配邮箱的开始部分，用“$”匹配邮箱结束部分以保证邮箱前后不能有其他字符，所以最终邮箱的正则表达式为：

    `^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$`

2. 名称允许汉字、字母、数字，域名只允许英文域名

    例如： 帽子001Abc@lenovo.com.cn

    `^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$`
