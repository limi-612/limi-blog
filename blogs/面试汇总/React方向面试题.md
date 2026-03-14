---
title: React方向面试题
date: 2025/11/24
tags:
 - React
categories:
 - 面试汇总
---

<ReadAloud />

> 题目 + 答案，便于背诵与复习。

---


## 二、React 技术栈 + TypeScript（对应要求2）

### React 核心

**Q3：React 函数组件与类组件的区别？为什么推荐函数组件 + Hooks？**

**答：**  
- **写法**：函数组件更简洁，无 this；类组件要写 constructor、render、生命周期。  
- **逻辑复用**：Hooks 可抽成自定义 Hook 复用；类组件用 HOC、Render Props 较繁琐。  
- **性能**：函数组件 + `React.memo` 等更易优化；类组件有实例开销。  
- **生命周期**：Hooks 用 useEffect、useLayoutEffect 等替代，逻辑更集中。  
- **推荐**：新项目用函数组件 + Hooks，官方主推方向。

---

**Q4：useState、useEffect、useCallback、useMemo 分别怎么用？区别？**

**答：**  
- **useState**：管理组件状态，`const [state, setState] = useState(init)`；`setState` 可传值或函数 `(prev) => newVal`；更新是异步批量。  
- **useEffect**：副作用，如请求、订阅；`useEffect(() => { ...; return () => {}; }, [dep])`；依赖变化时执行，return 为清理函数。  
- **useCallback**：缓存函数引用，避免子组件因 props 变化无谓重渲染；`useCallback(fn, [dep])`。  
- **useMemo**：缓存计算结果，避免重复计算；`useMemo(() => compute(dep), [dep])`。  
- **区别**：useCallback 缓存函数，useMemo 缓存值；都用于性能优化，避免不必要的重算/重渲染。

---

**Q5：useEffect 的依赖数组怎么写？如何避免闭包陷阱？**

**答：**  
- **依赖数组**：把 effect 里用到的「外部变量」都放进 deps；空数组 `[]` 表示只执行一次（类似 componentDidMount）；不传则每次 render 都执行。  
- **闭包陷阱**：effect 回调捕获的是「当时」的 state/props，若 deps 漏写，回调里拿到的是旧值。解决：① 把依赖写全；② 用 `useRef` 存最新值，在 effect 里读 ref.current；③ 用 `functional update`：`setState(v => v + 1)` 不依赖外部 state。

---

**Q6：React 的 diff 算法与 key 的作用？**

**答：**  
- **Diff 策略**：同层比较，不跨层级；类型不同直接替换；类型相同则复用并更新属性；列表用 key 标识身份。  
- **key 的作用**：帮助 React 识别哪些项是新增、删除、移动，从而高效复用 DOM；key 要稳定唯一（如 id），避免用 index（列表会重排时会导致错误复用和性能问题）。

---

**Q7：受控组件与非受控组件的区别？**

**答：**  
- **受控组件**：表单值由 React state 控制，`value={state}` + `onChange` 更新 state，单一数据源。  
- **非受控组件**：用 ref 取 DOM，直接读 `input.value`，不受 state 控制。  
- **选择**：需要校验、联动、重置时用受控；简单只读或第三方组件集成可用非受控。

---

### React 原理

**Q7-A：React 的渲染流程是怎样的？Reconciler 和 Renderer 分别做什么？**

**答：**  
- **流程**：触发更新（setState、props 变化等）→ **调度**（Scheduler 决定优先级、是否可中断）→ **协调**（Reconciler 用 Fiber 做 diff，生成 effectList）→ **提交**（Renderer 根据 effectList 更新真实 DOM）。  
- **Reconciler**：负责「对比」虚拟 DOM，找出变化，生成「要做哪些 DOM 操作」的列表；与平台无关，可对接 React DOM、React Native 等。  
- **Renderer**：根据 Reconciler 的产出，执行实际的 DOM 更新（如增删改）；React DOM 就是 Web 的 Renderer。  
- **分离意义**：同一套协调逻辑可复用到不同渲染目标，便于跨端和维护。

---

**Q7-B：Fiber 是什么？为什么需要 Fiber 架构？**

**答：**  
- **Fiber**：React 16 引入的数据结构，代表一个「工作单元」；每个 React 元素对应一个 Fiber 节点，形成树形结构。Fiber 上有 type、key、child、sibling、return、alternate 等属性，可记录父子兄弟关系、当前树与上一次的镜像、以及本次的副作用。  
- **为什么需要**：① **可中断**：原先递归 diff 一气呵成，无法暂停；Fiber 把工作拆成小单元，每做完一个可检查是否有更高优先级任务，有则中断让位；② **可恢复**：保存了树结构和进度，中断后可从中断处继续；③ **优先级调度**：可与 Scheduler 配合，高优先级更新先执行，实现 Concurrent 模式。  
- **alternate**：当前屏的 Fiber 树叫 current，正在构建的叫 workInProgress；两棵树的节点互为 alternate，用于 diff 和双缓冲。

---

**Q7-C：虚拟 DOM 是什么？为什么能提升性能？diff 算法的复杂度？**

**答：**  
- **虚拟 DOM**：用 JS 对象描述真实 DOM 的结构（如 `{ type: 'div', props: { className: 'x' }, children: [...] }`），是真实 DOM 的轻量抽象。  
- **性能**：① 批量更新：多次 setState 合并后，只对虚拟 DOM 做一次 diff，再统一更新真实 DOM，减少重排重绘；② 跨层比较有策略，可跳过未变子树；③ 实际性能提升主要在「减少不必要的 DOM 操作」和「配合 diff 策略」，不是虚拟 DOM 本身更快，直接改 DOM 在单次操作上可能更直接，但难以做批量和精细优化。  
- **diff 复杂度**：理想 O(n)（树形结构，同层比较）；传统树 diff 一般 O(n³)，React 通过「只比较同层」「类型不同直接替换」「列表用 key」等启发式策略，将实际复杂度降到接近 O(n)。

---

**Q7-D：React 的合成事件（SyntheticEvent）是什么？与原生事件的区别？**

**答：**  
- **合成事件**：React 封装的一套事件系统，对原生事件做了一层包装；如 `onClick` 实际对应 `click`，但事件对象是 `SyntheticEvent`，提供统一的 API（如 `stopPropagation`、`preventDefault`）并抹平浏览器差异。  
- **事件委托**：React 17 之前，事件绑定在 document；17 及以后绑定在根容器（如 `createRoot` 挂载的 div），通过冒泡到根再分发，减少监听数量。  
- **与原生区别**：① 事件对象是合成的，原生事件在 `nativeEvent` 上；② 异步场景下，合成事件会被复用，`e.persist()` 可保留（已较少用）；③ 执行顺序：原生先执行，再到合成事件；④ `e.stopPropagation()` 只阻断合成事件的冒泡，若要在捕获阶段阻止原生需用 `nativeEvent.stopPropagation()`。

---

**Q7-E：React 的 Scheduler（调度器）做什么？时间切片是什么？**

**答：**  
- **Scheduler**：独立于 React 的调度库，负责任务的优先级排序和分片执行；高优先级任务先跑，低优先级可被中断。  
- **时间切片**：把长任务拆成多个小段，每段执行一小段时间（如 5ms），到期后让出主线程，检查是否有更高优先级任务或用户输入，有则先处理，再继续执行剩余任务。这样避免长任务长时间占用主线程导致卡顿、掉帧。  
- **实现**：通常用 `MessageChannel`（或 `requestIdleCallback` 降级）在每帧的空闲时段执行任务；React 的 Reconciler 在遍历 Fiber 时会检查时间片是否用完，用完则暂停并注册下次继续。

---

**Q7-F：Commit 阶段和 Render 阶段分别做什么？为什么不能中断？**

**答：**  
- **Render 阶段**：即协调阶段，遍历 Fiber 做 diff，标记哪些节点需要增删改，生成 effectList；**可中断**，因为此时还没改真实 DOM，中断后可从当前 Fiber 继续。  
- **Commit 阶段**：根据 effectList 执行 DOM 更新、执行 layoutEffect、调用生命周期等；**不能中断**，必须一气呵成，否则会出现 DOM 与 Fiber 树状态不一致、用户看到半成品界面。  
- **流程**：Render 阶段完成后，Commit 阶段分三个子阶段：① `beforeMutation`（DOM 变更前）；② `mutation`（执行 DOM 增删改）；③ `layout`（DOM 已更新，执行 useLayoutEffect、componentDidMount 等）。

---

**Q7-G：JSX 的本质是什么？和 createElement 的关系？**

**答：**  
- **本质**：JSX 是语法糖，会被编译成 `React.createElement(type, props, ...children)` 的调用；如 `<div className="x">hello</div>` → `createElement('div', { className: 'x' }, 'hello')`。  
- **编译**：Babel 的 `@babel/plugin-transform-react-jsx` 或 `@babel/preset-react` 在编译阶段完成转换；新版（React 17+）可用 `jsx` 或 `jsxs` 替代 createElement，减少运行时创建 children 数组的开销。  
- **产物**：`createElement` 返回一个普通对象，即虚拟 DOM 节点（React Element），形如 `{ type, props, key, ref }`；后续交给 Reconciler 转为 Fiber 并做 diff。

---

**Q7-H：React 18 的 Concurrent 模式有什么特点？useTransition、useDeferredValue 做什么？**

**答：**  
- **Concurrent 模式**：允许 React 在渲染过程中**中断**低优先级更新，先处理高优先级（如用户输入），再继续；实现更流畅的交互，减少长任务卡顿。  
- **useTransition**：标记某次更新为「过渡更新」（低优先级）；`const [isPending, startTransition] = useTransition()`，在 `startTransition(() => setState(x))` 里的更新会被打断，可先响应更高优先级；`isPending` 表示该过渡是否进行中，可用于展示 loading。  
- **useDeferredValue**：接收一个值，返回其「延迟版本」；当有新值进来时，会先保持旧值渲染，再在空闲时切换到新值，适合搜索框、大列表等「可延后」的 UI 更新，减少输入卡顿。

---

### Hooks 底层原理

**Q7-1：Hooks 底层是如何存储的？为什么必须按顺序、不能在条件/循环里调用？**

**答：**  
- **存储方式**：React 在 Fiber 节点上维护一个 **Hook 链表**，每个 Hook 调用对应链表上的一个节点；同一组件内，每次 render 按调用顺序依次遍历该链表，用「调用顺序」来匹配「上一次的 Hook」和「这一次的 Hook」。  
- **为什么必须按顺序**：React 靠「第几次调用」来对应「哪个 state / effect」；若某次 render 少调或多调一个 Hook（如在 if 里调用），顺序错位，后续所有 Hook 都会错配，导致 state 混乱、effect 错绑。  
- **规则**：只在函数组件顶层调用 Hooks，不要在循环、条件、嵌套函数里调用；自定义 Hook 内部也需遵守。

---

**Q7-2：useState 的更新是同步还是异步？批处理（batching）是什么？**

**答：**  
- **表现**：多次 `setState` 在「同一事件 handler 或 useEffect 同步执行」中会合并成一次渲染，看起来像异步；实际上 React 会把它们批处理（batching）后统一更新。  
- **批处理**：React 18 起，在事件 handler、Promise、setTimeout 等里也会自动批处理；之前只在 React 事件里批处理，setTimeout 内会同步多次渲染。  
- **强制同步**：`flushSync(() => setState(x))` 可立刻触发展示更新，一般少用。

---

**Q7-3：useReducer 和 useState 的关系？为什么说 useState 是 useReducer 的语法糖？**

**答：**  
- **关系**：`useState` 内部实现等价于 `useReducer` 的一个特例：`useReducer((state, action) => action, initialState)`，即 reducer 直接返回 action（新状态）。  
- **useReducer**：适合状态逻辑复杂、有多类更新（如 `{ type: 'increment' }`、`{ type: 'reset' }`），或下一个状态依赖前一个状态；可把 reducer 抽出去测、复用。  
- **选择**：简单值用 useState；复杂更新用 useReducer。

---

**Q7-4：useEffect 的 cleanup 函数何时执行？和下一次 effect 的关系？**

**答：**  
- **执行时机**：① 组件卸载时；② 下一次 effect 执行前（即 deps 变化、重新执行 effect 时，先跑上一次 effect 的 cleanup）。  
- **顺序**：deps 变化 → 先执行上次 cleanup → 再执行本次 effect。  
- **用途**：清理订阅、取消请求、清除定时器等，防止内存泄漏和过时回调。

---

**Q7-5：useLayoutEffect 和 useEffect 的区别？执行时机？**

**答：**  
- **useEffect**：在浏览器**绘制之后**异步执行，不阻塞绘制；适合大多数副作用（请求、订阅、日志等）。  
- **useLayoutEffect**：在 DOM 变更之后、浏览器**绘制之前**同步执行；会阻塞绘制，适合需要「读取 DOM 布局并同步更新」的场景（如测量尺寸、防止闪烁）。  
- **注意**：服务端渲染时 useLayoutEffect 会警告（服务端无 DOM），可条件判断或优先用 useEffect。

---

**Q7-6：自定义 Hook 的本质是什么？如何正确设计？**

**答：**  
- **本质**：就是把「可复用的状态 + 副作用逻辑」封装成函数，内部调用 useState、useEffect 等；只是「逻辑复用」，不是新机制。  
- **规则**：① 函数名以 `use` 开头；② 内部必须按顺序、无条件地调用 Hooks；③ 每次组件 render 时，自定义 Hook 会重新执行，拿到的是当前这次 render 的闭包。  
- **设计**：入参和返回值清晰；避免过度抽象；需要「最新值」时用 useRef，需要「稳定引用」时用 useCallback/useMemo。

---

**Q7-7：useRef 和 useState 的区别？为什么 useRef 修改不会触发重渲染？**

**答：**  
- **useState**：值变化会触发 re-render，用于需要驱动 UI 更新的数据。  
- **useRef**：`ref.current` 可变，修改**不会**触发 re-render；用来存「和渲染无关」的可变值（如 DOM 引用、定时器 id、上一帧的值）。  
- **底层**：useState 把值存在 Fiber 的 memoizedState 里，更新会调度渲染；useRef 存在 `ref` 对象上，修改 ref.current 不经过 React 的更新流程，所以不触发渲染。

---

**Q7-8：useImperativeHandle 做什么用？和 forwardRef 如何配合？**

**答：**  
- **场景**：父组件用 ref 拿到子组件内部的东西（如子组件的方法、内部 DOM），子组件不想暴露整个实例，只暴露少数方法。  
- **用法**：子组件 `forwardRef` 接收 ref，内部 `useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus() }), [])`，父组件拿到的 ref.current 就是返回的对象。  
- **意义**：控制「父组件能对子组件做什么」，实现命令式 API 的封装。

---

### React 进阶

**Q7-I：Error Boundary 是什么？如何实现？能捕获哪些错误？**

**答：**  
- **作用**：捕获子组件树中的 JavaScript 错误，防止整个应用崩溃；显示降级 UI（如「出错了，请刷新」）。  
- **实现**：类组件实现 `static getDerivedStateFromError` 或 `componentDidCatch`；`getDerivedStateFromError` 更新 state 渲染 fallback，`componentDidCatch` 可记录错误。  
- **能捕获**：子组件 render、生命周期、构造函数中的错误。  
- **不能捕获**：事件 handler 中的错误（需 try/catch）、异步错误（如 setTimeout）、服务端渲染、Error Boundary 自身的错误。  
- **Hooks 无替代**：目前 Error Boundary 必须用类组件，社区有 `react-error-boundary` 封装。

---

**Q7-J：Portal 是什么？使用场景？**

**答：**  
- **定义**：`ReactDOM.createPortal(child, container)` 将子节点渲染到 **指定的 DOM 节点**，而非父组件所在位置；常用于 modal、tooltip、dropdown 挂到 body。  
- **场景**：① 弹窗避免被父级 `overflow: hidden`、`z-index` 裁剪；② 脱离父 DOM 结构，减少层叠、定位问题；③ 无障碍：可把内容挂到更合适的 DOM 层级。  
- **注意**：事件冒泡仍按 React 树结构，会冒泡到挂载 Portal 的父组件；需手动处理焦点、点击外部关闭等。

---

**Q7-K：高阶组件（HOC）和 Render Props 的区别？Hooks 出现后还常用吗？**

**答：**  
- **HOC**：接收组件、返回新组件，用于注入 props 或增强逻辑；如 `withAuth(Comp)` 给 Comp 加 `isLoggedIn`。缺点：props 命名冲突、多层 HOC 调试困难、ref 需 forwardRef。  
- **Render Props**：组件接收函数 `children` 或 `render`，把 state 传进去，由调用方决定渲染什么；如 `<Mouse render={({ x, y }) => <Cat x={x} y={y} />}>`。缺点：嵌套深、可读性一般。  
- **Hooks 后**：逻辑复用优先用 Hooks，更直观、无嵌套；HOC 和 Render Props 在需要「包装组件」「注入 UI 结构」时仍有价值，但复用逻辑时 Hooks 更推荐。

---

**Q7-L：React.StrictMode 做了什么？开发环境为什么要双重调用？**

**答：**  
- **作用**：检测不安全的生命周期、过时的 API、意外的副作用；会**双重调用**部分函数（如组件、useState 的 init、useEffect）以帮助发现非纯逻辑。  
- **双重调用**：仅在开发环境，故意重复执行以暴露「依赖执行顺序」的 bug；生产环境不会。  
- **检测内容**：识别使用了 `UNSAFE_` 生命周期、过时的 `findDOMNode`、Legacy Context 等；对 useMemo/useCallback 等检查是否依赖了可变 ref。

---

**Q7-M：React 的 children 有哪些 API？React.Children.map 和直接 map 有什么区别？**

**答：**  
- **API**：`React.Children.map`、`React.Children.forEach`、`React.Children.count`、`React.Children.only`、`React.Children.toArray`。  
- **区别**：`children` 可能是单个元素、数组、null、Fragment；直接 `children.map` 在单个元素时会报错（没有 map）。`React.Children.map` 会统一处理，把单元素当单元素遍历、跳过 null/undefined、展开 Fragment。  
- **toArray**：转为扁平数组，并给每个子元素加 key（用于无 key 的 children）；`only` 确保只有一个子元素否则抛错。

---

**Q7-N：类组件的生命周期有哪些？和 Hooks 的对应关系？**

**答：**  
- **挂载**：constructor → getDerivedStateFromProps → render → componentDidMount。  
- **更新**：getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate。  
- **卸载**：componentDidUnmount。  
- **Hooks 对应**：constructor 状态 → useState；componentDidMount → useEffect(fn, [])；componentDidUpdate → useEffect(fn, [deps])；componentDidUnmount → useEffect 的 cleanup；getDerivedStateFromProps → 用 useState + useEffect 或在 render 时根据 props 计算；shouldComponentUpdate → React.memo。

---

### Hooks 进阶

**Q7-9：useState 的惰性初始化怎么写？为什么需要？**

**答：**  
- **写法**：`useState(() => computeExpensiveInitialState())` 或 `useState(computeExpensiveInitialState)`，传入**函数**，React 只在首次 render 时调用一次。  
- **错误写法**：`useState(computeExpensiveInitialState())` 每次 render 都会执行，造成浪费。  
- **适用**：初始值依赖 props 或需要较重计算时；如从 localStorage 读取、大对象初始化等。

---

**Q7-10：useReducer 的 init 函数做什么用？和 useState 惰性 init 的区别？**

**答：**  
- **init**：`useReducer(reducer, initialArg, init)`，第三个参数 `init` 接收 `initialArg`，返回真正的初始 state；用于根据传入参数计算初始状态。  
- **场景**：如 `init = (count) => ({ count })`，`useReducer(reducer, 0, init)`，0 作为 initialArg 传给 init，得到 `{ count: 0 }`；适合 state 结构复杂、需根据 props 初始化时。  
- **和 useState 惰性 init**：都是延迟计算初始值；useReducer 的 init 还支持「从 action 重置」——在 reducer 里 `case 'reset': return init(action.payload)`，可复用同一套 init 逻辑。

---

**Q7-11：useId 做什么用？解决什么问题？**

**答：**  
- **作用**：生成在服务端和客户端一致的**唯一 ID**，适用于需要稳定 id 的场景。  
- **用法**：`const id = useId()`，返回如 `:r1:` 的字符串；可用于 `<label htmlFor={id}>`、`aria-describedby`、表单控件等。  
- **解决问题**：① SSR 时服务端和客户端各渲染一次，用 `Math.random()` 或自增会不一致，导致 hydration 报错；② 同一页面多个相同组件需要不同 id 时，useId 保证唯一且稳定。  
- **注意**：不要用于列表的 key，key 应用业务数据；useId 适合无障碍、表单关联等。

---

**Q7-12：useSyncExternalStore 是什么？使用场景？**

**答：**  
- **作用**：用于在 React 中**订阅外部数据源**（如原生 store、浏览器 API、第三方状态库），并正确处理 SSR 与并发渲染。  
- **用法**：`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`；subscribe 订阅变化，getSnapshot 取当前值，getServerSnapshot 用于 SSR 时取初始值。  
- **场景**：集成 Redux、Zustand 等外部 store 时，React 18 推荐用此 API 替代直接订阅，以保证 tear-down、选择性 hydration 等行为正确；订阅 `window.innerWidth`、`document.title` 等浏览器 API 时也可用。  
- **原因**：React 18 并发渲染下，组件可能多次渲染后废弃，需正确 subscribe/unsubscribe，useSyncExternalStore 统一处理。

---

**Q7-13：useInsertionEffect 是什么？和 useEffect 的区别？**

**答：**  
- **作用**：在 DOM 变更**之前**同步执行，早于 useLayoutEffect；主要用于**注入样式**（如 CSS-in-JS 库），在布局计算前插入 style 标签。  
- **执行顺序**：useInsertionEffect → useLayoutEffect → useEffect。  
- **与 useEffect 区别**：useInsertionEffect 更早，不能读 DOM（DOM 可能尚未更新）、不能做 DOM 测量；主要用于插入 style、避免 FOUC。  
- **注意**：一般业务很少直接用，多为 CSS-in-JS 库内部使用；用前要确认需求，多数场景 useEffect 足够。

---

**Q7-14：useDebugValue 做什么用？**

**答：**  
- **作用**：为**自定义 Hook** 在 React DevTools 中展示额外的调试信息；如 `useDebugValue(state, (s) => s?.name ?? 'loading')`，DevTools 里会显示该值。  
- **用法**：第二个参数是格式化函数，延迟到 DevTools 展开时才执行，避免生产环境做昂贵计算；只在调试时有用，生产无影响。  
- **场景**：封装复杂自定义 Hook 时，便于在 DevTools 中快速查看内部状态，提升调试效率。

---

**Q7-15：如何用 Hooks 模拟 componentDidUpdate（只在更新时执行，不包含首次）？**

**答：**  
- **思路**：用 useRef 记录是否首次挂载；effect 里判断，首次则只更新 ref，不执行逻辑；非首次再执行。  
```javascript
const isFirst = useRef(true);
useEffect(() => {
  if (isFirst.current) {
    isFirst.current = false;
    return;
  }
  // 相当于 componentDidUpdate 的逻辑
}, [dep]);
```  
- **或**：用 `usePrevious` 之类 Hook 拿到上一次的 dep，比较后决定是否执行；本质都是「跳过首次」。

---

**Q7-16：多个 useEffect 和单个 useEffect 里写多段逻辑，有什么区别？**

**答：**  
- **多个 useEffect**：按职责拆分，每个 effect 有独立 deps 和 cleanup；某个 deps 变化只触发对应 effect，逻辑清晰、易维护。  
- **单个 useEffect 多段逻辑**：共用一个 deps，任一依赖变就全执行；cleanup 需手动区分，代码易臃肿。  
- **建议**：按「订阅源」或「副作用类型」拆成多个 useEffect；如「订阅 A」「订阅 B」「请求 C」分三个 effect，各自写 deps 和 cleanup。

---

### TypeScript 在 React 中的使用

**Q8：React 组件如何写 TypeScript 类型？Props、事件、Ref？**

**答：**  
- **Props**：`interface Props { name: string; age?: number }`，组件 `const Comp: React.FC<Props>` 或 `function Comp(props: Props)`。  
- **事件**：`onChange: (e: React.ChangeEvent<HTMLInputElement>) => void`；点击 `React.MouseEvent<HTMLButtonElement>`。  
- **Ref**：`ref: React.RefObject<HTMLInputElement>` 或 `React.Ref<HTMLDivElement>`；`useRef<HTMLInputElement>(null)`。  
- **泛型组件**：`function List<T>({ data, render }: { data: T[]; render: (item: T) => ReactNode })`。

---

**Q9：TypeScript 泛型在 React 中常见用法？**

**答：**  
- 封装请求：`useRequest<T>(url: string): { data: T }`；  
- 列表组件：`<Table<RowType> data={data} />`；  
- 高阶组件：`withAuth<P extends object>(Comp: ComponentType<P>)`；  
- 工具类型：`Partial<Props>`、`Pick<Props, 'a'|'b'>`、`Omit<Props, 'c'>` 等。

---

### TypeScript 原理

**Q9-1：TypeScript 的编译流程？类型检查发生在哪一步？类型会出现在运行时吗？**

**答：**  
- **流程**：源码 (.ts) → **词法/语法分析** 生成 AST → **类型检查**（基于 AST 做类型推导与校验）→ **移除类型**（类型擦除）→ 输出 JS。  
- **类型检查**：在 AST 阶段完成，不会进入最终 JS；错误是编译时报的，不是运行时。  
- **类型擦除**：interface、type、泛型参数等在编译后全部删除，JS 中无任何类型信息；`enum` 若不设 `const` 会编译成对象，是少数会在 JS 里留下代码的类型相关语法。

---

**Q9-2：TypeScript 是结构化类型还是名义类型？鸭子类型是什么？**

**答：**  
- **结构化类型**：TS 采用「结构子类型」（structural typing），不关心类型名，只看「形状」是否兼容。若 A 有 B 的全部属性且类型兼容，则 A 可当 B 用，即便没显式声明继承。  
- **名义类型**：如 Java、C#，必须显式继承/实现，类型名决定兼容性。  
- **鸭子类型**：「走起来像鸭子、叫起来像鸭子，就是鸭子」——只要结构满足就视为兼容，TS 即如此。

---

**Q9-3：类型兼容性的基本规则？对象、函数、联合类型如何判断？**

**答：**  
- **对象**：目标类型所需的属性，源类型都必须有且类型兼容；源可多属性（多余属性检查仅在直接字面量时有）。  
- **函数**：参数**逆变**（目标参数可更少/更宽），返回值**协变**（目标返回值可更窄）；即 `(x: Animal) => Dog` 可赋给 `(x: Dog) => Animal` 的参数位置。  
- **联合类型**：`A | B` 的值给 `A` 时需要收窄；`A` 赋给 `A | B` 总是可以。  
- **any/unknown**：any 与任意类型双向兼容；unknown 只能赋给 unknown 或 any，使用前需收窄。

---

**Q9-4：协变（covariant）与逆变（contravariant）是什么？函数参数为什么是逆变的？**

**答：**  
- **协变**：若 A 可赋给 B，则 `T<A>` 可赋给 `T<B>`。如返回值：子类返回值可赋给父类返回值。  
- **逆变**：若 A 可赋给 B，则 `T<B>` 可赋给 `T<A>`。如函数参数：父类参数可赋给子类参数位置。  
- **原因**：函数参数在类型上处于「消费者」位置。`(x: Dog) => void` 要能处理 Dog；若传 `(x: Animal) => void`，它只保证能处理 Animal，遇到 Dog 特有的可能出错，所以更宽参数类型的函数不能赋给更窄的；反之，更窄参数（只接受 Dog）可以赋给更宽（接受 Animal）——即参数逆变。

---

**Q9-5：泛型约束 extends 与条件类型 extends 有什么区别？**

**答：**  
- **泛型约束**：`<T extends U>` 表示 T 必须是 U 的子类型，用于限制泛型参数的形状，编译期检查。  
- **条件类型**：`T extends U ? X : Y` 是类型层面的三元运算，根据 T 是否兼容 U 得到 X 或 Y，用于做类型推导和分支。  
- **区别**：前者是约束，后者是分支计算；可结合用，如 `<T extends string | number>` 再在条件类型里 `T extends string ? ... : ...`。

---

**Q9-6：infer 关键字做什么用？常见场景？**

**答：**  
- **作用**：在条件类型的 `extends` 中**推断**出一个未知类型并给名字，相当于类型层面的「声明变量」。  
- **写法**：`T extends (infer U)[] ? U : never` 可推断数组元素类型；`T extends (...args: infer A) => infer R ? [A, R] : never` 可推断参数元组和返回值。  
- **场景**：提取 Promise 的 value 类型 `Awaited<T>`、提取函数参数 `Parameters<T>`、提取返回值 `ReturnType<T>`、从复杂类型中取出某一部分。

---

**Q9-7：.d.ts 声明文件的作用？declare、模块声明、全局扩充？**

**答：**  
- **作用**：只包含类型声明，不产生 JS 代码；让 TS 认识 JS 库、原生 API 等的类型，提供类型检查和提示。  
- **declare**：`declare const x: string` 表示 x 存在且类型为 string，但不生成任何 JS。  
- **模块声明**：`declare module 'xxx' { export ... }` 为无类型声明的库补充类型。  
- **全局扩充**：`declare global { interface Window { myProp: string } }` 扩展已有全局类型。

---

**Q9-8：映射类型（Mapped Types）和索引签名是什么？Partial、Required、Readonly 如何实现？**

**答：**  
- **映射类型**：`{ [K in keyof T]: T[K] }` 遍历 T 的 key，生成新对象类型；可加 `?`、`readonly`、或对 `T[K]` 做运算。  
- **Partial**：`type Partial<T> = { [K in keyof T]?: T[K] }`，所有属性变可选。  
- **Required**：`-?` 去掉可选，`{ [K in keyof T]-?: T[K] }`。  
- **Readonly**：`{ readonly [K in keyof T]: T[K] }`。  
- **索引签名**：`[key: string]: number` 表示可用任意 string 作 key，值为 number；与映射类型结合可做「遍历已有 key」的类型变换。

---

**Q9-9：类型守卫（Type Guard）的原理？自定义守卫 `x is T` 与 `boolean` 返回值的区别？**

**答：**  
- **作用**：在分支中收窄类型，让 TS 在 if 块内知道变量是更具体的类型。  
- **自定义守卫**：`function isFish(x): x is Fish { return x.swim !== undefined }`；返回值写成 `x is Fish` 时，TS 会把 `if (isFish(animal))` 里的 animal 收窄为 Fish。  
- **若返回 boolean**：`function isFish(x): boolean` 则不会收窄，TS 不知道 true 时代表什么类型。  
- **原理**：`x is T` 是**类型谓词**，告诉编译器「当函数返回 true 时，参数可视为 T」，从而在后续代码中应用收窄。

---

## 三、Ant Design、Umi、公共组件抽象（对应要求3）

### Ant Design

**Q10：Ant Design 如何按需引入？如何做主题定制？**

**答：**  
- **按需引入**：`babel-plugin-import` 配置，或 Ant Design 5 用 CSS-in-JS，按需自动加载样式；或手动 `import { Button } from 'antd'` 只引入用到的组件。  
- **主题定制**：ConfigProvider 的 `theme` 传入 token（如 `colorPrimary`、`borderRadius`）覆盖默认；或通过 `@ant-design/cssinjs` 的 `createTheme` 生成自定义主题。

---

**Q11：Ant Design 的 Form 受控模式如何与业务表单结合？**

**答：**  
- 用 `Form.useForm()` 拿到 form 实例，`Form` 的 `form` 属性传入；  
- `Form.Item` 的 `name` 指定字段路径，`rules` 做校验；  
- 提交用 `form.validateFields()`，获取值用 `form.getFieldsValue()`；  
- 动态表单项用 `Form.List`，复杂联动用 `Form.Item` 的 `dependencies` 和 `shouldUpdate`。

---

### Umi

**Q12：Umi 的核心特性？与 Create React App 相比有什么优势？**

**答：**  
- **约定式路由**：`src/pages` 下文件即路由，无需手写配置。  
- **插件体系**：mock、dva、权限、国际化等通过插件扩展。  
- **开箱即用**：内置 antd、请求封装、代理、构建优化等。  
- **优势**：更适合中后台、企业级项目；CRA 更轻量、需自己搭路由和状态管理。

---

**Q13：Umi 中如何做权限控制？路由级和按钮级？**

**答：**  
- **路由级**：在 `routes` 配置 `access` 字段，配合 `src/access.ts` 导出的权限函数，无权限则重定向登录或 403。  
- **按钮级**：用 `useAccess()` 或 `Access` 组件包裹，如 `<Access accessible={access.canEdit}><Button>编辑</Button></Access>`；或封装 `PermissionButton` 根据权限显隐/禁用。

---

### 公共组件抽象

**Q14：如何对公共重复逻辑进行抽象，输出公共组件？**

**答：**  
- **识别重复**：表格+搜索+分页、表单弹窗、详情抽屉等出现多次的交互模式。  
- **抽象层次**：① 纯 UI 组件（如 SearchTable）：接收 columns、dataSource、onSearch；② 带业务语义（如 OrderTable）：内置订单相关字段和操作；③ Hooks（如 useTable）：封装请求、分页、筛选逻辑，组件只负责展示。  
- **设计原则**：高内聚低耦合、通过 props 配置、插槽/renderProps 扩展、文档和示例齐全。

---

**Q15：封装一个通用表格组件需要哪些 props？如何兼顾灵活性和易用性？**

**答：**  
- **常用 props**：columns、dataSource、loading、pagination（支持受控）、rowSelection、onChange（分页/筛选/排序变化）、scroll、rowKey。  
- **灵活性**：支持 `render`、`title` 自定义列；支持插槽或 `components` 覆盖默认组件。  
- **易用性**：提供默认分页、默认 size；常用场景封装成 `SearchTable` 预设搜索栏和分页逻辑。

---

## 四、页面性能分析与优化（对应要求4）

**Q16：如何分析页面整体性能？常用指标和工具？**

**答：**  
- **指标**：FCP（首次内容绘制）、LCP（最大内容绘制）、TTI（可交互时间）、CLS（累积布局偏移）。  
- **工具**：Chrome DevTools Performance 录屏看主线程、长任务；Network 看请求顺序和体积；Lighthouse 打分并给出建议；Performance API 上报 RUM。  
- **思路**：首屏慢看资源加载、阻塞；交互卡顿看 JS 执行、重排重绘；再针对性优化。

---

**Q17：React 项目有哪些性能优化手段？**

**答：**  
- **减少渲染**：`React.memo`、`useMemo`、`useCallback` 避免无谓重渲染；列表用稳定 key。  
- **代码分割**：`React.lazy` + `Suspense` 路由懒加载；大组件按需加载。  
- **虚拟列表**：长列表用 react-window、react-virtualized 只渲染可视区。  
- **资源优化**：图片懒加载、WebP、CDN；Gzip/Brotli 压缩；Tree Shaking 减小包体积。

---

**Q18：长列表如何优化？虚拟滚动原理？**

**答：**  
- **问题**：上万条 DOM 导致渲染慢、滚动卡顿。  
- **虚拟滚动**：只渲染可视区域及少量缓冲的项，总高度用占位撑开；滚动时根据 scrollTop 计算当前应显示的区间，动态渲染并回收不可见节点，DOM 数量恒定。  
- **实现**：可用 react-window、react-virtualized；定高简单，动态高度需预估或测量后缓存。

---

### React 性能优化经验

**Q18-1：React.memo 的原理？什么时候用、什么时候不用？**

**答：**  
- **原理**：对组件做浅比较 props，若 props 没变则跳过本次渲染，复用上一次结果；相当于函数组件版的 `PureComponent`。  
- **适用**：子组件渲染成本高、且父组件频繁 re-render 但传给子组件的 props 多数不变时；列表项、弹窗内容等。  
- **不适用**：① props 每次都变（如内联对象、匿名函数）时 memo 无效，需配合 useMemo/useCallback；② 组件本身很轻，memo 的浅比较开销可能大于重渲染；③ 子组件依赖父的 context 且 context 常变，memo 意义不大。  
- **自定义比较**：`React.memo(Comp, (prev, next) => prev.id === next.id)` 返回 true 表示认为相等、不重渲染。

---

**Q18-2：useCallback 和 useMemo 的使用时机？常见误区？**

**答：**  
- **useCallback**：缓存函数引用，避免因「每次 render 都 new 函数」导致子组件（尤其被 memo 的）重渲染；依赖写全，否则闭包陈旧。  
- **useMemo**：缓存计算结果，避免每次 render 都做昂贵运算（如过滤大数组、复杂推导）；依赖不变则复用上次结果。  
- **误区**：① 到处滥用，简单计算和简单函数不必包；② 依赖数组漏写或写错，导致用了旧值；③ 把 useMemo 当「保证不重复执行」用，应理解「依赖变就重算」；④ 子组件未 memo 时，父组件 useCallback 传下去对子组件重渲染无影响，需配合 memo 才有用。

---

**Q18-3：如何用 React DevTools Profiler 定位性能瓶颈？**

**答：**  
- **录屏**：打开 Profiler，点 Record，操作页面，Stop 后查看火焰图或 Ranked。  
- **看什么**：① Commit 耗时（单次更新总时长）；② 哪个组件渲染最久（Self time）；③ 哪些组件本可跳过却参与了渲染（不必要的重渲染）。  
- **优化方向**：渲染慢的做 useMemo、拆子组件或懒加载；不该渲染却渲染的加 memo、检查 props/context 是否变化；列表项加稳定 key、考虑虚拟列表。  
- **生产环境**：需用带 profiler 的 React 构建（如 `react-dom/profiling`），否则 Profiler 无法工作。

---

**Q18-4：Context 导致的性能问题如何解决？**

**答：**  
- **问题**：Context 的值变化时，所有消费该 Context 的组件都会 re-render，即使只用其中一部分。  
- **方案**：① **拆分 Context**：把变化频率不同的数据拆成多个 Context（如 UserContext、ThemeContext），减少无关更新；② **状态下沉**：只在真正用到的子树下提供 Context，避免顶层大 scope；③ **useMemo 包 value**：`value={{ a, b }}` 每次都是新对象，消费组件必重渲染，用 `useMemo(() => ({ a, b }), [a, b])` 保证引用稳定；④ **订阅模式**：不用 Context，改用 zustand、jotai 等细粒度订阅，只更新用到的组件。

---

**Q18-5：首屏加载做过哪些优化？具体措施？**

**答：**  
- **代码分割**：路由级 `React.lazy` + `Suspense`，非首屏页面打成独立 chunk，进入时再加载；大组件、弹窗也可懒加载。  
- **资源**：图片懒加载（IntersectionObserver）、WebP/AVIF、按展示尺寸压缩、CDN；字体子集化、`font-display: optional` 防 FOIT。  
- **渲染**：骨架屏、SSR/SSG 首屏直出；关键 CSS 内联，非关键延迟；减少主包体积（Tree Shaking、按需引入、分析 bundle）。  
- **请求**：接口合并、预加载下一页数据、接口并行；可配合 prefetch 提前拉取可能访问的路由 chunk。

---

**Q18-6：列表渲染优化有哪些实践？key 用 index 为什么会有问题？**

**答：**  
- **key**：必须稳定唯一，优先用 id；用 index 时，若列表会增删、排序，index 会错位，导致复用错 DOM、状态错乱、且可能触发不必要的重渲染。  
- **列表项**：子组件用 `React.memo`，props 用 useCallback/useMemo 稳住；大列表必上虚拟滚动。  
- **避免**：在 map 里创建组件 `{list.map(() => <Comp />)}` 时，Comp 若在 map 外定义可复用；不要在 render 里 `key={Math.random()}`。  
- **数据**：大列表用 Object.freeze 或 shallow 结构，避免整表深度响应式；只把「当前渲染的项」做响应式。

---

**Q18-7：大表单、大表格在 React 里如何优化？**

**答：**  
- **表单**：按字段或区块拆组件 + memo，减少单次输入导致整表重渲染；受控用 `useState` 集中时，可考虑拆分多个 state 或用 useReducer；防抖提交、避免每次 onChange 都调接口。  
- **表格**：虚拟滚动（react-window、rc-table 虚拟模式）；列配置、dataSource 用 useMemo；单元格内容简单化，复杂渲染抽成子组件并 memo。  
- **通用**：避免在表单组件顶层做重计算；用 React DevTools 看每次输入触发了多少组件渲染，针对性拆分和 memo。

---

**Q18-8：useEffect 里做请求时如何避免竞态和多余请求？**

**答：**  
- **竞态**：请求 A 发出后，请求 B 先返回，若不做处理会拿 B 的结果覆盖 A，导致数据错乱。解决：在 effect 里用 `let cancelled = false`，cleanup 里设 `cancelled = true`，请求返回后 `if (!cancelled)` 再 setState。  
- **AbortController**：`fetch` 或 axios 传 `signal: controller.signal`，cleanup 里 `controller.abort()` 取消请求，更规范。  
- **多余请求**：debounce 搜索；相同参数用缓存（如 react-query、swr）；路由切换时取消未完成请求，避免在已卸载组件上 setState。

---

## 五、HTTP 与 Web 调试工具（对应要求5）

**Q19：HTTP 请求从发起到响应的完整流程？**

**答：**  
① DNS 解析得到 IP；② 建立 TCP 连接（三次握手）；③ 发起 HTTP 请求（请求行、头、体）；④ 服务器处理并返回响应；⑤ 解析响应（状态码、头、体）；⑥ 根据 Cache-Control 等决定是否用缓存；⑦ 关闭或复用 TCP 连接。  
前端角度：可通过 Performance API、Network 面板观察各阶段耗时。

---

**Q20：常见 HTTP 状态码及前端如何处理？**

**答：**  
- **2xx**：200 成功、201 创建成功、204 无内容。  
- **3xx**：301/302 重定向、304 协商缓存命中。  
- **4xx**：400 参数错误、401 未认证（跳登录/刷新 token）、403 无权限、404 不存在。  
- **5xx**：500 服务器错误、502 网关错误、504 超时，可提示重试并上报。  
在 Axios 响应拦截器里根据 status 统一处理：401 跳转登录，403/404 提示，5xx 提示+重试。

---

**Q21：HTTP 缓存机制？强缓存与协商缓存的区别？**

**答：**  
- **强缓存**：Expires 或 Cache-Control（max-age），未过期则直接用本地，不发请求。  
- **协商缓存**：Last-Modified/If-Modified-Since 或 ETag/If-None-Match，发请求让服务端判断，304 则用本地。  
- **流程**：先看强缓存，过期则发请求带 If-xxx，服务端比较后 304 或 200。  
- **前端实践**：静态资源 hash 文件名 + 长 max-age；HTML 不缓存或短缓存；接口按业务设 Cache-Control 或 no-store。

---

**Q22：常用 Web 开发调试工具有哪些？分别用来做什么？**

**答：**  
- **Chrome DevTools**：Elements 看 DOM/CSS、Console 看日志、Network 看请求、Performance 看性能、Application 看存储。  
- **React DevTools**：查看组件树、props/state、Profiler 分析渲染耗时。  
- **Redux DevTools**：查看 state 变化、时间旅行调试。  
- **Lighthouse**：性能、可访问性、SEO 打分。  
- **抓包工具**：Charles、Fiddler 抓 HTTP/HTTPS、模拟弱网、改响应。

---

## 六、项目经历相关面试题（Site Configuration Flow / Smart CS Core）

> 以下题目基于 Vite + React 18 + Redux + Ant Design + ECharts + Monaco + HandsOnTable + RBAC + CI/CD 等实战场景，面试官可能会追问具体实现细节。

### 架构与组件设计

**P1：React-Grid-Layout 实现拖拽布局时，如何做状态管理和持久化？**

**答：**  
- **状态**：布局数据（各块 position、size）存 Redux；用 Redux Toolkit 的 `createSlice` 管理 layout 数组，每项含 `i`、`x`、`y`、`w`、`h` 等。  
- **持久化**：① 保存时调接口或 `localStorage` 存 JSON；② 进入页面时从接口/本地读出，`dispatch` 到 Redux；③ `ReactGridLayout` 的 `layout` 从 Redux 取，`onLayoutChange` 里 `dispatch` 更新；④ 可做防抖，避免频繁持久化。  
- **注意**：responsive 时需处理断点下的 `layouts` 结构；多用户/多方案时可加 `layoutId` 区分。

---

**P2：如何封装 ECharts 为 React 组件？useEcharts Hook 如何管理生命周期和响应式更新？**

**答：**  
- **封装**：用 `useRef` 拿容器 DOM，`useEffect` 里 `echarts.init(ref.current)`，配置项通过 props 传入；返回时 `chart.dispose()` 销毁。  
- **useEcharts**：接收 `option`、`theme` 等依赖；`useEffect` 内 `chart.setOption(option)`，依赖变化时更新；可选 `resize` 监听窗口变化；cleanup 时 `dispose`。  
- **优化**：大 option 用 useMemo；`notMerge` 控制是合并还是全量替换；按需引入 ECharts 模块减小体积。

---

**P3：Monaco Editor 集成时，如何支持 TypeScript/JavaScript 智能提示和语法检查？**

**答：**  
- **语言支持**：Monaco 内置 TS/JS，需加载对应 worker；`monaco-editor/esm/vs/language/typescript/ts.worker` 等，通过 `MonacoEnvironment.getWorkerUrl` 或 `monaco-editor-webpack-plugin` 配置。  
- **智能提示**：启用 `editor.getSuggestions`、配置 `compilerOptions`；可注入自定义 completion provider；TS 需配置 `extraLibs` 或 `addExtraLib` 提供 d.ts。  
- **语法检查**：TS 模式下自动报错；可配置 `diagnosticsOptions`、自定义 `setModelMarkers`。  
- **注意**：Monaco 体积大，用 `@monaco-editor/react` 或按需加载语言/主题；初始化可异步避免阻塞首屏。

---

**P4：基于 RBAC 的权限管理，如何做组件级权限控制？自定义 Hook 如何设计？**

**答：**  
- **RBAC**：用户 → 角色 → 权限；权限可为菜单、按钮、接口等；登录后接口返回用户角色/权限列表，存 Redux 或 Context。  
- **组件级**：`usePermission()` 或 `useAccess()` 返回 `{ canEdit, canDelete, ... }`；组件内 `if (!canEdit) return null` 或封装 `<PermissionButton permission="edit" />`；路由级可用 `Access` 包裹或路由配置里加 `access` 字段。  
- **Hook 设计**：`function usePermission(permission: string) { const perms = useSelector(state => state.auth.permissions); return perms.includes(permission); }`；可支持多权限 `hasAny`、`hasAll`；权限数据从 token 解析或接口拉取后注入。

---

### 性能与工程化

**P5：React.lazy + Suspense 实现路由级代码分割时，如何配合 Vite 优化？首屏提升 50% 的具体手段？**

**答：**  
- **实现**：路由 `component: React.lazy(() => import('@/views/xxx'))`，外层 `<Suspense fallback={<Skeleton />}>`；Vite 的 `import()` 会打成独立 chunk，进入路由时才加载。  
- **Vite 优化**：① 预构建依赖（esbuild）减小模块数；② `manualChunks` 把大库（如 echarts、monaco）单独拆包；③ 首屏路由的 chunk 可 `preload`；④ 分析 bundle，移除未用代码。  
- **首屏手段**：非首屏路由全部 lazy；首屏组件精简、减少同步依赖；图片/字体懒加载；接口并行、减少瀑布请求；骨架屏减少白屏感；生产构建开启压缩、CDN。

---

**P6：i18next 国际化中，语言包懒加载和命名空间如何配置？RTL 如何实现？**

**答：**  
- **懒加载**：`i18n.use(Backend)` 配 `loadPath`，按需加载对应语言 JSON；或 `import()` 动态加载，`i18n.addResourceBundle` 注册；进入某语言/命名空间时才请求。  
- **命名空间**：`t('ns:key')` 或 `useTranslation('ns')`；按业务拆 ns（如 `common`、`dashboard`），减少单文件体积；可配置 `nsSeparator`、`keySeparator`。  
- **RTL**：检测语言（如 ar）时设置 `document.dir = 'rtl'`，或给根元素 `dir` 属性；CSS 用 `margin-inline-start` 等逻辑属性；部分组件库（如 Ant Design）支持 RTL 模式。

---

### 数据与 AI 相关

**P7：AI 对话模块的流式输出如何实现？SSE 还是 WebSocket？**

**答：**  
- **流式**：服务端逐字/逐块返回，前端持续渲染；常用 **SSE**（EventSource 或 fetch 流式），或 **WebSocket**。  
- **SSE**：`EventSource` 或 `fetch(url, { body }).then(r => r.body.getReader())` 读流，按 chunk 解码、拼接、更新 state；React 中 setState 会触发多次渲染，逐字追加到消息内容。  
- **WebSocket**：双向、低延迟，适合对话+实时推送；实现类似，`onmessage` 里解析、append 到当前消息。  
- **注意**：需处理断线重连、AbortController 取消；长对话考虑分片或摘要。

---

**P8：知识库 RAG 检索在前端如何配合？文档解析（PDF/Word）是前端还是后端？**

**答：**  
- **RAG**：一般流程为用户提问 → 后端检索知识库 → 拼接 prompt → 调用 LLM；前端负责输入、流式展示回答、展示引用来源（chunk、文档名）。  
- **文档解析**：PDF/Word 解析通常在**后端**（pdf.js、python-docx 等），前端只负责上传；前端可做预览（pdf.js 渲染、Office 在线预览），不做切分/向量化。  
- **前端职责**：上传组件、进度、格式校验；展示检索到的 chunks、高亮匹配；批量上传、任务状态轮询或 WebSocket 通知。

---

### DevOps 与部署

**P9：GitLab CI/CD 三阶段流水线（node-build / docker-build / helm-deploy）如何设计？**

**答：**  
- **node-build**：安装依赖、lint、test、`npm run build`；产物为 dist 或静态文件；可缓存 `node_modules` 加速。  
- **docker-build**：以构建产物为输入，多阶段构建：先 node 镜像 build，再 nginx 镜像拷贝 dist，最终镜像只含 nginx + 静态文件；推送到镜像仓库。  
- **helm-deploy**：用 Helm Chart 模板化 K8s 配置（Deployment、Service、Ingress）；通过 `values` 区分 Dev/UAT/Prod；流水线里 `helm upgrade --install` 部署到对应集群；可做健康检查、回滚。

---

**P10：Kubernetes HPA 如何实现弹性伸缩？Helm 多环境部署如何做参数化？**

**答：**  
- **HPA**：Horizontal Pod Autoscaler，根据 CPU/内存或自定义指标自动增减 Pod 数量；需配置 `minReplicas`、`maxReplicas`、`metrics`；需 Metrics Server 提供指标。  
- **Helm 参数化**：`values.yaml` 存默认值；`values-dev.yaml`、`values-prod.yaml` 覆盖环境差异（如镜像 tag、副本数、环境变量）；`helm install -f values-prod.yaml` 或 CI 里按分支选择 values 文件；敏感信息用 `--set` 或 Secret。

---

**P11：Nginx + Docker 多阶段构建如何优化前端镜像体积？**

**答：**  
- **多阶段**：第一阶段用 `node` 镜像执行 `npm run build`；第二阶段用 `nginx` 基础镜像，只 `COPY --from=0 /app/dist /usr/share/nginx/html`，不包含 node、源码；最终镜像仅 nginx + 静态文件。  
- **体积优化**：使用 `nginx:alpine` 等小镜像；dist 内移除 map 文件、未用资源；可考虑 distroless 或 scratch + 静态二进制。  
- **Nginx**：配置 gzip、缓存头、SPA 的 try_files；可分离前端配置为 ConfigMap 挂载。

---

### 综合追问

**P12：虚拟滚动在 HandsOnTable 或大表格里如何应用？和普通表格有什么区别？**

**答：**  
- **HandsOnTable**：内置虚拟渲染，只渲染可视行；配置 `renderAllRows: false`（默认）即可；大量数据时主要靠其内置优化。  
- **自研表格**：需实现虚拟滚动：根据 scrollTop 计算可见行范围，只渲染这几行，用占位撑开总高度；或使用 react-window、rc-table 虚拟模式。  
- **区别**：普通表格全量渲染 DOM，数据量大时卡顿；虚拟滚动 DOM 数量恒定，滚动时切换渲染的行。

---

**P13：Axios 的请求拦截、响应处理、错误重试如何封装？**

**答：**  
- **请求拦截**：统一加 `Authorization: Bearer token`、`Content-Type`、租户/设备等公共头；对 body 做序列化。  
- **响应拦截**：2xx 解析 `data`；401 跳登录或刷新 token；403/404 提示；5xx 可选重试；业务 code 非成功时统一提示并 reject。  
- **重试**：可封装 `axios-retry` 或自写：拦截器里 catch 到网络错误/超时/5xx 时，判断重试次数，未超限则 delay 后再次请求；需传入 `config` 里的重试标记，避免无限重试。

---

**P14：ESLint + Prettier + Git Hooks 如何配合？husky 做了什么？**

**答：**  
- **ESLint**：代码质量，Prettier 只管格式；用 `eslint-config-prettier` 关闭 ESLint 的格式规则，避免冲突。  
- **Prettier**：统一缩进、引号、分号等；可单独跑或通过 `eslint-plugin-prettier` 集成进 ESLint。  
- **Git Hooks**：`husky` 管理 `.git/hooks`，`pre-commit` 里跑 `lint-staged`，只对暂存文件执行 `eslint --fix`、`prettier --write`；提交前自动检查，不通过则阻止 commit。

---

### 简历数字追问（面试官常见追问）

**P15：你说「首屏加载优化 50% 以上」，具体做了哪些措施？如何量化的？**

**答：**  
- **措施**：① 路由级代码分割，非首屏页面用 `React.lazy` + `Suspense` 打成独立 chunk，进入时才加载；② Vite 的 `manualChunks` 把 ECharts、Monaco、Ant Design 等大库单独拆包，避免主 chunk 过大；③ 图片懒加载（IntersectionObserver），首屏外图片延迟加载；④ 接口并行，减少请求瀑布；⑤ 骨架屏减少白屏感知。  
- **量化方式**：用 Chrome DevTools Performance 或 Lighthouse 测 FCP、LCP、TTI；优化前后对比同一环境下的指标；如 FCP 从 2.5s 降到 1.2s，LCP 从 4s 降到 2s，可折算为「首屏体验提升约 50%」；生产可用 Performance API 上报 RUM 数据做持续监控。

---

**P16：「文档处理效率提升 50%」具体指什么指标？前端做了哪些优化？**

**答：**  
- **指标含义**：一般指「单位时间内处理的文档数量」或「单文档从上传到可检索的耗时」；如原先 10 个 PDF 需 5 分钟，优化后 2.5 分钟，即提升 50%。  
- **前端优化**：① 批量上传时并发控制，合理设置并发数（如 3～5），避免阻塞；② 分片上传大文件，失败时只重传失败片；③ 前端做任务队列或进度聚合，用户可看到整体进度；④ 与后端协作：异步处理、WebSocket 或轮询通知任务完成，前端不阻塞等待；⑤ 文档列表虚拟滚动，大量文档时渲染不卡顿。  
- **注意**：若主要耗时在后端解析，前端优化主要是「体验」——进度展示、并行上传、不阻塞交互；真正的效率提升需前后端配合（如后端分布式解析、缓存等）。

---

**P17：「用户体验提升 30%」如何衡量？流式输出对体验的贡献是什么？**

**答：**  
- **衡量方式**：① 可做 A/B 对比：流式 vs 一次性返回，统计平均首字/首句响应时间、用户等待时长；② 用户反馈、NPS；③ 停留时长、对话轮次等行为数据；④ 主观体验问卷（如 1～5 分）。30% 可以是「首字响应时间缩短约 30%」或综合指标折算。  
- **流式输出贡献**：一次性返回需等完整回答再展示，用户长时间见空白；流式可逐字/逐块展示，首字几百毫秒内出现，用户感知「在实时打字」，等待焦虑大幅降低；长回答时用户可边看边读，不必等全部生成完；整体体验更接近真人对话，所以能显著提升主观体验。

---

**P18：「响应速度提升 40%」有哪些优化手段？WebSocket 如何接入的？**

**答：**  
- **优化手段**：① 接口合并、减少请求数；② 请求并行，避免串行等待；③ 合理缓存（如 react-query、swr），相同参数不重复请求；④ WebSocket 替代轮询，实时数据推送，无轮询延迟；⑤ 前端防抖/节流，减少无效请求；⑥ 后端接口优化（响应体积、索引等）也会体现到前端。  
- **WebSocket 接入**：建立连接 `new WebSocket(url)`，在 `onopen` 里订阅或发鉴权消息；`onmessage` 里解析服务端推送，更新 Redux 或 state；做断线重连（指数退避）、心跳保活；路由切换或组件卸载时 `close()`，避免泄漏；可封装成 `useWebSocket` Hook，统一管理连接和消息分发。

---

**P19：「代码复用率 80%」怎么算的？复用策略和组件抽象思路是什么？**

**答：**  
- **计算方式**：可理解为「公共组件 + 工具函数」覆盖的代码行数占总业务代码的比例；或「新增功能时从现有组件/模块复用的比例」；如 10 个页面中有 8 个大量用到了封装的 MultiPanelTile、Modal、Notification 等，可粗略说复用率约 80%。  
- **复用策略**：① 基于 EDS 设计系统做二次封装，保证视觉和交互统一；② UI 组件（Modal、Notification）抽象成带业务约定的版本；③ 业务组件（如表格+搜索+分页）抽成 SearchTable 等，通过 props 配置；④ Hooks 抽公共逻辑（如 useTable、usePermission）；⑤ 工具函数集中到 utils，避免各处重复实现。  
- **抽象思路**：先识别重复模式（在哪 3 个以上地方出现过），再考虑抽象；保持「高内聚低耦合」，通过 props/插槽扩展；文档和示例齐全，降低使用成本；避免过度抽象，简单场景保持简单。

---

**P20：「页面加载速度提升 60%」虚拟滚动、懒加载具体是怎么实现的？**

**答：**  
- **虚拟滚动**：只渲染可视区域及上下 buffer 的列表项，总高度用空 div 撑开；监听 scroll，根据 scrollTop 和单条高度计算 `startIndex`、`endIndex`，只渲染该区间的数据；用 react-window、react-virtualized 或自研均可；定高简单，不定高需预估或测量后缓存。  
- **懒加载**：① 路由 `React.lazy(() => import('@/views/xxx'))`，进入时再加载；② 图片用 `loading="lazy"` 或 IntersectionObserver，进入视口再设 src；③ 弹窗、Tab 内容用 `React.lazy` 或 `defineAsyncComponent`，首次打开才加载；④ 接口按需请求，如分页、滚动到底再加载更多。  
- **效果**：DOM 数量从几千降到几十，首屏和滚动时的 JS 执行、重排重绘大幅减少；结合代码分割、资源优化，整体加载和交互指标（如 LCP、TTI、滚动帧率）可提升 50%～60%；需在同一环境（设备、网络）下对比优化前后数据。

---