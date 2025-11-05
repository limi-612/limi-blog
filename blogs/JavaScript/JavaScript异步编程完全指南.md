---
title: JavaScript异步编程完全指南
date: 2025/01/05
tags:
 - JavaScript
 - 异步编程
categories:
 - JavaScript
---

## 异步编程的演进历程

### 1. 回调函数时代
```javascript
// 回调地狱示例
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            // 嵌套过深，难以维护
        });
    });
});
```

### 2. Promise的救赎
```javascript
// Promise链式调用
getData()
    .then(a => getMoreData(a))
    .then(b => getEvenMoreData(b))
    .then(c => console.log(c))
    .catch(err => console.error(err));
```

### 3. Async/Await的优雅
```javascript
// 同步风格的异步代码
async function fetchData() {
    try {
        const a = await getData();
        const b = await getMoreData(a);
        const c = await getEvenMoreData(b);
        return c;
    } catch (error) {
        console.error(error);
    }
}
```

## 核心概念深入

### Promise状态机制
- **Pending**: 初始状态，既不是成功也不是失败
- **Fulfilled**: 操作成功完成
- **Rejected**: 操作失败

### 并发控制模式
```javascript
// 并行执行
const results = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
]);

// 竞速执行
const fastest = await Promise.race([
    fetchFromCDN(),
    fetchFromBackup()
]);

// 容错执行
const result = await Promise.allSettled([
    riskyOperation1(),
    riskyOperation2()
]);
```

## 实战技巧

### 错误处理最佳实践
```javascript
// 统一错误处理
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

async function apiCall(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new ApiError(`HTTP ${response.status}`, response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            // 处理API错误
        } else {
            // 处理网络错误
        }
        throw error;
    }
}
```

### 性能优化策略
- 避免不必要的await
- 合理使用Promise.all进行并行处理
- 实现请求缓存和去重
- 使用AbortController取消请求

异步编程是现代JavaScript开发的核心技能，掌握这些模式能显著提升代码质量和用户体验。