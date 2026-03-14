---
title: CSS现代布局技术详解
date: 2025/01/07
tags:
 - CSS
 - 布局
categories:
 - CSS
---

<ReadAloud />

## Flexbox布局精通

### 基础概念
```css
.container {
    display: flex;
    flex-direction: row; /* 主轴方向 */
    justify-content: center; /* 主轴对齐 */
    align-items: center; /* 交叉轴对齐 */
    flex-wrap: wrap; /* 换行控制 */
}

.item {
    flex: 1 1 auto; /* grow shrink basis */
}
```

### 实用布局模式
```css
/* 等高列布局 */
.equal-height {
    display: flex;
    align-items: stretch;
}

/* 垂直居中 */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 自适应导航 */
.nav {
    display: flex;
    justify-content: space-between;
}
```

## Grid网格布局

### 网格系统基础
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    gap: 20px;
}

.grid-item {
    grid-column: span 4;
    grid-row: span 2;
}
```

### 复杂布局实现
```css
/* 圣杯布局 */
.holy-grail {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

## 响应式设计

### 媒体查询策略
```css
/* 移动优先 */
.container {
    width: 100%;
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}
```

### 容器查询
```css
@container (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}
```

## 现代CSS特性

### CSS变量应用
```css
:root {
    --primary-color: #007bff;
    --spacing-unit: 8px;
    --border-radius: 4px;
}

.button {
    background: var(--primary-color);
    padding: calc(var(--spacing-unit) * 2);
    border-radius: var(--border-radius);
}
```

### 逻辑属性
```css
.element {
    margin-inline-start: 1rem; /* 替代 margin-left */
    padding-block: 2rem; /* 替代 padding-top/bottom */
    border-inline-end: 1px solid #ccc; /* 替代 border-right */
}
```

现代CSS为我们提供了强大的布局能力，合理运用这些技术能创造出优雅且高效的用户界面。

---

## 常见面试题

### 布局相关

**1. Flex 和 Grid 的区别与适用场景？**
- **Flex**：一维布局（行或列），适合组件内对齐、导航栏、等分布局。
- **Grid**：二维布局（行+列），适合整体页面结构、卡片网格、圣杯布局。

**2. 如何实现水平垂直居中？（至少 3 种）**
- Flex：`display: flex; justify-content: center; align-items: center;`
- Grid：`display: grid; place-items: center;`
- 绝对定位 + 负 margin / transform：`position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);`

**3. 什么是 BFC？如何触发？解决什么问题？**
- BFC（块级格式化上下文）是独立的渲染区域，内部布局不影响外部。
- 触发方式：`overflow: hidden/auto`、`float`、`position: absolute/fixed`、`display: flex/grid/inline-block` 等。
- 常用于清除浮动、防止 margin 折叠、隔离布局。

**4. 移动端 1px 线问题如何解决？**
- `transform: scaleY(0.5)` 配合伪元素画线。
- `border-image` 或 `box-shadow` 模拟细线。
- 媒体查询 + `device-pixel-ratio` 配合 `transform` 缩放。

### 选择器与优先级

**5. CSS 优先级如何计算？**
- 内联样式 > ID > 类/属性/伪类 > 标签/伪元素；同级别时后写的覆盖先写的。
- 可用 `!important` 提高优先级（慎用）。

**6. 什么是 CSS 层叠与继承？**
- 层叠：多条规则作用于同一元素时，按来源、优先级、顺序决定最终样式。
- 继承：部分属性（如 `color`、`font-size`）会从父元素继承；`width`、`margin` 等不继承。

### 响应式与单位

**7. rem、em、px、vw/vh 的区别？**
- **px**：固定像素，不随字体或视口变化。
- **em**：相对当前元素字体大小。
- **rem**：相对根元素 `html` 的 `font-size`，便于统一控制整体缩放。
- **vw/vh**：视口宽高的 1%，适合全屏或与视口相关的布局。

**8. 移动端适配方案有哪些？**
- rem + 动态设置 `html` 的 `font-size`（如 lib-flexible）。
- vw/vh 方案（如 postcss-px-to-viewport）。
- 媒体查询 + 流式布局。
- 容器查询（@container）做组件级适配。

### 性能与渲染

**9. 哪些 CSS 属性会触发重排（reflow）？**
- 几何相关：`width`、`height`、`margin`、`padding`、`border`、`position`、`display` 等。
- 避免频繁读写布局属性，可先集中读再集中写，或使用 `transform`、`opacity` 仅触发合成。

**10. 如何减少重绘（repaint）？**
- 尽量用 `transform` 和 `opacity` 做动画（只触发合成）。
- 将频繁变化的元素独立层：`will-change: transform` 或 `transform: translateZ(0)`。
- 避免逐项改 `box-shadow`、`outline` 等易引发重绘的属性。

### 盒模型与盒尺寸

**11. 标准盒模型和 IE 盒模型（box-sizing）的区别？**
- **content-box**（默认）：`width/height` 只含内容区，不含 padding、border。
- **border-box**：`width/height` 包含 content + padding + border，更易做等分、适配。

**12. 如何让子元素宽度等于父元素 padding 内的宽度？**
- 父元素用 `box-sizing: border-box`，子元素 `width: 100%` 时即为父元素内容区宽度；或子元素用 `width: 100%; box-sizing: border-box` 且父无额外 padding 影响。

### 伪类与伪元素

**13. 伪类和伪元素的区别？**
- **伪类**：描述元素状态，单冒号，如 `:hover`、`:first-child`、`:focus`。
- **伪元素**：在文档中创建一个虚拟节点，双冒号（推荐），如 `::before`、`::after`、`::first-line`。

**14. :nth-child 和 :nth-of-type 的区别？**
- **:nth-child(n)**：选择的是「父元素下第 n 个子节点」，且该节点需满足选择器类型，否则不匹配。
- **:nth-of-type(n)**：选择父元素下同类型标签中的第 n 个（如第 n 个 p、第 n 个 div）。

### 动画与过渡

**15. transition 和 animation 的区别？**
- **transition**：需要状态变化（如 hover、class 切换）才能触发，通常做简单过渡。
- **animation**：可定义关键帧、循环、方向、延迟，无需事件即可自动播放，适合复杂动画。

**16. 为什么推荐用 transform 做位移/缩放动画而不是 left/top？**
- `transform` 只触发合成（composite），不触发布局与绘制，性能更好。
- 修改 `left/top` 会触发重排，在动画帧中频繁修改易卡顿。

### 经典布局

**17. 三栏布局（左右固定、中间自适应）有哪些实现方式？**
- Flex：左右定宽，中间 `flex: 1`。
- Grid：`grid-template-columns: 200px 1fr 200px;`
- 双飞翼/圣杯：浮动 + 负 margin + padding 或 margin 腾出空间（传统写法，现多用 Flex/Grid）。

**18. 左边固定宽度、右边自适应的两栏布局？**
- 左 `float: left` 或 `position: absolute`，右 `margin-left` 或 `overflow: hidden` 形成 BFC。
- Flex：左定宽，右 `flex: 1`。Grid：`grid-template-columns: 200px 1fr;`

### 浮动与清除

**19. 如何清除浮动？**
- 父元素：`overflow: hidden/auto` 或 `display: flow-root`，形成 BFC。
- 父末尾加空元素：`clear: both`。
- 父用伪元素：`::after { content: ''; display: block; clear: both; }`

### 文本与省略

**20. 单行、多行文本溢出省略如何实现？**
- 单行：`overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`
- 多行（如 2 行）：`display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;`

### 隐藏元素

**21. display:none、visibility:hidden、opacity:0 的区别？**
- **display: none**：不占位、不渲染，不可点击，会触发布局重排。
- **visibility: hidden**：占位、不可见、不可点击，会触发重绘。
- **opacity: 0**：占位、不可见、可被点击（需配合 `pointer-events: none` 禁用），仅触发合成，适合做过渡。

### 其他

**22. link 和 @import 引入 CSS 的区别？**
- **link**：HTML 标签，可放 head/body，可加 rel、media，并行加载，无兼容问题。
- **@import**：写在 CSS 内，在解析到该行时才加载，可能阻塞渲染；一般推荐用 link。

**23. CSS 变量（自定义属性）有什么优点？**
- 集中管理主题色、间距等，便于换肤、统一修改。
- 可用 `var()` 和 `calc()` 做动态计算；支持 JS 读写，实现运行时主题切换。