---
title: React高频核心面试题精讲
date: 2024/11/12
tags:
 - React
 - 核心面试题
categories:
 - React
---

<ReadAloud />

## React基础核心问题

### 1. React中的key有什么作用？为什么不能用index作为key？

**面试表述要点：**

key是React中用于识别哪些列表项发生了变化、被添加或被移除的特殊属性。它在Virtual DOM的diff算法中起到关键作用。

**key的核心作用：**
1. **提高diff效率**：React通过key可以快速判断元素是新增、删除还是移动，避免不必要的DOM操作
2. **保持组件状态**：相同key的组件在重新渲染时会保持其内部状态
3. **优化性能**：减少DOM操作次数，提升渲染性能

**为什么不能用index作为key：**

使用数组索引作为key会导致以下问题：
- **状态混乱**：当列表项顺序发生变化时，组件的内部状态可能会错乱
- **性能问题**：React无法正确识别元素的移动，可能导致不必要的重新渲染
- **表单数据错乱**：输入框等表单元素的值可能会出现在错误的位置

**实际案例说明：**
```jsx
// 错误示例：使用index作为key
{items.map((item, index) => (
    <TodoItem key={index} item={item} />
))}

// 正确示例：使用唯一标识作为key
{items.map(item => (
    <TodoItem key={item.id} item={item} />
))}
```

当在列表开头插入新项时，使用index作为key会导致所有后续项的key发生变化，React会认为这些都是新的组件，从而重新创建它们，丢失原有状态。

### 2. React中setState是同步还是异步的？

**面试表述要点：**

这是一个经常被误解的问题。准确的说法是：setState的执行是同步的，但状态的更新和重新渲染是异步的。

**React 18之前的行为：**
- **在React事件处理器中**：状态更新是异步的，会被批量处理
- **在setTimeout、Promise等异步回调中**：状态更新是同步的，立即生效
- **在原生事件处理器中**：状态更新是同步的

**React 18的自动批处理：**
React 18引入了自动批处理（Automatic Batching），无论在什么情况下，所有的状态更新都会被批量处理，保证了行为的一致性。

**批量更新的好处：**
1. **性能优化**：避免多次不必要的重新渲染
2. **状态一致性**：确保组件看到的是一致的状态快照
3. **用户体验**：减少页面闪烁和布局抖动

**如何获取更新后的状态：**
```jsx
// 使用函数式更新
setCount(prevCount => {
    console.log('当前值:', prevCount);
    return prevCount + 1;
});

// 使用useEffect监听状态变化
useEffect(() => {
    console.log('count更新了:', count);
}, [count]);
```

### 3. React组件的生命周期有哪些？

**面试表述要点：**

React组件生命周期可以分为三个主要阶段：挂载、更新和卸载。React 16.3后引入了新的生命周期方法，废弃了一些不安全的方法。

**挂载阶段（Mounting）：**
1. **constructor**：组件实例化时调用，用于初始化state和绑定方法
2. **static getDerivedStateFromProps**：根据props计算state，返回对象更新state或返回null
3. **render**：渲染方法，返回JSX或其他React元素
4. **componentDidMount**：组件挂载完成后调用，适合进行API调用、订阅等副作用操作

**更新阶段（Updating）：**
1. **static getDerivedStateFromProps**：props或state变化时调用
2. **shouldComponentUpdate**：决定组件是否需要重新渲染，返回boolean
3. **render**：重新渲染组件
4. **getSnapshotBeforeUpdate**：在DOM更新前获取快照信息
5. **componentDidUpdate**：组件更新完成后调用，可以进行DOM操作

**卸载阶段（Unmounting）：**
1. **componentWillUnmount**：组件卸载前调用，用于清理定时器、取消网络请求等

**函数组件中的生命周期：**
函数组件通过useEffect Hook来模拟生命周期：
```jsx
useEffect(() => {
    // componentDidMount
    console.log('组件挂载');
    
    return () => {
        // componentWillUnmount
        console.log('组件卸载');
    };
}, []); // 空依赖数组

useEffect(() => {
    // componentDidUpdate
    console.log('count更新了');
}, [count]); // 依赖count
```

### 4. React中的合成事件是什么？

**面试表述要点：**

合成事件（SyntheticEvent）是React对原生DOM事件的封装，提供了跨浏览器的一致性API。

**合成事件的特点：**
1. **跨浏览器兼容**：抹平了不同浏览器之间的差异
2. **事件委托**：React将所有事件委托到document（React 17后委托到root容器）
3. **事件池**：React 16及之前版本使用事件池来复用事件对象（React 17后移除）
4. **阻止默认行为**：通过preventDefault()方法阻止默认行为

**合成事件与原生事件的区别：**
- **命名方式**：合成事件使用驼峰命名（onClick），原生事件使用小写（onclick）
- **事件处理**：合成事件的处理函数接收SyntheticEvent对象
- **this绑定**：需要手动绑定this或使用箭头函数

**访问原生事件：**
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

### 5. React中的refs有什么作用？有几种创建方式？

**面试表述要点：**

Refs提供了一种访问DOM节点或组件实例的方式，主要用于需要直接操作DOM的场景。

**refs的使用场景：**
1. **焦点管理**：设置输入框焦点
2. **媒体播放**：控制音视频播放
3. **动画触发**：手动触发动画
4. **第三方库集成**：与DOM操作库集成

**创建refs的三种方式：**

1. **createRef API（React 16.3+）：**
```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    
    componentDidMount() {
        this.myRef.current.focus();
    }
    
    render() {
        return <input ref={this.myRef} />;
    }
}
```

2. **useRef Hook（函数组件）：**
```jsx
function MyComponent() {
    const myRef = useRef(null);
    
    useEffect(() => {
        myRef.current.focus();
    }, []);
    
    return <input ref={myRef} />;
}
```

3. **回调refs：**
```jsx
function MyComponent() {
    const setInputRef = (element) => {
        if (element) {
            element.focus();
        }
    };
    
    return <input ref={setInputRef} />;
}
```

**注意事项：**
- 不能在函数组件上使用ref，因为函数组件没有实例
- 可以使用forwardRef来转发ref到函数组件内部的DOM元素
- 避免过度使用refs，优先考虑数据驱动的方式

## React性能优化核心问题

### 6. React.memo、useMemo、useCallback的区别和使用场景？

**面试表述要点：**

这三个API都是React提供的性能优化工具，但作用对象和使用场景不同。

**React.memo - 组件级别的优化：**
- **作用**：对函数组件进行记忆化，避免不必要的重新渲染
- **原理**：浅比较props，props没变化就复用上次的渲染结果
- **使用场景**：渲染成本较高的纯展示组件

```jsx
const ExpensiveComponent = React.memo(({ data }) => {
    console.log('ExpensiveComponent渲染');
    return <div>{data.name}</div>;
});

// 自定义比较函数
const MyComponent = React.memo(({ user }) => {
    return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
});
```

**useMemo - 值的记忆化：**
- **作用**：缓存计算结果，避免重复计算
- **原理**：依赖项不变时返回缓存的值
- **使用场景**：复杂计算、对象/数组的创建

```jsx
function ExpensiveList({ items, filter }) {
    // 缓存过滤后的结果
    const filteredItems = useMemo(() => {
        console.log('执行过滤计算');
        return items.filter(item => item.includes(filter));
    }, [items, filter]);
    
    // 缓存样式对象
    const containerStyle = useMemo(() => ({
        padding: '20px',
        backgroundColor: '#f0f0f0'
    }), []);
    
    return (
        <div style={containerStyle}>
            {filteredItems.map(item => <div key={item}>{item}</div>)}
        </div>
    );
}
```

**useCallback - 函数的记忆化：**
- **作用**：缓存函数引用，避免子组件因函数引用变化而重新渲染
- **原理**：依赖项不变时返回相同的函数引用
- **使用场景**：传递给子组件的回调函数

```jsx
function Parent({ items }) {
    const [count, setCount] = useState(0);
    
    // 缓存回调函数
    const handleItemClick = useCallback((id) => {
        console.log('点击了项目:', id);
        // 一些处理逻辑
    }, []); // 没有依赖项，函数永远不变
    
    const handleItemDelete = useCallback((id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    }, []); // 使用函数式更新，不依赖外部状态
    
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            {items.map(item => (
                <ItemComponent
                    key={item.id}
                    item={item}
                    onClick={handleItemClick}
                    onDelete={handleItemDelete}
                />
            ))}
        </div>
    );
}
```

**使用原则：**
1. **不要过度优化**：只在确实存在性能问题时使用
2. **测量性能**：使用React DevTools Profiler测量实际效果
3. **合理使用依赖项**：确保依赖项数组的正确性

### 7. 如何避免React组件的不必要渲染？

**面试表述要点：**

避免不必要渲染是React性能优化的核心，需要从多个角度来考虑。

**1. 组件设计层面：**
- **拆分组件**：将变化频繁的部分独立成组件
- **状态下沉**：将状态放在最需要的组件中
- **状态提升**：合理提升共享状态的层级

**2. 使用优化API：**
- **React.memo**：包装纯函数组件
- **useMemo/useCallback**：缓存计算结果和函数
- **PureComponent**：类组件的浅比较优化

**3. 避免常见陷阱：**
```jsx
// ❌ 错误：每次渲染都创建新对象
function Parent() {
    return (
        <Child 
            style={{ padding: '10px' }} // 每次都是新对象
            onClick={() => console.log('click')} // 每次都是新函数
        />
    );
}

// ✅ 正确：缓存对象和函数
function Parent() {
    const style = useMemo(() => ({ padding: '10px' }), []);
    const handleClick = useCallback(() => console.log('click'), []);
    
    return <Child style={style} onClick={handleClick} />;
}
```

**4. 合理使用key：**
```jsx
// ❌ 错误：使用不稳定的key
{items.map((item, index) => (
    <Item key={Math.random()} item={item} />
))}

// ✅ 正确：使用稳定的唯一标识
{items.map(item => (
    <Item key={item.id} item={item} />
))}
```

**5. 状态结构优化：**
```jsx
// ❌ 错误：状态过于集中
const [state, setState] = useState({
    user: {},
    posts: [],
    comments: [],
    ui: {}
});

// ✅ 正确：按功能拆分状态
const [user, setUser] = useState({});
const [posts, setPosts] = useState([]);
const [comments, setComments] = useState([]);
const [ui, setUI] = useState({});
```

### 8. React中的错误边界是什么？如何实现？

**面试表述要点：**

错误边界（Error Boundaries）是React组件，它可以捕获子组件树中任何位置的JavaScript错误，记录这些错误，并显示一个备用UI。

**错误边界的特点：**
1. **只能用类组件实现**：目前函数组件无法实现错误边界
2. **捕获范围**：只捕获子组件树中的错误，不捕获自身错误
3. **不能捕获的错误**：事件处理器、异步代码、服务端渲染、错误边界自身的错误

**实现错误边界：**
```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    
    // 捕获错误并更新状态
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    // 记录错误信息
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // 可以将错误信息发送到错误报告服务
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>出错了!</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        
        return this.props.children;
    }
}

// 使用错误边界
function App() {
    return (
        <ErrorBoundary>
            <Header />
            <Main />
            <Footer />
        </ErrorBoundary>
    );
}
```

**函数组件中的错误处理：**
虽然函数组件不能实现错误边界，但可以使用其他方式处理错误：
```jsx
function useErrorHandler() {
    const [error, setError] = useState(null);
    
    const resetError = () => setError(null);
    
    const captureError = useCallback((error) => {
        setError(error);
        console.error('捕获到错误:', error);
    }, []);
    
    // 可以结合React Query等库的错误处理
    useEffect(() => {
        const handleUnhandledRejection = (event) => {
            captureError(event.reason);
        };
        
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, [captureError]);
    
    return { error, resetError, captureError };
}
```

**最佳实践：**
1. **粒度适中**：不要将整个应用包在一个错误边界中
2. **用户友好**：提供有意义的错误信息和恢复选项
3. **错误上报**：将错误信息发送到监控服务
4. **降级策略**：为不同类型的错误提供不同的降级UI

这些核心面试题涵盖了React开发中最重要的概念和实践，掌握这些内容对于React面试非常关键。