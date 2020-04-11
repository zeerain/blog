---
title: form 表单 name 属性与 submit() 默认事件
date: 2016-04-10 21:57:33
categories: web前端
tags: [JavaScript, form表单]
description: "总结 form 表单的一些属性以及 submit() 默认事件。"
---

## name 属性用途

1. 作为可与服务器交互数据的 HTML 元素的服务器端标识，比如 input、select、textarea和 button 等。我们可以在服务器端根据其 Name 通过 Request.Params 取得元素提交的值。
1. HTML 元素 Input type='radio' 分组，我们知道 radio button 控件在同一个分组类，check 操作是mutex(互斥) 的，同一时间只能选中一个 radio，这个分组就是根据相同的 Name 属性来实现的。
1. 建立页面中的锚点，我们知道 `<a href="URL">link</a>` 是获得一个页面超级链接，如果不用href属性，而改用Name，如：`<a name="PageBottom"></a>`，我们就获得了一个页面锚点。

## name 属性与 id 属性的区别

1. names属性：下面代码中 **必须name相同才能成为一组单选按钮**，而id属性没有这个功能

```html
<input   name= "xx "   type= "radio "   value= "1 ">
<input   name= "xx "   type= "radio "   value= "2 ">
<input   name= "xx "   type= "radio "   value= "3 ">
```

1. id属性：下面代码中 **for属性必须指向一个id**，否则没效果

```html
<input   id= "xx "   name= "yy ">
<label   for= "xx "> Label </label>
```

## submit()默认事件

- var collection = document.forms;
  - 该属性返回一个 (HTMLCollection) 数组集合，包含了文档中的所有 form 元素
  - 因此 document.forms["myForm"] 代表选择 name 属性为 myForm 的表单
  - 单个表单的选择也可以使用 document.forms[0] 等等
  - 类似还有直接使用 document.myForm 也是选择对应 name 属性的表单
  - 由此发现，包含 name 属性的元素可以使用 document.name.name 一级一级地找寻到，如果 name 相同会返回数组

```html
<script type="text/javascript">
$(function(){
var thisForm = document.forms['form1']; //获取name为form1的form表单
//或者
//var thisForm = document.forms[0]; //获取第一个form表单
console.info(thisForm.username.value); //输出表单name属性值为form1的 username 的值
console.info(thisForm.address.value);
document.forms[0].submit(); //表单提交
})
</script>
<body>
<!-- 以下为三个简单的form表单 -->
<form action="x" name="form1" >
<input type="text" name="username" value="zhangsan" />
<input type="text" name="address" value="beijing" />
</form>

<form action="x" name="form2" >
</form>

<form action="x" name="form3" >
</form>
</body>
```

- submit()
  - 默认表单提交事件,早于 `Input type='submit'` 按钮
  - 该事件发生在提交之前,可以用来进行表单验证

```html
<script>
function submitFun(obj){
      if(obj.category.value==''){
          alert("请输入");
          return false;
      }
}
</script>
<form onsubmit="return submitFun(this);">
<input type="text" name="category" />
<input type="submit" name="submit" value="提交"/>
</form>
```

- 当"提交"按钮被点击时，依然会执行submitFun()函数，在submitFun()函数中，我们对表单输入框进行了空验证，如果为空，提示输入并 return false,这样表单就不会提交（上面已经说到：当该事件触发的函数中返回 false 时，表单就不会被提交）。
- 同时，这里要注意 onsubmit="return submitFun(this);"，不能掉了 return，否则表单永远会提交。
