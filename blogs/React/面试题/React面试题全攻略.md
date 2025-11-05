---
title: React面试题全攻略
date: 2024/09/12
tags:
 - React
 - 面试题
categories:
 - React
---

## 基础概念

### 1. React是什么？
React是Facebook开发的用于构建用户界面的JavaScript库，采用组件化、声明式编程和虚拟DOM技术。

### 2. JSX语法
```jsx
// JSX本质是React.createElement的语法糖
const element = <h1>Hello, {name}!</h1>;

// 编译后
const element = React.createElement('h1', null, 'Hello, ', name, '!');
```

### 3. 组件定义方式
```jsx
// 函数组件
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

// 箭头函数组件
const Welcome = ({ name }) => <h1>Hello, {name}</h1>;
```

## 状态管理

### 1. useState Hook
```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    // 函数式更新
    const increment = () => setCount(prev => prev + 1);
    
    // 批量更新
    const handleClick = () => {
        setCount(c => c + 1);
        setCount(c => c + 1); // 会被合并
    };
    
    return <button onClick={increment}>{count}</button>;
}
```

### 2. useReducer Hook
```jsx
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </div>
    );
}
```

## 生命周期

### 1. 类组件生命周期
```jsx
class LifecycleDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    
    componentDidMount() {
        // 组件挂载后执行
        console.log('组件已挂载');
    }
    
    componentDidUpdate(prevProps, prevState) {
        // 组件更新后执行
        if (prevState.count !== this.state.count) {
            console.log('count已更新');
        }
    }
    
    componentWillUnmount() {
        // 组件卸载前执行
        console.log('组件即将卸载');
    }
    
    render() {
        return <div>{this.state.count}</div>;
    }
}
```

### 2. 函数组件生命周期模拟
```jsx
function LifecycleDemo() {
    const [count, setCount] = useState(0);
    
    // componentDidMount
    useEffect(() => {
        console.log('组件已挂载');
    }, []);
    
    // componentDidUpdate
    useEffect(() => {
        console.log('count已更新');
    }, [count]);
    
    // componentWillUnmount
    useEffect(() => {
        return () => {
            console.log('组件即将卸载');
        };
    }, []);
    
    return <div>{count}</div>;
}
```

## 事件处理

### 1. 合成事件
```jsx
function Button() {
    const handleClick = (e) => {
        e.preventDefault(); // 阻止默认行为
        e.stopPropagation(); // 阻止冒泡
        
        // 访问原生事件
        console.log(e.nativeEvent);
    };
    
    return <button onClick={handleClick}>点击</button>;
}
```

### 2. 事件绑定方式
```jsx
class EventDemo extends React.Component {
    constructor(props) {
        super(props);
        // 方式1: 构造函数绑定
        this.handleClick1 = this.handleClick1.bind(this);
    }
    
    handleClick1() {
        console.log('方式1');
    }
    
    // 方式2: 箭头函数属性
    handleClick2 = () => {
        console.log('方式2');
    }
    
    render() {
        return (
            <div>
                <button onClick={this.handleClick1}>按钮1</button>
                <button onClick={this.handleClick2}>按钮2</button>
                {/* 方式3: 内联箭头函数 */}
                <button onClick={() => console.log('方式3')}>按钮3</button>
            </div>
        );
    }
}
```

## 组件通信

### 1. 父子组件通信
```jsx
// 父组件
function Parent() {
    const [message, setMessage] = useState('');
    
    const handleChildMessage = (msg) => {
        setMessage(msg);
    };
    
    return (
        <div>
            <Child onMessage={handleChildMessage} />
            <p>来自子组件: {message}</p>
        </div>
    );
}

// 子组件
function Child({ onMessage }) {
    const sendMessage = () => {
        onMessage('Hello from child!');
    };
    
    return <button onClick={sendMessage}>发送消息</button>;
}
```

### 2. Context API
```jsx
const ThemeContext = React.createContext('light');

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar() {
    return <ThemedButton />;
}

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return <button className={theme}>按钮</button>;
}
```

## 性能优化

### 1. React.memo
```jsx
const ExpensiveComponent = React.memo(({ data, onClick }) => {
    console.log('ExpensiveComponent渲染');
    return <div onClick={onClick}>{data}</div>;
});

// 自定义比较函数
const MyComponent = React.memo(({ user }) => {
    return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
});
```

### 2. useMemo和useCallback
```jsx
function ExpensiveList({ items, filter }) {
    // 缓存计算结果
    const filteredItems = useMemo(() => {
        return items.filter(item => item.includes(filter));
    }, [items, filter]);
    
    // 缓存函数引用
    const handleClick = useCallback((id) => {
        console.log('点击了', id);
    }, []);
    
    return (
        <ul>
            {filteredItems.map(item => (
                <li key={item} onClick={() => handleClick(item)}>
                    {item}
                </li>
            ))}
        </ul>
    );
}
```

### 3. 代码分割
```jsx
// 路由级别分割
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
        </Router>
    );
}
```

## 高级特性

### 1. 高阶组件(HOC)
```jsx
function withLoading(WrappedComponent) {
    return function WithLoadingComponent(props) {
        if (props.isLoading) {
            return <div>Loading...</div>;
        }
        return <WrappedComponent {...props} />;
    };
}

// 使用
const EnhancedComponent = withLoading(MyComponent);
```

### 2. Render Props
```jsx
class Mouse extends React.Component {
    state = { x: 0, y: 0 };
    
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }
    
    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

// 使用
function App() {
    return (
        <Mouse render={({ x, y }) => (
            <h1>鼠标位置: ({x}, {y})</h1>
        )} />
    );
}
```

### 3. 自定义Hook
```jsx
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = useCallback(() => setCount(c => c + 1), []);
    const decrement = useCallback(() => setCount(c => c - 1), []);
    const reset = useCallback(() => setCount(initialValue), [initialValue]);
    
    return { count, increment, decrement, reset };
}

// 使用
function Counter() {
    const { count, increment, decrement, reset } = useCounter(0);
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>重置</button>
        </div>
    );
}
```

## 错误边界

### 1. 类组件错误边界
```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.log('错误:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>出错了!</h1>;
        }
        
        return this.props.children;
    }
}
```

### 2. 函数组件错误处理
```jsx
function useErrorHandler() {
    const [error, setError] = useState(null);
    
    const resetError = () => setError(null);
    
    const captureError = (error) => {
        setError(error);
    };
    
    useEffect(() => {
        if (error) {
            console.error('捕获到错误:', error);
        }
    }, [error]);
    
    return { error, resetError, captureError };
}
```

## React 18新特性

### 1. 并发特性
```jsx
import { startTransition, useDeferredValue } from 'react';

function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query);
    const results = useMemo(() => 
        searchData(deferredQuery), [deferredQuery]
    );
    
    return <div>{results}</div>;
}

function App() {
    const [query, setQuery] = useState('');
    
    const handleChange = (e) => {
        const value = e.target.value;
        
        // 紧急更新
        setQuery(value);
        
        // 非紧急更新
        startTransition(() => {
            // 更新搜索结果
        });
    };
    
    return <input onChange={handleChange} />;
}
```

### 2. Suspense改进
```jsx
function App() {
    return (
        <Suspense fallback={<Loading />}>
            <ProfilePage />
        </Suspense>
    );
}

function ProfilePage() {
    const user = use(fetchUser()); // React 18+ 实验性API
    return <div>{user.name}</div>;
}
```

## 常见面试问题

### 1. 为什么需要key？
```jsx
// 没有key时的问题
const items = ['A', 'B', 'C'];
// 插入新元素到开头
const newItems = ['D', 'A', 'B', 'C'];

// React会认为:
// A -> D (更新)
// B -> A (更新) 
// C -> B (更新)
// 新增 C

// 有key时
{items.map(item => <Item key={item} value={item} />)}
// React能正确识别元素的移动和新增
```

### 2. setState是同步还是异步？
```jsx
function Component() {
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
        console.log('点击前:', count); // 0
        
        setCount(count + 1);
        console.log('设置后:', count); // 仍然是0 (异步)
        
        // 在React 18中，所有更新都是异步的
        setTimeout(() => {
            setCount(c => c + 1); // 异步
        }, 0);
    };
    
    return <button onClick={handleClick}>{count}</button>;
}
```

### 3. 虚拟DOM的优势
- 减少直接DOM操作，提高性能
- 跨浏览器兼容性
- 批量更新，减少重排重绘
- 支持服务端渲染

React的核心在于组件化思想和声明式编程，掌握这些概念和模式是面试成功的关键。