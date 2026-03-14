---
title: Vue方向面试题
date: 2025/11/24
tags:
 - Vue
categories:
 - 面试汇总
---

<ReadAloud />

> 题目 + 答案，便于背诵与复习。

---

## 一、HTML5 / CSS3 / JavaScript (ES6+) 与 W3C / 渲染 / 性能

### HTML5

**Q1：常用语义化标签有哪些？为什么要用语义化？**

**答：**  
常用语义化标签：`<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<aside>`、`<footer>`、`<figure>`、`<figcaption>`、`<time>` 等。  
原因：① 结构清晰，便于维护；② 有利于 SEO，爬虫能更好理解内容层级；③ 有利于无障碍（屏幕阅读器等）；④ 代码可读性更好。

---

**Q2：HTML5 新增了哪些常用 API？**

**答：**  
- **存储**：`localStorage`、`sessionStorage`（持久化/会话级键值对）。  
- **图形**：`Canvas`、`SVG`。  
- **多线程**：`Web Worker`（在后台线程执行 JS，不阻塞主线程）。  
- **地理**：`Geolocation`（获取位置）。  
- **历史**：`History API`（`pushState`/`replaceState`，做 SPA 路由不刷新）。  
- **音视频**：`<audio>`、`<video>` 及对应 API。  
- **表单**：新 input 类型（email、number、date 等）、`placeholder`、`required`、`pattern` 等。

---

**Q3：DOCTYPE 的作用？标准模式与怪异模式的区别？怎么区分？**

**答：**  
`<!DOCTYPE html>` 告诉浏览器用 HTML5 标准解析文档。  

- **标准模式（Standards Mode）**：按 W3C/CSS 规范渲染，盒模型、布局、样式计算一致，是推荐模式。  
- **怪异模式（Quirks Mode）**：为兼容早年未写 DOCTYPE 的页面，浏览器会模拟 IE5 的渲染行为，和标准不一致，容易导致布局错乱。  
- **触发**：没有 DOCTYPE、或 DOCTYPE 写错/写在非首行前有内容时，浏览器可能进入怪异模式。  

**怎么区分**：  
- 用 JS：`document.compatMode`，值为 **`"CSS1Compat"`** 表示标准模式，**`"BackCompat"`** 表示怪异模式（或未声明）。  
- 看表现：例如给 div 设 `width: 100px; padding: 10px`，标准模式下总宽度 = 100 + 20 = 120px（content-box）；怪异模式下总宽度多为 100px（类似 IE 的 border-box），可据此判断。  

**主要不同**：  
- **盒模型**：标准模式默认 content-box（width/height 只含内容）；怪异模式里 width/height 会包含 padding、border（类似 border-box）。  
- **行内元素高度**：怪异模式下某些行内元素可设宽高；标准模式行内非替换元素设宽高不生效。  
- **垂直 margin**：怪异模式下相邻块级元素垂直 margin 的合并规则与标准有差异。  
- **表格、字体等**：怪异模式下表格单元格高度、字体继承等有历史兼容行为，与标准不完全一致。  

**建议**：页面开头写正确的 `<!DOCTYPE html>`，保证始终以标准模式渲染，避免布局异常。

---

### CSS3

**Q4：Flex 与 Grid 的区别与适用场景？**

**答：**  
- **Flex**：一维布局（行或列），通过 flex 容器 + 子项弹性伸缩、对齐。适合组件内排列、导航栏、卡片行等。  
- **Grid**：二维布局（行+列），可同时定义行和列的轨道。适合整体页面布局、复杂网格、仪表盘等。  
简单记：单方向用 Flex，有明确行列结构用 Grid。

---

**Q5：实现水平垂直居中至少 3 种方式？**

**答：**  
① **Flex**：父 `display: flex; justify-content: center; align-items: center;`  
② **Grid**：父 `display: grid; place-items: center;`  
③ **绝对定位 + 负 margin**：子 `position: absolute; left: 50%; top: 50%; margin-left: -width/2; margin-top: -height/2;`（需已知宽高）  
④ **绝对定位 + transform**：子 `position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);`  
⑤ **绝对定位 + margin: auto**：子 `position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto;`（需定宽高）

---

**Q6：CSS 选择器优先级计算规则？!important 建议？**

**答：**  
优先级从低到高：  
- 通配符 `*`、继承 → 0  
- 标签、伪元素 → 1  
- 类、属性、伪类 → 10  
- ID → 100  
- 内联样式 → 1000  
- `!important` 最高（覆盖同属性其他声明）  
多个选择器时逐位比较，高位大则胜出。  
**!important 建议**：尽量少用，易造成难以覆盖的样式，难以维护；只在确实需要覆盖第三方或内联样式时谨慎使用。

---

**Q7：transition 与 animation 的区别？动画如何减少重排/重绘？**

**答：**  
- **transition**：需要状态变化触发（如 hover、class 变化），只定义“从哪到哪”的过渡效果。  
- **animation**：可自动播放，用 `@keyframes` 定义多关键帧，可循环、延迟、交替等。  
**减少重排/重绘**：尽量只改 `transform`、`opacity`，让动画在合成层完成（GPU 加速），避免改 `width`、`height`、`margin`、`top/left` 等触发布局与重绘。

---

**Q8：什么是 BFC？如何触发？常见应用？**

**答：**  
**BFC**（块级格式化上下文）是一块独立渲染区域，内部布局与外部隔离。  
**触发方式**：`overflow: hidden/auto`、`float` 非 none、`position: absolute/fixed`、`display: inline-block/flex/grid` 等。  
**应用**：① 清除浮动（父元素触发 BFC 可包住浮动子元素）；② 防止 margin 塌陷（相邻块级 margin 合并，给其中一个包一层 BFC 可避免）；③ 两栏自适应（一侧 float，另一侧 overflow 形成 BFC 不被遮挡）。

---

**Q8-2：CSS 盒模型？content-box 和 border-box 区别？**

**答：**  
盒模型由 content、padding、border、margin 组成。  
- **content-box**（默认）：`width/height` 只包含内容区，padding 和 border 会加在宽高之外，总宽 = width + padding + border。  
- **border-box**：`width/height` 包含 content + padding + border，设置宽高后改 padding/border 不会撑大盒子，总宽就是 width。  
用 `box-sizing: border-box` 更符合“给盒子设多宽就是多宽”的直觉，布局计算更简单。

---

### 样式与常见布局

**Q8-3：什么是流式布局（文档流）？脱离文档流有哪些方式？**

**答：**  
**流式布局 / 文档流**：元素按在 HTML 中的顺序依次排列的规则。块级元素独占一行、垂直排列；行内元素在同一行内水平排列，换行时从左到右。  
**脱离文档流**：元素不再占原来的位置，后续元素会“补位”。方式有：① **float**（浮动）；② **position: absolute / fixed**。  
**注意**：`position: relative` 不脱离文档流，仍在原位置占位，只是视觉上可偏移。脱离文档流的元素会盖住未脱离的元素，需注意层叠和父容器高度塌陷（浮动需清浮动、BFC 等）。

---

**Q8-4：两栏布局：左侧固定宽度、右侧自适应，有哪些实现方式？**

**答：**  
- **float + margin**：左栏 `float: left; width: 200px`，右栏 `margin-left: 200px`（右栏形成 BFC 更稳，如 `overflow: hidden`）。  
- **float + BFC**：左栏 float，右栏 `overflow: auto/hidden` 触发 BFC，自然填满剩余宽度。  
- **Flex**：父 `display: flex`，左 `flex: 0 0 200px`，右 `flex: 1`。  
- **Grid**：父 `display: grid; grid-template-columns: 200px 1fr`。  
- **绝对定位**：父 `position: relative`，左 `position: absolute; width: 200px`，右 `margin-left: 200px`。  
实际开发多用 Flex 或 Grid，代码简洁、易维护。

---

**Q8-5：三栏布局（圣杯 / 双飞翼）：左右固定宽度、中间自适应，如何实现？**

**答：**  
**要求**：中间栏在 DOM 里写在前面（便于先渲染、SEO），视觉上左-中-右，中间自适应。  

**圣杯布局**：  
- 三栏都 `float: left`，中间栏 `width: 100%` 占满一行；再给父容器设左右 padding 为左右栏宽度。  
- 左栏 `margin-left: -100%` 提到最左，再 `position: relative; left: -左栏宽` 挪到 padding 区；右栏 `margin-left: -右栏宽` 提到上一行右侧，再 `position: relative; right: -右栏宽` 进 padding 区。  
- 父容器需留出左右“槽位”（padding），给左右栏腾位置。  

**双飞翼布局**：  
- 中间外层 `width: 100%`、float，内层再包一层 div 设 `margin: 0 左宽 右宽`，中间内容在内层里。  
- 左栏 `margin-left: -100%`，右栏 `margin-left: -右宽`，左右栏盖在中间两侧的 margin 上，中间内容不被遮挡。  

**现代写法**：用 **Flex**：父 `display: flex`，左 `flex: 0 0 200px`，中 `flex: 1`，右 `flex: 0 0 200px`；或 **Grid**：`grid-template-columns: 200px 1fr 200px`。DOM 顺序可中间放中间，用 `order` 调视觉顺序。

---

**Q8-6：瀑布流（Pinterest 式）布局如何实现？**

**答：**  
**瀑布流**：多列等宽，每个卡片高度不一，依次往当前“最短的一列”后追加，形成参差效果。  

**实现方式**：  
- **JS 计算**：用多列（如 4 个 div 或 4 列 grid），遍历数据，每次把下一个卡片 append 到当前高度最小的那一列；需在图片 onload 或已知高度后算列高。  
- **CSS 多列**：`column-count: 4` + `column-gap`，每个卡片 `break-inside: avoid` 防止被拦腰折断；但列内是纵向排列，顺序是“先填满第一列再第二列”，和 Pinterest 的“按行尽量填满”略有差异，适合顺序不强调的场景。  
- **Grid + grid-row**：用 `grid-template-rows: masonry`（部分浏览器实验性支持）可做原生瀑布流；未支持时仍用 JS 算位置或列高。  
- **第三方库**：如 Masonry、isotope 等，自动算位置并支持响应式列数。

---

**Q8-7：Sticky Footer（粘连页脚）如何实现？**

**答：**  
**需求**：内容少时页脚贴在视口底部；内容多时页脚在文档末尾，不盖住内容。  

**实现方式**：  
- **Flex**：外层 `min-height: 100vh`、`display: flex`、`flex-direction: column`，主内容区 `flex: 1`，页脚不设 flex，自然在底部；内容多时主内容区变高，页脚被撑下去。  
- **Grid**：外层 `min-height: 100vh`、`display: grid`、`grid-template-rows: 1fr auto`，主内容占 1fr，页脚 auto。  
- **传统**：主内容 `min-height: calc(100vh - 页脚高)`，或给主内容包一层 `padding-bottom: 页脚高`，页脚用负 margin 或绝对定位吸底；内容多时自然把页脚顶下去。  
推荐 Flex 或 Grid，代码少、兼容性好。

---

**Q8-8：多列等高布局如何实现？**

**答：**  
**需求**：多列并排，高度以最高一列为准，每列背景/边框等高。  

- **Flex**：父 `display: flex`，子项默认 `align-items: stretch`（默认值），天然等高。  
- **Grid**：父 `display: grid`，子项同一行默认等高。  
- **float + 负 margin + padding 补偿**（传统）：给每列包一层，外层 float，内层用大 padding-bottom 和等大负 margin-bottom 撑开父容器，再用父容器 `overflow: hidden` 裁掉多出的部分，视觉上等高；实现复杂，不推荐。  
- **table / display: table**：父 `display: table`，子 `display: table-cell`，单元格默认等高；但语义和灵活性一般。  
实际开发用 Flex 或 Grid 即可。

---

### JavaScript (ES6+)

**Q9：闭包是什么？常见用途与注意点？**

**答：**  
闭包：函数能够“记住”并访问其词法作用域，即使在该作用域外执行。本质是函数 + 其引用到的外部变量形成的环境。  
**用途**：数据私有（模块模式）、柯里化、防抖节流、循环中绑定正确的 i 等。  
**注意**：不当使用会导致变量常驻内存，可能造成内存泄漏；不再需要的闭包要及时解除引用。

---

**Q10：原型链是什么？**

**答：**  
每个对象有 `__proto__`（或通过 `Object.getPrototypeOf` 获得），指向其构造函数的 `prototype`；`prototype` 本身也是对象，也有自己的 `__proto__`，这样一层层直到 `Object.prototype.__proto__ === null`，形成链条。访问属性时沿这条链查找，即原型链。

---

**Q11：this 指向规则？**

**答：**  
- 默认绑定：独立函数调用 → `this` 为全局（严格模式下为 undefined）。  
- 隐式绑定：`obj.fn()` → `this` 为 `obj`。  
- 显式绑定：`call/apply/bind` 传入的对象。  
- new：`this` 指向新创建的对象。  
- 箭头函数：不绑定自己的 `this`，继承外层函数的 `this`（定义时确定）。

---

**Q12：事件循环（宏任务、微任务）？**

**答：**  
JS 单线程，通过事件循环处理异步。  
- 执行栈清空后，先执行**所有微任务**（如 Promise.then、queueMicrotask、MutationObserver）。  
- 再取一个**宏任务**（如 setTimeout、setInterval、I/O、UI 渲染）执行。  
- 重复上述过程。  
因此微任务会在当前宏任务之后、下一个宏任务之前全部执行完，导致“微任务先于宏任务”的现象。

---

**Q13：let/const 与 var 的区别？**

**答：**  
- **作用域**：`var` 是函数作用域；`let/const` 是块级作用域（{} 内）。  
- **提升**：`var` 会提升并可先使用再声明（值为 undefined）；`let/const` 有**暂时性死区（TDZ）**：从代码块开始到该变量声明语句之间的这段区域里，不能访问该变量，访问会抛 `ReferenceError`；只有执行到声明语句之后才能正常使用。例如 `console.log(x); let x = 1;` 会报错，而 `var x` 时同一位置会输出 undefined。  
- **重复声明**：`var` 可重复声明；同一作用域内 `let/const` 不能重复声明。  
- **const**：声明后必须赋初值，且**不能重新赋值**（即不能把变量再指向另一个引用，如 `const a = {}; a = {}` 会报错）；但**对象/数组的内容可改**——因为 const 固定的是“变量指向的那一个引用”，而不是引用指向的那块内存里的数据，所以可以 `a.name = 'x'`、`arr.push(1)` 等修改属性或元素。若希望对象/数组也不可被修改，可用 `Object.freeze()` 或深冻结。

---

**Q14：箭头函数与普通函数的区别？**

**答：**  
- `this`：箭头函数没有自己的 `this`，继承定义时所在作用域的 `this`；普通函数由调用方式决定。  
- 没有 `arguments`，可用剩余参数 `...args`。  
- 不能作为构造函数（不能 `new`）。  
- 没有 `prototype` 属性。

---

**Q15：Promise 与 async/await 的关系？**

**答：**  
`async` 函数返回 Promise；`await` 会暂停 async 函数执行，等待 Promise 完成后再继续，并得到 resolve 的值（若 reject 会抛错，需 try/catch 或 .catch）。async/await 是 Promise 的语法糖，让异步代码写法像同步，可读性更好。

---

**Q16：== 与 === 的区别？**

**答：**  
`===` 严格相等：类型不同直接 false；类型相同再比值。  
`==` 宽松相等：会做类型转换再比较（如 `'1' == 1` 为 true）。  
建议开发中多用 `===`，避免隐式转换带来的坑。

---

**Q17：深拷贝、浅拷贝实现思路？**

**答：**  
- **浅拷贝**：只复制第一层。`Object.assign({}, obj)`、展开运算符 `{...obj}`、`arr.slice()` 等。  
- **深拷贝**：递归复制所有层级。可手写递归（注意循环引用、Date、RegExp 等），或简单场景用 `JSON.parse(JSON.stringify(obj))`（无法复制函数、undefined、Symbol、循环引用）。生产可用 lodash 的 `cloneDeep` 或 structuredClone（支持部分类型）。

---

**Q17-1：typeof、instanceof、Object.prototype.toString 区别？如何准确判断类型？**

**答：**  
- **typeof**：返回字符串，如 `"number"`、`"string"`、`"boolean"`、`"undefined"`、`"function"`；对对象和 null 都返回 `"object"`，对数组也返回 `"object"`，无法区分数组、Date、正则等。  
- **instanceof**：判断原型链上是否有某构造函数，如 `[] instanceof Array` 为 true；无法判断基本类型，且跨 iframe 时构造函数不同会失效。  
- **Object.prototype.toString.call(x)**：返回 `"[object Type]"`，如 `"[object Array]"`、`"[object Date]"`，可准确区分内置类型；对自定义类返回 `"[object Object]"` 除非改 Symbol.toStringTag。  
**准确判断**：基本类型用 typeof；数组用 `Array.isArray()`；内置对象用 `Object.prototype.toString.call()`；自定义类用 instanceof 或 constructor。

---

**Q17-1-2：事件委托是什么？事件冒泡和捕获的区别？**

**答：**  
- **事件委托**：不逐个给子元素绑事件，而是在父元素上绑一个，利用冒泡在父元素统一处理；通过 `event.target` 判断实际点击的是哪个子节点。好处：减少监听数、动态新增子节点无需再绑、性能更好。  
- **冒泡**：从目标元素向上传播到 document；`addEventListener` 第三参数为 false 或省略时，在冒泡阶段触发。  
- **捕获**：从 document 向下传播到目标元素；第三参数为 true 时在捕获阶段触发。  
- **顺序**：捕获 → 目标阶段 → 冒泡。`stopPropagation()` 阻止继续传播；`preventDefault()` 阻止默认行为（如链接跳转、表单提交）。

---

**Q17-1-3：数组去重、数组扁平化有哪些实现方式？**

**答：**  
**去重**：  
- `[...new Set(arr)]` 或 `Array.from(new Set(arr))`（简单、推荐）。  
- `arr.filter((item, i) => arr.indexOf(item) === i)`。  
- 对象/数组等引用类型去重要按 key 或序列化后去重。  

**扁平化**：  
- `arr.flat(Infinity)` 一层层打平到底。  
- 递归：`arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), [])`。  
- 迭代 + 栈/队列：把子数组展开后继续处理直到没有嵌套。

---

**Q17-1-4：ES5 和 ES6 继承的区别？寄生组合继承、class 继承？**

**答：**  
- **ES5 寄生组合继承**：子类构造函数里 `Parent.call(this)` 拿到父类属性；用 `Object.create(Parent.prototype)` 或中间函数 F 切断与父类实例的引用，再 `Child.prototype = new F()`，使子类 prototype 继承父类 prototype 且不会多执行一次父类构造函数。  
- **ES6 class 继承**：`class Child extends Parent`，内部等价于寄生组合继承；`super()` 必须在子类构造函数里先调一次，用于建父类实例并绑定 this；`super.xxx()` 可调父类方法。  
- **区别**：class 写法更清晰、继承关系内置、支持 static、super；ES5 需手写原型链和 constructor 修正。

---

**Q17-1-5：可选链（?.）和空值合并（??）是什么？和 &&、|| 的区别？**

**答：**  
- **可选链 `?.`**：访问深层属性时，若前面为 null/undefined 则短路返回 undefined，不报错。如 `obj?.a?.b`，obj 或 a 为空则整体为 undefined。  
- **空值合并 `??`**：左侧为 `null` 或 `undefined` 时才取右侧，否则取左侧。  
- **和 `||` 区别**：`||` 对 0、''、false 也会取右侧；`??` 只认 null/undefined。如 `0 ?? 1` 为 0，`0 || 1` 为 1。  
- **和 `&&`**：`&&` 可做短路，但写多层属性时要写多步判断；`?.` 专门用于安全访问属性/方法。

---

### TypeScript

**Q46-3：TypeScript 在项目里怎么用？有什么好处？**

**答：**  
- **用法**：给 props、state、接口返回值、工具函数等加类型；用接口/类型别名描述对象结构；泛型复用逻辑。  
- **好处**：编译期发现类型错误，减少运行时问题；IDE 提示和跳转更好；重构更安全；类型即文档。  
- **渐进式**：可从 JS 改为 .ts，先 any 再逐步收窄；Vue3 用 `<script setup lang="ts">` 和 defineProps<{}>() 等。  
团队约定：公共 API、跨模块数据尽量有类型，避免到处 any。

---

**Q46-4：TypeScript 里基础类型、接口、类型别名怎么用？区别？**

**答：**  
- **基础类型**：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`；数组用 `number[]` 或 `Array<number>`。  
- **接口 interface**：描述对象形状，可继承（extends）、可声明可选属性（?）、只读（readonly）；同名接口会合并。  
- **类型别名 type**：给类型起名，可描述对象、联合、交叉、字面量等；不能合并。  
- **区别**：interface 更适合声明对象结构、可扩展；type 可表达联合/交叉/元组等复杂类型。  
- **对象类型**：用 interface 或 `type Obj = { a: string; b?: number }`；函数类型可用 `(x: number) => string` 或 interface 里 `fn(): void`。

---

**Q46-5：TypeScript 泛型是什么？常用场景？**

**答：**  
- **泛型**：类型参数，写函数或类型时不写死类型，调用时再传入，保证入参与返回值类型关联。如 `function identity<T>(x: T): T { return x; }`。  
- **常用场景**：  
  - 封装请求：`request<T>(url: string): Promise<T>`，调用时指定返回数据类型。  
  - 组件 props：`Component<{ id: number }>`，保证 props 类型一致。  
  - 工具类型：`Partial<T>`、`Pick<T, K>`、`Record<K, V>` 等。  
  - 泛型约束：`<T extends { id: number }>` 限制 T 必须包含某属性。  
- **多个类型参数**：如 `function map<K, V>(...)`，按需声明。

---

**Q46-6：联合类型、交叉类型、类型守卫是什么？**

**答：**  
- **联合类型 `A | B`**：值可以是 A 或 B 之一；访问共有成员安全，访问独有成员前需收窄类型。  
- **交叉类型 `A & B`**：同时满足 A 和 B，多为对象属性合并；与联合相反，是“且”的关系。  
- **类型守卫**：在分支里收窄类型，让 TS 知道当前是哪种类型。方式有：  
  - `typeof x === 'string'`、`x instanceof Date`；  
  - 自定义函数：`function isFish(x): x is Fish { return x.swim !== undefined; }`（返回值写 `x is Type`）；  
  - 判空：`if (x != null)` 后 TS 会排除 null/undefined。  
- **可辨识联合**：用共有的字面量字段区分，如 `type Shape = { kind: 'circle'; r: number } | { kind: 'rect'; w: number }`，switch 里按 kind 收窄。

---

**Q46-7：TypeScript 和 JavaScript 的主要区别？为什么选 TS？**

**答：**  
- **主要区别**：TS 是 JS 的超集，增加静态类型、接口、泛型、枚举等；编译成 JS 后运行，类型在编译阶段检查、不改变运行时行为。  
- **为什么选 TS**：  
  - 编译期发现类型错误，减少运行时 bug。  
  - IDE 提示、跳转、重构更可靠。  
  - 类型即文档，协作和接手项目更容易。  
  - 大项目、多人协作时维护成本更低。  
- **注意**：需配置 tsconfig、处理类型声明（.d.ts）、学习类型语法；初期可 any 渐进式加类型，避免过度复杂。

---

**Q17-2：什么是跨域？常见解决方案？**

**答：**  
**跨域**：浏览器同源策略限制，协议、域名、端口任一不同即为不同源，不能直接访问对方接口或 DOM。  
**常见方案**：① **CORS**：服务端设置 `Access-Control-Allow-Origin` 等响应头，允许指定源请求；② **开发环境代理**：在 Webpack/Vite 里配置 devServer.proxy，把前端的 /api 转发到后端，同源请求无跨域；③ **JSONP**：通过 script 标签请求带 callback 的接口（仅 GET，已较少用）；④ **postMessage**：跨窗口通信。  
生产环境一般用 CORS 或 Nginx 反向代理统一域名。

---

**Q17-3：script 标签的 async 和 defer 有什么区别？**

**答：**  
- **无属性**：遇到 script 会立即下载并执行，阻塞 HTML 解析。  
- **defer**：异步下载，在 HTML 解析完成后、DOMContentLoaded 前按顺序执行，不阻塞解析。  
- **async**：异步下载，下载完立即执行，不保证顺序，可能阻塞解析。  
若脚本依赖 DOM 或其它脚本，用 defer；独立脚本（如统计）可用 async。

---

### 网络请求与通信

**Q17-4：AJAX 是什么？原理和基本封装思路？**

**答：**  
**AJAX**（Asynchronous JavaScript and XML）：在页面不刷新的情况下，通过 JavaScript 异步向服务器发请求并处理响应，实现局部更新。  
**原理**：浏览器通过 `XMLHttpRequest`（XHR）对象发起 HTTP 请求；设置 `onreadystatechange` 或 `onload` 监听状态变化，`readyState === 4` 且 `status === 200` 时读取 `responseText`/`responseJSON` 等，再更新 DOM 或业务逻辑。  
**封装思路**：统一封装一个函数，入参为 url、method、data、headers；内部 new XHR，根据 method 决定 send  body（POST 用 JSON.stringify），设置请求头（如 Content-Type）；用 Promise 包装，成功 resolve 结果、失败或非 2xx reject；可扩展请求/响应拦截、超时、取消（abort）等。

---

**Q17-5：Axios 的原理和特点？如何封装与拦截器？**

**答：**  
**原理**：Axios 基于 Promise，在浏览器端用 XMLHttpRequest、在 Node 端用 http 模块发请求；对外统一成 `axios(config)` 或 `axios.get/post`，返回 Promise。  
**特点**：支持请求/响应拦截器（interceptors）、取消请求（CancelToken/AbortController）、自动 JSON 转换、CSRF 防护、超时、进度等；同一份代码可跑在浏览器和 Node。  
**封装与拦截器**：  
- 创建实例 `axios.create({ baseURL, timeout })`，统一 baseURL 和超时。  
- **请求拦截器**：在发请求前加 token（headers.Authorization）、加公共参数、或对 data 做转换。  
- **响应拦截器**：统一处理业务码（如 code !== 0 时 reject）、未登录跳转、错误提示；再 return response.data 方便业务层直接用。  
- 导出该实例或封装 get/post 方法，项目里统一用这一套，便于维护和修改。

---

**Q17-6：fetch 和 XHR / Axios 的区别？**

**答：**  
- **fetch**：浏览器原生 API，基于 Promise，语法简洁；但只有网络错误才 reject，HTTP 4xx/5xx 仍 resolve，需在 then 里判断 `response.ok`；不支持超时、取消需配合 AbortController；不带 cookie 需设 `credentials: 'include'`。  
- **XHR**：老式 API，回调写法；可监听进度、支持 abort 取消；兼容性好。  
- **Axios**：对 XHR（或 Node http）的封装，Promise、拦截器、自动 JSON、取消、超时等开箱即用，适合项目里统一请求层。  
选型：小需求可用 fetch；项目里一般用 Axios 统一封装，便于加 token、错误处理和业务约定。

---

**Q17-6-2：常见 HTTP 状态码有哪些？分别表示什么？前端如何根据状态码处理？**

**答：**  

- **2xx 成功**  
  - **200 OK**：请求成功，返回正常 body。  
  - **201 Created**：创建成功（如 POST 创建资源），常带 Location 头指向新资源。  
  - **204 No Content**：成功但无返回体（如 DELETE、部分 PUT）。  

- **3xx 重定向**  
  - **301 Moved Permanently**：永久重定向，资源已永久迁移，浏览器会缓存，后续请求直接走新地址。  
  - **302 Found**：临时重定向，本次和后续请求仍可能先请求原地址。  
  - **304 Not Modified**：协商缓存命中，资源未变，直接用本地缓存，不返回 body。  

- **4xx 客户端错误**  
  - **400 Bad Request**：请求参数或格式错误，前端需校验入参、提示用户。  
  - **401 Unauthorized**：未认证（未登录或 token 失效），前端通常跳转登录或刷新 token。  
  - **403 Forbidden**：无权限访问该资源，与 401 区别是“已认证但权限不足”。  
  - **404 Not Found**：资源不存在，前端可展示“页面不存在”或引导回首页。  

- **5xx 服务端错误**  
  - **500 Internal Server Error**：服务器内部错误，前端可提示“服务异常，请稍后重试”并做重试或上报。  
  - **502 Bad Gateway**：网关/代理从上游拿不到合法响应，多为上游挂了或超时。  
  - **503 Service Unavailable**：服务暂时不可用（如过载、维护），可提示稍后重试。  
  - **504 Gateway Timeout**：网关等待上游超时。  

**前端处理**：在统一请求层（如 Axios 响应拦截器）里根据 `response.status` 或 `response.data.code` 做分支：2xx 正常返回数据；401 跳登录或刷新 token；403/404 提示或无权限页；5xx 提示错误、可选重试、并上报监控。

---

**Q17-7：WebSocket 是什么？和 HTTP 的区别？使用场景？**

**答：**  
**WebSocket**：在单个 TCP 连接上提供全双工通信的协议。建立时先发一次 HTTP 请求（Upgrade: websocket），服务器同意后协议升级为 WebSocket，之后双方可随时主动发数据，无需轮询。  
**和 HTTP 区别**：HTTP 是请求-响应、客户端主动；WebSocket 建立后服务器可主动推送，且头部更小、适合高频小数据。  
**使用场景**：实时聊天、实时行情/推送、协同编辑、游戏、消息通知等需要服务端主动推送或双向实时通信的场景。  
**前端用法**：`new WebSocket(url)`，监听 `onopen`、`onmessage`、onerror、onclose；`send()` 发数据；关闭用 `close()`。需处理断线重连、心跳保活。

---

**Q17-7-2：WebSocket 如何做断线重连和心跳保活？**

**答：**  

**断线重连**：  
- 在 `onclose` 或 `onerror` 里判断是否为异常断开（如非主动 close、网络异常），若是则启动重连。  
- 重连策略：延迟一段时间后再 `new WebSocket(url)` 重新连接，可设置最大重连次数或指数退避（如 1s、2s、4s…）避免频繁重试。  
- 重连成功后重新注册 `onopen`、`onmessage` 等，必要时重新订阅或同步状态（如重登、拉取离线消息）。  
- 注意：主动调用 `close()` 时不要触发重连，可用标志位区分“用户关闭”和“异常断开”。

**心跳保活**：  
- 目的：维持连接、及时发现“假连接”（网络已断但两端未感知），避免长时间无数据被中间设备（如 Nginx、负载均衡）超时断开。  
- 做法：客户端定时（如每 30s）向服务端发一条心跳消息（如 `{ type: 'ping' }` 或约定好的空包），服务端收到后回复 pong 或同款心跳。  
- 若在约定时间内没收到 pong，认为连接已死，主动 `close()` 再走断线重连逻辑。  
- 实现：用 `setInterval` 发心跳，收到 pong 或任何消息时重置“未响应计时”；若超时则 clearInterval、关闭当前 ws、触发重连。  
- 可选：服务端也可主动发心跳，客户端回复；双方约定心跳间隔和超时时间即可。

---

**Q17-8：如何封装统一的请求层（AJAX/Axios）？要考虑哪些点？**

**答：**  
- **统一实例**：baseURL、timeout、headers（如 Content-Type）集中配置。  
- **请求拦截**：自动加 token、设备/版本等公共参数、序列化 body。  
- **响应拦截**：统一解析 body、根据业务 code 判断成功/失败、未登录跳转、错误提示（如 message 或 Toast）；将接口异常转为 Promise reject，便于业务 try/catch 或 .catch。  
- **错误与重试**：网络错误、超时、5xx 可配置重试；区分业务错误与系统错误。  
- **取消与竞态**：相同请求防重复、路由切换时取消未完成请求（Axios CancelToken 或 AbortController）。  
- **类型与文档**：TS 项目可为接口定义类型、集中维护 API 路径与入参，便于协作和重构。

---

**Q17-9：大文件上传如何实现？有哪些注意点？**

**答：**  

- **分片上传（切片）**  
  - 用 `File.slice(start, end)` 把大文件切成多个块（如每块 2MB～5MB），逐个上传。  
  - 后端提供“上传分片”接口：入参为分片内容、当前块索引、总分片数、文件唯一标识（如 MD5 或 uploadId）；每片上传成功后后端记录，最后再调“合并分片”接口，按顺序拼成完整文件。  
  - 好处：单次请求体积小、可并行传多片、便于断点续传。  

- **前端实现要点**  
  - **生成唯一标识**：对文件做 hash（如 SparkMD5 计算 MD5，可只对首尾+抽样块算，减少耗时）或 `uploadId + 文件名 + 大小`，用于后端区分同一文件、做秒传与续传。  
  - **并发控制**：限制同时上传的分片数（如 3～6），避免浏览器请求过多；用队列或 Promise 池控制。  
  - **进度**：每个分片有 progress，汇总为总进度 = (已上传片数 / 总片数) × 100%，或按每片字节数加权；用 `XMLHttpRequest.upload.onprogress` 或 axios 的 `onUploadProgress`。  
  - **错误与重试**：某片失败可单独重传该片，不必重传整个文件。  

- **其他注意点**  
  - 后端需支持：分片接收、临时存储、合并逻辑、过期清理；大文件要限制单文件/单用户总大小和分片数。  
  - 前端可做：选择文件后先计算 hash 再上传（或先传一片拿 uploadId 再传其余）；上传前可调“秒传”接口，若服务端已有相同 hash 则直接返回成功，不再传内容。

---

**Q17-10：断点续传（断开续传）如何实现？思路是什么？**

**答：**  

- **含义**  
  - 上传过程中网络断开或用户关闭页面，再次上传同一文件时能从“已上传到的位置”继续传，而不是从头开始。  

- **实现思路**  
  - **分片 + 记录已传片段**：大文件按 Q17-9 做分片上传；后端对每个 uploadId（或 fileId）记录“已成功接收的分片索引列表”。  
  - **续传时**：前端再次选择同一文件后，先调“查询已上传分片”接口，传入文件标识（如 hash 或 uploadId），后端返回 `[0,1,3]` 表示第 0、1、3 片已存在；前端只上传未上传的片（如 2、4、5…），全部完成后再调“合并分片”。  
  - **文件标识**：用文件内容 hash（如 MD5）做标识，同一文件多次上传可复用；或首次上传时后端返回 uploadId，后续都用该 uploadId 查询/上传。  

- **前端要点**  
  - **持久化已传进度**：刷新页面后要能恢复“这是哪个文件、已传了哪些片”，可把 uploadId 与已传片列表存 sessionStorage/localStorage，或每次由服务端返回已传列表。  
  - **一致性**：续传时文件名、大小、hash 需与首次一致，否则后端会认为是新文件；若用户选了“不同路径的同一文件”，可用 hash 判断是否同一文件。  
  - **清理**：后端对长时间未完成上传的 uploadId 做过期删除，避免占存储；前端可提示“续传已过期，请重新上传”。  

- **小结**  
  - 断点续传 = 分片上传 + 服务端记录已传分片 + 续传时只传未传片 + 前端可持久化进度；与“大文件上传”共用同一套分片与合并接口，只是多一步“查询已传分片”和“只传缺失片”的逻辑。

---

### 浏览器渲染与性能

**Q18：从输入 URL 到页面展示的流程？**

**答：**  
① DNS 解析得到 IP；② 建立 TCP 连接（三次握手）；③ 发起 HTTP 请求；④ 服务器响应返回 HTML；⑤ 解析 HTML 构建 DOM 树；⑥ 解析 CSS 构建 CSSOM；⑦ 合并成渲染树（Render Tree）；⑧ 布局（Layout/Reflow）计算几何信息；⑨ 绘制（Paint）像素；⑩ 合成（Composite）显示到屏幕。期间遇到 script 会阻塞解析（除非 async/defer）；遇到图片等资源会异步加载。

---

**Q18-2：TCP 三次握手发生的流程？**

**答：**  
TCP 三次握手用于在客户端和服务器之间建立可靠连接，流程如下：

1. **第一次握手（客户端 → 服务器）**  
   客户端发送 **SYN** 包（SYN=1，随机生成 seq=x），表示请求建立连接，进入 SYN_SENT 状态。

2. **第二次握手（服务器 → 客户端）**  
   服务器收到 SYN 后，回复 **SYN + ACK**（SYN=1，ACK=1，ack=x+1，seq=y），表示同意建立连接并确认收到客户端的 SYN，进入 SYN_RCVD 状态。

3. **第三次握手（客户端 → 服务器）**  
   客户端收到 SYN+ACK 后，再发 **ACK**（ACK=1，ack=y+1），表示确认收到服务器的 SYN。服务器收到后进入 ESTABLISHED 状态，客户端也进入 ESTABLISHED，连接建立完成，可以开始传输数据。

**为什么是三次？**  
- 至少需要三次才能让双方都确认“自己能发、能收”：第一次客户端证明能发，第二次服务器证明能收能发，第三次客户端证明能收。  
- 防止已失效的连接请求突然又传到服务器（若只用两次，旧 SYN 重传会导致服务器误开连接）；第三次的 ACK 能区分这次连接是客户端当前主动发起的。

---

**Q19：什么是 Reflow、Repaint？哪些操作会触发？如何减少？**

**答：**  
- **Reflow（重排）**：布局变化，需重新计算元素几何属性（尺寸、位置）。  
- **Repaint（重绘）**：外观变化但布局不变，只重新绘制（如颜色、背景、阴影）。  
**触发重排**：改 width/height、margin、padding、display、位置（top/left）、字体、增删 DOM、读 offsetTop/scrollTop 等布局相关属性会强制同步重排。  
**减少方式**：集中改样式或类名、用 `transform`/`opacity` 做动画、避免逐项读布局属性（可先读后写）、虚拟列表减少 DOM 等。

---

**Q20：首屏优化、减少白屏的思路？**

**答：**  
- 关键资源优先：关键 CSS 内联或优先加载，非关键 JS 异步/延迟。  
- 减少阻塞：script 用 defer/async，或放 body 底。  
- 资源优化：压缩 HTML/CSS/JS、图片压缩与合适格式（WebP）、CDN、Gzip/Brotli。  
- 骨架屏/SSR：先出结构或服务端直出首屏 HTML，减少白屏时间。  
- 懒加载：首屏外图片、路由组件懒加载。  
- 缓存：强缓存、协商缓存、合理 hash 策略。

---

**Q20-2：强缓存和协商缓存的区别？如何设置？流程是怎样的？**

**答：**  
- **强缓存**：浏览器不向服务器发请求，直接用本地副本。通过响应头 `Expires`（绝对时间）或 `Cache-Control`（如 `max-age=3600`、`no-cache`、`no-store`）控制。命中强缓存时状态码为 200，Size 显示 from disk cache / from memory cache。  
- **协商缓存**：浏览器带缓存标识请求服务器，由服务器判断是否用缓存。请求头用 `If-None-Match`（对应响应头 `ETag`）或 `If-Modified-Since`（对应 `Last-Modified`）。若资源未变，服务器返回 304，浏览器用本地缓存；若变了则返回 200 和新内容。  
- **流程**：先看是否命中强缓存（未过期则直接用）；若未命中或强缓存过期，再发请求走协商缓存（带 ETag/Last-Modified），服务器比较后返回 304 或 200。  
- **使用建议**：不常变的静态资源（如带 hash 的 JS/CSS）用强缓存 `max-age` 设大；HTML 或入口文件常用 `no-cache` 或短 `max-age`，配合协商缓存保证能及时更新。

---

**Q21：防抖与节流的区别与典型场景？**

**答：**  
- **防抖（debounce）**：连续触发只执行最后一次，如输入框搜索、窗口 resize。  
- **节流（throttle）**：在指定时间内只执行一次，如滚动加载、按钮防重复点击。  
实现思路：防抖用 setTimeout 延迟执行并清空上次定时器；节流用时间戳或定时器限制执行频率。

---

### 兼容性

**Q22：你遇到过哪些兼容性问题？如何解决？**

**答：**  
- **CSS**：不同浏览器前缀（-webkit-、-moz- 等），用 Autoprefixer；Flex/Grid 在旧版 IE 不支持，需降级或 polyfill。  
- **JS**：ES6+ 在旧浏览器不支持，用 Babel 转译；Promise、fetch 用 core-js 等 polyfill。  
- **API**：先特性检测再使用（如 `if ('fetch' in window)`），或提供降级方案。  
- **事件**：如 IE 用 attachEvent、事件对象不同，可用封装或 polyfill。  
- **移动端**：1px、安全区域、点击延迟等，用 viewport、媒体查询、touch 事件或方案库解决。

---

**Q22-2：XSS 和 CSRF 是什么？如何防范？**

**答：**  
- **XSS（跨站脚本）**：攻击者把恶意脚本注入页面，在用户浏览器执行。防范：对用户输入做转义（如把 `<` 转成 `&lt;`）、用 CSP 限制脚本来源、重要 cookie 设 HttpOnly、避免 `innerHTML` 直接插不可信内容。  
- **CSRF（跨站请求伪造）**：诱导用户在已登录的站点发起非本意的请求。防范：用 token（如 Cookie 里存或表单隐藏域）、SameSite Cookie、校验 Referer/Origin、关键操作二次验证。  
前端要特别注意：不信任用户输入、不随意插 HTML、接口配合服务端做校验。

---

### 网络安全

**Q22-3：HTTPS 是什么？和 HTTP 的区别？SSL/TLS 握手简要？**

**答：**  
**HTTPS**：在 HTTP 之下加入 SSL/TLS 层，对传输内容加密、并对服务端身份做校验，防止窃听和篡改。  
**和 HTTP 区别**：HTTP 明文传输，端口 80；HTTPS 加密传输，端口 443，需要证书。  
**SSL/TLS 握手简要**：① 客户端发 Client Hello（支持的协议版本、加密套件等）；② 服务端回 Server Hello（选定版本和套件）、证书（公钥）；③ 客户端校验证书、生成随机数用证书公钥加密发给服务端；④ 服务端用私钥解密得到随机数；⑤ 双方用约定算法和随机数生成会话密钥，后续通信用该密钥对称加密。  
前端角度：生产环境接口应走 HTTPS；混合内容（页面 HTTPS 但请求 HTTP）会被浏览器拦截。

---

**Q22-4：常见安全相关的 HTTP 响应头有哪些？作用是什么？**

**答：**  
- **Content-Security-Policy（CSP）**：限制页面可加载的脚本、样式、图片等来源，减少 XSS、减少被注入恶意资源。如 `script-src 'self'` 只允许同源脚本。  
- **X-Frame-Options**：禁止被 iframe 嵌套，防点击劫持。如 `DENY` 或 `SAMEORIGIN`。  
- **Strict-Transport-Security（HSTS）**：告诉浏览器一段时间内只通过 HTTPS 访问该域名，防止被降级为 HTTP。  
- **X-Content-Type-Options: nosniff**：禁止浏览器对响应做 MIME 类型嗅探，按 Content-Type 解析，减少类型混淆导致的问题。  
- **Set-Cookie**：设 `HttpOnly` 防 JS 读 cookie（减 XSS 窃取）、`Secure` 仅 HTTPS 传输、`SameSite=Strict/Lax` 防 CSRF。  
这些头一般由服务端/网关统一配置，前端需知道含义以便排查和提需求。

---

**Q22-5：点击劫持是什么？如何防范？**

**答：**  
**点击劫持**：攻击者把目标网站用透明 iframe 嵌在自己页面上，诱使用户点击“按钮”时，实际点的是 iframe 里的操作（如关注、转账），用户不知情。  
**防范**：① 服务端设置 **X-Frame-Options: DENY 或 SAMEORIGIN**，禁止被任意站或非同源站嵌套；② 使用 **CSP** 的 `frame-ancestors` 限制谁可以嵌套；③ 前端可做辅助检测：用 `window.self === window.top` 判断是否被嵌在 iframe 里，若不等可提示或跳转，但主要依赖服务端响应头。

---

**Q22-6：前端如何保护敏感信息？Token 存哪里？**

**答：**  
- **不把密钥、密码写在前端代码里**：前端代码可被查看，敏感配置应放服务端或通过后端下发、环境变量（构建时注入，仍不算真正秘密）。  
- **Token 存储**：  
  - 存 **内存**（如 Vuex/Pinia、变量）：刷新丢失，但不易被 XSS 直接读走。  
  - 存 **localStorage/sessionStorage**：持久或会话级，但 XSS 可读，风险高。  
  - 存 **Cookie**：若设 **HttpOnly**，JS 读不到，可防 XSS 窃取；再配合 **Secure**、**SameSite** 防 CSRF 和中间人。  
- **实践**：重要 token 建议由服务端通过 Set-Cookie 下发并设 HttpOnly；若必须前端存 token（如某些移动端方案），要严格防 XSS、缩短过期时间、敏感操作二次验证。

---

**Q22-7：除了 XSS、CSRF，前端还需要注意哪些安全问题？**

**答：**  
- **点击劫持**：用 X-Frame-Options、CSP frame-ancestors 禁止被恶意嵌套。  
- **混合内容**：HTTPS 页面不要请求 HTTP 资源，避免被篡改或窃听。  
- **敏感信息泄露**：不在前端写密钥、不把敏感数据打到 URL、日志或前端报错里；生产环境关闭详细错误栈。  
- **依赖安全**：第三方库可能有漏洞，定期 `npm audit`、升级依赖。  
- **接口与权限**：敏感操作必须服务端校验权限，前端仅做交互；不信任前端传的“是否管理员”等状态。  
- **输入校验**：前端校验体验，服务端必须再次校验，防止绕过前端直接调接口。

---

## 二、Vue3 与 Vue2 迁移

### Vue3 核心

**Q23：Composition API 与 Options API 的区别？**

**答：**  
- **Options API**：按选项组织（data、methods、computed、watch 等），逻辑分散在各个选项里。  
- **Composition API**：按逻辑组织，在 `setup` 里用 `ref`、`reactive`、`computed`、`watch` 等组合在一起，同一功能的代码更集中，便于抽成 composable 复用。  
Vue3 两种都支持，Composition API 更适合复杂组件和逻辑复用。

---

**Q24：ref、reactive、computed、watch/watchEffect 的用法与区别？**

**答：**  
- **ref**：包装基本类型（或任意值），通过 `.value` 访问/修改；模板中自动解包。  
- **reactive**：只能包装对象，直接访问/修改属性；不能整体替换否则失去响应式。  
- **computed**：依赖响应式数据，有缓存，依赖不变不重算；适合派生状态。  
- **watch**：显式指定监听源和回调，可拿到新旧值；可配置 deep、immediate。  
- **watchEffect**：自动收集依赖，依赖变化就执行；不需要显式列监听源，适合“依赖哪些就监听哪些”的副作用。

---

**Q25：Vue3 为什么用 Proxy 替代 defineProperty？Proxy 的优势？**

**答：**  
- **defineProperty**：只能监听已有属性，无法监听数组下标和 length、无法监听属性新增/删除，需递归遍历对象。  
- **Proxy**：可监听整个对象，包括增删属性、数组下标变化；按需代理，不用一开始递归；支持更多拦截（如 has、ownKeys）。  
Vue3 用 Proxy 实现响应式，解决了 Vue2 中数组变异、动态添加属性需 Vue.set 等问题。

---

**Q26：Vue3 生命周期与 Vue2 的对应关系？**

**答：**  
- `beforeCreate` → 使用 `setup()` 替代（setup 本身在 beforeCreate 之前执行）。  
- `created` → 使用 `setup()` 替代。  
- `beforeMount` → `onBeforeMount`  
- `mounted` → `onMounted`  
- `beforeUpdate` → `onBeforeUpdate`  
- `updated` → `onUpdated`  
- `beforeUnmount` → `onBeforeUnmount`（Vue2 是 beforeDestroy）  
- `unmounted` → `onUnmounted`（Vue2 是 destroyed）  
Composition API 中用 onXxx 注册；Options API 里仍可用旧名，但建议用 onUnmount 等新名。

---

**Q27：Teleport、Suspense 的作用与典型场景？**

**答：**  
- **Teleport**：把组件渲染到 DOM 的其它节点（如 body），常用于弹窗、Toast、Modal，避免被父级 overflow/z-index 裁剪。  
- **Suspense**：包裹异步组件或 async setup，在加载中显示 fallback 插槽内容，加载完成再显示默认插槽，用于异步依赖、路由懒加载等。

---

**Q27-2：v-if 和 v-show 的区别？使用场景？**

**答：**  
- **v-if**：条件为假时节点不会渲染到 DOM，切换会销毁/重建，有切换开销；适合不常切换或初始为假较多的场景。  
- **v-show**：始终渲染，用 `display: none` 控制显示，切换只改样式，初始有渲染开销；适合频繁切换的场景。  
简单记：不常切换用 v-if，频繁切换用 v-show。

---

**Q27-3：Vue 里 key 的作用？为什么列表推荐用唯一 key？**

**答：**  
key 给虚拟 DOM 的节点做唯一标识，供 diff 算法复用或移动节点而不是盲目复用。  
列表用唯一 key（如 id）：能正确对应“数据项 ↔ 节点”，避免状态错乱（如输入框、勾选）；用 index 作 key 在增删、排序时会导致复用错位。  
不写 key 时 Vue 会退化为按索引复用，可能带来性能和显示问题。

---

**Q27-4：nextTick 是什么？使用场景？**

**答：**  
`nextTick` 把回调推迟到下一次 DOM 更新循环之后执行。Vue 的响应式更新是异步的，数据改完后 DOM 不会立刻更新，在同一个“tick”里多次改数据会合并成一次更新；若要在 DOM 更新后马上操作（如取新高度、焦点），就要放在 `nextTick` 里。  
使用：`await nextTick()` 或 `nextTick(callback)`，常用于更新后滚动、聚焦、测量 DOM。

---

**Q27-5：provide / inject 是什么？适用场景？**

**答：**  
父（或祖先）通过 `provide` 提供数据或方法，后代组件用 `inject` 注入使用，无需层层 props 传递。  
适用：主题、 locale、全局配置、跨多层组件共享等。注意不要滥用，否则数据来源不清晰；需要响应式时 provide 里给 ref/reactive。

---

**V3-1：`<script setup>` 和普通 `setup()` 有什么区别？为什么推荐用 script setup？**

**答：**  
- **普通 setup**：在 `setup(props, { emit, attrs, slots })` 里 return 的对象会暴露给模板和 ref；需手动 return 每个要用的变量和方法。  
- **`<script setup>`**：顶层绑定（变量、函数、import）自动暴露给模板，无需 return；`defineProps`、`defineEmits` 在编译期处理，可直接在模板用；更简洁、类型推导更好、性能略优（少一层 proxy）。  
- **推荐**：新组件优先用 `<script setup>`，逻辑多时配合 composable 抽离；需要 Options（如 inheritAttrs）时可与普通 `<script>` 并存。

---

**V3-2：ref 和 reactive 在用法上有什么坑？什么时候用 toRefs？**

**答：**  
- **ref**：基本类型或需要整体替换的用 ref；在 JS 里要写 `.value`，模板中自动解包；注意解包只发生在顶层，嵌套在对象里不会自动解包。  
- **reactive**：只能包对象；**不能整体赋值**（如 `state = {}` 会断掉响应式），只能改属性；直接解构会失去响应式，需用 **toRefs** 转成多个 ref 再解构。  
- **toRefs**：`const { a, b } = toRefs(state)`，解构出来的 a、b 仍是 ref，模板和响应式链保持；适合在 composable 里返回 reactive 对象的“解构版”，让使用者解构不丢响应式。

---

**V3-3：computed 的 get/set 怎么写？和 method 的区别？**

**答：**  
- **只读**：`computed(() => xxx)` 或 `computed(() => { return ... })`，依赖不变会走缓存。  
- **可写**：`computed({ get() { return ... }, set(v) { ... } })`，常用于 v-model 绑定到派生数据（如本地编辑后再同步到 store）。  
- **和 method**：computed 有缓存、依赖不变不重算；method 每次调用都执行。模板里显示派生状态用 computed，事件处理用 method。

---

**V3-4：watch 和 watchEffect 的 flush、immediate、deep 怎么用？**

**答：**  
- **watch**：`watch(source, callback, { immediate, deep, flush })`。immediate 为 true 时立即执行一次；deep 为 true 时递归监听对象内部；**flush**：`'pre'`（默认，在组件更新前）、`'post'`（更新后，等价于 nextTick 后）、`'sync'`（同步，少用）。  
- **watchEffect**：自动收集依赖，无 immediate 概念（会先跑一次）；同样支持 flush；可用 `onTrigger` 调试依赖。  
- **场景**：需要“第一次就执行”用 immediate 或 watchEffect；需要“等 DOM 更新完再执行”用 `flush: 'post'`；监听整个对象内部变化用 deep（注意性能）。

---

**V3-5：shallowRef、triggerRef、readonly、markRaw 分别干什么？**

**答：**  
- **shallowRef**：只对 `.value` 的替换做响应，不深度追踪 value 内部的属性；适合大对象、第三方实例（如 chart、graph）只整体替换时用，减少性能开销。  
- **triggerRef**：强制触发依赖 shallowRef 的 effect，在手动改了 shallowRef.value 内部属性后调用，让视图更新。  
- **readonly**：包一层只读代理，修改会报错；用于向子组件或 composable 暴露“不许改”的数据。  
- **markRaw**：标记对象永不转为响应式，用于挂到 reactive 上的第三方实例、大配置对象，避免被 Proxy 包装。

---

**V3-6：Vue3 里 v-model 的用法？多个 v-model、自定义 v-model 名？**

**答：**  
- **Vue3 默认**：`v-model` 等价于 `:modelValue` + `@update:modelValue`；子组件里 `defineProps(['modelValue'])`、`emit('update:modelValue', newVal)`。  
- **多个 v-model**：`v-model:title`、`v-model:visible`，对应 props 为 title、visible，emit 为 `update:title`、`update:visible`。  
- **自定义修饰符**：通过 `modelModifiers`（或 `titleModifiers`）在子组件里判断，如 `v-model.trim` 时在 emit 前做 trim。

---

**V3-7：插槽有哪些类型？作用域插槽怎么用？**

**答：**  
- **默认插槽**：`<slot />`，父组件把内容放在子组件标签之间。  
- **具名插槽**：`<slot name="header" />`，父组件用 `#header` 或 `v-slot:header` 传入。  
- **作用域插槽**：子组件在 `<slot :row="row" />` 上绑数据，父组件用 `#default="{ row }"` 或 `v-slot="{ row }"` 使用，用于表格行、列表项等“数据由子组件提供、结构由父决定”的场景。  
- **Vue3**：`v-slot` 可简写为 `#`；插槽可合并写 `#header="{ ... }"`。

---

**V3-8：defineProps、defineEmits、defineExpose 在 script setup 里怎么用？**

**答：**  
- **defineProps**：`const props = defineProps<{ id: number; name?: string }>()` 或对象写法带 default/validator；仅声明的 props 会从 attrs 里排除；TS 下用泛型更清晰。  
- **defineEmits**：`const emit = defineEmits<{ (e: 'submit', id: number): void }>()` 或数组 `['submit']`；用于类型约束和模板里的 emit。  
- **defineExpose**：显式暴露给父组件 ref 拿到的内容，如 `defineExpose({ focus, getData })`，否则 ref 只能拿到组件实例上 expose 出来的部分；父组件 `ref.value.focus()` 等。

---

**V3-9：什么是组合式函数（composable）？写的时候要注意什么？**

**答：**  
- **定义**：把“可复用的 Composition API 逻辑”抽成函数，函数里用 ref、reactive、onMounted 等，返回状态和方法供多个组件使用。  
- **命名**：通常以 `use` 开头，如 `useMouse`、`useFetch`。  
- **注意**：① 在 composable 里用 `onMounted` 等生命周期，会按调用它的组件的生命周期执行；② 返回 reactive 时若希望调用方解构不丢响应式，用 toRefs 包一层再返回；③ 避免在 composable 里直接改传入的 props，用 emit 或回调通知父组件；④ 有订阅、定时器、事件时在 onUnmounted 里清理，避免泄漏。

---

**V3-10：Vue3 里如何注册和使用自定义指令？**

**答：**  
- **注册**：全局 `app.directive('focus', { mounted(el) { el.focus() } })`；局部在组件里 `directives: { focus: { ... } }`。  
- **钩子**：`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeUnmount`、`unmounted`；常用 mounted 做 DOM 操作。  
- **参数**：`v-focus`、`v-focus="{ color: 'red' }"` 时，钩子收到 `(el, binding)`，binding 含 value、arg、modifiers。  
- **典型**：v-loading、v-permission、v-focus、v-debounce 等；Vue3 中指令的 binding 里组件实例通过 `binding.instance` 获取。

---

### Vue Router 4（Vue3 全家桶）

**V3-R1：Vue Router 4 如何创建和挂载？createWebHistory 和 createWebHashHistory 区别？**

**答：**  
- **创建**：`import { createRouter, createWebHistory } from 'vue-router'`；`const router = createRouter({ history: createWebHistory(), routes })`；再 `app.use(router)`。  
- **createWebHistory**：基于 History API，URL 无 #，需服务端 fallback 到 index.html。  
- **createWebHashHistory**：基于 hash，URL 带 #，无需服务端配置。  
- **createMemoryHistory**：用于 SSR 或非浏览器环境，不依赖 history API。

---

**V3-R2：在 Composition API 里如何做路由跳转和取参数？**

**答：**  
- **跳转**：`import { useRouter } from 'vue-router'`；`const router = useRouter()`；`router.push('/path')`、`router.push({ name: 'User', params: { id } })`、`router.replace(...)`。  
- **当前路由**：`const route = useRoute()`；`route.params`、`route.query`、`route.path`、`route.name`、`route.meta`。  
- **注意**：route 是响应式的，路由变化时自动更新；在 setup 里直接 useRoute/useRouter 即可，无需传参。

---

**V3-R3：动态路由、路由 params 与 query 的区别？刷新后 params 丢失怎么办？**

**答：**  
- **动态路由**： path 写成 `/user/:id`，匹配后 `route.params.id` 可取到。  
- **params**：路径的一部分，适合“资源 id”；**name 跳转**时用 `router.push({ name: 'User', params: { id: 1 } })`；**path 跳转**时 params 不生效，需把 id 拼进 path。  
- **query**：?key=value，用 `route.query` 取；适合筛选、分页等，刷新不丢。  
- **params 刷新丢失**：history 模式下刷新会向服务器要当前 path，若后端不认会 404；若认且返回 SPA 入口，params 会由路由解析恢复。若用 query 替代 params 存 id，则刷新一定不丢。

---

**V3-R4：路由元信息（meta）、beforeEach 鉴权、动态添加路由怎么配合？**

**答：**  
- **meta**：在路由配置里写 `meta: { requiresAuth: true, title: '首页' }`，在 `beforeEach` 里通过 `to.meta` 判断是否需要登录、权限等。  
- **鉴权**：`router.beforeEach((to, from, next) => { if (to.meta.requiresAuth && !isLoggedIn()) next('/login'); else next() })`；可配合 Pinia 存 token/用户信息。  
- **动态路由**：后端返回菜单/权限对应路由表，前端用 `router.addRoute(route)` 或 `router.addRoute(parentName, route)` 追加；通常在登录后根据权限拉路由再 addRoute，然后 next({ ...to, replace: true }) 重进一次以匹配新路由。

---

**V3-R5：Vue Router 的 scrollBehavior 怎么配置？**

**答：**  
在 createRouter 里配置 `scrollBehavior(to, from, savedPosition)`：  
- 返回 `{ top: 0 }` 每次跳转滚到顶部；  
- 返回 `savedPosition` 可在浏览器前进/后退时恢复滚动；  
- 可配合 `to.hash` 做锚点滚动 `{ el: to.hash, behavior: 'smooth' }`。

---

### Pinia（Vue3 全家桶）

**V3-P1：Pinia 的 defineStore 有哪两种写法？分别适合什么场景？**

**答：**  
- **Options 风格**：`defineStore('id', { state: () => ({}), getters: {}, actions: {} })`，类似 Vuex，适合从 Vuex 迁移或习惯选项式的人。  
- **Setup 风格**：`defineStore('id', () => { const count = ref(0); const double = computed(() => count.value * 2); function increment() { count.value++; } return { count, double, increment } })`，完全用 ref/computed/function，更贴近 Composition API，适合新项目。  
- **同一应用里两种可混用**；id 必填，用于 devtools 和插件。

---

**V3-P2：Pinia 里 getters 如何用？能否传参？**

**答：**  
- **用法**：在 defineStore 的 getters 里写函数，接收 state（和别的 getters），返回派生值；用的时候 `store.double` 像属性一样访问，有缓存。  
- **传参**：getter 不能直接传参，需要“带参派生”时返回一个函数，如 `getter: (state) => (id) => state.list.find(i => i.id === id)`，使用时 `store.getter(id)`。

---

**V3-P3：Pinia 的 $patch、$reset、$subscribe 有什么用？**

**答：**  
- **$patch**：批量改 state，`store.$patch({ a: 1, b: 2 })` 或 `store.$patch((state) => { state.items.push(...) })`，一次更新、一次订阅触发。  
- **$reset**：把 state 恢复为 defineStore 里 state 的初始值，仅 Options 风格 store 支持。  
- **$subscribe**：监听 state 变化，`store.$subscribe((mutation, state) => { ... })`，用于持久化到 localStorage 或上报；组件卸载后需手动取消订阅（返回的函数调用即取消）。

---

**V3-P4：Pinia 如何做持久化？pinia-plugin-persistedstate 怎么配？**

**答：**  
- **插件**：`pinia-plugin-persistedstate` 可在 persist 为 true 时把该 store 的 state 持久化到 localStorage（或配置 storage、path）。  
- **配置**：`createPinia().use(piniaPluginPersistedstate)`；在 defineStore 里加 `persist: true` 或 `persist: { key: 'user', storage: sessionStorage, paths: ['token'] }`，paths 指定只持久化部分 state。  
- **注意**：敏感信息考虑加密或只存 token；多 tab 可配合 storage 事件做同步。

---

**V3-P5：在 Pinia 的 action 里调接口、互相调其他 store 怎么写？**

**答：**  
- **调接口**：在 action 里 async/await 请求，拿到数据后直接改 `this.xxx`（Options）或对应的 ref（Setup）；可配合 try/catch 统一报错。  
- **调其他 store**：在 action 里 `const otherStore = useOtherStore()` 再调 `otherStore.someAction()`；避免在 getter 里调别的 store 的 action 形成循环，getter 应保持纯函数。  
- **拿 router**：在 action 里 `const router = useRouter()` 再 `router.push(...)`，需在 `app.use(router)` 之后调用，否则需在 setup 里传 router 进去。

---

### Vue3 工程与生态补充

**V3-E1：Vite + Vue3 项目里，环境变量、别名、全局组件怎么配置？**

**答：**  
- **环境变量**：根目录 `.env`、`.env.development`、`.env.production`，变量需以 `VITE_` 开头才能在客户端用；使用 `import.meta.env.VITE_XXX`；类型在 `env.d.ts` 里声明。  
- **别名**：vite.config 里 `resolve.alias: { '@': path.resolve(__dirname, 'src') }`，TS 在 tsconfig 的 paths 里配 `"@/*": ["src/*"]`。  
- **全局组件**：用插件在 `main.ts` 里 `app.component('MyComponent', MyComponent)`，或用 `unplugin-vue-components` 按目录自动注册、按需解析，无需手写 import。

---

**V3-E2：Element Plus / Ant Design Vue 在 Vue3 里按需引入有几种方式？**

**答：**  
- **全量引入**：`app.use(ElementPlus)`，包体积大。  
- **按需引入**：手动 `import { ElButton } from 'element-plus'` 并 `app.component(ElButton.name, ElButton)` 或全局注册一次；或使用 **unplugin-vue-components** + **unplugin-auto-import**，配置 resolvers 为 ElementPlus 的 resolver，模板里直接用 `<el-button>` 即可，构建时自动按需打包并生成自动导入。  
- **样式**：按需引入时样式也要按需，如 `import 'element-plus/es/components/button/style/css'`，或用插件自动处理。

---

**V3-E3：VueUse 你用过哪些？举 3 个 composable 并说用途。**

**答：**  
- **useLocalStorage**：把 ref 和 localStorage 同步，刷新不丢；可替代手写 watch + localStorage。  
- **useMouse**：实时追踪鼠标位置，做拖拽、悬浮提示等。  
- **useFetch** / **useAsyncState**：封装请求 + loading/error 状态，在组件里一行拿到 data、loading、error、refresh。  
其他常用：useDark、useToggle、useClipboard、useElementSize、onClickOutside 等，按需选用。

---

**V3-E4：模板 ref 和组件 ref 怎么用？子组件如何用 defineExpose 暴露方法？**

**答：**  
- **模板 ref**：在模板里给 DOM 或组件加 `ref="domRef"`，在 script 里声明同名 `const domRef = ref(null)`，挂载后 `domRef.value` 即为该 DOM 或组件实例。  
- **组件 ref**：拿到的是组件实例；在 `<script setup>` 中默认不暴露内部，需用 **defineExpose** 显式暴露：`defineExpose({ focus, getData })`，父组件才能通过 `childRef.value.focus()` 调用。  
- **函数 ref**（少用）：`ref="(el) => { xxx = el }"` 在每次更新时被调用，可用来存 DOM 或组件引用。

---

**V3-E5：Vue3 里异步组件怎么用？defineAsyncComponent 和 Suspense 怎么配合？**

**答：**  
- **defineAsyncComponent**：`const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'))`，可传对象 `{ loader, loadingComponent, errorComponent, delay, timeout }`，用于路由懒加载或按需弹窗。  
- **Suspense**：用 `<Suspense>` 包住异步组件（或 async setup 的组件），`#default` 放异步内容，`#fallback` 放 loading；等异步 resolve 后显示 default，否则显示 fallback。  
- **配合**：路由的 `component: () => import('@/views/xxx.vue')` 本身就是异步组件；若该组件内部有 async setup 或异步依赖，外层再包一层 Suspense 可统一显示 loading。

---

**V3-E6：Vue3 + TypeScript 在 SFC 里 defineProps、defineEmits 如何写类型？**

**答：**  
- **defineProps**：`const props = defineProps<{ id: number; name?: string; list: Array<{ id: number }> }>()`；需要 default 时用 `withDefaults(defineProps<{ id: number }>(), { id: 0 })`。  
- **defineEmits**：`const emit = defineEmits<{ (e: 'update', value: number): void; (e: 'close'): void }>()` 或 `defineEmits<{ update: [value: number]; close: [] }>()`（3.3+ 语法）。  
- **类型文件**：复杂类型可抽到 `types.ts` 里用 interface，再在泛型里引用；这样模板里的 props/emit 都有类型推导。

---

### Vue2 核心

**V2-1：Vue2 的响应式原理是什么？defineProperty 有什么局限？**

**答：**  
- **原理**：Vue2 用 **Object.defineProperty** 劫持 data 里每个属性的 get/set。get 时**收集依赖**（当前 Watcher 加入 Dep）；set 时**通知依赖更新**（Dep 通知所有 Watcher，Watcher 触发组件重新渲染或 computed/watch 回调）。  
- **局限**：① 只能劫持**已有属性**，后增属性不会响应，需用 **Vue.set**；② **数组**无法通过下标监听，Vue2 通过重写数组的 push、pop、shift、unshift、splice、sort、reverse 七个方法，在方法里触发更新；③ 需**递归遍历**对象做劫持，初始化成本高；④ 无法监听 **length** 和根据下标直接改 `arr[i] = x`。

---

**V2-2：Vue.set / this.$set 是干什么的？什么场景下必须用？**

**答：**  
- **作用**：给**响应式对象**新增属性并触发视图更新；或修改**数组某一项**并触发更新。因为 defineProperty 无法检测“新增属性”和“数组下标赋值”，直接 `obj.newKey = 1` 或 `arr[i] = x` 不会触发更新。  
- **用法**：`Vue.set(obj, 'key', value)` 或 `this.$set(this.obj, 'key', value)`；数组：`this.$set(this.arr, index, value)`。  
- **场景**：后端返回的数据要追加到 data 里的对象上时；列表里某一项需要替换时。Vue3 用 Proxy 后不再需要 $set。

---

**V2-3：Vue2 的 data 为什么必须是函数？**

**答：**  
- **组件**：每个组件实例需要**各自独立的 data**。若 data 是对象，多个实例会**共享同一引用**，改一个实例的 data 会影响到其他实例。  
- **写成函数**：每次创建组件实例时执行 `data()`，返回一个**新对象**，保证每个实例的 data 互不影响。  
- **根实例**：`new Vue({ data: { ... } })` 可以是对象，因为根实例只有一个，不会复用。

---

**V2-4：Vue2 生命周期有哪些？created 和 mounted 区别？**

**答：**  
- **阶段**：beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeDestroy → destroyed。  
- **created**：实例已创建，**data、computed、methods 已就绪**，**DOM 未挂载**；可在这里发请求、初始化数据，不能操作 DOM。  
- **mounted**：**DOM 已挂载**，可访问 `this.$el`、子组件 ref；适合需要 DOM 的操作（如图表 init、第三方库挂载）。  
- **beforeDestroy / destroyed**：销毁前/后，在 beforeDestroy 里清定时器、解绑事件、取消请求，避免内存泄漏。

---

**V2-5：Vue2 的 v-model 原理？.sync 修饰符是什么？**

**答：**  
- **v-model**：本质是 **:value + @input** 的语法糖。父组件 `v-model="val"` 等价于 `:value="val"` 与 `@input="val = $event"`；子组件需 props 接收 `value`，在需要更新时 `this.$emit('input', newVal)`。  
- **.sync**：实现“双向绑定”的另一种方式。父组件 `:title.sync="title"` 等价于 `:title="title"` 与 `@update:title="title = $event"`；子组件 `this.$emit('update:title', newVal)`。  
- **区别**：v-model 约定用 value/input；.sync 可对多个 prop 分别做“双向”，写法是 `update:propName`。Vue3 里 v-model 改为 modelValue/update:modelValue，并可多个 v-model；.sync 被合并进 v-model:xxx。

---

**V2-6：Vue2 组件通信方式有哪些？**

**答：**  
- **父子**：**props** 父传子；**$emit** 子触发父监听的事件传值。  
- **跨级/兄弟**：**provide / inject** 祖先提供、后代注入；**Vuex** 全局状态；**事件总线**（new Vue 做 $on/$emit，或 mitt 等）。  
- **ref**：父组件通过 **ref** 拿到子组件实例，调其方法或取 data。  
- **$attrs / $listeners**：父传子时，子未在 props 里声明的属性会进 **$attrs**，未在 props 里声明的事件会进 **$listeners**，可 `v-bind="$attrs"`、`v-on="$listeners"` 继续下传。  
- **$parent / $children**：不推荐，耦合高；Vue3 已移除 $children。

---

**V2-7：Vuex 的 state、getters、mutations、actions、modules 分别是什么？**

**答：**  
- **state**：单一状态树，存全局状态，只读，通过 `this.$store.state.xxx` 或 mapState 访问。  
- **getters**：派生状态，类似 computed，`this.$store.getters.xxx` 或 mapGetters；可接受 getters 作为第二参数、其他 getter 作为第四参数。  
- **mutations**：**同步**修改 state，通过 `commit('type', payload)` 调用；便于 DevTools 追踪每次变更。  
- **actions**：可**异步**，里面对接接口后 **commit** mutation 改 state；通过 `dispatch('type', payload)` 调用。  
- **modules**：按模块拆分 state/getters/mutations/actions，每个 module 可有自己的 state、getters、mutations、actions；访问子模块 state 用 `store.state.moduleName.xxx`，命名空间用 **namespaced: true**，commit/dispatch 时写 `moduleName/type`。

---

**V2-8：Vue2 的 $nextTick 实现原理？和 Vue3 的 nextTick 一样吗？**

**答：**  
- **作用**：在下次 DOM 更新循环结束后执行回调，用于“数据改了之后马上操作 DOM”的场景。  
- **原理**：Vue 把**本次数据变更触发的 DOM 更新**放进**微任务队列**（优先 Promise.then，降级 MutationObserver、setImmediate、setTimeout）；$nextTick 的回调也推进同一队列或下一微任务。当前同步代码和当前宏任务执行完后，先执行完 Vue 的 DOM 更新任务，再执行 $nextTick 回调，因此回调执行时 DOM 已更新。  
- **与 Vue3**：思路一致，都是微任务（或降级宏任务）延后执行；Vue3 的 nextTick 是独立导出函数，用法相同。

---

**V2-9：Vue2 的过滤器（filters）怎么用？Vue3 为什么移除？**

**答：**  
- **用法**：在模板里 `{{ value | filterName }}` 或 `{{ value | filterA | filterB }}`，也可带参 `{{ value | filterName(arg) }}`。在选项里定义 `filters: { filterName(value) { return ... } }` 或全局 `Vue.filter('filterName', fn)`。  
- **Vue3 移除原因**：过滤器与普通函数功能重叠（用 method 或 computed 即可）；增加模板语法复杂度；不利于 TypeScript 类型推导。Vue3 建议用 **方法**或**计算属性**替代，如 `{{ formatDate(date) }}`。

---

**V2-10：Vue2 事件总线（$on、$off、$once）怎么用？有什么坑？**

**答：**  
- **用法**：单独 `const bus = new Vue()`，组件里 `bus.$on('event', fn)` 监听、`bus.$emit('event', payload)` 触发、`bus.$off('event', fn)` 解绑、`bus.$once('event', fn)` 只听一次。  
- **典型场景**：跨组件、跨层级通信（如 A 页面通知 B 组件刷新），不想用 Vuex 时可用事件总线。  
- **注意**：① 组件销毁时要在 **beforeDestroy** 里 **$off**，否则会重复绑定、内存泄漏；② 事件名建议常量或命名空间，避免冲突；③ 类型和追踪性差，项目大时更推荐 Vuex 或 provide/inject。Vue3 已移除实例上的 $on/$off/$once，可用 mitt、tiny-emitter 等库替代。

---

**V2-11：Vue2 的 keep-alive 怎么用？include、exclude、max 是什么？**

**答：**  
- **作用**：包裹动态组件或 router-view，**缓存不活动的组件实例**，切换回来时不重新创建，保留状态。  
- **用法**：`<keep-alive><component :is="current" /></keep-alive>` 或 `<keep-alive><router-view /></keep-alive>`。  
- **include / exclude**：字符串、正则或数组，指定**哪些组件名**被缓存或排除。如 `include="A,B"` 或 `:include="/^List/"`；exclude 反之。  
- **max**：最多缓存多少个组件实例，超过时按 LRU 策略销毁最久未用的。  
- **生命周期**：被缓存的组件会多出 **activated**（切入时）、**deactivated**（切出时），可用于拉取最新数据、暂停定时器等。

---

**V2-12：Vue2 的 mixin 有什么问题？和 Vue3 的 composable 比？**

**答：**  
- **mixin 问题**：① **命名冲突**：多个 mixin 和组件自身有同名的 data、methods 时，以组件为准，易踩坑；② **来源不清**：模板里用的属性/方法不知道来自哪个 mixin，难维护；③ **重复逻辑**：多个 mixin 可能依赖同一份 data，关系复杂。  
- **与 composable**：composable 是**函数**，显式 return 需要的 state 和 方法，按需引入、命名可控；无命名冲突（自己起名）；逻辑集中在一个函数里，可读性好。Vue3 推荐用 composable 替代 mixin。

---

**V2-13：Vue2 的 Vue Router 导航守卫有哪些？路由独享、全局、组件内怎么配？**

**答：**  
- **全局**：`router.beforeEach((to, from, next) => { ... })`、`beforeResolve`、`afterEach`（无 next）。  
- **路由独享**：在路由配置里写 `beforeEnter(to, from, next)`。  
- **组件内**：`beforeRouteEnter`（不能访问 this，可通过 next(vm => {})）、`beforeRouteUpdate`（同一组件复用时）、`beforeRouteLeave`（离开前，如未保存提示）。  
- **顺序**：全局 beforeEach → 路由 beforeEnter → 组件 beforeRouteEnter → 全局 beforeResolve → 全局 afterEach。next() 放行，next(false) 取消，next('/path') 或 next({ name: 'xx' }) 跳转。

---

**V2-14：Vue2 里如何做路由懒加载？**

**答：**  
- **写法**：`component: () => import('@/views/Home.vue')`，打包时会打成独立 chunk，访问该路由时才加载。  
- **命名 chunk**：`component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')`，便于排查和预加载。  
- **与 Vue3**：用法一致，Vue3 也可用 `defineAsyncComponent` 包一层做 loading/error 组件。

---

### Vue2 原理

**V2-P1：Vue2 里 Observer、Dep、Watcher 三者是什么关系？依赖收集和派发更新的流程？**

**答：**  
- **Observer**：把 data 变成响应式。遍历对象，用 **defineProperty** 给每个 key 加 get/set；在 get 里让当前 **Watcher** 被当前 key 对应的 **Dep** 收集；在 set 里让 Dep **通知**所有收集到的 Watcher 更新。每个响应式对象或数组会有一个 Observer 实例，并对应一个 **Dep**（或每个 key 一个 Dep）。  
- **Dep**：依赖收集器。**depend()** 把当前正在执行的 Watcher 加入自己的 subs；**notify()** 遍历 subs，调用每个 Watcher 的 **update()**。  
- **Watcher**：订阅者。**渲染 Watcher** 在首次执行 getter（即 render）时访问 data，触发 get，从而被各个 Dep 收集；**computed Watcher** 在计算属性被访问时收集依赖；**user Watcher** 在 watch 时收集依赖。数据变 → set 触发 Dep.notify() → Watcher.update() → 重新执行 getter（或 run），从而 re-render 或执行回调。  
- **流程**：**依赖收集**：render/getter 执行 → 访问 data → get 被调用 → Dep.depend() → Watcher 被加入 Dep.subs。**派发更新**：data 被修改 → set 被调用 → Dep.notify() → 各 Watcher.update() → 推入异步队列 → nextTick 后批量 run，触发重新渲染或 watch 回调。

---

**V2-P2：Vue2 为什么对数组要重写 7 个方法？直接改 arr[i] 或 length 为什么不生效？**

**答：**  
- **defineProperty 限制**：无法监听**数组下标**的读写（无法给每个下标都 defineProperty，性能与实现复杂）；也无法监听 **length** 的变化。所以 `arr[i] = x`、`arr.length = 0` 不会触发 set，视图不更新。  
- **重写 7 个方法**：**push、pop、shift、unshift、splice、sort、reverse**。Vue 在这些方法的包装里先执行原方法，再通过 **ob.dep.notify()** 手动触发依赖更新，这样通过“方法”改数组就能响应。  
- **实现方式**：用 **Object.create(Array.prototype)** 得到新原型，在这 7 个方法上包一层，内部 call 原方法后 notify；再把数组的 __proto__ 指到这个新对象（或直接挂到数组实例上，视兼容）。  
- **注意**：`arr[i] = x`、`arr.length = 0` 仍无法监听，需用 **Vue.set(arr, i, x)** 或 **splice** 等替代。

---

**V2-P3：Vue2 模板编译的大致流程？模板 → 真实 DOM 经过了哪几步？**

**答：**  
- **模板**：`<template>...</template>` 或 options.template 里的 HTML 字符串。  
- **第一步：解析（parse）**：把模板字符串解析成 **AST（抽象语法树）**，即用 JS 对象描述标签、属性、子节点等；会处理指令（v-if、v-for、v-model 等）、插值 {{ }}。  
- **第二步：优化（optimize）**：遍历 AST，标记**静态节点**（无绑定、无指令的节点），后续 diff 时可跳过，提升性能。  
- **第三步：生成代码（generate）**：把 AST 转成 **render 函数**的字符串，即 `with(this){ return _c('div', ...) }` 这种，其中 _c 即 createElement（h）。  
- **运行时**：执行 **render** 得到 **VNode**；再经过 **patch**（diff + 挂载/更新）把 VNode 变成真实 DOM。  
- **总结**：模板 → **AST** → **render 函数** → **VNode** → **patch** → 真实 DOM。

---

**V2-P4：Vue2 的 diff 算法（虚拟 DOM 对比）大致思路？为什么是 O(n) 而不是 O(n³)？**

**答：**  
- **同层比较**：只对**同一层**的节点做对比，不跨层递归。若同一层标签或 key 不同，直接**替换**整棵子树，不继续 diff 子节点，从而把复杂度压到 O(n)。  
- **双端比较**：Vue2 的 diff 对新旧子节点列表用**头尾指针**：先比头头、尾尾、头尾、尾头，命中则移动指针或移动节点；都不命中再用 key 查表找可复用节点；最后处理增删。这样在列表头尾增删时只需 O(1) 次比较。  
- **key 的作用**：用 **key** 唯一标识节点，能精确找到“同一项”，从而复用并移动 DOM，避免乱序时整列表重绘；无 key 则按索引复用，可能状态错乱。  
- **O(n³) 从哪来**：若对两棵树做“任意节点对任意节点”的最优匹配，是树编辑距离问题，理论复杂度高；Vue 通过“同层 + 列表双端 + key”的启发式策略，把单层列表 diff 控制在 O(n)，整体树遍历 O(n)，故常说 Vue diff 是 O(n)。

---

**V2-P5：Vue2 组件从创建到挂载到页面上，大致经历了什么？**

**答：**  
- **初始化**：`new Vue(options)` 时执行 **\_init**，合并配置、初始化生命周期、事件、render、inject 等，最后调用 **$mount**。  
- **$mount**：若没有手写 render，则把 **template** 编译成 render（经过 parse → optimize → generate）；得到 **render 函数**。  
- **渲染 Watcher**：创建 **Watcher**（渲染 watcher），在 getter 里执行 **render.call(vm)**，render 里访问 data 触发 **依赖收集**；render 返回 **VNode 树**。  
- **patch**：用 **patch** 把 VNode 转成真实 DOM；首次是 **createElm** 递归创建节点并插入；组件 VNode 会创建子组件实例并挂载，形成递归。  
- **挂载完成**：根节点插入到 el 后，执行 **mounted** 钩子。  
- **更新**：后续 data 变化 → Watcher 被通知 → 再次执行 render 得到新 VNode → **patch(oldVnode, newVnode)** 做 diff 并更新 DOM。

---

**V2-P6：Vue2 里有哪几种 Watcher？computed 和 watch 对应的 Watcher 有什么不同？**

**答：**  
- **渲染 Watcher**：每个组件一个，getter 是 **updateComponent**（即 render + patch）；在 getter 执行时访问的 data 都会把该 Watcher 收集进对应 Dep；数据变时重新执行 getter，即 re-render + patch。  
- **computed Watcher**：每个计算属性一个；有 **dirty** 标志，只有依赖变化时置 true，下次访问才重新求值；**有缓存**，依赖不变直接返回 value。getter 是用户写的 computed 函数，执行时收集依赖；computed 依赖的数据变 → 该 Watcher 被 notify → 置 dirty，下次访问 computed 时再求值并缓存。  
- **user Watcher**：即 **watch**；getter 是返回被监听表达式的函数（如 () => this.a），执行时收集依赖；依赖变 → Watcher 被 notify → 执行**回调**（用户写的 handler），不负责渲染。  
- **区别**：渲染 Watcher 的 getter 会触发 patch 更新 DOM；computed Watcher 有缓存、懒求值；user Watcher 只执行回调，可配 deep、immediate 等。

---

**V2-P7：Vue2 的异步更新队列是怎么实现的？为什么多次改 data 只会触发一次渲染？**

**答：**  
- **现象**：同一轮事件循环里多次改 `this.a`、`this.b`，只会触发**一次**视图更新，而不是改一次渲染一次。  
- **实现**：Watcher 的 **update()** 不会立刻执行 run，而是把当前 Watcher 放进一个**队列**（用 id 去重，同一 Watcher 只入队一次）；然后用 **nextTick** 把“执行队列里所有 Watcher 的 run”推入**微任务**（Promise.then 或 MutationObserver 等）。  
- **流程**：改 data → set → Dep.notify() → 多个 Watcher.update() → 各自 push 到 queue → **nextTick(flushSchedulerQueue)** → 当前同步代码执行完 → 微任务执行 → flushSchedulerQueue 里按 id 排序后依次 run → 每个 run 执行 getter（render 或 computed 求值），从而**批量**完成一次 re-render。  
- **结果**：同一 tick 内多次改数据，只会在下一个 tick 做一次渲染；且 **$nextTick(callback)** 和这个队列共用同一套微任务，所以 callback 会在“DOM 已更新”之后执行。

---

**V2-P8：Vue2 的 render 函数和 h（createElement）怎么理解？和模板什么关系？**

**答：**  
- **关系**：**模板**经编译后得到的就是 **render 函数**；手写 render 可以替代模板。`render(h) { return h('div', { attrs: { id: 'app' } }, this.message) }` 等价于模板 `<div id="app">{{ message }}</div>`。  
- **h（createElement）**：接收三个参数：**标签/组件**、**数据对象**（attrs、props、on、class、style 等）、**子节点**（字符串或 VNode 数组）。返回 **VNode**。  
- **数据对象**：如 `{ class: { active: this.isActive }, on: { click: this.handler }, attrs: { id: 'x' } }`；子节点可以是 `this.$slots.default`、`this.lis.map(...)` 等。  
- **用途**：需要**动态性很强**的结构时（如根据配置生成不同标签、循环复杂结构），手写 render 比模板更灵活；JSX 在 Vue2 里也会编译成 h 调用。

---

**V2-P9：Vue2 的 patch 里，同一节点对比时主要比较哪些？为什么要 key？**

**答：**  
- **同一节点**：指 **tag** 相同且 **key** 相同（有 key 时）。若 tag 或 key 不同，视为不同节点，直接**替换**（销毁旧节点、创建新节点）。  
- **比较内容**：若认为是同一节点，则 **patchVnode**：比较 **data**（props、attrs、class、style、事件等），更新属性；再对**子节点**做 diff（updateChildren）。  
- **子节点列表 diff**：新旧 children 各有一个数组，通过**双端比较 + key 映射**决定：复用、移动、新增、删除。有 **key** 时能准确找到“同一个”子节点，移动 DOM 即可；无 key 则按索引对应，可能误复用、导致状态错乱或多余 DOM 操作。  
- **key 的意义**：**唯一标识**列表项，让 diff 知道“哪两个节点是同一项”，从而尽量复用和移动而不是删除再创建；**不要用 index 当 key**（增删、排序会错位），用业务 id 等稳定唯一值。

---

### Vue2 → Vue3 迁移

**Q28：Vue2 到 Vue3 的破坏性变更有哪些？**

**答：**  
- 移除 `$listeners`，合并到 `$attrs`。  
- `v-model` 变更：Vue2 默认是 value + input；Vue3 默认是 modelValue + update:modelValue，且可多个 v-model。  
- 移除过滤器（filters），用方法或计算属性替代。  
- 事件 API：移除 `$on`、`$off`、`$once`，用外部库或 props 传递。  
- 移除 `$children`，用 ref 或 provide/inject。  
- 函数式组件写法变更；异步组件需 `defineAsyncComponent`。  
- 根节点可多根（Fragment）；key 在 v-for 上的位置等细节有变。

---

**Q29：若负责 Vue2 迁移到 Vue3，你会如何规划？**

**答：**  
- 评估范围：依赖是否支持 Vue3（UI 库、插件）、是否用到已废弃 API。  
- 渐进式迁移：用 Vue 官方迁移构建（@vue/compat）在同一项目中共存 Vue2/Vue3，逐步替换组件。  
- 先新后旧：新功能用 Vue3，老页面按模块逐步迁移。  
- 单测与回归：保证关键路径有测试，迁移后做全量回归。  
- 文档与排期：列变更清单、培训团队、分阶段上线与回滚方案。

---

### Vue 生态

**Q29-2：Vue Router 有哪几种路由模式？区别是什么？**

**答：**  
- **hash 模式**：URL 带 `#`，如 `https://xxx.com/#/home`。通过监听 `hashchange` 变化切换组件，无需服务端配合，兼容性好；但 # 不美观、不利于 SEO。  
- **history 模式**：URL 无 #，如 `https://xxx.com/home`。基于 `History API`（pushState / replaceState），需服务端配置：所有路径回退到 index.html，由前端路由接管，否则刷新会 404。  
- **abstract 模式**：在 Node 或非浏览器环境（如 SSR、小程序）下使用，不依赖 window.history。  
选型：不关心 SEO、不想动服务端用 hash；要美观和 SEO 用 history 并配好服务端 fallback。

---

**Q29-3：Vue Router 导航守卫有哪些？执行顺序？**

**答：**  
- **全局**：`beforeEach`、`beforeResolve`、`afterEach`。  
- **路由独享**：在路由配置里写 `beforeEnter`。  
- **组件内**：`beforeRouteEnter`、`beforeRouteUpdate`、`beforeRouteLeave`。  
**执行顺序**：全局 beforeEach → 路由 beforeEnter → 组件 beforeRouteEnter → 全局 beforeResolve → 全局 afterEach。  
**用途**：鉴权（未登录跳登录）、权限校验、离开前确认（beforeRouteLeave 里弹窗）、设置页面标题等。`next()` 放行，`next(false)` 取消，`next('/path')` 或 `next({ name: 'xx' })` 跳转。

---

**Q29-4：Vue 里如何做路由懒加载？有什么好处？**

**答：**  
- **做法**：用动态 import 把路由组件写成异步组件，如 `component: () => import('@/views/Home.vue')`，打包时会打成独立 chunk，访问该路由时才加载对应 JS。  
- **好处**：首屏只加载当前路由需要的代码，减少首包体积、加快 FCP；按需加载，未访问的路由不占首屏带宽。  
- **可配合**：Webpack magic comment 命名 chunk，如 `import(/* webpackChunkName: "home" */ '@/views/Home.vue')`，便于排查和预加载；或用 `webpackPreload` / `webpackPrefetch` 做预加载。

---

**Q29-5：Pinia 和 Vuex 的区别？Vue3 项目为什么更推荐 Pinia？**

**答：**  
- **Vuex**：集中式状态管理，概念有 state、getters、mutations、actions、modules；mutations 同步、actions 异步；模块需要 namespaced，TypeScript 支持要手写类型。  
- **Pinia**：无 mutations，只有 state、getters、actions；每个 store 独立，无需 modules 嵌套；天然支持 TS、支持 Composition API 风格；API 更简洁（defineStore），可多实例。  
- **Vue3 推荐 Pinia**：官方推荐、与 Composition API 契合、去掉了 mutations 心智负担、TS 友好、体积更小；Vuex 5 规划与 Pinia 思路接近，新项目优先用 Pinia。

---

**Q29-6：Vue 生态里你用过哪些常用库？各自解决什么问题？**

**答：**  
- **UI 组件库**：Element Plus、Ant Design Vue、Vant（移动端）等，提供表格、表单、弹窗、布局等现成组件，统一风格和交互。  
- **VueUse**：组合式工具函数集合（如 useLocalStorage、useMouse、useFetch），在 Composition API 里直接复用，减少手写逻辑。  
- **Vue Router / Pinia**：路由与状态管理，前面已述。  
- **Nuxt**：基于 Vue 的 SSR/SSG 框架，约定式路由、自动导入、服务端渲染，适合 SEO 和首屏性能。  
- **构建/工程**：Vite（开发与构建）、Vitest（测试）、ESLint + eslint-plugin-vue 等，负责开发体验与规范。  
按项目需求选：中后台多用 Element/Ant Design Vue，移动端 H5 用 Vant，要 SEO 或 SSR 考虑 Nuxt，工具函数可多用 VueUse。

---

**Q29-7：中大型 B 端项目里状态管理（Pinia/Vuex）如何设计？模块如何划分？**

**答：**  
- **按业务域划分模块**：如 user（用户信息、权限）、app（全局 UI 状态、主题）、业务模块（如 order、device、topology 等），每个模块一个 store，避免单 store 过大。  
- **Pinia**：用 `defineStore` 定义多个 store，无需 namespaced，通过 `useUserStore()` 按需引入；可把与后端接口相关的请求放在 action 里，state 只存前端状态，getter 做派生。  
- **与路由、权限联动**：登录后拉用户信息、菜单、权限点存 store；路由守卫里读 store 做鉴权与动态路由；大屏/拓扑等实时数据可单独 store，通过 WebSocket 更新。  
- **持久化**：需要刷新保留的（如 token、主题）用 pinia-plugin-persistedstate 或手写存 localStorage，按 store 或 key 控制白名单。  
- **可维护性**：类型定义（接口、state 类型）集中管理；避免在组件里直接改 state，通过 action 统一改；大模块可再拆子 store 或 composable。

---

**Q29-8：如何快速上手并维护/重构已有 Vue 业务代码？你会先看什么？**

**答：**  
- **先看结构**：目录划分（views、components、api、store、router）、路由与菜单对应关系、是否有设计规范或文档。  
- **再看数据流**：接口在哪请求（api 目录、是否统一封装）、状态存在哪（Pinia/Vuex 模块）、页面间如何传参（路由、query、store）。  
- **然后看技术栈**：Vue2/Vue3、UI 库、构建工具、是否有拓扑/图表/WebSocket 等特殊依赖，以及 ESLint/规范。  
- **重构时**：先保证功能不变，再按模块逐步替换（如先统一请求层、再抽公共组件、再迁 Vue3 或 Pinia）；关键路径要有回归（测试或手工用例）；与后端联调接口约定要文档化，避免改接口导致前后端不同步。

---

## 三、跨浏览器与跨终端兼容

**Q30：IE11 下常见问题与 polyfill 方案？**

**答：**  
- **ES6 语法**：Promise、箭头函数、let/const、解构等不支持，用 Babel + core-js 转译与 polyfill。  
- **fetch**：用 whatwg-fetch 或 axios（内部用 XHR）。  
- **CSS**：Flex 部分支持，Grid 不支持，需降级布局或放弃 IE。  
- **其他 API**：如 IntersectionObserver、CustomEvent 等需 polyfill 或条件判断降级。  
若公司明确不支持 IE，可不在 bundle 里打 polyfill 以减小体积。

---

**Q31：移动端适配方案 rem、vw/vh、媒体查询的区别与选型？**

**答：**  
- **rem**：根元素 font-size 为基准，通过 JS 或 flexible 按设计稿与屏幕宽度设置根字号，将设计稿 px 转为 rem。  
- **vw/vh**：视口宽高 1% 为单位，无需 JS，用 postcss-px-to-viewport 将 px 转 vw。  
- **媒体查询**：针对不同断点写不同样式，适合响应式布局、显示隐藏、字体间距等。  
选型：需要精确按设计稿等比缩放用 rem 或 vw；需要断点式布局用媒体查询；可组合使用（如主体用 vw，断点用媒体查询）。

---

**Q32：1px 问题的原因与解决方案？**

**答：**  
原因：设备像素比（DPR）为 2 或 3 时，1 个 CSS 像素对应 2 或 3 个物理像素，1px 线会显得粗。  
方案：① 用 `transform: scaleY(0.5)` 缩放伪元素画线；② 用 `border-image` 或 `box-shadow` 模拟；③ viewport 里设置 `initial-scale=1/dpr` 再用 rem 换算（如 flexible）；④ 直接使用 0.5px（部分浏览器支持）。

---

**Q33：移动端 click 延迟与解决？触摸与点击事件顺序？**

**答：**  
**300ms 延迟**：早期为区分双击缩放，点击会延迟。解决：viewport 里设 `user-scalable=no` 或 `width=device-width` 后现代浏览器已取消；或用 touch 事件自己算时间差模拟 click（注意兼容性）。  
**事件顺序**：touchstart → touchmove → touchend → (延迟) → click。可只用 touch 或在 touchend 里 `preventDefault()` 阻止 click（需注意会影响滚动、输入等）。

---

**Q34：刘海屏、底部横条的安全区域如何处理？**

**答：**  
用 CSS 环境变量 `env(safe-area-inset-top/right/bottom/left)`，配合 `viewport-fit=cover` 和 meta 的 viewport 设置。  
例如底部固定栏：`padding-bottom: env(safe-area-inset-bottom);` 或 `padding-bottom: constant(safe-area-inset-bottom);`（旧 iOS）。容器加 `padding` 或 `margin` 留出安全区，避免内容被遮挡。

---

**Q34-2：Chrome 和 Firefox 开发时遇到过哪些差异？**

**答：**  
- **CSS**：部分属性前缀或默认值不同（如 flex、scrollbar 样式），用 Autoprefixer 和标准写法。  
- **事件**：鼠标滚轮事件 Firefox 用 `DOMMouseScroll`、`detail`，Chrome 用 `wheel`、`deltaY`，需统一封装。  
- **API**：如某些实验性 API、日期解析略有差异，做特性检测或查 MDN 兼容表。  
- **调试**：两者 DevTools 功能类似，性能面板、网络面板可交叉验证。  
实际开发中多测双端，必要时用 CSS 的 `@supports` 或 JS 能力检测做分支。

---

## 四、小程序与多端（微信 / Android / iOS / H5）

**Q34-3：微信小程序和 H5 有什么区别？**

**答：**  
- **运行环境**：小程序跑在微信客户端的双线程架构（逻辑层 JS + 视图层 WebView/原生），H5 跑在浏览器或微信内置浏览器里，是标准 Web 环境。  
- **技术栈**：小程序用 WXML/WXSS/JS，自定义组件和 API（wx.xxx），不支持 DOM/BOM；H5 用 HTML/CSS/JS，可用 Vue/React、直接操作 DOM。  
- **能力与限制**：小程序能调微信登录、支付、扫码、订阅消息等原生能力，包体积、分包有上限；H5 受限于浏览器和微信内置内核，部分能力需通过 JSSDK 或跳转小程序。  
- **性能与体验**：小程序首包更可控、渲染路径短，接近原生；H5 依赖网络和内核，白屏、兼容性更需关注。  
- **发布**：小程序需提审、发版；H5 发服务器即可，迭代更灵活。  
选型：强依赖微信能力（支付、登录、分享到朋友圈等）或要更好体验用小程序；要快速迭代、多端复用、SEO 可考虑 H5 或跨端方案。

---

**Q34-4：微信小程序的生命周期有哪些？**

**答：**  
- **应用级**：`App()` 里 `onLaunch`（首次启动）、`onShow`（切前台）、`onHide`（切后台）。  
- **页面级**：`onLoad`（页面加载，可带参数）、`onShow`（页面展示）、`onReady`（初次渲染完成）、`onHide`（页面隐藏）、`onUnload`（页面卸载）。  
- **组件**：`lifetimes` 里 `created`、`attached`、`ready`、`moved`、`detached` 等。  
常用：`onLoad` 里取路由参数并发请求，`onShow` 里刷新列表或重新鉴权，`onUnload` 里清定时器、取消请求。

---

**Q34-5：小程序在 Android 和 iOS 上常见差异？如何兼容？**

**答：**  
- **样式**：iOS 安全区域、底部横条高度不同，用 `env(safe-area-inset-bottom)` 或小程序提供的安全区 API；部分机型 1px、字体渲染不一致，需实测。  
- **性能**：Android 机型多、性能差异大，长列表用虚拟列表、图片懒加载；iOS 上滚动、动画一般更顺滑，可适当做机型区分策略。  
- **API 与权限**：部分 API 或授权弹窗在双端表现不一致（如相册、定位），需按文档做兼容和降级提示。  
- **调试**：真机调试时 Android、iOS 各测一遍；用 `wx.getSystemInfoSync()` 取平台、版本号做条件判断或上报。  
- **包与分包**：主包/分包大小限制在双端一致，但实际加载速度受网络与设备影响，可做分包预下载和关键路径优化。

---

**Q34-6：H5 在微信内打开和普通浏览器有什么不同？要注意什么？**

**答：**  
- **内核**：微信内是 X5（Android）或 WKWebView（iOS），与系统浏览器内核可能不同，存在 CSS/JS 兼容差异。  
- **能力**：微信内可用 JSSDK（微信 JS-SDK）调分享、扫一扫、支付等；需通过微信鉴权拿到签名，且部分能力会跳转小程序或原生。  
- **限制**：微信内可能限制自动播放、部分敏感 API；链接被二次封装，要注意分享标题、图标和落地页。  
- **调试**：微信开发者工具可调试内置浏览器；真机用 vConsole 或微信调试入口看日志。  
- **注意**：分享配置、支付回调要在微信环境里测；iOS 下日期、输入框等有已知坑，需查文档和实测。

---

**Q34-7：小程序登录、微信支付流程大致是怎样的？**

**答：**  
- **登录**：前端调 `wx.login()` 拿到临时 code，把 code 发给自己后端；后端用 code + appId + secret 向微信换 `openid`/`session_key`，据此生成自定义登录态（如 token）返回给前端；前端存 token，后续请求带 token 即可。不在前端存 session_key，敏感校验放后端。  
- **支付**：前端先向自己后端下单，后端调微信支付统一下单接口拿到 `prepay_id` 等，再按小程序要求生成签名返回给前端；前端调 `wx.requestPayment()` 传入这些参数，用户完成支付；支付结果以后端异步通知为准，前端仅做结果页展示或轮询查询订单状态。  
- **注意**：密钥、签名都在后端完成；前端不处理金额、不信任前端状态做发货逻辑。

---

**Q34-8：跨端方案（如 uni-app、Taro）了解吗？和纯小程序/H5 比有什么优缺点？**

**答：**  
- **是什么**：一套代码编译到多端（微信/支付宝/百度等小程序、H5、App）。uni-app 基于 Vue；Taro 支持 React/Vue，编译到小程序和 H5 等。  
- **优点**：多端复用、减少重复开发；技术栈统一（Vue/React）；一套业务逻辑，多端发版。  
- **缺点**：要写条件编译或兼容层，部分 API、组件需各端适配；包体积和性能不如纯原生小程序极致；遇到平台差异要查文档或踩坑。  
- **选型**：多端都要做、团队 Vue/React 成熟时可考虑；只做微信小程序且追求极致可用原生；H5+ 小程序兼顾可用 uni-app/Taro 出一套 H5 + 小程序。

---

**Q34-9：小程序包体积和首屏如何优化？**

**答：**  
- **主包与分包**：主包限制约 2MB，总包（主包 + 所有分包）有上限；把非首屏页面、非关键 Tab 放到**分包**，通过 `packages` 或 `subpackages` 配置，首屏只下载主包，进入分包页面再按需下载。  
- **主包瘦身**：静态资源（图片、字体）放 CDN 或分包内，主包只保留首屏必需；清理未引用代码和依赖，用构建分析看体积；图片用 WebP、压缩，避免大图打进包。  
- **首屏**：减少主包体积、减少首屏请求数；首屏数据接口合并或预请求；骨架屏、占位图减轻白屏感；避免在首屏执行重逻辑、大计算。  
- **预加载**：`preloadRule` 配置分包预加载，在空闲时提前拉取即将访问的分包，减少点击后等待。

---

**Q34-10：setData 为什么容易成为性能瓶颈？如何优化？**

**答：**  
- **为什么是瓶颈**：setData 会把数据从**逻辑层**序列化后通过 JSBridge 传到**视图层**，数据量越大、频率越高，传输和视图层解析开销越大；且 setData 会触发视图层重渲染，频繁调用会导致卡顿。  
- **优化原则**：  
  - **单次数据量**：只 set 变化字段，避免整页大对象；列表用局部更新（如某一项变更只 set 该项或对应路径），不要每次 set 整个 list。  
  - **调用频率**：合并多次 setData 为一次；防抖/节流（如搜索输入、滚动触底加载）；避免在滚动、动画等高频回调里直接 setData。  
  - **数据结构**：避免传输大数组、大对象；与渲染无关的数据不要放在 data 里；长列表考虑虚拟列表或分页，减少单页数据量。  
- **替代**：能用 WXS 做简单计算的用 WXS，减少逻辑层与视图层通信；纯展示用静态数据或缓存，减少 setData。

---

**Q34-11：小程序里图片、请求、缓存和长列表有哪些优化手段？**

**答：**  
- **图片**：使用 **CDN** 和合适尺寸（按展示宽高请求），格式用 WebP；**懒加载**（`lazy-load` 或自己用 IntersectionObserver 等价能力）；大图考虑裁剪、压缩后再上传；避免在包内放大量图片。  
- **请求**：接口**合并**、**预请求**（如 onLoad 时并发请求首屏所需）；**缓存**接口结果（内存或本地），二次进入页面或重复请求直接用缓存；设置合理**超时**与重试。  
- **缓存**：本地存储（`wx.setStorageSync`）存列表数据、配置等，下次先读缓存再请求更新；注意容量限制和 key 规划；敏感数据加密或短期有效。  
- **长列表**：用**虚拟列表**（只渲染可视区域项），或**分页加载**（触底加载更多），避免一次 setData 成千上万条；列表项结构尽量简单，减少节点数；图片在列表里做懒加载。

---

## 五、Webpack / Vite 与工程化

### Webpack

**Q35：entry、output、loader、plugin 的作用？**

**答：**  
- **entry**：入口，Webpack 从哪个模块开始构建依赖图。  
- **output**：出口，打包结果写到哪（path、filename、publicPath 等）。  
- **loader**：对非 JS 文件做转换（如 babel-loader 转 ES6，css-loader 处理 import CSS），从右到左/从下到上执行。  
- **plugin**：在构建生命周期里做更多事（如生成 HTML、抽 CSS、压缩、定义环境变量），通过钩子参与打包流程。

---

**Q35-2：loader 和 plugin 的区别？**

**答：**  
- **职责不同**：loader 只做**模块内容转换**，把非 JS 文件（如 CSS、图片、Vue 单文件）转成 Webpack 能处理的形式，是“翻译官”；plugin 做**构建流程里的事**，例如生成 HTML、抽离/压缩文件、注入变量、清空目录等，是“扩展构建能力”。  
- **运行时机**：loader 在**模块解析/打包阶段**，对单个文件从右到左（或从下到上）执行；plugin 通过**钩子**在 Webpack 的整个生命周期里介入（如 afterEmit、optimizeChunks 等）。  
- **使用方式**：loader 在 `module.rules` 里配置，针对某一类文件；plugin 在 `plugins` 数组里 `new` 实例，可拿到 compiler/compilation 做更通用的事。  
- **总结**：loader 管“单个文件怎么转”，plugin 管“整个打包过程怎么增强”。

---

**Q36：常用 loader 与 plugin 有哪些？**

**答：**  
**Loader**：babel-loader（JS 转译）、vue-loader（Vue 单文件）、css-loader + style-loader（或 MiniCssExtractPlugin.loader）、less-loader、url-loader/file-loader（图片等）、ts-loader。  
**Plugin**：HtmlWebpackPlugin（生成 HTML 并注入 bundle）、MiniCssExtractPlugin（抽离 CSS 成文件）、DefinePlugin（注入环境变量）、TerserPlugin（压缩 JS）、CleanWebpackPlugin（清空输出目录）。

---

**Q37：Webpack 优化：代码分割、Tree Shaking、缓存、懒加载？**

**答：**  
- **代码分割**：通过 `optimization.splitChunks` 把公共模块、第三方库单独打 chunk，路由或动态 import 按需加载，控制首屏体积。  
- **Tree Shaking**：生产环境用 ES Module 且无副作用时，打包工具会去掉未引用代码；注意 sideEffects 配置。  
- **缓存**：文件名带 contenthash，强缓存；runtimeChunk 单独拆出，减少业务变更导致 hash 变。  
- **懒加载**：路由组件或大组件用 `import()` 动态导入，打成独立 chunk，用到再加载。

---

**W1：Webpack 的 entry 和 output 常见配置有哪些？多入口、publicPath、chunkFilename 怎么配？**

**答：**  
- **entry**：单入口 `entry: './src/index.js'`；多入口 `entry: { main: './src/index.js', admin: './src/admin.js' }`，对应 output.filename 可用 `[name].js`；也可入口为数组（多文件打成一个）或动态函数返回入口。  
- **output**：`path` 输出目录（绝对路径）；`filename` 主包文件名，如 `[name].[contenthash:8].js`；**chunkFilename** 非入口 chunk（如 splitChunks、动态 import）的文件名，如 `[name].chunk.[contenthash:8].js`；**publicPath** 引用资源时的前缀（CDN、子路径部署时必配），如 `https://cdn.com/` 或 `/assets/`。  
- **多入口**：entry 为对象时，每个 key 对应一个入口 chunk；output.filename 用 `[name]` 区分；HtmlWebpackPlugin 需配置多个或 chunks 指定每个页面注入哪些 chunk。

---

**W2：module.rules 里 loader 的执行顺序？exclude、include、oneOf 怎么用？**

**答：**  
- **顺序**：规则内从**右到左**（从下到上）执行，如 `use: ['style-loader', 'css-loader']` 先执行 css-loader 再 style-loader；因为 pipeline 是“前一个的输出作为后一个的输入”，css-loader 产出 JS 再交给 style-loader 插入样式。  
- **exclude / include**：`exclude: /node_modules/` 排除 node_modules，避免对依赖做 babel 等；`include: path.resolve(__dirname, 'src')` 只处理 src 下文件，加快构建。  
- **oneOf**：`rules.oneOf` 里多个规则**只匹配第一个命中的**，避免一个文件被多组规则重复处理（如 .vue 只走 vue-loader，不再走 babel 的 test: /\.js$/）；没有 oneOf 时所有匹配的 rule 都会执行。

---

**W3：resolve 里 alias、extensions、modules 分别干什么？**

**答：**  
- **alias**：路径别名，如 `alias: { '@': path.resolve(__dirname, 'src') }`，代码里可写 `import xxx from '@/utils'`，减少相对路径。  
- **extensions**：解析时自动补全的后缀，如 `extensions: ['.js', '.vue', '.json']`，`import './a'` 会依次尝试 a.js、a.vue、a.json。  
- **modules**：告诉 Webpack 去哪些目录找模块，如 `modules: [path.resolve(__dirname, 'src'), 'node_modules']`，可优先从 src 解析，便于短路径。  
- **mainFields**：package.json 里用哪个字段作为入口（如 `['module', 'main']`），配合 ESM 优先。

---

**W4：optimization.splitChunks 的 cacheGroups、chunks、minSize 怎么配？如何把 node_modules 单独打成一个 chunk？**

**答：**  
- **chunks**：`'all'` 同步和异步 chunk 都参与分割；`'async'` 只分割动态 import 的；`'initial'` 只分割入口及其同步依赖。  
- **minSize**：小于该体积的 chunk 不分割，避免碎文件过多；**maxSize**：超过则尝试再拆（可能产生多个 chunk）。  
- **cacheGroups**：按“组”定制分割规则。如把 node_modules 单独打出：  
  `cacheGroups: { vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' } }`，这样第三方库进 vendors.js；还可再分 `vue: { test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/, name: 'vue-vendor' }` 等。  
- **name**：指定 chunk 名，便于识别和缓存；设为函数可动态命名。  
- **minChunks**：模块被至少多少个 chunk 引用时才分割，常用于公共模块。

---

**W5：Webpack 从 entry 到产出文件的完整构建流程是怎样的？**

**答：**  
- **初始化**：读配置、创建 **Compiler**、加载所有 **Plugin**（执行 plugin 的 apply，注册钩子）。  
- **编译（Compilation）**：从 **entry** 出发，根据模块间的 **import/require** 递归解析，形成**依赖图**；对每个模块根据 **module.rules** 匹配 **loader**，从右到左执行，把源文件转成 Webpack 能处理的 JS 或 asset。  
- **封装（Seal）**：将模块封装成 **chunk**——entry 对应入口 chunk；动态 import 对应异步 chunk；**splitChunks** 根据规则把公共模块拆成单独 chunk；运行 **optimization** 相关插件（如 Terser 压缩、Tree Shaking）。  
- **输出（Emit）**：根据 **output** 配置，把每个 chunk 写成文件（JS、CSS 等）；执行 **afterEmit** 等钩子；若有 HtmlWebpackPlugin 等，生成 HTML 并注入 script/link。  
- **核心**：**模块解析 → 依赖图 → loader 转译 → chunk 划分 → 生成 bundle 文件**。

---

**W6：module、chunk、bundle 三个概念有什么区别？**

**答：**  
- **module**：源码中的**单个文件**（或经 loader 转换后的单元），如一个 .js、.vue、.css 文件，Webpack 以 module 为单位解析依赖和转换。  
- **chunk**：**打包过程中的代码块**，由若干 module 组成；一个 chunk 可能对应一个输出文件，也可能多个 chunk 合并（如某些 optimization）。chunk 来源：entry 产生入口 chunk；动态 `import()` 产生异步 chunk；splitChunks 拆分出公共 chunk。  
- **bundle**：**最终输出的文件**，通常一个 chunk 对应一个 bundle（如 main.js、vendors.js）；bundle 是 chunk 经过压缩、合并后的产物，即用户浏览器加载的 JS/CSS 文件。  
- **关系**：多个 module 组成 chunk，chunk 输出为 bundle。

---

**W7：devServer 的 proxy、historyApiFallback、hot 怎么配置？**

**答：**  
- **proxy**：把前端请求代理到后端，解决开发环境跨域。如 `proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } }`，请求 /api/xxx 会被转发到 target + path；可配 pathRewrite、secure、ws（WebSocket）等。  
- **historyApiFallback**：SPA 使用 history 路由时，刷新或直接访问子路径会请求服务器，服务器没有对应文件会 404；设为 `true` 或 `{ index: '/index.html' }` 时，这类请求返回 index.html，由前端路由接管。  
- **hot**：**Hot Module Replacement**，开启后只更新变更的模块而不整页刷新；需配合支持 HMR 的 loader（如 style-loader、vue-loader）；一般 `hot: true` 即可，devServer 会注入 HMR runtime。

---

**W8：如何写一个简单的 Webpack loader？loader 的 pitch 阶段是什么？**

**答：**  
- **简单 loader**：一个函数，接收源码字符串（或 buffer），返回处理后的字符串（或 buffer）；可异步：`this.async()` 拿到回调，处理完再调用。如：  
  `module.exports = function(source) { return source.replace(/console\.log\(.*?\);?/g, ''); }` 去掉 console.log。  
- **带 options**：通过 `this.getOptions()` 或 schema 校验拿到配置；**多 loader** 时注意顺序，当前 loader 的返回值会作为下一个 loader 的 source。  
- **pitch**：loader 可导出 `pitch` 方法，在**真正执行 loader 前**执行；执行顺序是 pitch 从左到右，再 loader 从右到左；若 pitch 有返回值，会**跳过后续 loader**，直接用自己的返回值交给前一个 loader，可用于“提前短路”或做元信息。

---

**W9：如何写一个简单的 Webpack plugin？compiler 和 compilation 上常用钩子有哪些？**

**答：**  
- **Plugin 形式**：一个类（或函数），有 **apply(compiler)** 方法；在 apply 里通过 `compiler.hooks.xxx.tap('PluginName', (params) => { ... })` 注册钩子。  
- **compiler**：代表整个构建生命周期，只创建一次。常用钩子：`emit`（输出前）、`afterEmit`（输出后）、`compile`（开始编译）、`done`（完成）。  
- **compilation**：代表单次编译，包含模块、chunk、依赖等；在 `compiler.hooks.compilation.tap` 里拿到。常用：`optimizeChunks`、`buildModule`（构建模块时）、`succeedModule` 等。  
- **简单例子**：在 emit 钩子里往 compilation.assets 加一个文件，如生成 version.json，这样输出目录会多出该文件。  
- **异步钩子**：用 `tapAsync` 或 `tapPromise`，需调用 callback 或 return Promise，否则构建会卡住。

---

**W10：Webpack 的 mode、devtool、externals 分别有什么作用？生产环境怎么选 devtool？**

**答：**  
- **mode**：`'development'` 默认开启 NamedChunks、NamedModules、不压缩；`'production'` 默认压缩、Tree Shaking、无 eval 的 devtool；影响 NODE_ENV 等内置变量。  
- **devtool**：控制**源码映射**。`false` 不生成；`'eval'` 快但行号不准；`'source-map'` 独立 .map 文件，质量最好；`'cheap-module-source-map'` 折中，生产排查可用；`'hidden-source-map'` 有 map 但不暴露给浏览器。  
- **生产推荐**：需要排查线上问题时用 `cheap-module-source-map` 或 `hidden-source-map`，并保证 .map 不对外或只内网；完全不想要 map 可 `false`。  
- **externals**：**不打包**某些依赖，运行时从外部获取（如通过 script 引入的全局变量、CDN）。如 `externals: { vue: 'Vue' }`，代码里 import vue 会变成取全局 Vue，减小 bundle 体积。

---

**W11：Webpack 的 dependency graph（依赖图）是怎么生成的？动态 import 和静态 import 对依赖图有什么不同影响？**

**答：**  
- **生成过程**：从 **entry** 模块开始，解析其 **import/require**，递归解析被引用模块的依赖，直到没有新模块；每个文件对应一个 **Module** 节点，边表示依赖关系，形成有向图（可能有环，Webpack 会处理）。  
- **静态 import**：在**编译阶段**就能确定依赖，会直接加入依赖图，参与打包和 Tree Shaking。  
- **动态 import()**：**运行时**才确定加载哪个模块，Webpack 会为每个可能被加载的路径创建**单独的 chunk**（或按 magic comment 合并），不会打进主 bundle；依赖图里会记录“入口 → 动态 import 的占位模块 → 异步 chunk”，所以能按需加载。  
- **require(variable)**：完全动态的路径（如 `require('./' + name)`）难以静态分析，Webpack 可能把整个目录打成 context module，依赖图包含该目录下所有模块。

---

### Vite

**Q38：Vite 为什么开发时快？原理？**

**答：**  
开发阶段不打包，用浏览器原生 ESM：启动时用 esbuild 预构建依赖（node_modules），源码按需通过 ESM 请求，由浏览器直接加载。只编译当前请求的文件，所以冷启动快、热更新快。  
生产用 Rollup 打包，得到优化的静态资源。

---

**Q39：Vite 与 Webpack 的对比？**

**答：**  
- **开发**：Vite 基于 ESM 按需编译，启动和 HMR 快；Webpack 需先打包再起服务。  
- **生产**：Vite 用 Rollup 打包；Webpack 功能更全、生态更久，配置更细。  
- **适用**：Vite 适合新项目、Vue/React 等现代框架；Webpack 适合复杂定制、历史项目。  
两者可并存（如老项目用 Webpack，新项目用 Vite）。

---

**Q40：CommonJS 与 ES Module 的区别？循环依赖如何产生与避免？**

**答：**  
- **CJS**：运行时加载，输出值的拷贝，require 同步。  
- **ESM**：编译时确定依赖，输出值的引用，import 静态、可做 Tree Shaking。  
**循环依赖**：A 引用 B，B 又引用 A。CJS 下可能拿到未执行完的 B 的导出（部分为 undefined）；ESM 下引擎会建立引用，通常能拿到正确导出。  
**避免**：合理拆分模块、依赖单向、或把共同依赖提到第三方模块，减少环。

---

**Q40-2：Webpack 里 hash、chunkhash、contenthash 的区别？**

**答：**  
三者都用于给文件名加哈希，便于缓存控制。  
- **hash**：整个项目构建共用一个 hash，任一处改动所有文件名都变，不利于缓存。  
- **chunkhash**：按 chunk 计算，同一 chunk 内任一模块改动则该 chunk 的 hash 变，适合按 chunk 做缓存。  
- **contenthash**：按文件内容计算，通常用于 CSS 等（如 MiniCssExtractPlugin），只有该文件内容变才变，JS 改不动 CSS 的 hash，利于长期缓存。  
一般 output.filename 用 chunkhash，CSS 用 contenthash，避免改 JS 导致 CSS 缓存失效。

---

**Q40-3：组件化开发要注意什么？如何设计可复用组件？**

**答：**  
- **单一职责**：组件只做一类事，便于复用和测试。  
- **props 设计**：明确入参、类型、默认值，必要处用 validator；避免过多 props，可考虑合并为配置对象。  
- **事件与插槽**：通过 emit 向父组件通信；用默认插槽、具名插槽、作用域插槽扩展布局与内容。  
- **可配置与可扩展**：样式可用 class/style 或 theme 覆盖；逻辑可抽成 composable 或 inject 注入。  
- **文档与示例**：复杂组件提供 props 说明和示例，便于团队使用。  
可复用组件要“高内聚、低耦合”，少依赖业务、多通过 props/插槽适配场景。

---

## 六、性能优化与问题排查

### 性能优化

**Q41：首屏优化、FCP/LCP 如何优化？**

**答：**  
- **FCP**：首屏有内容可见。减少阻塞渲染的 JS/CSS、关键 CSS 内联、非关键资源延迟、服务器与 CDN 要快。  
- **LCP**：最大内容绘制。优化首屏大图（尺寸、格式、懒加载）、关键字体、服务端直出或 SSR 减少 JS 执行后再渲染。  
通用：资源压缩、CDN、预连接/预加载、骨架屏、减少主线程长任务。

---

**Q42：SSR、CSR、SSG 的区别与优缺点？**

**答：**  
- **CSR**：客户端渲染，浏览器拿空 HTML 再跑 JS 渲染，首屏慢、SEO 差，交互与前后端分离好。  
- **SSR**：服务端渲染，服务器输出带内容的 HTML，首屏快、SEO 好，但占用服务器、需处理 hydration 与状态。  
- **SSG**：构建时生成静态 HTML，部署到 CDN，首屏快、SEO 好、无服务器压力，适合内容相对固定的页面。  
混合：首屏 SSR，后续路由 CSR；或关键页 SSG，其他 CSR。

---

**Q42-2：SSR 里的 hydration 是什么？要注意什么？**

**答：**  
**Hydration（注水）**：服务端输出的是静态 HTML，到浏览器后 Vue 会挂载到已有 DOM 上，恢复响应式、事件等，使页面变成可交互的 SPA。  
**注意**：① 服务端和客户端生成的 DOM 结构要一致，否则会 hydration mismatch 报错（避免只在客户端用的 API 或随机数影响结构）；② 只在客户端执行的逻辑放 `onMounted` 或 `if (import.meta.client)`；③ 避免在服务端请求带 cookie 的接口时要透传或同源；④ 首屏数据可在服务端预取，避免客户端二次请求白屏。

---

**Q42-3：长列表如何优化？虚拟滚动原理？**

**答：**  
DOM 过多会导致渲染慢、滚动卡顿。  
**虚拟滚动**：只渲染可视区域及少量缓冲的列表项，高度用占位撑开；滚动时根据滚动位置计算当前应显示的区间，动态渲染对应项并回收不可见的节点。这样 DOM 数量恒定，与总数据量无关。  
实现可手写或使用 vue-virtual-scroller、vxe-table 等；核心是：计算可视区间、按需渲染、占位高度准确（定高简单，动态高度需估算或记录）。

---

**Q42-4：图片优化有哪些手段？**

**答：**  
- **格式**：用 WebP、AVIF 等更小体积格式，配合 picture/srcset 做兼容。  
- **尺寸**：按展示尺寸输出，避免大图小用；响应式用 srcset、sizes。  
- **压缩**：构建时用 imagemin 等压缩；上传前压缩或使用 CDN 压缩。  
- **懒加载**：首屏外图片用 loading="lazy" 或 IntersectionObserver 进入视口再加载。  
- **雪碧图/图标字体**：小图标合并请求，减少 HTTP 数。  
- **CDN**：静态图片走 CDN，加速与带宽分担。

---

**Q42-5：如何定位前端性能瓶颈？**

**答：**  
- **Chrome DevTools**：Performance 录屏看主线程、长任务、布局/重绘；Network 看请求顺序、体积、阻塞；Lighthouse 看 FCP/LCP/CLS 等指标与建议。  
- **指标**：关注 FCP、LCP、TTI、CLS 等；用 Performance API（如 `performance.getEntriesByType('navigation')`）或 RUM 上报。  
- **思路**：首屏慢看资源加载与阻塞、服务端耗时；交互卡顿看 JS 执行、重排重绘、内存；再针对具体项优化（减包、拆 chunk、懒加载、虚拟列表、缓存等）。

---

**Q42-6：虚拟列表（虚拟滚动）手写思路？定高与动态高度分别怎么处理？**

**答：**  
- **思路**：维护“可视区间”的起止索引；用总条数和单条高度（或高度数组）算出**滚动容器总高度**（撑开滚动条）；只渲染当前可视区间 ± buffer 的项，用 **transform: translateY** 或 **绝对定位 top** 把每一项放到正确位置；监听 scroll 或 IntersectionObserver，根据 scrollTop 重算起止索引并更新渲染列表。  
- **定高**：单条高度固定 h，则 startIndex = Math.floor(scrollTop / h)，endIndex 由可视高度除以 h 得到，总高度 = data.length * h；实现简单、性能稳定。  
- **动态高度**：需预估或测量每项高度。常见做法：① 先给预估高度渲染，滚动过程中用 ResizeObserver 或 onLoad 测量真实高度并写入数组，再修正总高度和位置（需缓存已测高度）；② 或采用“按需测量 + 二分查找”确定当前 scrollTop 对应的 startIndex。库如 vue-virtual-scroller、vxe-table 的虚拟滚动都支持动态高度。  
- **注意**：避免在滚动回调里做重逻辑，用 requestAnimationFrame 或节流；列表项用 key 保证复用正确；大列表配合 Object.freeze 或 shallowRef 减少响应式开销。

---

**Q42-7：首屏加载你做过哪些优化？FCP/LCP 如何量化和达标？**

**答：**  
- **做过的优化**：关键 CSS 内联或优先加载、首屏接口合并/预请求、路由懒加载、图片懒加载+合适尺寸、骨架屏、CDN+强缓存静态资源、Gzip/Brotli、减少主包体积（拆 chunk、Tree Shaking）、服务端直出或 SSR 等。  
- **量化**：用 **Lighthouse** 或 **Chrome DevTools → Performance** 看 FCP/LCP；或用 **Performance API**：`performance.getEntriesByType('navigation')` 的 responseStart、domContentLoadedEventEnd，以及 **PerformanceObserver** 观测 `largest-contentful-paint` 等。  
- **达标**：一般目标 FCP &lt; 1.8s、LCP &lt; 2.5s（Good）；可结合业务定内部标准，并在 CI 或监控里打点上报，便于回归。

---

### 懒加载、虚拟滚动与 Web Worker

**LZ-1：前端有哪些懒加载？路由、图片、组件懒加载分别怎么实现？**

**答：**  
- **路由懒加载**：路由配置里 `component: () => import('@/views/Home.vue')`，打包时该页面打成独立 chunk，进入该路由时才加载对应 JS；可配合 `/* webpackChunkName: "home" */` 命名 chunk。  
- **图片懒加载**：首屏外图片不立刻设 src，等进入视口再加载。实现方式：① 原生 **loading="lazy"**（部分浏览器支持）；② **IntersectionObserver** 监听图片容器，进入视口时把 data-src 赋给 src 并加载；③ 滚动时用 scrollTop + 容器位置计算是否在视口内（需节流）。  
- **组件懒加载**：弹窗、Tab 内容等“按需才用”的组件用 **defineAsyncComponent**（Vue3）或 `() => import('./Modal.vue')`，首次打开时才请求并渲染；可配 loading、error 组件和 delay、timeout。

---

**LZ-2：图片懒加载用 IntersectionObserver 和 scroll 监听各有什么优缺点？**

**答：**  
- **IntersectionObserver**：浏览器原生 API，**异步**、不阻塞主线程；由浏览器在合适的时机回调，无需自己算位置和节流；可设置 **rootMargin** 提前或延后触发；**缺点**：兼容性需 polyfill（IE 不全支持）。  
- **scroll 监听**：自己根据 **scrollTop、容器 offsetTop、视口高度** 算是否在视口内；需 **节流**（如 requestAnimationFrame 或 100ms 节流）避免滚动时频繁计算；**缺点**：计算在主线程、易造成卡顿，且要处理容器嵌套、横向滚动等。  
- **建议**：现代项目优先用 **IntersectionObserver**；要兼容老浏览器可降级为 scroll + 节流，或引入 polyfill。

---

**LZ-3：路由懒加载和组件懒加载在 Webpack/Vite 里分别怎么配？magic comment 有什么用？**

**答：**  
- **路由懒加载**：`component: () => import('@/views/xxx.vue')` 即可，Webpack 和 Vite 都会把 import() 打成独立 chunk；无需额外配置，只要用动态 import。  
- **组件懒加载**：Vue3 用 `defineAsyncComponent(() => import('./Comp.vue'))`，同样会打成独立 chunk。  
- **Webpack magic comment**：在 import 括号里写注释可影响打包结果。  
  - `/* webpackChunkName: "home" */`：指定该 chunk 的文件名，便于排查和预加载。  
  - `/* webpackPreload: true */`：让浏览器预加载该 chunk（preload）。  
  - `/* webpackPrefetch: true */`：空闲时预取（prefetch），适合“可能接下来会用的”路由。  
- **Vite**：同样支持 `import(/* @vite-ignore */ './x.vue')` 或动态 import，chunk 命名可通过 rollupOptions.output.manualChunks 等配置。

---

**VS-1：虚拟滚动为什么能解决长列表卡顿？和分页有什么区别？**

**答：**  
- **卡顿原因**：列表有几万条时，若每条都渲染成 DOM，节点数巨大，会导致**首屏渲染慢、滚动时重排/重绘压力大**，从而卡顿。  
- **虚拟滚动思路**：**只渲染可视区域内的若干条**（加少量 buffer），总高度用空白占位撑开滚动条；滚动时根据 scrollTop 算出“当前该显示哪一段”，动态替换渲染的列表项。DOM 数量恒定（如几十个），与总数据量无关，因此不卡。  
- **和分页区别**：**分页**是“一页只显示 N 条，点下一页再请求/切换”，用户要点击才能看更多，**无法连续滚动**看全量；**虚拟滚动**是“数据全在前端，滚动时按需渲染”，**可连续滚动**浏览全量数据，体验更接近原生长列表。  
- **选型**：数据量特别大、且需要“连续滚动扫一遍”用虚拟滚动；数据可分批请求、一页一页看就够用分页。

---

**VS-2：虚拟滚动里的 buffer（缓冲区）是什么？为什么要留 buffer？**

**答：**  
- **buffer**：在“可视区间”上下各多渲染几项（如上下各 5 条），这些多出来的项就是 **buffer**。  
- **作用**：① **减少白屏**：快速滚动时，新项进入视口前就已经在 buffer 里渲染好了，用户不容易看到空白；② **平滑滚动**：滚动到边界时不会因为“刚算出来要渲染新项”而出现短暂空白或闪烁。  
- **大小**：buffer 太小，快速滚动容易露白；太大则 DOM 数量增多、失去虚拟滚动意义。一般取**半屏到一屏**的条数，或固定如 5～10 条，按实际机型调优。

---

**VS-3：虚拟滚动在 Vue 里用 ref 时要注意什么？大列表数据用 reactive 还是 shallowRef？**

**答：**  
- **ref 注意**：列表容器要用 **ref** 拿 DOM 算 scrollTop、clientHeight；子项列表若用 v-for，**key 必须稳定唯一**（如 item.id），避免复用错乱。  
- **大列表数据**：若 list 有几千、几万条，用 **reactive** 或 **ref(reactive([]))** 会让 Vue 对**每一条**做响应式代理，**内存和计算开销大**。  
- **建议**：大列表用 **shallowRef** 或 **ref([])** 且内部不用 reactive 包装每一项；或 **Object.freeze(list)** 让数组不可变，只整体替换；这样只渲染“当前可视区间”的那几十条，减少响应式开销。  
- **注意**：若用 shallowRef 存 list，替换 list 时 `list.value = newList` 会触发更新；若只改某一项且希望视图更新，需要触发一次“可被追踪的更新”（如整体替换或该列表用 reactive 但控制渲染数量）。

---

**WW-1：Web Worker 是什么？和主线程怎么通信？能操作 DOM 吗？**

**答：**  
- **是什么**：**Web Worker** 是浏览器提供的**多线程**机制，在**独立线程**里执行 JS，不阻塞主线程（UI 线程）；适合做大量计算、数据处理等耗时任务。  
- **通信**：通过 **postMessage** 和 **onmessage**。主线程：`worker.postMessage(data)` 发数据；`worker.onmessage = (e) => { e.data }` 收数据。Worker 内：`onmessage = (e) => { ... }` 收数据；`postMessage(result)` 回传结果。数据会**结构化克隆**，不能传函数、DOM、不能包含不可序列化对象。  
- **不能操作 DOM**：Worker 里**没有 window、document**，不能操作 DOM；也不能用大部分 UI 相关 API。只能做计算、网络请求（如 fetch）、定时器等，结果通过 postMessage 回主线程，由主线程更新 DOM。

---

**WW-2：Web Worker 适用哪些场景？和主线程比有什么限制？**

**答：**  
- **适用场景**：① **大量计算**：大数组排序、过滤、复杂数学运算、加密解密；② **数据处理**：大 JSON 解析、CSV/Excel 解析、图片处理（配合 OffscreenCanvas 等）；③ **轮询、定时任务**：在 Worker 里 setInterval 请求或处理，不占主线程；④ **预加载/预计算**：提前在 Worker 里算好结果，主线程需要时直接取。  
- **限制**：① 不能访问 **DOM、window、document**；② 不能访问** localStorage**（部分浏览器可有限支持）；③ 通信只能 **postMessage**，数据需可序列化；④ **同源策略**：Worker 脚本需与页面同源或通过 CORS 加载；⑤ 创建有开销，不宜为小任务频繁 new Worker。  
- **注意**：通信有序列化成本，大数据频繁传递会抵消部分收益；可考虑 **Transferable**（如 ArrayBuffer）转移所有权，减少拷贝。

---

**WW-3：SharedWorker、Service Worker 和 Web Worker 有什么区别？**

**答：**  
- **Web Worker**：**独享**于当前页面，页面关掉 Worker 就结束；用于**当前页**的耗时计算、不阻塞 UI。  
- **SharedWorker**：可被**多个页面/标签页**共享，同一来源的多个页面连到同一个 SharedWorker 实例；适合多 tab 共享状态、共享连接等；兼容性较差（如 Chrome 有、Firefox 曾移除）。  
- **Service Worker**：主要做**离线缓存、网络代理**，是 PWA 的基础；独立于页面生命周期，页面关掉也可存在；可拦截 fetch、缓存资源、推送通知等；**不能直接操作 DOM**，和页面通信靠 **postMessage** + **MessageChannel** 或 **BroadcastChannel**。  
- **对比**：Web Worker = 页面专用计算线程；SharedWorker = 多页面共享的计算线程；Service Worker = 网络/缓存层、离线与推送。

---

**WW-4：在主线程里如何创建一个 Web Worker？Vite/Webpack 里怎么用？**

**答：**  
- **标准写法**：`const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })`；Worker 脚本需单独文件，同源或 CORS。  
- **通信**：`worker.postMessage({ cmd: 'calc', data })`；`worker.onmessage = (e) => { console.log(e.data) }`；Worker 内 `self.onmessage = (e) => { ...; postMessage(result) }`。  
- **Vite**：可用 `new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })`，Vite 会正确处理为独立 chunk；Worker 里也可用 import、ESM。  
- **Webpack**：可用 **worker-loader** 或 **worker-plugin**，或 `new Worker(new URL('./worker.js', import.meta.url))`（Webpack 5 支持）；注意把 Worker 打成单独 bundle。  
- **结束**：`worker.terminate()` 关闭 Worker，释放资源。

---

**Q43：内存泄漏常见原因与排查？Vue 中如何避免？**

**答：**  
**常见原因**：全局变量未释放、未解绑的 DOM 事件或 window 监听、未清除的定时器、闭包引用大对象、DOM 引用未置空、第三方库未正确销毁。  
**排查**：Chrome DevTools → Memory → 拍堆快照，操作前后对比，看 Detached DOM、增长的对象；用 Allocation instrumentation 看分配来源。  
**Vue 中**：在 `onBeforeUnmount`/`beforeDestroy` 里取消事件监听、清定时器、取消订阅、解绑全局监听；避免在 data 或闭包中持有不必要的 DOM 引用；大列表用虚拟滚动控制 DOM 数量。

---

## 七、可视化与图表（AntV G2/G6、ECharts 等）

**Q43-2：AntV G2 和 G6 分别是什么？适用场景有什么不同？**

**答：**  
- **G2**：AntV 的**统计图表库**，面向“数据 → 图形”的可视化。基于**图形语法（Grammar of Graphics）**，通过数据映射（编码）到视觉通道（位置、颜色、大小等）生成折线图、柱状图、饼图、散点图、热力图等。适合**报表、大屏、数据分析**等以“图表”为主的场景。  
- **G6**：AntV 的**图可视化/图分析引擎**，面向**关系数据**（节点 + 边）。支持有向/无向图、树、流程图、DAG 等，提供多种**布局算法**（力导向、树形、环形等）、**交互**（拖拽、缩放、选中、连线）和**扩展机制**。适合**关系图、拓扑图、组织架构、流程图、知识图谱**等。  
- **选型**：看数据形态——以“指标、维度、趋势”为主用 G2；以“实体与关系、节点与边”为主用 G6；同一项目里可同时使用（如大屏里既有 G2 图表又有 G6 关系图）。

---

**Q43-3：G2 里“图形语法”和数据驱动是怎么理解的？如何自定义一种图表？**

**答：**  
- **图形语法**：把图表拆成“数据 + 图形类型 + 视觉通道”。数据映射到**位置**（x、y）、**颜色**（color）、**大小**（size）、**形状**（shape）等，同一份数据通过不同映射得到不同图表（如同一数据可画折线也可画柱状）。  
- **数据驱动**：通过 `chart.data(data)` 或 `chart.interval().data(data)` 绑定数据，G2 根据 encoding（映射规则）自动生成图形元素；数据变更时更新配置或重新 setData 即可刷新图表，无需手写 DOM/SVG。  
- **自定义图表**：  
  - 使用**自定义图形**（register 自定义 shape），在 draw/custom 里根据数据画 SVG 或 Canvas 元素。  
  - 或组合现有 mark（如 line + point + area），通过 transform、scale、style 等做组合与样式定制。  
  - 复杂场景可用 **G2 的 G API** 或底层 **@antv/g** 直接绘图，再与 G2 的坐标系、事件对接。

---

**Q43-4：G6 的图数据模型是什么？常用布局有哪些？如何选型？**

**答：**  
- **图数据模型**：**节点（nodes）** 和 **边（edges）**。节点可有 id、label、类型、样式、业务数据；边有 source、target、以及方向、样式等。数据格式一般为 `{ nodes: [{ id, ... }], edges: [{ source, target, ... }] }`。  
- **常用布局**：  
  - **力导向**（force）：节点间有斥力、边有引力，自动散开，适合关系探索、无层次结构的网络。  
  - **树形**（tree、compactBox、dagre）：有父子关系，适合组织架构、目录、流程图。  
  - **环形**（circular）、**网格**（grid）：节点均匀分布，适合节点数不多、强调并列关系。  
  - ** Dagre**：有向无环图布局，适合流程图、管线图。  
- **选型**：有明确层级用树形；关系复杂、无层次用力导向；需要从左到右/从上到下的流程用 dagre；节点少、要规整用环形/网格。

---

**Q43-5：G6 里如何做大量节点（如上千、上万个）的性能优化？**

**答：**  
- **渲染层**：使用 **Canvas** 渲染（默认）或 **SVG**；Canvas 在节点量很大时通常更稳，可配合 **WebGL** 渲染器（如 G6 的 g-canvas/webgl）做更大规模。  
- **视口与裁剪**：只渲染**视口内**的节点和边，做**视口裁剪（frustum culling）**；缩放、平移时按可见区域更新，减少绘制量。  
- **简化与 LOD**：**缩放级别**不同时显示不同细节（如缩小只显示部分节点或聚合节点）；**边**在远距离时可只画直线、不画箭头或 label。  
- **数据与更新**：用 **增量更新**（只增删改变化的节点/边），避免整图重绘；大数据可考虑**分片加载**或**虚拟化**（按区域加载子图）。  
- **交互**：降低高亮、选中时的重绘范围；防抖/节流拖拽、缩放事件。

---

**Q43-6：在 Vue 里如何集成 G2/G6？组件销毁时要注意什么？**

**答：**  
- **集成**：在组件的 `onMounted`（或 `mounted`）里获取容器 DOM，用 `new Chart(container, options)`（G2）或 `new G6.Graph(config)`（G6）创建实例，把实例挂在组件上（如 `this.chart`），在 `onUnmounted` 里调用 `chart.destroy()` 或 `graph.destroy()` 销毁实例。  
- **注意**：  
  - 容器需有宽高（或通过 `autoFit`/`fitView` 自适应），否则可能不渲染或报错。  
  - **销毁时必须 destroy**：G2/G6 会绑定事件、定时器、监听容器尺寸等，不销毁会导致内存泄漏和重复绑定。  
  - 数据更新时用 `chart.changeData()` / `graph.data()` + `graph.render()` 或对应 API 更新，避免重复 new 实例。  
- **Vue3**：可用 `ref` 拿容器，在 `onMounted` 里初始化，`onBeforeUnmount` 里 destroy；若用 Composition API 封装成 composable，注意在 unmount 时统一 destroy。

---

**Q43-7：ECharts 是什么？和 AntV G2 的定位和用法有什么异同？**

**答：**  
- **ECharts**：Apache 的**开源图表库**，基于 Canvas（可选 SVG），提供折线、柱状、饼图、散点、地图、K 线、仪表盘等**开箱即用的图表类型**，配置项丰富（option 里配 series、xAxis、yAxis 等），适合**报表、大屏、后台**。  
- **与 G2 异同**：  
  - **定位**：都是统计图表库；ECharts 偏“配置驱动”、按图表类型选 series；G2 偏“图形语法”、按数据与视觉通道组合。  
  - **用法**：ECharts 通过 `setOption(option)` 配置，option 里声明 series 类型和 data；G2 通过 mark + data + encode 等组合。  
  - **扩展**：ECharts 可自定义系列（registerSeries）、自定义图形（graphic）；G2 可自定义 shape、组合 mark。  
- **选型**：要快速出各种常规图表、团队熟悉 option 配置选 ECharts；要强定制、图形语法风格、与 AntV 图分析（G6）统一技术栈可选 G2。

---

**Q43-8：ECharts 里大数据量（如十万点）如何优化？**

**答：**  
- **采样与降采样**：用 **sampling**（如 'lttb'、'min'、'max'）对折线/面积图采样，减少绘制点数；或后端/前端先对数据聚合（按区间、时间粒度）再传给 ECharts。  
- **使用专业系列**：**scatter** 大量点可用 **scatter** 的 large 模式（大数模式）；**lines** 可用 **lines** 的 polyline 或分段；**map** 可用 **geo** + 散点或 **visualMap** 分段着色，避免逐点绘制。  
- **按需渲染**：**dataZoom** 限制显示范围，只渲染窗口内数据；配合 **axisPointer**、**tooltip** 按需计算。  
- **Canvas 与 SVG**：数据量极大时优先 **Canvas** 渲染（默认）；SVG 适合节点少、需交互精细的场景。  
- **分片与增量**：数据特别大时可分片 appendData 或 setOption 时只传当前视图数据，滚动/缩放时再加载对应区间。

---

**Q43-9：数据大屏在适配和性能上一般怎么做？**

**答：**  
- **适配**：  
  - **缩放**：用 CSS `transform: scale()` 或 JS 按设计稿宽高与当前窗口宽高比缩放整屏容器，保持比例；注意字体、线宽在缩放后仍清晰。  
  - **rem/vw**：按设计稿基准换算，大屏统一用一套基准（如 1920×1080），用 vw/vh 或 rem 做等比缩放。  
  - **媒体查询**：不同分辨率下调整字体、间距、图表数量，避免过小或过挤。  
- **性能**：  
  - 图表**按需加载**、**懒渲染**（如视口内再 init）；控制**同时存在的图表数量**，不可见时 dispose 或不清数据只隐藏。  
  - **防抖/节流** resize、数据刷新；**数据更新**用 setOption 的 notMerge 或 replaceMerge 控制合并策略，避免全量重绘。  
  - **动画**可适当减弱或关闭；大屏若 24 小时常亮，注意**内存与定时器**，定时刷新数据时避免泄漏。

---

**Q43-10：Canvas 和 SVG 在图表/可视化里各适合什么场景？**

**答：**  
- **Canvas**：**像素绘制**，适合**元素多、动态多**的场景（如大量点、粒子、实时曲线）；同一画布上重绘成本相对稳定，**大数据量**下更省 DOM、性能更好；弱点是**无内置 DOM 事件**，需自己算坐标做交互。  
- **SVG**：**矢量 DOM**，每个图形是元素，适合**元素数量中等、交互多**（如点击、hover 高亮、精细 tooltip）；可被 CSS、审查器直接操作，**无障碍和 SEO** 更好；元素过多时 DOM 压力大，**大数据量**下不如 Canvas。  
- **选型**：折线/柱状/散点等**数据点很多**用 Canvas（ECharts/G2 默认）；关系图、流程图、**节点可点选、需精细交互**的可用 SVG 或 Canvas+ 自绘交互层。ECharts 可配 renderer: 'canvas' 或 'svg'；G2 底层也可选渲染器。

---

**Q43-11：Vue 里封装 ECharts 组件时，如何做按需引入、主题和 resize？**

**答：**  
- **按需引入**：使用 `echarts/core` + 按需注册所需组件（如 `BarChart`、`LineChart`、`GridComponent`、`TooltipComponent` 等）和 `CanvasRenderer`/`SVGRenderer`，可显著减小打包体积；或用 `echarts/charts/line` 等子路径，避免全量 `import * as echarts from 'echarts'`。  
- **主题**：`echarts.init(dom, 'dark')` 或 `echarts.registerTheme('custom', themeObj)` 后 init 时传入主题名；也可在 `setOption` 里覆盖 color、backgroundColor 等。  
- **resize**：容器尺寸变化时调用 `chart.resize()`，避免图表被拉伸或留白。在 Vue 里可在 `onMounted` 里监听 `window.resize` 或用 **ResizeObserver** 监听容器，在回调里 `chart.resize()`；`onUnmounted` 时移除监听并 `chart.dispose()`。  
- **注意**：容器需有宽高；数据更新用 `setOption(newOption, { notMerge: true })` 或按需 merge，避免重复 init。

---

**Q43-12：G6、X6、D3 在做拓扑图/网络图时如何选型？各有什么特点？**

**答：**  
- **G6（AntV）**：偏**图分析、关系数据**，内置力导向/树形/Dagre 等布局，节点与边可扩展、有完整事件与状态；适合**拓扑图、知识图谱、组织架构**，与 AntV 生态（G2 图表）统一，中文文档友好。  
- **X6（AntV）**：偏**流程图、画布编辑**，支持拖拽建节点、连线、对齐、撤销重做等**交互编排**，更适合“画拓扑、布线”的可视化编辑场景；与 G6 同门，可结合使用（如 X6 做编辑、G6 做只读展示与布局）。  
- **D3**：底层**数据驱动 DOM/SVG**，无内置图概念，需自己算布局（如 d3-force）、画节点和边；**灵活度最高**，适合强定制、非标准图或与其它可视化结合；学习成本和开发量较大。  
- **选型**：要“只读展示 + 布局 + 关系分析”选 G6；要“拖拽布线、设备连线、流程图编辑”选 X6；要完全自定义或与现有 D3 图表统一用 D3。

---

**Q43-13：拓扑图里“设备状态动态更新”怎么做？如何避免整图重绘、保证流畅？**

**答：**  
- **数据驱动**：设备状态（在线/离线/告警等）作为节点数据的一部分（如 `node.state`），通过 **增量更新** 只改变化节点，而不是整图 `graph.data()` 全量替换。  
- **局部更新**：G6 可用 `graph.updateData('node', nodeId, { style: { fill }, state: 'selected' })` 等；只重绘该节点或受影响的边，避免整图画布 clear + 全量 render。  
- **状态与样式**：用状态到样式的映射（如 state → 颜色、图标），更新状态后刷新对应节点样式；可配合 **自定义节点** 在 keyShape 或 label 里根据 state 渲染不同 icon/颜色。  
- **性能**：高频推送时做**节流/合并**，如 100ms 内多次状态变更合并成一次 updateData；大图时只更新视口内或当前选中的节点；动画可适当关闭或缩短，减少重绘。

---

**Q43-14：大屏场景下 WebSocket 高频推送监控数据，前端如何保证实时性与稳定性？**

**答：**  
- **实时性**：收到推送后优先更新关键指标和图表（setOption 或 store 更新），避免在渲染前做重计算；可对**非关键数据做节流**（如 200ms 更新一次），保证画面不卡的同时数据不过于滞后。  
- **稳定性**：① **断线重连**：onclose/onerror 时按策略重连（指数退避），并区分“用户关闭”与“异常断开”；② **心跳**：定时发 ping、收 pong，超时未收到则主动 close 再重连；③ **消息队列**：重连成功后若有“拉取离线/补发”接口，可补拉断线期间数据，再恢复订阅。  
- **大屏注意**：多图表同时收同一条推送时，用**单一数据源（如 Pinia）** 更新，避免多处重复 setOption；长时间运行要防**内存泄漏**（定时器、WebSocket、图表 dispose）；可做“无数据超时”提示，避免假连接。

---

### 大量数据渲染优化（专项）

**Q43-15：Canvas 渲染大量图形时，有哪些通用优化手段？离屏 Canvas、分层、批量绘制？**

**答：**  
- **离屏 Canvas**：静态或变化少的层（如网格、背景）画到离屏 canvas，主 canvas 用 `drawImage(offScreen, 0, 0)` 一次性贴图，避免每帧重画静态内容。  
- **分层**：把“背景 / 数据层 / 交互层”分到不同 canvas 叠在一起，只重绘变化的那一层（如只有数据层每帧更新），减少每帧绘制量。  
- **批量绘制**：相同样式的图形尽量连续绘制、少切换 state（如 fillStyle、strokeStyle）；能用一条 path 画完的用 beginPath + 多次 lineTo 再统一 stroke，减少 API 调用。  
- **requestAnimationFrame**：动画或定时刷新用 rAF 驱动，避免 setInterval 造成掉帧；在 rAF 里做计算 + 单次 draw，控制单帧耗时在 16ms 内。  
- **裁剪**：只重绘**视口内**区域（clearRect 只清可见区、或 clip + 绘制），配合“只绘制在视口内的数据”减少像素填充。

---

**Q43-16：什么是视口裁剪（frustum culling）？在图表和图里怎么用？**

**答：**  
- **概念**：只对**当前可视区域**内的元素进行绘制或更新，视口外的数据不参与渲染，从而在数据量很大时保证帧率。  
- **图表（折线/散点）**：根据坐标轴范围（dataZoom 或当前 x/y 范围）过滤数据，只把**在可见区间内的点**传给 series.data；滚动/缩放时重新算可见区间再 setData，避免几万点一次性绘制。  
- **图（G6 等）**：根据画布变换（平移、缩放）算出视口在“图坐标”下的范围，只 render 该范围内的节点和边；或库内部已做视口裁剪，配置开启即可。  
- **注意**：可见区间要留一点 buffer，避免边缘闪烁；时间轴或连续数据可用“区间查询”在数据源侧就过滤，减少传到前端的量。

---

**Q43-17：LOD（Level of Detail）在可视化里怎么用？举图表和图两种例子。**

**答：**  
- **概念**：根据**缩放级别或视口大小**切换不同精度的展示，缩小/远距离时用简化版，放大/近距离时用详细版，在保证效果的前提下控制绘制量。  
- **图表**：  
  - 缩放级别小（显示时间长范围）时用**降采样**后的数据（如每 N 个点取 1 个，或 LTTB 采样），只画少量点；放大后显示更细时间范围，再用更密或全量数据。  
  - 散点图点数过多时，可先画**聚合点**（如网格聚合、六边形 binning），点击或放大再展开该区域明细。  
- **图（节点/边）**：  
  - 缩小整体时只显示**关键节点**或**聚合节点**，边用直线、不画箭头和 label；放大某区域后再加载该区域下的详细节点、边样式、label。  
- **实现**：根据 zoom level 或 viewport 尺寸设阈值，切换不同的 data 或不同的 draw 逻辑（如“简化边” vs “完整边”）。

---

**Q43-18：折线图/时间序列“超大量点”除了采样还有哪些优化？ECharts 的 sampling、appendData 怎么选？**

**答：**  
- **采样**：ECharts 的 **sampling: 'lttb'**（Largest-Triangle-Three-Buckets）在保持形状的前提下减少点数；'min'/'max' 按区间取最值，适合阶梯状。前端或后端先按时间窗口聚合（如 1 分钟 1 点）再传给图表，也是常见做法。  
- **dataZoom**：用 **dataZoom** 限制 x 轴显示范围，只渲染窗口内数据；配合 **dataZoom 的 rangeMode** 或自己按 start/end 过滤 data，避免全量绘制。  
- **appendData**：**appendData** 适合**流式追加**（实时推送新点），在已有图表上增量追加而不是整份 setOption，减少重复计算和重绘范围；大数据初始加载仍建议先传“当前窗口”数据，再按需加载历史。  
- **大数模式**：ECharts 的 **series-line** 配 **large: true** 会走大数优化（内部采样或简化绘制）；**scatter** 的 **largeThreshold** 超过该阈值启用大数模式。  
- **其他**：关闭或简化 **animation**；**progressive** 分片渲染，避免一次性渲染太多导致卡顿。

---

**Q43-19：散点图或热力图有几十万点时，前端渲染策略有哪些？**

**答：**  
- **降采样 / 聚合**：在**数据层**先做网格聚合（如把平面分成格子，每格一个点或一个权重），用聚合后的数据画散点或热力；或随机/均匀采样到可绘制数量（如 1 万以内）。  
- **Canvas + 大数模式**：ECharts **scatter** 开 **large: true**、**largeThreshold** 设大，用 Canvas 渲染，库内部会做简化；**heatmap** 用 **blur**、**pointSize** 控制热力点大小，数据可先网格化再传入。  
- **按视口过滤**：只把**当前坐标范围**内的点传给图表（前端按 bounds 过滤或后端按 bbox 查询），缩放/平移时重新请求或重新过滤，保证单次绘制点数可控。  
- **WebGL**：若库支持（如 ECharts 的 scatter-gl、G6 的 WebGL 渲染器），用 **WebGL** 可承载更多点，适合几十万级；需权衡兼容性和包体积。  
- **分层**：底图用低精度热力/散点，高亮或选中时再请求并绘制该区域明细，避免一屏同时画几十万点。

---

**Q43-20：ECharts 里 setOption 的 merge、replaceMerge、notMerge 有什么区别？大数据更新时怎么选？**

**答：**  
- **merge（默认）**：新 option 与旧 option **按系列名、组件名合并**，未写的保留旧值；适合**增量更新**（如只改某个 series 的 data），避免整图重绘。  
- **notMerge**：**不合并**，用新 option **完全替换**旧配置；适合**整图切换**（如换图表类型、换数据源），会完整重绘。  
- **replaceMerge**：指定要**替换**的组件/系列（如 `replaceMerge: ['series']`），这些用新值完全替换，其余仍合并；适合**只替换 series 数据**而保留其他配置（如 xAxis、tooltip），避免误保留已删 series。  
- **大数据更新**：只更新数据时用 **merge** 且只传变化的 series；整份数据替换时用 **replaceMerge: ['series']** 或 **notMerge**，并注意**不要每帧传整份大 data**，优先用**增量或窗口数据**减少序列化与 diff 成本。

---

**Q43-21：可视化场景下如何做渲染性能监控？FPS、单帧耗时、内存怎么排查？**

**答：**  
- **FPS**：用 **requestAnimationFrame** 计算两帧间隔，或 Chrome DevTools **Performance** 面板看 FPS 曲线；FPS 持续低于 60 说明存在掉帧，需定位是 JS 计算还是绘制耗时。  
- **单帧耗时**：在 rAF 或 setOption 前后打 **performance.now()**，算单次渲染耗时；或用 **Performance** 录屏看主线程里 ECharts/Canvas 的调用栈和耗时，定位是 layout、paint 还是 script。  
- **内存**：**Memory** 面板拍堆快照，对比操作前后；图表 dispose 后应释放 Canvas、事件监听；大屏 24 小时运行时关注**图表实例、缓存、定时器**是否持续增长，避免泄漏。  
- **实践**：开发阶段用 **ECharts 的 showLoading / hideLoading** 或自定义 overlay 显示“渲染耗时 xx ms”；生产可上报“图表渲染耗时”到监控，便于发现慢设备或大数据场景。

---

**Q43-22：WebGL 在图表/图可视化里什么时候用？和 Canvas 的取舍？**

**答：**  
- **何时用 WebGL**：**数据量极大**（如散点十万级以上、图节点上万）且 Canvas 已明显卡顿时；需要**粒子、3D、体素**等 Canvas 难以高效实现的效果时；库提供 WebGL 版本（如 ECharts scatter-gl、G6 WebGL 渲染器）且团队能接受兼容性与包体积时。  
- **和 Canvas 取舍**：  
  - **Canvas**：兼容性好、调试方便、包小；适合**十万点以内**的 2D 图表、常规折线柱状散点；交互（如精确 hitTest）需自己算坐标。  
  - **WebGL**：**GPU 并行**，适合**海量点/线**、复杂光照与特效；需要 WebGL 环境、调试成本高、部分移动端支持一般；交互通常要自己做射线检测或转屏幕坐标。  
- **选型**：常规报表、大屏以 Canvas 为主；确有“百万点、实时流”等需求再上 WebGL 或带 WebGL 的图表库，并做好降级（不支持时回退到采样 + Canvas）。

---

**Q43-23：G2/G6 或 ECharts 在 Vue 里数据量很大时，如何避免组件重复渲染导致图表卡顿？**

**答：**  
- **图表实例与响应式分离**：把**传给图表的数据**放在 **ref/reactive** 里没问题，但**不要在模板里依赖“图表内部状态”**导致整组件频繁重渲染；图表的更新用 **chart.changeData() / setOption()** 在 effect 或 watch 里调用，而不是依赖组件 re-render 再重画。  
- **大 data 用 shallowRef 或 markRaw**：若 data 很大（如几万条），用 **shallowRef** 存数据，避免 Vue 深度响应式代理整份数据；或 **markRaw** 标记“不转响应式”，只在需要更新时整体替换 ref。  
- **防抖/节流**：watch 数据变化时 **debounce** 再 setOption/changeData，避免一次请求返回后连续多次 setState 触发多次重绘。  
- **按需更新**：只更新**变化的部分**（如 ECharts 的 merge、G6 的 updateData），避免整图 clear + 全量 render；容器用 **ResizeObserver** 而不是依赖父组件传宽高，减少因布局变化导致的整组件更新。

---

## 八、代码规范与可维护性

**Q44：你遵循的代码规范？ESLint、Prettier 怎么用？**

**答：**  
- **ESLint**：检查语法错误、最佳实践、团队规则（如 Vue、TypeScript 规则集），可自动修复部分问题。  
- **Prettier**：统一格式（缩进、引号、分号等），与 ESLint 配合时可用 eslint-config-prettier 关闭冲突规则。  
- 命名：组件 PascalCase、文件与组件一致、变量/函数 camelCase、常量大写下划线。  
- 提交前跑 lint（或 husky + lint-staged），CI 里强制通过。

---

**Q44-2：ESLint 是什么？工作原理？常见规则有哪些？**

**答：**  
- **是什么**：ESLint 是 JavaScript/TS 的静态代码检查工具，用来发现语法错误、不推荐写法、风格不一致和潜在 bug，部分规则支持自动修复（--fix）。  
- **工作原理**：把源码解析成 AST（抽象语法树），再根据配置的规则对 AST 做检查；规则可以报 error/warning，部分规则提供 fix 函数做自动修复。  
- **常见规则**：  
  - 语法/质量：no-unused-vars、no-undef、no-console、eqeqeq（推荐 ===）、no-var（推荐 let/const）。  
  - 风格：quotes、semi、indent、comma-dangle（可与 Prettier 交给 Prettier 管）。  
  - Vue：vue/no-unused-components、vue/multi-word-component-names、vue/require-default-prop 等（需 eslint-plugin-vue）。  
  - TypeScript：@typescript-eslint 系列，如 no-explicit-any、consistent-type-imports 等。  
- **配置方式**：`.eslintrc.js` / `eslint.config.js`（扁平配置）里写 extends、plugins、rules；可继承 eslint:recommended、plugin:vue/recommended、@typescript-eslint/recommended 等。

---

**Q44-3：如何扩展 ESLint 配置？和 Prettier 如何配合？**

**答：**  
- **扩展配置**：在 `extends` 里继承官方或社区配置（如 `eslint:recommended`、`plugin:vue/recommended`、`@typescript-eslint/recommended`），在 `plugins` 里引入插件（如 vue、@typescript-eslint），在 `rules` 里覆盖或新增规则（"off"/"warn"/"error"）。  
- **与 Prettier 配合**：ESLint 里既有代码质量规则也有格式规则，Prettier 只负责格式；两者可能冲突（如缩进、分号）。  
  - 做法：用 **eslint-config-prettier** 关掉 ESLint 里所有和格式相关的规则，让格式只由 Prettier 管；再配合 **eslint-plugin-prettier**（可选）把 Prettier 当一条 ESLint 规则跑，这样 `eslint --fix` 会顺带执行 Prettier。  
  - 推荐：extends 里先写 Prettier 相关（如 `prettier`、`plugin:prettier/recommended`），再写 Vue/TS 等，避免后面的配置又把格式规则打开。

---

**Q44-4：ESLint 的自动修复、忽略、在 CI 里怎么用？**

**答：**  
- **自动修复**：`eslint --fix` 会对支持 fix 的规则自动改代码（如加分号、删多余空格、部分 unused 变量删除）；保存时在编辑器里跑 fix，或提交前用 lint-staged 对暂存文件跑 `eslint --fix`。  
- **忽略**：在 `.eslintignore` 里写不检查的路径（如 dist、node_modules、打包产物）；在单行或块里用 `// eslint-disable-next-line rule-name` 或 `/* eslint-disable rule-name */` 临时关规则；对第三方/生成代码可整文件 disable。  
- **CI 里**：在流水线里跑 `eslint .`（或指定目录），非 0 退出则失败，保证合入前代码通过检查；可配合 `--max-warnings 0` 把 warning 也当错误。这样团队风格和基础质量由工具卡住，减少 Code Review 负担。

---

**Q45：如何写可维护的代码？项目结构怎么划分？**

**答：**  
- 单一职责：函数/组件只做一件事；少重复，抽公共逻辑与组件。  
- 清晰命名与注释：复杂逻辑加注释；目录与文件命名见名知意。  
- 类型约束：用 TypeScript 或 JSDoc，减少隐式类型错误。  
- **项目结构**：按功能模块划分（如 views、components、api、utils、store）；公共组件与业务组件分开；API、常量、类型集中管理；便于定位与扩展。

---

**Q46：Code Review 你一般关注哪些点？**

**答：**  
- **功能**：需求是否实现、边界与异常是否处理。  
- **性能**：是否有明显性能问题（重复请求、大列表、重排重绘）。  
- **安全**：XSS、敏感信息是否暴露、权限校验。  
- **可读性**：命名、结构、注释是否清晰。  
- **规范**：是否符合项目规范、是否有明显冗余或重复。  
- **测试**：关键逻辑是否有测试或可测性。

---

**Q46-2：Git 提交规范？Conventional Commits 了解吗？**

**答：**  
统一提交信息便于回溯、生成 CHANGELOG、配合 CI。  
**Conventional Commits**：`<type>(<scope>): <subject>`，如 `feat(auth): 登录增加验证码`。  
常见 type：feat（新功能）、fix（修 bug）、docs、style、refactor、perf、test、chore。  
可配合 commitlint、husky 在提交时校验，保证格式一致。

---

## 九、CI/CD 与部署

**Q47：CI/CD 是什么？有什么好处？**

**答：**  
- **CI（持续集成）**：代码合入主干前/后，自动执行构建、测试、检查（如 lint），尽早发现错误，保证主干可发布。  
- **CD（持续交付/持续部署）**：在 CI 通过后，自动把产物部署到测试/预发/生产环境。持续交付指“随时可发布”，持续部署指“自动发布到生产”。  
**好处**：减少手工构建与部署带来的遗漏和错误；每次提交都有流水线反馈，质量更可控；发布频率可提高，支持快速迭代与回滚。

---

**Q48：常用的 CI/CD 工具有哪些？你用过哪些？**

**答：**  
- **Jenkins**：自建、插件多、可高度定制，需自己维护服务器和配置。  
- **GitLab CI / GitHub Actions**：与代码仓库集成，用 YAML 配置流水线，GitHub Actions 按需计费、生态丰富。  
- **云厂商**：阿里云效、腾讯云 CODING、AWS CodePipeline 等，与云资源打通，部署到 OSS/ECS 等方便。  
- **Travis CI、CircleCI**：常与 GitHub 配合，开源项目常用。  
前端项目常用 GitHub Actions 或 GitLab CI 做 push 触发构建、打 tag 触发发布；公司内可能用 Jenkins 或云效统一管理。

---

**Q49：前端项目典型的 CI 流程包含哪些步骤？**

**答：**  
- **拉取代码**：从仓库 checkout 指定分支或 tag。  
- **安装依赖**：`npm ci` 或 `yarn install --frozen-lockfile`，保证依赖版本一致。  
- **代码检查**：`npm run lint`（ESLint），可选类型检查 `tsc --noEmit`。  
- **单元/ e2e 测试**：`npm run test`，失败则流水线终止。  
- **构建**：`npm run build`，产出 dist 等静态资源。  
- **（可选）产物上传**：把 dist 上传到 OSS/S3、或推送到内部制品库。  
- **（可选）部署**：根据分支或 tag 部署到测试/预发/生产（见下一题）。  
可设置：仅 MR 合并时跑完整流程；或 push 只跑 lint+build，打 tag 时才部署。

---

**Q50：前端如何做自动化部署？静态资源一般放哪里？**

**答：**  
- **静态站点**：构建产物（HTML/CSS/JS）上传到 **对象存储 + CDN**（如阿里云 OSS、腾讯云 COS、AWS S3 + CloudFront），通过 CDN 域名访问；配置好缓存、HTTPS 即可。  
- **部署到服务器**：用 scp/rsync 把 dist 拷到 Nginx 目录，或通过 Jenkins/云效的“部署步骤”执行脚本；也可用 **Docker** 把 dist 打成镜像，推镜像仓库后由 K8s 或 ECS 拉取运行。  
- **自动化**：CI 流水线里在 build 成功后执行“上传 OSS”或“发服务器”的步骤；用环境变量或密钥管理 OSS/服务器账号，不在代码里写死。  
- **SPA 路由**：若用 history 模式，需在服务器或 CDN 配置 fallback 到 index.html，避免刷新 404。

---

**Q51：多环境（开发 / 测试 / 生产）如何管理？**

**答：**  
- **环境变量**：用 `.env.development`、`.env.test`、`.env.production` 或构建时注入（如 Vite 的 `import.meta.env`、Webpack 的 DefinePlugin），区分 API 地址、是否开启 mock 等。  
- **构建命令**：`npm run build:test`、`npm run build:prod` 对应不同 mode 或 env，打出不同配置的包。  
- **CI 里区分**：根据分支（如 develop → 测试、main → 生产）或 tag 选择不同 env 和部署目标；同一份流水线，不同分支触发不同步骤。  
- **部署目标**：测试环境用测试 API + 测试域名；生产用生产 API + 正式域名，密钥从 CI 密钥管理里读，不写进代码。

---

**Q52：部署时如何做灰度发布或回滚？**

**答：**  
- **灰度**：只把新版本放给部分用户（按比例、按地区、按用户 ID 等）。实现上可以是：部分流量走新版本静态资源（不同路径或不同 CDN 路径）、或通过网关/负载均衡把部分请求指到新版本；前端可配合服务端下发的“灰度标识”决定是否拉新资源。  
- **回滚**：保留上一版构建产物或镜像，出问题时一键切回上一版（如切 Nginx 指向、切 K8s 版本、或重新部署上一 tag）；前端还可通过 CDN 刷新或版本号/文件名强刷缓存。  
- **建议**：打 tag 或打版本号，每次发布可追溯；重要发布前在预发验证，生产发布后做简单冒烟与监控。

---

**Q53：如何设计 GitLab CI/CD 三阶段流水线（node-build / docker-build / helm-deploy），实现从代码提交到生产部署的全自动化？**

**答：**  
- **阶段一：node-build**  
  - 拉取代码，`npm ci` 安装依赖，执行 `npm run lint`、`npm run test`（可选）、`npm run build`。  
  - 产出 dist 等静态资源，可通过 artifacts 传给下一阶段，或直接作为 Docker 构建上下文。  
  - 只有通过 lint/build 才进入下一阶段，保证只有可构建成功的代码才打镜像。  

- **阶段二：docker-build**  
  - 使用多阶段构建（见 Q54）：先在一阶段用 node 镜像执行 build，再在二阶段把 dist 拷贝进 nginx 镜像，只保留最终 nginx 镜像。  
  - 在 CI 里执行 `docker build -t registry/项目:${CI_COMMIT_SHA}`，再 `docker push` 到 GitLab Container Registry 或公司镜像仓库。  
  - 镜像 tag 建议用 commit SHA 或 tag 名，便于追溯和回滚。  

- **阶段三：helm-deploy**  
  - 使用 Helm 部署到 K8s（见 Q55）：根据分支或 tag 选择 values（Dev/UAT/Prod），执行 `helm upgrade --install`，把上一步推送的镜像地址和版本传入 values。  
  - 例如：develop 分支 → Dev 环境，release/* 或 tag → UAT/Prod；通过 `--set image.tag=${CI_COMMIT_SHA}` 或 values 文件注入镜像版本。  

- **全自动化**：push 到对应分支或打 tag 时自动触发对应阶段；可通过 only/except 或 rules 控制（如仅 main 或 tag 才执行 helm-deploy 到 Prod）。  
- **.gitlab-ci.yml 示例结构**：定义 stages: [node-build, docker-build, helm-deploy]；各 job 指定 stage 和依赖，后一阶段依赖前一阶段产物（镜像地址、chart）。

---

**Q54：如何基于 Nginx + Docker 多阶段构建优化镜像体积？如何配置 Kubernetes HPA 实现弹性伸缩和负载均衡？**

**答：**  

**Nginx + Docker 多阶段构建**：  
- **第一阶段**：使用 `node:xx-alpine` 作为 builder，COPY 源码，`npm ci --omit=dev`、`npm run build`，得到 dist。  
- **第二阶段**：使用 `nginx:alpine` 作为最终镜像，只 `COPY --from=builder /app/dist /usr/share/nginx/html`，再 COPY 自定义 `nginx.conf`（如 SPA 的 try_files、gzip、缓存等）。  
- **效果**：最终镜像只含 nginx + 静态文件，不含 node_modules 和源码，体积从几百 MB 降到几十 MB 级别。  

**Kubernetes HPA（弹性伸缩）**：  
- 在 K8s 里为前端 Deployment 创建 HPA：`kubectl autoscale deployment 前端名 --min=2 --max=10 --cpu-percent=70`，或基于内存、自定义指标。  
- 需确保 Deployment 里配置了 resources.requests，Metrics-Server 已安装，这样可根据 CPU/内存使用率自动增减 Pod 副本数。  

**负载均衡**：  
- 通过 Service（ClusterIP/LoadBalancer/NodePort）暴露 Deployment，K8s 自动把流量分发到多个 Pod；Ingress 可配置域名、HTTPS、路径路由，背后指向该 Service，实现对外负载均衡。

---

**Q55：如何通过 Helm Chart 模板化部署配置，支持多环境（Dev/UAT/Prod）参数化部署和版本回滚？**

**答：**  

**Helm Chart 模板化**：  
- 用 `helm create 项目名` 生成 Chart 骨架，在 `values.yaml` 里定义默认值（replicaCount、image、resources、ingress 等）。  
- 在 templates 里用 `{{ .Values.xxx }}`、`{{ .Release.Name }}` 等写 Deployment、Service、Ingress、ConfigMap 等 YAML，一份模板多环境复用。  
- 多环境用不同 values 文件：`values-dev.yaml`、`values-uat.yaml`、`values-prod.yaml`，分别配置副本数、镜像仓库、域名、资源限制、HPA 参数等。  

**参数化部署**：  
- CI 里根据分支或 tag 选择 values：`helm upgrade --install  release名 ./chart -f values-${ENV}.yaml --set image.tag=${镜像TAG} -n ${namespace}`。  
- 通过 `--set` 或 CI 变量覆盖关键参数（如镜像 tag、副本数），实现 Dev/UAT/Prod 同一套 Chart、不同参数部署。  

**版本回滚**：  
- Helm 会记录每次 release 的 history，`helm rollback release名 版本号` 可回滚到上一版本（或指定 revision）。  
- 回滚会恢复该版本对应的镜像 tag 和配置，等同于“重新部署上一版”；配合 CI 中镜像 tag 用 commit SHA，可精确回滚到任意历史版本。

---

**Q56：如果让你搭建，你会怎么把 ChatGPT（或大模型）给公司内部用？**

**答：**  

- **接入方式**  
  - **公有云 API**：直接调用 OpenAI / 国内大模型厂商 API，在公司内部做一个统一入口（如内部网页、飞书/企微机器人、IDE 插件），由后端转发请求并统一管理 API Key、用量和审计。  
  - **私有化/本地部署**：若数据敏感、不能外传，可部署开源模型（如 Llama、GLM、Qwen）到公司 GPU 服务器或 K8s，通过内网 API 对外提供；需考虑算力、运维和模型更新。  

- **安全与合规**  
  - **数据不出域**：敏感业务用私有化或国产合规 API，避免把代码、客户数据发到境外。  
  - **脱敏与审计**：请求前对输入做敏感信息脱敏（如手机号、身份证）；记录谁在何时问了什么、用于审计和事后排查。  
  - **权限与范围**：按部门/角色控制谁能用、能用哪些场景（如仅文档总结、禁止上传代码）；敏感操作可要求二次审批或禁止。  

- **落地形态**  
  - 内部 **Chat 网页**：统一登录（SSO）、对话历史可存公司侧、支持常用 prompt 模板。  
  - **集成到现有系统**：在 OA、文档、客服系统里嵌入“智能助手”，只开放限定能力。  
  - **开发侧**：为研发提供封装好的 API 或 SDK，规范调用方式、限流和监控，避免各部门各自申请 Key、难以管控。  

- **成本与选型**  
  - 公有云按量付费，需做用量配额和成本分摊；私有化一次性投入高，适合长期、高用量或强合规场景。  
  - 选型时考虑：数据合规、响应延迟、多模态需求、是否要微调/私有知识库等。  

**总结**：先明确“谁能用、用在什么场景、数据能不能出公司”，再选公有 API 还是私有化；统一入口 + 权限 + 审计 + 脱敏，既能用上 AI，又可控、可追溯。

---

**Q56-2：前端具体怎么调用公司内部的 ChatGPT/大模型？**

**答：**  

- **不直连、走后端代理**  
  - API Key 不能放在前端（会被看到、被滥用），前端只调**公司自己的后端接口**，由后端再请求 OpenAI/大模型 API。  
  - 前端请求：`POST /api/chat`（或 `/api/v1/llm/chat`），body 里带 `messages`、`stream` 等；后端校验登录态、权限、限流后，再转发到厂商 API，并把 Key 放在服务端环境变量里。  

- **接口约定**  
  - **非流式**：`POST /api/chat`，body 如 `{ "messages": [{ "role": "user", "content": "..." }], "stream": false }`，后端返回完整回复 `{ "content": "..." }`，前端直接展示。  
  - **流式**：同一接口设 `stream: true`，后端用 **SSE（Server-Sent Events）** 或 **WebSocket** 把模型输出按 chunk 推给前端；前端用 `EventSource`（SSE）或 `WebSocket` 接收并逐字/逐段渲染，体验更顺滑。  

- **前端调用示例（流式 SSE）**  
  - 使用 `EventSource` 时：后端返回 `Content-Type: text/event-stream`，前端 `new EventSource('/api/chat?stream=1')` 或通过 `fetch` + `ReadableStream` 读 body，按行解析 `data:` 事件并追加到界面。  
  - 使用 `fetch` 流式：`fetch('/api/chat', { method: 'POST', body: JSON.stringify({ messages, stream: true }) })`，然后 `response.body.getReader()` 读流，解码后拼接并更新 DOM。  
  - 需处理：**中止请求**（用户点“停止生成”时 `AbortController.abort()`）、**错误与重试**（网络断、超时、429 限流）、**加载状态**（loading、错误提示）。  

- **鉴权与安全**  
  - 前端请求时带上登录态（Cookie 或 Header 里的 Token），后端根据 Token 识别用户、做权限和审计；敏感场景可对输入做前端脱敏（如手机号打码），后端再二次校验。  

- **小结**  
  - 前端只调公司后端接口，不碰 API Key；流式用 SSE 或 fetch 流式读取；处理好停止、错误和 loading，即可完成“前端怎么调用”的闭环。

---

## 十、Git 与版本管理（Git / SVN）

**G1：Git 的工作区、暂存区、本地仓库、远程仓库分别是什么？常用命令怎么对应？**

**答：**  
- **工作区**：当前目录里能看到、能编辑的文件，即工作副本。  
- **暂存区（index/stage）**：`git add` 后文件进入暂存区，表示“下次 commit 会把这些变更纳入”。  
- **本地仓库**：`.git` 目录，存提交历史、分支、标签等；`git commit` 把暂存区内容提交到当前分支，生成一次提交。  
- **远程仓库**：远程服务器上的仓库，`git push` 把本地分支推上去，`git pull`/`git fetch` 从远程拉取。  
- **常用对应**：修改文件在工作区 → `git add` 放入暂存区 → `git commit` 提交到本地 → `git push` 推到远程；`git status` 看工作区/暂存区状态，`git diff` 看未暂存差异，`git diff --staged` 看已暂存差异。

---

**G2：Git 和 SVN 的核心区别？**

**答：**  
- **架构**：Git 是**分布式**，每个克隆都有完整历史，可离线提交，再与远程同步；SVN 是**集中式**，历史在服务器，本地主要是工作副本，提交需连服务器。  
- **分支**：Git 分支轻量（指针），创建、切换、合并快；SVN 分支实质是目录拷贝，分支管理成本高。  
- **提交粒度**：Git 以**提交（commit）**为单元，每个 commit 有唯一 hash；SVN 以**版本号**递增，提交是“对仓库的一次变更”。  
- **冲突与合并**：Git 合并时在本地解决冲突再提交；SVN 更新时可能冲突，解决后标记已解决再提交。  
- **使用**：Git 更适合分布式协作、开源、多分支；SVN 适合集中管控、权限细、习惯“一个中心库”的团队。

---

**G3：merge 和 rebase 的区别？什么时候用 rebase、要注意什么？**

**答：**  
- **merge**：把目标分支（如 main）的提交**合并进来**，产生一个**新的合并提交**，保留完整分支历史，历史图会有分叉再汇合。  
- **rebase**：把当前分支的提交“挪到”目标分支**最新提交之后**，重放一遍，历史变成一条直线，无合并提交；本质是改写当前分支的 base。  
- **何时用 rebase**：本地分支要跟上主分支时，用 `git rebase main` 让提交在 main 之上，再 push；多人协作时**不要对已推送的公共提交做 rebase**，否则会改写历史，别人 pull 会乱。  
- **注意**：rebase 会改写 commit hash，冲突需逐个解决；`git rebase -i` 可整理、合并提交；公共分支用 merge，个人分支整理历史可用 rebase。

---

**G4：如何解决 Git 合并冲突？流程是什么？**

**答：**  
- **何时发生**：两个分支改了**同一文件的同一区域**，合并或 rebase 时 Git 无法自动决定保留哪边，会标记冲突。  
- **流程**：  
  1. 执行 `git merge other` 或 `git rebase other` 后提示冲突。  
  2. `git status` 看哪些文件冲突，打开文件会看到 `<<<<<<<`、`=======`、`>>>>>>>` 标记，中间是两边的内容。  
  3. 手动编辑文件，保留需要的内容、删掉标记，保存。  
  4. `git add <file>` 标记为已解决；所有冲突文件都 add 后，merge 时直接 `git commit`，rebase 时执行 `git rebase --continue`。  
- **放弃**：merge 冲突可 `git merge --abort`；rebase 冲突可 `git rebase --abort` 回到操作前状态。  
- **技巧**：用编辑器或 `git mergetool` 做三方对比；冲突多时先与对方沟通再改，避免反复冲突。

---

**G5：stash、cherry-pick 是什么？常用场景？**

**答：**  
- **stash**：把当前**工作区 + 暂存区**的修改临时存起来，工作区恢复干净，便于切分支或拉代码。`git stash` 存入，`git stash pop` 取出并删除记录，`git stash list` 看列表，`git stash apply` 取出但保留记录。  
- **场景**：正在开发一半要切到别的分支修 bug，先 stash，修完再回来 stash pop；或 pull 前有未提交改动，先 stash 再 pull 再 pop。  
- **cherry-pick**：把**指定提交**按内容应用到当前分支，生成新提交。`git cherry-pick <commit>`；冲突时解决后 `git add` 再 `git cherry-pick --continue`。  
- **场景**：某次提交只在 A 分支，想同步到 B 分支，在 B 上 cherry-pick 该 commit；或把误提交到错误分支的 commit 摘到正确分支。

---

**G6：git flow 或你们团队的 Git 分支策略是怎样的？**

**答：**  
- **Git Flow**：常设分支 `main`（生产）、`develop`（开发）；功能从 develop 拉 `feature/xxx`，完成后合并回 develop；发版时从 develop 拉 `release/xxx`，修 bug 后合并回 main 和 develop，main 打 tag；线上紧急修复拉 `hotfix/xxx` 从 main，修完合并回 main 和 develop。  
- **简化版**：只保留 `main` + 功能分支 `feature/xxx`，合并用 MR/PR，发版在 main 打 tag；或 **GitHub Flow** 只有 main 加短期分支。  
- **回答**：可说明“我们用 main 作为发布分支，功能在 feature 分支开发，通过 MR 合并，发版打 tag”；有 release/hotfix 可一并说清，重点是有清晰的主干、分支用途和合并规则。

---

**G7：SVN 的 trunk、branch、tag 是什么？和 Git 的对应关系？**

**答：**  
- **trunk**：主干，对应日常开发的主线，类似 Git 的 main/develop。  
- **branch**：分支，从 trunk（或某版本）复制出来的开发线，用于大功能或长期分支；合并时把 branch 的变更合并回 trunk。  
- **tag**：标签，通常用于标记某个版本（如 release），一般是只读副本，不在此做开发；对应 Git 的 **tag**（Git 的 tag 指向某次 commit，不占分支）。  
- **对应**：SVN 的 trunk ≈ Git 主分支；SVN 的 branch ≈ Git 的 branch；SVN 的 tag ≈ Git 的 tag（只读标记）。

---

**G8：列举 10 个以上常用 Git 命令并说明作用。**

**答：**  
- `git clone <url>`：克隆远程仓库。  
- `git status`：查看工作区、暂存区状态。  
- `git add <file>` / `git add .`：将文件加入暂存区。  
- `git commit -m "msg"`：提交暂存区到本地仓库。  
- `git push` / `git pull`：推送到远程 / 从远程拉取并合并。  
- `git fetch`：从远程拉取更新，不自动合并。  
- `git branch` / `git checkout -b <branch>`：查看分支 / 创建并切换分支。  
- `git merge <branch>` / `git rebase <branch>`：合并分支 / 变基。  
- `git log` / `git log --oneline`：查看提交历史。  
- `git diff`：查看未暂存差异；`git diff --staged` 查看已暂存差异。  
- `git reset --soft/--mixed/--hard <commit>`：回退到某次提交（软/混合/硬）。  
- `git stash` / `git stash pop`：暂存修改 / 恢复。  
- `git tag <name>`：打标签；`git push --tags` 推送标签。  
- `git revert <commit>`：新增一次提交，抵消某次提交的改动（不改写历史）。

---

**G9：日常开发中 Git 分支管理你们是怎么做的？feature 从哪拉、合并到哪？**

**答：**  
- **常见做法**：主分支（main/master）保持可发布；新功能从 main 拉 `feature/功能名`，开发完成后提 MR/PR 合并回 main；或先合并到 develop，发版时再从 develop 拉 release 合并到 main。  
- **规范**：分支命名统一（如 feature/xxx、fix/xxx、hotfix/xxx）；合并前需 Code Review、CI 通过；main 保护分支，禁止直接 push，必须通过 MR。  
- **与后端联调**：可单独拉 `feature/xxx-api` 或在同一 feature 分支上联调；接口约定（文档或 Mock）先行，前后端并行开发，接口就绪后再对接；联调环境用独立分支或 tag 部署，避免影响主分支。

---

**G10：和后端联调时，接口约定、Mock、跨域和问题排查一般怎么配合？**

**答：**  
- **接口约定**：用 **接口文档**（Swagger/OpenAPI、Apifox、语雀等）约定 URL、方法、入参、出参、错误码；前后端按文档开发，减少口头沟通误差。  
- **Mock**：后端未就绪时用 Mock 数据（Mock.js、MSW、或本地 JSON + 代理）模拟返回，保证前端可独立开发与自测；联调时切换为真实接口（环境变量或代理指向后端地址）。  
- **跨域**：开发环境用 Vite/Webpack 的 **proxy** 把 /api 代理到后端，同源无跨域；生产由 Nginx 或网关统一转发；后端需配置 CORS 若前端直连不同源接口。  
- **问题排查**：先确认请求是否发出、状态码与响应体（Network）；再看后端日志与参数格式；约定统一错误码与 message，前端在响应拦截器里统一提示；联调阶段可约定每日站会或接口变更通知。

---

## 十一、原理与底层（进阶）

**P1：Vue3 响应式原理：Proxy 如何配合依赖收集与触发？和 Vue2 的 defineProperty 在实现上本质区别是什么？**

**答：**  
- **Vue3**：用 **Proxy** 代理整个对象，在 `get` 里做**依赖收集**（当前运行的 effect 被记到该属性的 dep/set 里），在 `set`/`deleteProperty` 里做**触发更新**（通知该属性关联的 effect 重新执行）。用 **Reflect** 做默认行为，保证 this 指向正确。  
- **依赖收集**：`reactive()` 返回 Proxy，`effect(fn)` 执行 fn 时访问到响应式属性，就会把当前 effect 加入对应 key 的依赖集合；属性变更时遍历该集合执行 effect。  
- **与 Vue2 本质区别**：defineProperty 只能劫持已有属性、无法监听数组下标和 length、无法监听属性新增/删除，且要递归遍历对象；Proxy 是“代理整对象”，可监听增删、数组下标，且按访问路径按需代理，不需要一开始递归到底。Vue3 因此不需要 Vue.set、数组变异方法也能被自动追踪。

---

**P2：虚拟 DOM 的 diff 算法大致思路？Vue 里 key 为什么能优化 diff？Vue3 的 block、patchFlag 做了什么优化？**

**答：**  
- **diff 思路**：同层比较、不跨层；先比根节点（tag、key 等），相同再比 children。children 常采用**双端比较**（头头、头尾、尾头、尾尾）或**最长递增子序列**减少移动次数。  
- **key 的作用**：给 vnode 打唯一标识，diff 时用 key 建立旧新节点的对应关系，能复用正确节点、避免“就地复用”导致状态错乱（如列表重排时输入框跟错项）；同时能减少无效的节点移动和 DOM 操作。  
- **Vue3 优化**：**Block tree**：模板编译时标记动态节点，只把会变的节点放进 block，diff 时只比较 block 内节点，静态节点整块跳过。**patchFlag**：在 vnode 上标记是“文本会变”“class 会变”等，patch 时只做对应类型的更新，减少分支判断和遍历。

---

**P3：Vue 的模板是怎么变成视图的？从 template 到 DOM 的完整链路？**

**答：**  
- **编译阶段**：`template` 字符串经 **解析（parse）** 成 **AST**（抽象语法树），再经 **转换（transform）** 做优化（如标记静态节点、静态提升）、生成 **generate** 所需的中间信息。  
- **生成代码**：**generate** 根据 AST 生成 **render 函数**（或类似的可执行代码），render 里是 `_createElementVNode`/`h` 等调用，描述 vnode 树。  
- **运行时**：组件渲染时执行 **render**，得到 **vnode 树**；再经 **patch**（diff + 挂载/更新）把 vnode 变成真实 **DOM**（createElement、setAttribute、appendChild 等）。  
- **更新**：数据变 → 触发 effect → 重新执行 render 得到新 vnode 树 → patch(oldVNode, newVNode) 做 diff，最小化更新 DOM。  
- **可选**：Vue3 可跳过 generate 直接输出优化后的 render（如 Block tree），或做 AOT 编译成更贴近运行时的结构。

---

**P4：nextTick 的实现原理？为什么能拿到“DOM 更新后”的时机？**

**答：**  
- **目的**：在响应式数据变更导致 DOM 更新**之后**再执行回调，保证能读到新 DOM。  
- **原理**：Vue 把“本轮的 DOM 更新”放进**微任务队列**（如 Promise.then、MutationObserver）。nextTick 的回调也推进微任务队列。同一轮同步代码执行完后，微任务按顺序执行：先执行完所有 DOM 更新对应的微任务，再执行 nextTick 的回调，因此回调执行时 DOM 已更新。  
- **实现**：优先用 `Promise.then`，降级用 `MutationObserver` 或 `setImmediate`/`setTimeout`，把 callback 推入微任务（或宏任务）队列。  
- **与“更新合并”**：同一事件循环内多次改数据，Vue 会合并成一次更新、只推一个 flush 任务，所以一次 nextTick 能等到这批改动的 DOM 全部更新完。

---

**P5：浏览器事件循环里，宏任务和微任务的执行顺序是怎样的？请结合一道具体执行顺序题说明。**

**答：**  
- **规则**：执行一个**宏任务**（如 script、setTimeout 回调）→ 执行过程中若产生微任务，全部加入微任务队列 → 该宏任务执行完后，**清空所有微任务** → 再取下一个宏任务，如此循环。微任务总在当前宏任务之后、下一个宏任务之前全部执行完。  
- **例题**：  
  ```js
  console.log(1);
  setTimeout(() => console.log(2), 0);
  Promise.resolve().then(() => console.log(3));
  console.log(4);
  ```  
  输出：1 → 4 → 3 → 2。原因：同步 1、4；then 是微任务、setTimeout 是宏任务；宏任务 script 执行完先清微任务输出 3，再执行 setTimeout 输出 2。  
- **常见微任务**：Promise.then/catch/finally、queueMicrotask、MutationObserver。**常见宏任务**：script、setTimeout/setInterval、I/O、UI 渲染（如 requestAnimationFrame 在渲染前）、postMessage。

---

**P6：简要说明 V8 的垃圾回收机制（分代、标记清除/整理）。**

**答：**  
- **分代**：堆分为 **新生代**（存活时间短、体积小）和 **老生代**（存活时间长或大对象）。新生代用 **Scavenge**（复制算法，from/to 半空间，存活对象复制到 to，交换角色）；老生代用 **标记-清除**（Mark-Sweep）或 **标记-整理**（Mark-Compact），避免碎片。  
- **标记-清除**：从根（全局、栈）出发标记可达对象，再遍历堆清除未标记对象；会产生碎片。  
- **标记-整理**：标记后把存活对象往一端移动，再清理边界外内存，减少碎片，但移动有成本。  
- **与前端**：避免全局大对象、及时解除引用、少在闭包里持大对象，便于 GC 回收；老生代过大会触发 Full GC，造成卡顿。

---

**P7：HTTP/2 相对 HTTP/1.1 的核心变化？多路复用是怎么实现的？**

**答：**  
- **核心变化**：二进制分帧、多路复用、头部压缩（HPACK）、服务端推送（Server Push）。  
- **多路复用**：HTTP/2 在**一条 TCP 连接**上划分多个**流（Stream）**，每个请求/响应对应一个流，帧带 Stream ID。多个请求的帧可以交错在同一连接上发送，不必等前一个响应发完再发下一个请求，因此一个连接上可并发多个请求，解决了 HTTP/1.1 队头阻塞（同一连接上请求必须串行）。  
- **注意**：队头阻塞在 TCP 层仍存在（一个包丢失会阻塞该连接上所有流）；QUIC/HTTP3 用 UDP 进一步解决。

---

**P8：Webpack 的构建流程（从 entry 到产出）？HMR 热更新的大致原理？**

**答：**  
- **构建流程**：**初始化**（读配置、创建 Compiler、加载 plugin）→ **编译**（从 entry 出发，根据依赖图递归解析模块，对每个模块执行配置的 loader）→ **封装**（将模块封装成 chunk，应用 plugin 的优化钩子，如 splitChunks、压缩）→ **输出**（根据 output 把 chunk 写成文件）。核心是“模块解析 + 依赖图 + chunk 生成”。  
- **HMR**：开发时 Webpack 为模块注入 HMR runtime，并和 devServer 建立 WebSocket。文件变更时，Webpack 重新编译变更模块，通过 WS 把 **hash** 和 **变更的 chunk 信息** 推给浏览器；浏览器用 **jsonp** 拉取新 chunk，runtime 用新模块替换旧模块（或执行 accept 回调），实现不刷新页面更新。若某模块没有 accept，会向上冒泡直到整页刷新。

---

**P9：Tree Shaking 的原理？为什么依赖 ESM？sideEffects 配置有什么作用？**

**答：**  
- **原理**：在**静态分析**阶段（不执行代码）根据 **import/export** 确定哪些导出被使用。未被引用的导出在打包时不纳入 bundle，从而删掉“死代码”。  
- **为什么依赖 ESM**：ESM 的 import/export 是**静态的**，在编译时就能确定依赖关系；CJS 的 require 可动态、可条件执行，无法可靠做静态分析，因此传统打包工具对 CJS 做 Tree Shaking 能力有限。  
- **sideEffects**：在 package.json 里标记模块是否有**副作用**（如执行时改全局、polyfill）。标记为 `false` 或具体文件列表后，打包工具可以更激进地删除“未被 import 且无副作用”的代码；若某模块有副作用但被标成无，可能被误删导致运行错误。

---

**P10：Vite 开发阶段为什么快？预构建做了什么？和 Webpack 开发模式的本质差异？**

**答：**  
- **为什么快**：开发阶段**不打包**业务代码，利用浏览器原生 **ESM**。浏览器通过 `<script type="module">` 请求入口，再按 import 链逐个请求模块；Vite 只对**当前请求到的文件**做即时编译（如 .vue、.ts 转成 JS），无需像 Webpack 一样先打包整棵依赖树再起服务。  
- **预构建**：`node_modules` 里依赖多为 CJS 或非 ESM，浏览器无法直接跑。Vite 用 **esbuild** 把这些依赖预先打成少量 ESM chunk（并处理动态 import），放到 `node_modules/.vite`；业务代码 import 时直接引这些预构建产物，避免大量小请求、兼容 CJS。  
- **与 Webpack 本质差异**：Webpack 开发模式也是“全量编译 + 打包”（通过内存输出），改一个文件可能触发整图或较多模块重算；Vite 是“按需编译 + 原生 ESM”，只编译当前请求的模块，冷启动和 HMR 都更快。

---

**P11：手写 Promise 或说清 then 链、状态与微任务的关系。**

**答：**  
- **状态**：pending → fulfilled / rejected，且不可逆。  
- **then**：返回**新的 Promise**，根据当前 Promise 状态：若已 settled，则用 **微任务**（queueMicrotask 或 Promise.then）执行 onFulfilled/onRejected，并把其返回值作为新 Promise 的 resolve 值；若 pending，则把回调存起来，在 resolve/reject 时再执行（同样用微任务），保证 then 回调总是异步。  
- **链式**：then 返回新 Promise，可继续 .then；若回调返回 Promise，则新 Promise 跟随该 Promise 的状态；若抛出错误或返回 rejected Promise，则新 Promise 被 reject，被后续 catch 捕获。  
- **与事件循环**：then 的回调是微任务，所以 `Promise.resolve().then(fn)` 的 fn 会在当前同步代码和当前宏任务之后、下一个宏任务之前执行。

---

**P12：浏览器渲染里“层（layer）”和 Composite（合成）是什么？什么操作会触发 Composite 而不触发布局或重绘？**

**答：**  
- **层**：渲染引擎会把某些节点提升为**合成层**（如 transform、opacity、will-change、video/canvas），拥有自己的位图，由 **GPU 合成** 到最终画面。  
- **Composite**：将各层的位图合成为最终一帧并显示，不涉及 CPU 的布局（Layout）和绘制（Paint）。  
- **只触发 Composite 的操作**：修改 **transform**、**opacity** 等仅影响合成的属性时，若该元素在合成层上，则只需**重绘该层**（或跳过重绘直接合成），不触发布局、不触发其它元素重绘。因此动画用 transform/opacity 可达到 60fps 的流畅度。  
- **触发 Layout 的**：改 width、height、margin、位置（top/left）等；读 offsetTop、scrollTop、getComputedStyle 等也会强制同步布局。  
- **触发 Paint 的**：改颜色、背景、阴影等视觉属性；Layout 之后通常也会触发 Paint。

---

**P13：前端路由（hash / history）的底层实现原理？history 模式为什么需要服务端配合？**

**答：**  
- **hash**：改 `location.hash` 或点带 # 的链接会触发 **hashchange** 事件，且**不会发请求**；监听 hashchange，根据 hash 解析出路径，匹配路由表渲染对应组件。  
- **history**：用 **History API**：`history.pushState(state, title, url)` / `replaceState` 可改地址栏和 history 栈，但**不会发请求、不会刷新**；监听 **popstate**（仅后退/前进触发）和**拦截点击**（对同源链接 pushState 再 preventDefault），根据 pathname 匹配路由并渲染。  
- **为什么 history 要服务端配合**：用户直接访问或刷新 `https://xxx.com/subpath` 时，浏览器会向服务器请求 `/subpath`；若服务端没有该路径对应的资源会 404。因此需配置**同一 fallback**（如 Nginx try_files）把这类请求都返回 index.html，由前端根据 pathname 再走路由逻辑。

---

**P14：ES Module 和 CommonJS 在引擎/规范层面的主要区别？为什么 ESM 可以 Tree Shaking 而 CJS 难？**

**答：**  
- **ESM**：**静态**的模块系统，import/export 在**解析阶段**就确定，不能放在条件、函数里（顶层 import）；导出的是** binding（引用）**，模块是**只读**的；加载是**异步**的，可并行。  
- **CJS**：**动态**的，require 可在任意处执行、可条件执行；导出的是**值的拷贝**（对对象则是引用拷贝）；加载是**同步**的。  
- **Tree Shaking**：ESM 依赖关系在编译时可知，工具能静态分析“谁用了谁”，未用到的导出可删；CJS 的 require 动态、可拼接字符串，静态分析困难，因此传统上对 CJS 做 Tree Shaking 不彻底，现代工具会尽量分析但仍依赖模块写法。

---

**P15：computed 和 watch 在 Vue 里的实现思路？为什么 computed 有缓存？**

**答：**  
- **computed**：本质是**带缓存的 getter**。创建 computed 时会在内部建一个 **effect**（或类似依赖追踪），并在 get 时执行 getter、收集依赖（依赖的 reactive 会把该 computed 的 effect 记下来）。**缓存**：只有依赖的响应式数据变化时才会重新执行 getter 并更新缓存值；依赖未变时直接返回上次计算结果。实现上可用 dirty 标志：依赖变更时置 dirty，get 时若 dirty 才重算并清 dirty。  
- **watch**：对某个**响应式源**（ref、reactive 的某个属性、getter）建一个 effect，当源变化时执行回调；可配置 deep、immediate。不缓存，每次源变就执行。  
- **区别**：computed 是“派生状态”，要返回值、有缓存；watch 是“副作用”，做请求、DOM、打印等，不要求返回值。

---

## 十二、智能体与 AI 应用（Dify 等）

**D1：Dify 是什么？能解决什么问题？**

**答：**  
- **Dify**：开源的 **LLM 应用开发平台**，可快速搭建对话、Agent、工作流等 AI 应用。提供可视化编排（Prompt、工作流、知识库）、多模型接入、API 与插件嵌入，支持自部署或云服务。  
- **能解决的问题**：  
  - 快速搭建**智能客服、问答、写作、翻译**等对话应用，无需从零写推理与对话逻辑。  
  - 通过**知识库（RAG）**把企业文档、网页等灌入，实现“基于自有数据的问答”。  
  - 用**工作流**串联 LLM、检索、代码执行、HTTP 等节点，做复杂任务编排。  
  - 通过 **Agent** 配置工具（搜索、API、自定义）让模型能调用外部能力。  
- **前端相关**：提供 **API** 和 **Chat 嵌入**（iframe/JS），前端只需对接接口或嵌入聊天组件，即可在自有产品里接入 Dify 应用。

---

**D2：Dify 里“应用 / Agent / 工作流”几种类型有什么区别？**

**答：**  
- **对话型应用（Chatflow）**：基于 **Prompt + 可选知识库** 的简单对话，用户发消息、模型按系统提示词和知识库检索结果回复；适合标准问答、客服、写作助手。  
- **Agent（智能体）**：在对话基础上给模型配置 **工具（Tools）**，如联网搜索、调用 API、查知识库、执行代码等；模型会**自主决定何时调哪个工具**，再把工具结果纳入回复，适合需要“查数据、执行动作”的对话。  
- **工作流（Workflow）**：用**可视化节点**编排流程，节点包括 LLM、知识库检索、条件分支、HTTP 请求、代码执行等；数据按边流转，适合**固定流程、多步骤、需严格可控**的场景（如审批流、报表生成）。  
- **选型**：简单问答用对话型；需要“自己决定调工具”用 Agent；流程固定、步骤多、要可审计用工作流。

---

**D3：前端如何对接 Dify？API 和 Chat 嵌入两种方式分别怎么做？**

**答：**  
- **API 方式**：  
  - Dify 为每个应用提供 **API Key** 和接口文档；前端请求 Dify 的 **Chat API**（或 Completions 等），传入 API Key、消息列表、可选 conversation_id、user 等。  
  - 对话：POST 消息 → 轮询或 **SSE 流式** 取回复；流式时前端用 EventSource 或 fetch 读 stream，逐段渲染。  
  - 前端负责：鉴权（API Key 放后端或由后端代理）、会话管理（conversation_id）、消息列表展示、停止生成、错误与重试。  
- **Chat 嵌入**：  
  - Dify 提供 **Chat 插件 / 嵌入代码**，在页面里插入 iframe 或 JS 脚本，即可嵌入官方聊天界面；通过 URL 参数传入 API Key（或由后端生成临时 token）、主题等。  
  - 优点：零开发即可用；缺点：样式和交互受限于 Dify 默认 UI，定制需改 Dify 前端或自建对话页面对接 API。  
- **总结**：要深度定制对话 UI、与业务系统打通用 API；要快速上线、对 UI 要求不高用嵌入。

---

**D4：Dify 里的“知识库”（RAG）是怎么工作的？前端需要关心什么？**

**答：**  
- **原理**：把文档切块、向量化后存入向量库；用户提问时先把问题向量化，**检索**最相似的若干块，把这些块作为上下文和问题一起发给 LLM，让模型“基于这些内容”回答，即 RAG（检索增强生成）。  
- **前端需要关心的**：  
  - 若用 Dify 自带对话/API，知识库由 Dify 后台配置，前端只需正常发消息，检索由服务端完成。  
  - 若自建前端：需确认调的是“带知识库的应用”的 API，并理解 **conversation 内多轮对话** 会共享检索上下文；上传文档、管理知识库一般仍在 Dify 控制台完成，前端可提供“上传入口”再调 Dify 文档接口（若有）。  
  - 可展示“引用来源”（若 API 返回了引用片段），用于可解释性与合规。

---

**D5：Dify Agent 的“工具”（Tools）是什么？前端展示上要注意什么？**

**答：**  
- **工具**：在 Agent 里配置的能力，如**联网搜索、知识库检索、自定义 API、代码执行**等；模型在生成过程中会输出“要调用某工具”的意图，平台执行工具并把结果回传给模型，再继续生成回复。  
- **前端注意**：  
  - 流式输出中可能出现 **“正在调用工具”** 的中间状态，若 API 返回了这类状态，前端可展示“正在搜索…”等提示，避免用户以为卡住。  
  - 部分 API 会返回 **工具调用结果摘要**（如用了哪几个工具、结果片段），可选择性展示，增强可解释性。  
  - 若工具执行较慢，流式可能先出一段文字再停顿，前端需处理好 loading 与分段展示，避免误判为结束或超时。

---

**D6：自建前端对接 Dify 时，API Key 和安全上要注意什么？**

**答：**  
- **API Key 不要写死在前端**：若直接在前端请求 Dify，Key 会暴露在源码或网络里；应通过**自有后端代理**：前端请求自家后端，后端再带 Key 请求 Dify，Key 只存在服务端。  
- **鉴权与限流**：用自家账号体系鉴权用户，后端按用户/租户限流、计费，再转发到 Dify；避免任何人拿到地址就能刷接口。  
- **审计与合规**：对对话内容、调用的应用做日志与审计，满足内部合规；敏感数据做脱敏或走私有化部署的 Dify。  
- **CORS**：若前端直连 Dify（不推荐生产环境），需在 Dify 侧配置允许的域名；生产建议一律走后端代理。

---

## 十三、加分项：Linux / 数据库 / 云平台基础

**L1：你用过哪些常用 Linux 命令？前端场景下会用到哪些？**

**答：**  
- **文件与目录**：`ls`、`cd`、`pwd`、`mkdir`、`rm`、`cp`、`mv`、`cat`、`head`、`tail`、`find`、`grep`。  
- **权限**：`chmod`、`chown`。  
- **进程与网络**：`ps`、`kill`、`netstat`/`ss`、`curl`。  
- **前端场景**：在服务器上 `ls` 看构建产物、`tail -f` 看日志、`curl` 测接口、`ps` 看 Node 进程；部署脚本里用 `cp`/`mv` 备份、`rm` 清理旧包；排查时用 `grep` 查日志、`netstat` 看端口占用。

---

**L2：SSH 登录服务器、上传文件一般用什么？**

**答：**  
- **登录**：`ssh user@host`（或指定端口 `-p 22`），密钥登录更安全（`ssh -i key.pem user@host`）。  
- **上传文件**：`scp local_file user@host:remote_path` 或 `rsync -avz local_dir user@host:remote_dir`；也可用 SFTP 客户端（如 FileZilla）或 CI 里用 scp/rsync 做自动部署。

---

**L3：数据库你了解多少？前端为什么有时要懂一点 SQL？**

**答：**  
- **了解程度**：能写简单 **SELECT、WHERE、ORDER BY、GROUP BY、JOIN**；知道 **主键、索引** 的作用（加速查询）；知道 **增删改** 的基本语法。  
- **前端为何要懂一点**：与后端对接口时，能看懂接口对应的“查的是哪张表、哪些字段”，便于理解数据结构、设计类型和表格列；做 **B 端报表、筛选** 时能和后端讨论“能否按某字段排序/筛选”，避免接口反复改；排查问题时能判断是“数据没有”还是“前端展示逻辑”问题。

---

**L4：虚拟化、容器（Docker）你了解吗？和前端部署有什么关系？**

**答：**  
- **虚拟化**：在一台物理机上跑多台“虚拟机”，彼此隔离；常见有 VMware、KVM 等。  
- **容器（Docker）**：比虚拟机更轻量，共享宿主机内核，以“镜像”打包应用和依赖，运行在容器里；前端构建产物可放进 Nginx 镜像，打成镜像后推到仓库，在任意有 Docker 的环境一致运行。  
- **和前端关系**：很多公司用 **Docker 跑 Node 构建、或把打包后的静态资源用 Nginx 镜像部署**；CI 里常见 `docker build` + `docker push`，再在服务器上 `docker pull` + `docker run`；了解基本概念便于和运维/后端对齐部署方式。

---

**L5：云平台（如阿里云、腾讯云）前端会接触到哪些服务？**

**答：**  
- **对象存储（OSS/COS）**：静态资源（HTML/JS/CSS/图片）上传到 OSS，通过 CDN 加速访问；前端上传文件、配置 CDN 域名时可能用到控制台或 SDK。  
- **服务器（ECS/CVM）**：部署 Node 服务或 Nginx 时用；可能涉及安全组、密钥、远程登录。  
- **CI/CD**：云效、CODING 等与代码仓库打通，做构建、部署到 OSS 或 ECS。  
- **其他**：域名与 SSL 证书、API 网关（若前端直连）、监控与日志（排查线上问题）。  
前端不一定要精通，但知道“静态资源放 OSS、走 CDN”“部署走流水线”等流程，便于协作和排错。

---

*按上述题目逐条过一遍并用自己的项目举例，面试时会更稳。原理题建议结合源码或规范文档加深理解。祝你面试顺利。*
