# 调用方法

## 示例：

**引入**

``` html
<link rel="stylesheet" href="piechart.css">
<script src="jquery-1.11.1.min.js"></script>
<script src="piechart.js"></script>
```

**调用**

``` javascript
var p = new Piechart({
  param1 : 0.1,  // 百分比直接用小数表示
  param2 : 0.2,
  param3 : 0.3
});

p.draw('#piechart', 300, 150, ['#f00', '#0f0', '#00f', '#000']);
```

## 说明：

**构造函数**

参数：饼图里面每个部分各自的名称和百分比，百分比直接用小数形式表示，整个参数用一个类似字典的键值对对象传进构造函数里面。

**draw方法**

参数（依次）：

1. dom的选择器（用jquery的形式）
2. 饼图的外径（px）
3. 饼图的内径（px）
4. 饼图中每一块各自对应的颜色（用数组表示，长度为 `所有分块总数 + 1`，最后一个多出来的颜色为饼图的背景颜色）
