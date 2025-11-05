---
title: CSS现代布局技术详解
date: 2025/01/07
tags:
 - CSS
 - 布局
categories:
 - 文章
---

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