---
title: "JavaScript原理面试题整理 - 从基础到原理"
date: 2025/12/19
tags:
  - JavaScript
  - 面试
categories:
  - 复习记录
---

<ReadAloud />

## JavaScript 基础面试题

### 1. JavaScript 的数据类型有哪些？

- **基本数据类型（7种）**：
  - `undefined`：未定义
  - `null`：空值
  - `boolean`：布尔值
  - `number`：数字（包括 NaN、Infinity）
  - `string`：字符串
  - `symbol`：唯一标识符（ES6）
  - `bigint`：大整数（ES2020）

- **引用数据类型（1种）**：
  - `object`：对象（包括 Array、Function、Date、RegExp 等）

- **类型判断**：
  - `typeof`：可以判断基本类型，但 `typeof null` 返回 `"object"`，`typeof []` 返回 `"object"`
  - `instanceof`：判断对象是否为某个构造函数的实例
  - `Object.prototype.toString.call()`：最准确的类型判断方法

### 2. null 和 undefined 的区别？

- **undefined**：
  - 变量声明但未赋值
  - 函数没有返回值
  - 对象属性不存在
  - 函数参数未传入

- **null**：
  - 表示空值，是一个对象
  - 需要显式赋值
  - 表示"无对象"的占位符

- **相同点**：
  - 转换为布尔值都是 `false`
  - 在 `==` 比较时相等（`null == undefined` 为 `true`）
  - 在 `===` 比较时不相等（`null === undefined` 为 `false`）

### 3. == 和 === 的区别？

- **==（宽松相等）**：
  - 会进行类型转换
  - 转换规则复杂，容易出错
  - `null == undefined` 为 `true`
  - `"5" == 5` 为 `true`

- **===（严格相等）**：
  - 不进行类型转换
  - 类型和值都必须相同
  - 推荐使用，更安全可靠
  - `"5" === 5` 为 `false`

### 4. 什么是变量提升（Hoisting）？

- **定义**：变量和函数声明在代码执行前被提升到作用域顶部
- **var 提升**：
  - 变量声明提升，但赋值不提升
  - 提升到函数作用域顶部
  - 初始值为 `undefined`

```javascript
console.log(a); // undefined
var a = 1;

// 等价于
var a;
console.log(a); // undefined
a = 1;
```

- **let/const 提升**：
  - 存在提升，但进入"暂时性死区"（TDZ）
  - 在声明前访问会报错
  - 提升到块作用域顶部

```javascript
console.log(b); // ReferenceError
let b = 1;
```

- **函数提升**：
  - 函数声明会完全提升
  - 函数表达式不会提升

### 5. let、const、var 的区别？

- **var**：
  - 函数作用域
  - 可以重复声明
  - 存在变量提升
  - 可以修改

- **let**：
  - 块作用域
  - 不能重复声明
  - 存在暂时性死区
  - 可以修改

- **const**：
  - 块作用域
  - 不能重复声明
  - 存在暂时性死区
  - 必须初始化
  - 不能重新赋值（但对象属性可以修改）

### 6. 什么是作用域和作用域链？

- **作用域**：变量和函数的可访问范围
  - **全局作用域**：最外层作用域
  - **函数作用域**：函数内部
  - **块作用域**：`{}` 内部（let/const）

- **作用域链**：
  - 查找变量时，从当前作用域向上查找
  - 直到全局作用域，找不到返回 `undefined`
  - 形成一条链式结构

```javascript
var a = 1;
function outer() {
  var b = 2;
  function inner() {
    var c = 3;
    console.log(a, b, c); // 1, 2, 3
  }
  inner();
}
outer();
```

### 7. 什么是闭包（Closure）？

- **定义**：函数可以访问其外部作用域的变量，即使外部函数已经执行完毕
- **形成条件**：
  - 函数嵌套
  - 内部函数引用外部变量
  - 内部函数被返回或传递

```javascript
function outer() {
  var count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

- **应用场景**：
  - 数据私有化
  - 函数工厂
  - 模块化
  - 防抖节流

- **注意事项**：
  - 可能导致内存泄漏
  - 需要及时释放引用

### 8. this 的指向规则？

- **默认绑定**：全局环境或普通函数调用，`this` 指向 `window`（严格模式下为 `undefined`）

```javascript
function fn() {
  console.log(this); // window
}
fn();
```

- **隐式绑定**：对象方法调用，`this` 指向调用对象

```javascript
const obj = {
  name: 'obj',
  fn: function() {
    console.log(this.name); // 'obj'
  }
};
obj.fn();
```

- **显式绑定**：使用 `call`、`apply`、`bind`，`this` 指向第一个参数

```javascript
function fn() {
  console.log(this.name);
}
const obj = { name: 'obj' };
fn.call(obj); // 'obj'
```

- **new 绑定**：构造函数调用，`this` 指向新创建的对象

```javascript
function Person(name) {
  this.name = name;
}
const p = new Person('Tom');
console.log(p.name); // 'Tom'
```

- **箭头函数**：没有自己的 `this`，继承外层作用域的 `this`

```javascript
const obj = {
  name: 'obj',
  fn: () => {
    console.log(this); // window
  }
};
obj.fn();
```

### 9. call、apply、bind 的区别？

- **call**：
  - 立即执行函数
  - 参数逐个传递
  - `fn.call(thisArg, arg1, arg2, ...)`

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + this.name + punctuation);
}
const obj = { name: 'Tom' };
greet.call(obj, 'Hello, ', '!'); // Hello, Tom!
```

- **apply**：
  - 立即执行函数
  - 参数以数组传递
  - `fn.apply(thisArg, [arg1, arg2, ...])`

```javascript
greet.apply(obj, ['Hello, ', '!']); // Hello, Tom!
```

- **bind**：
  - 返回新函数，不立即执行
  - 参数可以分批传递
  - `fn.bind(thisArg, arg1, arg2, ...)`

```javascript
const boundGreet = greet.bind(obj, 'Hello, ');
boundGreet('!'); // Hello, Tom!
```

### 10. 什么是原型和原型链？

- **原型（prototype）**：
  - 每个函数都有一个 `prototype` 属性
  - 指向一个对象，包含共享的属性和方法

- **原型链**：
  - 对象通过 `__proto__` 访问原型
  - 查找属性时，沿着原型链向上查找
  - 直到 `Object.prototype`，再往上为 `null`

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

const p = new Person('Tom');
p.sayHello(); // 通过原型链找到 sayHello 方法
```

- **原型链查找**：
  1. 对象自身属性
  2. 构造函数 `prototype`
  3. `Object.prototype`
  4. `null`

### 11. 如何实现继承？

- **原型链继承**：
  - 子类原型指向父类实例
  - 问题：引用类型共享，无法传参

```javascript
function Parent() {
  this.name = 'parent';
}
function Child() {}
Child.prototype = new Parent();
```

- **构造函数继承**：
  - 在子类中调用父类构造函数
  - 问题：无法继承原型方法

```javascript
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name);
}
```

- **组合继承**：
  - 结合原型链和构造函数
  - 问题：调用两次父类构造函数

```javascript
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
```

- **寄生组合继承**（推荐）：
  - 使用 `Object.create` 创建原型
  - 只调用一次父类构造函数

```javascript
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

- **ES6 Class 继承**：

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
```

### 12. 深拷贝和浅拷贝的区别？

- **浅拷贝**：
  - 只拷贝第一层
  - 引用类型共享内存
  - 方法：`Object.assign()`、展开运算符、`Array.slice()`

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = Object.assign({}, obj1);
obj2.b.c = 3;
console.log(obj1.b.c); // 3，被修改了
```

- **深拷贝**：
  - 完全拷贝，独立内存
  - 方法：`JSON.parse(JSON.stringify())`、递归、`structuredClone()`

```javascript
// JSON 方法（有局限性）
const obj2 = JSON.parse(JSON.stringify(obj1));

// 递归实现
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  const clone = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
```

### 13. 数组的常用方法？

- **改变原数组**：
  - `push()`、`pop()`：末尾添加/删除
  - `shift()`、`unshift()`：开头删除/添加
  - `splice()`：删除/插入/替换
  - `sort()`、`reverse()`：排序、反转
  - `fill()`：填充

- **不改变原数组**：
  - `concat()`：连接
  - `slice()`：截取
  - `join()`：转字符串
  - `indexOf()`、`includes()`：查找
  - `map()`、`filter()`、`reduce()`：遍历

- **遍历方法**：
  - `forEach()`：遍历，无返回值
  - `map()`：映射，返回新数组
  - `filter()`：过滤，返回新数组
  - `reduce()`：归约，返回累计值
  - `some()`、`every()`：判断条件

### 14. 什么是事件循环（Event Loop）？

- **定义**：JavaScript 单线程执行机制，通过事件循环实现异步
- **执行栈（Call Stack）**：
  - 同步代码执行
  - 函数调用形成栈

- **任务队列**：
  - **宏任务（MacroTask）**：`setTimeout`、`setInterval`、`I/O`、`UI渲染`
  - **微任务（MicroTask）**：`Promise.then`、`queueMicrotask`、`MutationObserver`

- **执行顺序**：
  1. 执行同步代码
  2. 执行所有微任务
  3. 执行一个宏任务
  4. 重复步骤 2-3

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 输出：1, 4, 3, 2
```

### 15. Promise 的原理和使用？

- **定义**：异步编程解决方案，解决回调地狱
- **三种状态**：
  - `pending`：进行中
  - `fulfilled`：成功
  - `rejected`：失败

- **基本用法**：

```javascript
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});

promise
  .then(value => console.log(value))
  .catch(error => console.error(error))
  .finally(() => console.log('完成'));
```

- **静态方法**：
  - `Promise.all()`：所有成功才成功
  - `Promise.race()`：第一个完成
  - `Promise.allSettled()`：等待所有完成
  - `Promise.any()`：第一个成功

- **实现原理**：
  - 状态机管理
  - 回调队列存储
  - 链式调用通过返回新 Promise

### 16. async/await 的原理？

- **定义**：Promise 的语法糖，使异步代码像同步代码
- **特点**：
  - `async` 函数返回 Promise
  - `await` 等待 Promise 完成
  - 错误用 `try/catch` 捕获

```javascript
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return data.json();
  } catch (error) {
    console.error(error);
  }
}
```

- **原理**：
  - `async/await` 会被编译成生成器函数
  - 使用 `yield` 暂停执行
  - 通过执行器控制流程

### 17. 防抖（Debounce）和节流（Throttle）？

- **防抖**：
  - 连续触发只执行最后一次
  - 应用：搜索框、窗口 resize

```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

- **节流**：
  - 固定时间只执行一次
  - 应用：滚动事件、按钮点击

```javascript
function throttle(fn, delay) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
```

### 18. 什么是内存泄漏？如何避免？

- **定义**：不再使用的内存没有被释放
- **常见原因**：
  - 全局变量
  - 闭包引用
  - 事件监听未移除
  - 定时器未清除
  - DOM 引用未释放

- **避免方法**：
  - 及时清理事件监听
  - 清除定时器
  - 避免全局变量
  - 使用弱引用（WeakMap、WeakSet）
  - 工具检测（Chrome DevTools）

### 19. ES6+ 新特性？

- **let/const**：块作用域变量
- **箭头函数**：简化函数写法，绑定 `this`
- **解构赋值**：数组和对象解构
- **模板字符串**：反引号和 `${}`
- **扩展运算符**：`...` 展开和收集
- **Promise/async-await**：异步处理
- **Class**：类语法
- **模块化**：`import/export`
- **Symbol/Set/Map**：新数据类型
- **Proxy/Reflect**：元编程
- **可选链**：`?.` 安全访问
- **空值合并**：`??` 默认值

### 20. 如何实现一个 Promise？

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected'));
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
```

## JavaScript 原理深入

### 21. V8 引擎的执行流程？

- **解析阶段**：
  - 词法分析：代码转成 tokens
  - 语法分析：tokens 转成 AST

- **编译阶段**：
  - 解释器（Ignition）：生成字节码
  - 编译器（TurboFan）：优化热点代码

- **执行阶段**：
  - 执行字节码
  - 收集优化信息
  - 编译优化代码

### 22. 垃圾回收机制？

- **标记清除（Mark-Sweep）**：
  - 标记可达对象
  - 清除未标记对象
  - 会产生内存碎片

- **标记整理（Mark-Compact）**：
  - 标记可达对象
  - 整理内存，消除碎片

- **分代回收**：
  - **新生代**：频繁回收，使用 Scavenge 算法
  - **老生代**：较少回收，使用标记清除/整理

### 23. 函数式编程概念？

- **纯函数**：相同输入相同输出，无副作用
- **不可变性**：不修改原数据
- **高阶函数**：函数作为参数或返回值
- **函数组合**：组合多个函数

### 24. 模块化发展历程？

- **IIFE**：立即执行函数
- **CommonJS**：Node.js 使用，同步加载
- **AMD**：RequireJS，异步加载
- **ES6 Module**：标准模块化，静态分析

### 25. 性能优化方法？

- **代码层面**：
  - 减少 DOM 操作
  - 使用事件委托
  - 防抖节流
  - 避免全局变量
  - 使用 Web Workers

- **资源层面**：
  - 代码分割
  - 懒加载
  - 压缩代码
  - CDN 加速
  - 缓存策略

- **渲染层面**：
  - 虚拟滚动
  - 防抖节流
  - 使用 `requestAnimationFrame`
  - 避免强制同步布局