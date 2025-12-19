---
title: "React面试题整理 - 从基础到原理"
date: 2025/12/19
tags:
  - React
  - 面试
categories:
  - 复习记录
---

<ReadAloud />

## React 基础面试题

### 1. React 是什么？有什么特点？

- **声明式编程**：使用 JSX 语法，描述 UI 应该是什么样子，而不是如何操作 DOM
- **组件化开发**：将 UI 拆分成独立、可复用的组件
- **虚拟 DOM**：通过虚拟 DOM 提升性能，减少直接操作真实 DOM
- **单向数据流**：数据从父组件流向子组件，保持数据流向清晰
- **生态丰富**：拥有庞大的生态系统和社区支持
- **跨平台**：支持 Web、React Native 等平台

### 2. JSX 是什么？为什么要使用 JSX？

- **定义**：JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中写类似 HTML 的代码
- **优势**：
  - 更直观：代码更接近 HTML，易于理解和维护
  - 类型安全：编译时检查，减少错误
  - 性能优化：Babel 编译时优化
- **编译过程**：JSX 会被 Babel 编译成 `React.createElement()` 调用

```javascript
// JSX
const element = <h1>Hello, World!</h1>;

// 编译后
const element = React.createElement('h1', null, 'Hello, World!');
```

### 3. React 组件有哪几种定义方式？

- **函数组件**：
  ```javascript
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

- **类组件**：
  ```javascript
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

- **箭头函数组件**：
  ```javascript
  const Welcome = (props) => {
    return <h1>Hello, {props.name}</h1>;
  };
  ```

### 4. 函数组件和类组件的区别？

- **语法**：函数组件更简洁，类组件需要继承 React.Component
- **状态管理**：函数组件使用 Hooks（useState），类组件使用 this.state
- **生命周期**：函数组件使用 useEffect，类组件使用生命周期方法
- **性能**：函数组件性能略好，没有 this 绑定开销
- **发展趋势**：React 推荐使用函数组件 + Hooks

### 5. props 和 state 的区别？

- **props**：
  - 从父组件传递的数据
  - 只读，不可修改
  - 用于组件间通信
  - 可以是任意类型（对象、函数、基本类型等）

- **state**：
  - 组件内部的状态
  - 可修改，通过 setState 更新
  - 用于组件内部数据管理
  - 更新会触发组件重新渲染

### 6. setState 是同步还是异步的？

- **批量更新**：React 会将多个 setState 调用合并，进行批量更新
- **异步执行**：在 React 事件处理函数中，setState 是异步的
- **同步场景**：在 setTimeout、Promise.then 等原生事件中，setState 是同步的
- **回调函数**：setState 的第二个参数是回调函数，在更新完成后执行

```javascript
// 异步更新
this.setState({ count: this.state.count + 1 });
console.log(this.state.count); // 旧值

// 使用回调
this.setState({ count: this.state.count + 1 }, () => {
  console.log(this.state.count); // 新值
});

// 函数式更新
this.setState((prevState) => ({
  count: prevState.count + 1
}));
```

### 7. React 生命周期有哪些？

**挂载阶段**：
- `constructor()`：初始化 state 和绑定方法
- `static getDerivedStateFromProps()`：从 props 派生 state
- `render()`：渲染组件
- `componentDidMount()`：组件挂载后执行

**更新阶段**：
- `static getDerivedStateFromProps()`：props 或 state 变化时调用
- `shouldComponentUpdate()`：决定是否重新渲染
- `render()`：渲染组件
- `getSnapshotBeforeUpdate()`：更新前获取快照
- `componentDidUpdate()`：更新后执行

**卸载阶段**：
- `componentWillUnmount()`：组件卸载前清理

### 8. 受控组件和非受控组件的区别？

- **受控组件**：
  - 表单值由 React state 控制
  - 通过 onChange 事件更新 state
  - 数据流清晰，易于验证和控制

```javascript
function ControlledInput() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

- **非受控组件**：
  - 表单值由 DOM 自身管理
  - 使用 ref 获取表单值
  - 适合简单场景，代码更少

```javascript
function UncontrolledInput() {
  const inputRef = useRef();
  return <input ref={inputRef} defaultValue="初始值" />;
}
```

### 9. key 的作用是什么？

- **唯一标识**：帮助 React 识别哪些元素改变了
- **性能优化**：减少不必要的 DOM 操作
- **正确使用**：应该使用稳定、唯一、可预测的值
- **错误用法**：不要使用数组索引作为 key（当列表顺序会变化时）

```javascript
// 正确：使用唯一 ID
{items.map(item => <Item key={item.id} data={item} />)}

// 错误：使用索引（当列表会重新排序时）
{items.map((item, index) => <Item key={index} data={item} />)}
```

### 10. React 事件系统（SyntheticEvent）是什么？

- **合成事件**：React 封装了原生事件，提供统一的 API
- **事件委托**：所有事件都委托到 document（React 17+ 委托到根容器）
- **事件池**：事件对象会被复用，异步访问需要调用 `event.persist()`
- **优势**：
  - 跨浏览器兼容性
  - 统一的事件处理
  - 更好的性能

## React Hooks 面试题

### 11. 什么是 Hooks？为什么要引入 Hooks？

- **定义**：Hooks 是 React 16.8 引入的新特性，允许在函数组件中使用状态和生命周期
- **解决的问题**：
  - 逻辑复用困难（HOC、render props 复杂）
  - 类组件 this 绑定问题
  - 生命周期逻辑分散
  - 代码更简洁、易理解

### 12. useState 的使用和原理？

- **基本用法**：
  ```javascript
  const [state, setState] = useState(initialValue);
  ```

- **特点**：
  - 函数式更新：`setState(prev => prev + 1)`
  - 惰性初始化：`useState(() => expensiveComputation())`
  - 状态更新会触发组件重新渲染

- **原理**：使用链表结构存储状态，通过顺序索引访问

### 13. useEffect 的使用和原理？

- **基本用法**：
  ```javascript
  useEffect(() => {
    // 副作用逻辑
    return () => {
      // 清理函数
    };
  }, [dependencies]);
  ```

- **执行时机**：
  - 组件挂载后执行
  - 依赖项变化时执行
  - 组件卸载前执行清理函数

- **依赖数组**：
  - 空数组 `[]`：只在挂载和卸载时执行
  - 有依赖：依赖变化时执行
  - 无依赖：每次渲染都执行

### 14. useCallback 和 useMemo 的区别？

- **useCallback**：
  - 缓存函数引用
  - 用于优化子组件渲染（避免不必要的重新渲染）
  - 依赖项变化时返回新函数

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- **useMemo**：
  - 缓存计算结果
  - 用于优化昂贵计算
  - 依赖项变化时重新计算

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 15. useRef 的作用和使用场景？

- **作用**：
  - 获取 DOM 元素引用
  - 保存可变值（不触发重新渲染）
  - 保存上一次的值

- **使用场景**：
  ```javascript
  // 获取 DOM 引用
  const inputRef = useRef();
  <input ref={inputRef} />
  
  // 保存可变值
  const countRef = useRef(0);
  countRef.current = countRef.current + 1;
  
  // 保存上一次的值
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  ```

### 16. useContext 的使用？

- **作用**：在组件树中共享数据，避免 props 层层传递
- **使用步骤**：
  1. 创建 Context：`const MyContext = createContext(defaultValue)`
  2. 提供 Context：`<MyContext.Provider value={value}>`
  3. 消费 Context：`const value = useContext(MyContext)`

```javascript
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}
```

### 17. 自定义 Hooks 是什么？如何创建？

- **定义**：以 `use` 开头的函数，可以调用其他 Hooks
- **作用**：提取组件逻辑，实现逻辑复用
- **示例**：
  ```javascript
  function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return { count, increment, decrement };
  }
  
  function Counter() {
    const { count, increment, decrement } = useCounter(0);
    return (
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    );
  }
  ```

### 18. Hooks 的使用规则？

- **只在顶层调用**：不要在循环、条件或嵌套函数中调用
- **只在函数组件中调用**：不要在普通函数中调用
- **原因**：Hooks 依赖调用顺序，条件调用会破坏顺序

```javascript
// 错误示例
if (condition) {
  const [state, setState] = useState(0); // 违反规则
}

// 正确示例
const [state, setState] = useState(0);
if (condition) {
  // 使用 state
}
```

## React 原理面试题

### 19. 虚拟 DOM 是什么？为什么使用虚拟 DOM？

- **定义**：用 JavaScript 对象描述真实 DOM 的结构
- **优势**：
  - **性能优化**：减少直接操作 DOM 的次数
  - **跨平台**：可以渲染到不同平台（Web、Native）
  - **声明式编程**：更直观的代码
- **工作原理**：
  1. 状态变化时创建新的虚拟 DOM 树
  2. 对比新旧虚拟 DOM（diff 算法）
  3. 计算最小更新操作
  4. 批量更新真实 DOM

### 20. React Diff 算法的原理？

- **三个假设**：
  1. 不同类型的元素会产生不同的树
  2. 通过 key 来标识哪些子元素是稳定的
  3. 组件的状态在更新前后保持一致

- **Diff 策略**：
  - **Tree Diff**：逐层比较，只比较同层节点
  - **Component Diff**：同类型组件继续 diff，不同类型直接替换
  - **Element Diff**：通过 key 标识，移动、添加、删除节点

- **优化**：
  - 只比较同层节点，不跨层比较
  - 使用 key 优化列表渲染
  - 相同类型的组件会继续 diff

### 21. Fiber 架构是什么？

- **定义**：React 16 引入的新的协调算法，将渲染工作拆分成小的单元
- **特点**：
  - **可中断**：可以暂停、恢复渲染工作
  - **优先级调度**：根据优先级调度任务
  - **增量渲染**：将工作分成多个小任务
- **Fiber 节点**：
  - 包含组件信息、状态、副作用等
  - 形成链表结构（child、sibling、return）
- **优势**：
  - 更好的用户体验（避免阻塞）
  - 支持并发渲染
  - 更好的错误边界处理

### 22. React 的渲染流程？

1. **JSX 编译**：JSX 编译成 React.createElement
2. **创建虚拟 DOM**：生成虚拟 DOM 树
3. **协调（Reconciliation）**：Fiber 架构进行 diff 比较
4. **提交（Commit）**：将变更应用到真实 DOM
   - Before mutation：执行 getSnapshotBeforeUpdate
   - Mutation：更新 DOM
   - Layout：执行 componentDidUpdate、useLayoutEffect
   - Passive：执行 useEffect

### 23. React 的批处理（Batching）机制？

- **定义**：将多个状态更新合并成一次更新
- **自动批处理**（React 18+）：
  - 在事件处理函数中自动批处理
  - 在 Promise、setTimeout 等异步操作中也会批处理
- **手动批处理**：
  ```javascript
  // React 18 之前
  flushSync(() => {
    setCount1(1);
    setCount2(2);
  });
  ```

### 24. React 的错误边界（Error Boundary）？

- **定义**：捕获子组件树中的 JavaScript 错误，显示降级 UI
- **实现**：使用 `componentDidCatch` 或 `static getDerivedStateFromError`
- **限制**：
  - 不能捕获事件处理函数中的错误
  - 不能捕获异步代码中的错误
  - 不能捕获服务端渲染的错误
  - 不能捕获错误边界自身的错误

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 25. React 的合成事件系统原理？

- **事件委托**：所有事件都委托到根容器（React 17+）
- **事件池**：事件对象会被复用，异步访问需要 `event.persist()`
- **事件对象**：SyntheticEvent 封装原生事件，提供统一 API
- **优势**：
  - 跨浏览器兼容
  - 统一的事件处理
  - 更好的性能

### 26. React 的优先级调度？

- **优先级类型**：
  - Immediate：立即执行（用户输入）
  - UserBlocking：用户阻塞（hover、click）
  - Normal：正常优先级（大部分更新）
  - Low：低优先级（数据获取）
  - Idle：空闲时执行

- **调度机制**：
  - 使用 MessageChannel 实现时间切片
  - 根据优先级调度任务
  - 高优先级任务可以打断低优先级任务

## React 性能优化面试题

### 27. React 性能优化的方法？

- **使用 React.memo**：缓存组件，避免不必要的重新渲染
- **使用 useMemo/useCallback**：缓存计算结果和函数引用
- **代码分割**：使用 React.lazy 和 Suspense 实现按需加载
- **虚拟列表**：使用 react-window 或 react-virtualized
- **避免内联对象和函数**：在 render 中避免创建新对象
- **使用 key 优化列表**：使用稳定、唯一的 key
- **避免在 render 中进行昂贵计算**：使用 useMemo

### 28. React.memo 的使用？

- **作用**：缓存组件，只有 props 变化时才重新渲染
- **使用**：
  ```javascript
  const MyComponent = React.memo(function MyComponent({ name }) {
    return <div>{name}</div>;
  }, (prevProps, nextProps) => {
    // 自定义比较函数
    return prevProps.name === nextProps.name;
  });
  ```

- **注意**：只进行浅比较，复杂对象需要自定义比较函数

### 29. React.lazy 和 Suspense 的使用？

- **作用**：实现代码分割，按需加载组件
- **使用**：
  ```javascript
  const LazyComponent = React.lazy(() => import('./LazyComponent'));

  function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    );
  }
  ```

- **优势**：减少初始打包体积，提升首屏加载速度

### 30. 如何避免不必要的重新渲染？

- **使用 React.memo**：缓存组件
- **使用 useMemo/useCallback**：缓存值和函数
- **避免在 render 中创建新对象**：
  ```javascript
  // 错误
  <Child style={{ color: 'red' }} />
  
  // 正确
  const style = { color: 'red' };
  <Child style={style} />
  ```
- **合理拆分组件**：将频繁更新的部分拆分出来
- **使用 shouldComponentUpdate**：类组件中控制更新

## React 生态面试题

### 31. React Router 的原理？

- **Hash 模式**：使用 `#` 后面的路径，通过 `hashchange` 事件监听
- **History 模式**：使用 HTML5 History API（pushState、replaceState）
- **核心概念**：
  - Router：路由容器
  - Route：路由配置
  - Link：导航组件
  - useNavigate/useParams：Hooks API

### 32. Redux 的工作原理？

- **三大原则**：
  1. 单一数据源：整个应用的状态存储在单一 store
  2. 状态只读：只能通过 action 修改状态
  3. 纯函数修改：使用纯函数 reducer 修改状态

- **工作流程**：
  1. 组件 dispatch action
  2. Redux 调用 reducer 函数
  3. Reducer 返回新状态
  4. Store 更新状态
  5. 组件订阅 store，自动更新

### 33. Redux 和 MobX 的区别？

- **Redux**：
  - 函数式编程
  - 单一数据源
  - 不可变数据
  - 需要更多样板代码
  - 适合大型应用

- **MobX**：
  - 面向对象编程
  - 多个 store
  - 可变数据（响应式）
  - 代码更简洁
  - 适合中小型应用

### 34. React 和 Vue 的区别？

- **模板语法**：
  - React：JSX（JavaScript 扩展）
  - Vue：模板语法（类似 HTML）

- **状态管理**：
  - React：需要 Redux、MobX 等
  - Vue：内置响应式系统

- **学习曲线**：
  - React：需要理解 JSX、Hooks、函数式编程
  - Vue：更接近传统 HTML/CSS/JS

- **生态系统**：
  - React：更庞大，选择更多
  - Vue：更统一，官方维护

- **性能**：
  - React：虚拟 DOM + Fiber
  - Vue：虚拟 DOM + 响应式系统

### 35. SSR（服务端渲染）的原理？

- **定义**：在服务器端渲染 React 组件，生成 HTML 字符串
- **优势**：
  - 更好的 SEO
  - 更快的首屏加载
  - 更好的用户体验
- **实现**：
  - 使用 ReactDOMServer.renderToString()
  - 客户端使用 ReactDOM.hydrate() 激活
- **框架**：Next.js、Remix 等

### 36. React 18 的新特性？

- **并发渲染**：支持并发特性，提升用户体验
- **自动批处理**：自动批处理更多场景的状态更新
- **Suspense 改进**：支持服务端渲染的 Suspense
- **新的 Hooks**：
  - useId：生成唯一 ID
  - useTransition：标记非紧急更新
  - useDeferredValue：延迟更新值
  - useSyncExternalStore：订阅外部 store
  - useInsertionEffect：CSS-in-JS 库使用

### 37. useTransition 和 useDeferredValue 的区别？

- **useTransition**：
  - 标记非紧急的状态更新
  - 返回 `[isPending, startTransition]`
  - 用于标记哪些更新可以被打断

```javascript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setCount(count + 1);
});
```

- **useDeferredValue**：
  - 延迟更新值
  - 返回延迟后的值
  - 用于延迟更新非紧急的 UI

```javascript
const deferredValue = useDeferredValue(value);
```

### 38. React 的 Portal 是什么？

- **定义**：将子节点渲染到 DOM 树的不同位置
- **使用场景**：模态框、工具提示、弹出层等
- **使用**：
  ```javascript
  import { createPortal } from 'react-dom';
  
  function Modal({ children }) {
    return createPortal(
      children,
      document.body
    );
  }
  ```

- **优势**：可以渲染到任意 DOM 节点，不受父组件样式影响

### 39. React 的 Context API 使用注意事项？

- **性能问题**：Context 值变化会导致所有消费组件重新渲染
- **解决方案**：
  - 拆分 Context（按功能拆分）
  - 使用 useMemo 缓存 Context 值
  - 使用多个 Context 而不是一个大的 Context
- **最佳实践**：
  - 只在需要跨层级传递数据时使用
  - 避免在 Context 中存储频繁变化的数据

### 40. React 的严格模式（StrictMode）？

- **作用**：帮助发现潜在问题
- **检查项**：
  - 识别不安全的生命周期
  - 警告过时的 API
  - 检测意外的副作用
  - 检测过时的 Context API
- **使用**：
  ```javascript
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ```
- **注意**：严格模式会故意双重调用某些函数（开发环境）

## React 场景面试题

### 41. 场景：如何优化一个包含 10000 条数据的列表渲染？

**问题分析**：
- 直接渲染会导致页面卡顿
- 需要虚拟滚动或分页

**解决方案**：

1. **使用虚拟滚动**：
   ```javascript
   import { FixedSizeList } from 'react-window';
   
   function VirtualList({ items }) {
     return (
       <FixedSizeList
         height={600}
         itemCount={items.length}
         itemSize={50}
         width="100%"
       >
         {({ index, style }) => (
           <div style={style}>
             {items[index].name}
           </div>
         )}
       </FixedSizeList>
     );
   }
   ```

2. **分页加载**：
   ```javascript
   function PaginatedList() {
     const [page, setPage] = useState(1);
     const [data, setData] = useState([]);
     
     useEffect(() => {
       fetchData(page).then(setData);
     }, [page]);
     
     return (
       <>
         {data.map(item => <Item key={item.id} data={item} />)}
         <button onClick={() => setPage(page + 1)}>加载更多</button>
       </>
     );
   }
   ```

3. **使用 useMemo 优化**：
   ```javascript
   const visibleItems = useMemo(() => {
     return items.slice(startIndex, endIndex);
   }, [items, startIndex, endIndex]);
   ```

### 42. 场景：如何实现一个防抖搜索功能？

**需求**：用户输入时，延迟 500ms 后执行搜索，避免频繁请求

**解决方案**：

```javascript
import { useState, useEffect, useRef } from 'react';

function SearchInput() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const timerRef = useRef();

  useEffect(() => {
    // 清除之前的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 设置新的定时器
    timerRef.current = setTimeout(() => {
      if (keyword.trim()) {
        searchAPI(keyword).then(setResults);
      }
    }, 500);

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [keyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜索..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**使用自定义 Hook**：

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function SearchInput() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedKeyword) {
      searchAPI(debouncedKeyword).then(setResults);
    }
  }, [debouncedKeyword]);
}
```

### 43. 场景：如何实现一个无限滚动列表？

**需求**：滚动到底部时自动加载更多数据

**解决方案**：

```javascript
import { useState, useEffect, useRef, useCallback } from 'react';

function InfiniteScrollList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchMoreData(items.length);
    setItems(prev => [...prev, ...newItems]);
    setHasMore(newItems.length > 0);
    setLoading(false);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
        >
          {item.name}
        </div>
      ))}
      {loading && <div>加载中...</div>}
    </div>
  );
}
```

### 44. 场景：父子组件通信，子组件如何向父组件传递数据？

**解决方案**：

1. **通过回调函数**：
   ```javascript
   function Parent() {
     const [data, setData] = useState(null);
     
     const handleChildData = (childData) => {
       setData(childData);
     };
     
     return <Child onDataChange={handleChildData} />;
   }
   
   function Child({ onDataChange }) {
     const handleClick = () => {
       onDataChange('子组件数据');
     };
     
     return <button onClick={handleClick}>传递数据</button>;
   }
   ```

2. **使用 Context**：
   ```javascript
   const DataContext = createContext();
   
   function Parent() {
     const [data, setData] = useState(null);
     
     return (
       <DataContext.Provider value={{ data, setData }}>
         <Child />
       </DataContext.Provider>
     );
   }
   
   function Child() {
     const { setData } = useContext(DataContext);
     
     return (
       <button onClick={() => setData('子组件数据')}>
         传递数据
       </button>
     );
   }
   ```

### 45. 场景：如何实现一个可复用的表单组件？

**需求**：支持多种输入类型，统一验证和提交

**解决方案**：

```javascript
function Form({ fields, onSubmit, initialValues = {} }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label}不能为空`;
      }
      if (field.validator) {
        const error = field.validator(formData[field.name]);
        if (error) newErrors[field.name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : (
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
          {errors[field.name] && (
            <span className="error">{errors[field.name]}</span>
          )}
        </div>
      ))}
      <button type="submit">提交</button>
    </form>
  );
}

// 使用
const fields = [
  { name: 'username', label: '用户名', type: 'text', required: true },
  { name: 'email', label: '邮箱', type: 'email', 
    validator: (value) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return '邮箱格式不正确';
      }
    }
  }
];
```

### 46. 场景：如何实现一个拖拽排序的列表？

**解决方案**：

```javascript
import { useState } from 'react';

function DraggableList({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedItem === null) return;

    const newItems = [...items];
    const draggedItemData = newItems[draggedItem];
    
    // 移除拖拽项
    newItems.splice(draggedItem, 1);
    // 插入到新位置
    newItems.splice(dropIndex, 0, draggedItemData);
    
    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          style={{
            cursor: 'move',
            opacity: draggedItem === index ? 0.5 : 1
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### 47. 场景：如何实现一个图片懒加载组件？

**解决方案**：

```javascript
import { useState, useEffect, useRef } from 'react';

function LazyImage({ src, alt, placeholder }) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s'
      }}
    />
  );
}
```

### 48. 场景：如何实现一个全局加载状态管理？

**需求**：多个组件需要共享加载状态

**解决方案**：

1. **使用 Context**：
   ```javascript
   const LoadingContext = createContext();
   
   function LoadingProvider({ children }) {
     const [loading, setLoading] = useState(false);
     
     return (
       <LoadingContext.Provider value={{ loading, setLoading }}>
         {children}
         {loading && <div className="loading">加载中...</div>}
       </LoadingContext.Provider>
     );
   }
   
   function useLoading() {
     const { setLoading } = useContext(LoadingContext);
     
     const withLoading = async (asyncFn) => {
       setLoading(true);
       try {
         const result = await asyncFn();
         return result;
       } finally {
         setLoading(false);
       }
     };
     
     return { withLoading };
   }
   
   // 使用
   function MyComponent() {
     const { withLoading } = useLoading();
     
     const fetchData = async () => {
       const data = await withLoading(() => fetch('/api/data'));
       return data;
     };
   }
   ```

2. **使用自定义 Hook**：
   ```javascript
   function useAsync(asyncFn) {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     const [data, setData] = useState(null);
     
     const execute = useCallback(async (...args) => {
       setLoading(true);
       setError(null);
       try {
         const result = await asyncFn(...args);
         setData(result);
         return result;
       } catch (err) {
         setError(err);
         throw err;
       } finally {
         setLoading(false);
       }
     }, [asyncFn]);
     
     return { loading, error, data, execute };
   }
   ```

### 49. 场景：如何优化一个频繁更新的组件？

**问题**：父组件频繁更新导致子组件不必要的重新渲染

**解决方案**：

1. **使用 React.memo**：
   ```javascript
   const ExpensiveChild = React.memo(({ data }) => {
     return <div>{data.name}</div>;
   }, (prevProps, nextProps) => {
     // 自定义比较
     return prevProps.data.id === nextProps.data.id;
   });
   ```

2. **使用 useMemo 和 useCallback**：
   ```javascript
   function Parent() {
     const [count, setCount] = useState(0);
     const [data, setData] = useState({ name: 'test' });
     
     // 缓存函数
     const handleClick = useCallback(() => {
       console.log('clicked');
     }, []);
     
     // 缓存计算结果
     const expensiveValue = useMemo(() => {
       return computeExpensiveValue(data);
     }, [data]);
     
     return (
       <div>
         <button onClick={() => setCount(count + 1)}>{count}</button>
         <Child data={data} onClick={handleClick} value={expensiveValue} />
       </div>
     );
   }
   ```

3. **拆分组件**：
   ```javascript
   // 将频繁更新的部分拆分
   function Parent() {
     const [count, setCount] = useState(0);
     const [data, setData] = useState({ name: 'test' });
     
     return (
       <div>
         <Counter count={count} setCount={setCount} />
         <DataDisplay data={data} />
       </div>
     );
   }
   ```

### 50. 场景：如何实现一个自定义的 useFetch Hook？

**需求**：封装数据获取逻辑，支持加载状态、错误处理、缓存

**解决方案**：

```javascript
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});

  useEffect(() => {
    let cancelled = false;

    // 检查缓存
    if (options.cache && cacheRef.current[url]) {
      setData(cacheRef.current[url]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(url, options)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setData(data);
          if (options.cache) {
            cacheRef.current[url] = data;
          }
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  const refetch = useCallback(() => {
    if (options.cache) {
      delete cacheRef.current[url];
    }
    // 触发重新获取
    setLoading(true);
  }, [url, options.cache]);

  return { data, loading, error, refetch };
}

// 使用
function MyComponent() {
  const { data, loading, error, refetch } = useFetch('/api/data', {
    cache: true
  });

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  
  return (
    <div>
      <button onClick={refetch}>重新获取</button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
```

### 51. 场景：如何实现一个多步骤表单（Wizard）？

**解决方案**：

```javascript
function Wizard({ steps, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const validateStep = (stepIndex) => {
    const step = steps[stepIndex];
    const stepErrors = {};
    
    step.fields?.forEach(field => {
      if (field.required && !formData[field.name]) {
        stepErrors[field.name] = `${field.label}不能为空`;
      }
    });
    
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(formData);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div>
      <div className="steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={index <= currentStep ? 'active' : ''}
          >
            {step.title}
          </div>
        ))}
      </div>
      
      <CurrentStepComponent
        data={formData}
        errors={errors}
        updateData={updateFormData}
      />
      
      <div className="buttons">
        {currentStep > 0 && (
          <button onClick={prev}>上一步</button>
        )}
        <button onClick={next}>
          {currentStep === steps.length - 1 ? '完成' : '下一步'}
        </button>
      </div>
    </div>
  );
}
```

### 52. 场景：如何实现一个可撤销/重做的功能？

**解决方案**：

```javascript
function useUndoRedo(initialValue) {
  const [history, setHistory] = useState([initialValue]);
  const [index, setIndex] = useState(0);

  const current = history[index];
  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  const setValue = (newValue) => {
    // 移除当前位置之后的历史
    const newHistory = history.slice(0, index + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (canUndo) {
      setIndex(index - 1);
    }
  };

  const redo = () => {
    if (canRedo) {
      setIndex(index + 1);
    }
  };

  return {
    value: current,
    setValue,
    undo,
    redo,
    canUndo,
    canRedo
  };
}

// 使用
function Editor() {
  const { value, setValue, undo, redo, canUndo, canRedo } = useUndoRedo('');

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={undo} disabled={!canUndo}>撤销</button>
      <button onClick={redo} disabled={!canRedo}>重做</button>
    </div>
  );
}
```

### 53. 场景：如何处理组件卸载后的异步操作？

**问题**：组件卸载后，异步操作完成时更新状态会导致内存泄漏

**解决方案**：

```javascript
function MyComponent() {
  const [data, setData] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    fetchData().then(result => {
      // 检查组件是否还在挂载
      if (mountedRef.current) {
        setData(result);
      }
    });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 或者使用 AbortController
  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/data', { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);
}
```

### 54. 场景：如何实现一个倒计时组件？

**解决方案**：

```javascript
function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  return { seconds, isRunning, start, pause, reset };
}

// 使用
function Countdown() {
  const { seconds, start, pause, reset } = useCountdown(60);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div>{formatTime(seconds)}</div>
      <button onClick={start}>开始</button>
      <button onClick={pause}>暂停</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

### 55. 场景：如何实现一个文件上传组件，支持进度显示？

**解决方案**：

```javascript
function FileUpload({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const handleUpload = async (file) => {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          onUploadComplete(JSON.parse(xhr.responseText));
        }
        setUploading(false);
      });

      xhr.addEventListener('error', () => {
        setUploading(false);
        alert('上传失败');
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    } catch (error) {
      setUploading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            handleUpload(file);
          }
        }}
        disabled={uploading}
      />
      {uploading && (
        <div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}
```

---

## 总结

React 面试题涵盖了从基础概念到深入原理的各个方面：

1. **基础**：组件、props、state、生命周期
2. **Hooks**：useState、useEffect、useMemo 等
3. **原理**：虚拟 DOM、Diff 算法、Fiber 架构
4. **优化**：性能优化、代码分割、缓存策略
5. **生态**：Router、Redux、SSR 等

掌握这些知识点，能够应对大部分 React 相关的面试问题。