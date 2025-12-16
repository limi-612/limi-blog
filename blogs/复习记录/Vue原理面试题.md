---
title: "Vue面试题整理 - 从基础到原理"
date: 2025/12/16
tags:
  - Vue2
  - Vue3
  - 面试
categories:
  - 复习记录
---

<ReadAloud />

## Vue 基础面试题

### 1. Vue 是什么？有什么特点？

- **渐进式框架**：可以逐步采用，不需要重写整个应用
- **响应式数据绑定**：数据变化自动更新视图
- **组件化开发**：提高代码复用性和维护性
- **虚拟 DOM**：提升渲染性能
- **轻量级**：体积小，学习成本低

### 2. Vue2 和 Vue3 的主要区别？

- **性能提升**：Vue3 比 Vue2 快 1.3-2 倍
- **Composition API**：更好的逻辑复用和类型推导
- **Tree-shaking 支持**：更小的打包体积
- **多根节点**：template 支持多个根节点
- **Teleport**：可以将组件渲染到 DOM 的任意位置
- **Suspense**：异步组件的加载状态处理

### 3. v-if 和 v-show 的区别？

- **v-if**：条件渲染，false 时不会渲染 DOM 元素
- **v-show**：条件显示，false 时设置 display:none
- **性能**：v-if 切换开销大，v-show 初始渲染开销大
- **使用场景**：频繁切换用 v-show，条件很少改变用 v-if

### 4. computed 和 watch 的区别？

- **computed**：
  - 计算属性，有缓存
  - 依赖的数据变化时才重新计算
  - 必须有返回值
  - 适合一对多的场景
- **watch**：
  - 监听器，无缓存
  - 监听数据变化执行回调
  - 无返回值要求
  - 适合一对一的场景，执行异步操作

### 5. Vue 组件通信方式有哪些？

- **父子组件**：props/$emit
- **兄弟组件**：EventBus、Vuex
- **跨级组件**：provide/inject、Vuex
- **任意组件**：Vuex、EventBus

## Vue 进阶面试题

### 6. Vue 的生命周期有哪些？

**Vue2 生命周期**：

- beforeCreate：实例初始化之后，数据观测之前
- created：数据观测完成，可以使用数据，不能访问 DOM
- beforeMount：挂载开始之前
- mounted：挂载完成，可以访问 DOM
- beforeUpdate：数据更新时调用
- updated：数据更新完成
- beforeDestroy：实例销毁之前
- destroyed：实例销毁完成

**Vue3 生命周期**：

- setup()：组合式 API 的入口
- onBeforeMount()、onMounted()
- onBeforeUpdate()、onUpdated()
- onBeforeUnmount()、onUnmounted()

### 7. Vue 的双向数据绑定原理？

- **Vue2**：Object.defineProperty 劫持对象属性
- **Vue3**：Proxy 代理整个对象
- **发布订阅模式**：Dep 收集依赖，Watcher 订阅更新
- **数据变化**：触发 setter → 通知 Watcher → 更新视图

### 8. 什么是虚拟 DOM？有什么优势？

- **定义**：用 JavaScript 对象描述真实 DOM 结构
- **优势**：
  - 减少直接操作 DOM，提升性能
  - 跨平台能力
  - 便于实现 diff 算法
  - 批量更新，减少重排重绘

### 9. Vue 的 diff 算法原理？

- **同层比较**：只比较同一层级的节点
- **key 的作用**：提高 diff 效率，复用节点
- **双端比较**：新旧节点列表的首尾对比
- **最长递增子序列**：Vue3 中优化移动操作

### 10. Vue 组件的渲染过程？

1. **模板编译**：template → render 函数
2. **响应式处理**：数据劫持，依赖收集
3. **虚拟 DOM 生成**：执行 render 函数
4. **patch 过程**：虚拟 DOM → 真实 DOM
5. **依赖更新**：数据变化触发重新渲染

## Vue 原理深入面试题

### 11. Vue 的响应式原理详解？

**Vue2 响应式**：

```javascript
// 简化版响应式实现
function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        dep.notify();
      }
    },
  });
}
```

**Vue3 响应式**：

```javascript
// 简化版Proxy实现
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    },
  });
}
```

### 12. Vue 的编译过程？

1. **解析（Parse）**：模板 → AST 抽象语法树
2. **优化（Optimize）**：标记静态节点
3. **生成（Generate）**：AST → render 函数代码

### 13. Vue 的依赖收集原理？

- **Dep 类**：依赖收集器，管理 Watcher
- **Watcher 类**：观察者，响应数据变化
- **收集时机**：getter 触发时收集依赖
- **触发更新**：setter 触发时通知所有 Watcher

### 14. Vue 的异步更新机制？

- **nextTick**：在下次 DOM 更新循环结束后执行回调
- **更新队列**：将同一事件循环中的所有数据变更缓存
- **批量更新**：避免重复渲染，提升性能
- **实现原理**：Promise.then → MutationObserver → setImmediate → setTimeout

### 15. Vue Router 的实现原理？

**Hash 模式**：

- 利用 URL 的 hash 部分（#后面）
- 监听 hashchange 事件
- 不会向服务器发送请求

**History 模式**：

- 利用 HTML5 History API
- 监听 popstate 事件
- 需要服务器配置支持

### 16. Vuex 的实现原理？

- **单一状态树**：全局唯一的 store
- **响应式状态**：state 变化自动更新组件
- **严格的状态修改**：只能通过 mutation 修改 state
- **异步操作**：通过 action 处理异步逻辑

### 17. Vue 的性能优化策略？

- **代码层面**：
  - 合理使用 v-if 和 v-show
  - 列表渲染使用 key
  - 避免在模板中使用复杂表达式
  - 使用 computed 缓存计算结果
- **打包层面**：
  - 路由懒加载
  - 组件懒加载
  - 第三方库按需引入
- **用户体验**：
  - 骨架屏
  - 虚拟滚动
  - 图片懒加载

### 18. Vue3 的 Composition API 优势？

- **更好的逻辑复用**：通过组合函数实现
- **更好的类型推导**：TypeScript 支持更好
- **更灵活的组织代码**：相关逻辑可以组织在一起
- **更小的打包体积**：支持 tree-shaking

### 19. Vue 的 keep-alive 原理？

- **缓存机制**：缓存组件实例，避免重复创建
- **LRU 算法**：最近最少使用算法管理缓存
- **生命周期**：activated 和 deactivated 钩子
- **include/exclude**：控制哪些组件被缓存

### 20. Vue 的插槽（slot）原理？

- **编译时处理**：将插槽内容编译为函数
- **作用域插槽**：子组件向父组件传递数据
- **具名插槽**：多个插槽的命名和分发
- **默认内容**：插槽的默认显示内容

## Vue3 Composition API 深入面试题

### 21. createApp 底层原理？

创建 vue 实例的 API，创建独立的应用上下文，初始化组件实例配置，设置应用范围内的共享数据和方法，返回包含 mount、use、component 等方法应用实例。

### 22. mount 底层原理？

接收一个 DOM 元素，查找目标元素，编译根组件模板或使用渲染函数，创建虚拟 DOM，将虚拟 DOM 渲染成真实 DOM，挂载到目标元素中。

### 23. Vue2 和 Vue3 创建根实例的区别？

- **Vue2**：Vue2 使用 new Vue()方式创建根实例
- **Vue3**：Vue3 使用 createApp()创建根实例，提供更好的封装性和多应用实例的支持
- **隔离性**：每个 createApp 创建的应用实例相互隔离，不会相互影响

### 24. Options API 和 Composition API 的区别？

- **代码组织方式**：Options API 按照功能类别组织代码，将 data、methods、mounted、computed、watch 等选项分离在不同区域中；Composition API 按照逻辑功能组织代码，相关联的响应式数据、方法、计算属性等可以放在一起
- **逻辑复用**：Options API 主要通过 mixins 实现逻辑复用，但容易出现命名冲突和数据来源不清晰的问题；Composition API 通过 composable 函数实现逻辑复用，更加灵活易于维护
- **TypeScript 支持**：Options API 对 TypeScript 支持有限，类型推导不完善；Composition API 原生支持 TypeScript，提供更好的类型推导和开发体验
- **学习曲线**：Options API 概念相对简单，适合初学者快速上手；Composition API 需要理解响应式系统和组合逻辑的概念
- **适用场景**：Options API 适用于简单的组件和快速原型开发；Composition API 更适合大型项目和复杂开发，便于逻辑组织和维护
- **响应式数据声明**：Options API 通过在 data()函数中返回对象形式声明响应式数据；Composition API 通过使用 ref 和 reactive API 显式声明响应式数据

## Vue3 响应式系统深入面试题

### 25. ref 底层原理？

Vue 使用 getter 和 setter 来拦截对.value 的访问和修改，从而触发依赖收集和更新通知。

### 26. ref 怎么触发依赖收集和更新通知？

- **依赖收集**：当代码读取 ref.value 时，触发 RefImpl 的 getter，在 getter 中调用 track 函数进行依赖收集，将当前正在执行的副作用函数（如组件渲染、watch 等）作为依赖存储起来
- **更新通知**：当修改 ref.value 时，触发 setter，更新\_value 属性，调用 trigger 触发依赖更新通知，通知所有收集到的依赖（副作用函数）重新执行

### 27. ref 和 reactive 的区别？

- **数据类型支持**：ref 支持所有数据类型，对基本类型进行包装，对引用类型会自动调用 reactive 进行处理；reactive 只支持对象和数组等引用类型
- **访问方式**：ref 需要通过.value 访问，在模板中使用时会自动解包；reactive 直接访问属性，无需.value
- **底层原理**：ref 基于 JavaScript 的 getter/setter 实现，对基本类型值进行包装，创建一个包含.value 属性的对象；reactive 基于 Proxy 实现，创建目标对象的代理，拦截各种操作行为

### 28. ref 为什么返回一个对象？

- **保持响应式特性**：将基本类型值包装在一个对象中，可以通过对该对象的.value 属性访问和修改来实现响应式追踪
- **统一访问接口**：返回对象并通过.value 访问，提供了统一的 API 接口，无论是基本类型还是对象类型都可以一致处理
- **兼容性和便利性**：对于对象类型，ref 内部会自动调用 reactive 进行处理，不需要区分基本类型和引用类型，都可以使用相同的 ref API

### 29. ref 在模板渲染过程中自动解包的底层原理？

- 当在模板表达式中访问 ref 变量时，Vue 会通过 isRef()检查该变量是否为 ref 对象，如果是 ref 对象，则自动返回其.value 值
- **提升开发体验**：避免在模板中频繁书写.value，保持一致性，在模板中可以直接像使用普通变量一样使用 ref，减少开发者忘记添加.value 的错误

### 30. reactive 底层原理？

- **基于 Proxy 实现**：reactive 利用 JavaScript 的 Proxy API 创建目标对象的代理，从而拦截对象的各种操作
- **依赖收集和派发更新**：在 getter 中进行依赖收集（track），当访问代理对象的属性时，会将当前的副作用（如组件渲染、watch 等）作为依赖收集起来。在 setter 中进行更新派发（trigger），当修改代理对象的属性时，会触发之前收集到的依赖，执行相应的副作用函数

### 31. Reflect 做了什么？

- **Reflect API**：Reflect 是一个内置对象，提供了一些方法，用于操作对象。这些方法与 Object 的方法类似，但更安全，不会抛出错误。Reflect 方法可以确保正确的 this 绑定和行为
- **Reflect.get()**：Reflect.get()方法用于读取对象的属性值
- **Reflect.set()**：Reflect.set()方法用于设置对象的属性值

### 32. 为什么 Vue3 不用 Object.defineProperty 了？

- **无法监听新增/删除属性**：Object.defineProperty 在创建时一次性递归遍历对象的所有属性，这个过程只在初始化阶段发生一次，导致新增/删除属性无法监听。对于新增或删除属性，需要通过 Vue.set()或 Vue.delete()来实现；Proxy 可以拦截对象的所有操作，包括属性的新增和删除
- **无法监听数组索引变化**：Object.defineProperty 无法有效监听通过索引设置数组项的操作，需要通过重写数组方法（push、pop 等）来实现响应式；Proxy 可以完美监听数组的所有变化
- **性能更好**：Object.defineProperty 需要在创建响应式对象时遍历所有属性并逐一定义 getter、setter；Proxy 在初始化时不需要递归遍历所有属性，只在访问属性时才进行拦截处理
- **功能更强大**：Proxy 可以实现更丰富的功能，如拦截属性的读取、设置、删除、枚举、属性验证等，而 Object.defineProperty 只能实现属性的读取和设置
- **代码更简洁**：使用 Proxy 的实现更加直观和简洁，不需要像 Vue2 那样维护复杂的边界情况处理逻辑

### 33. readonly 底层原理？

- **基于 Proxy 实现**：readonly 与 reactive 类似，都是基于 JavaScript 的 Proxy API 实现，创建一个目标对象的代理，但会对所有修改操作进行拦截并阻止
- **拦截修改操作**：当尝试修改只读对象时，Vue 会在 Proxy 的 set、deleteProperty 等陷阱（trap）中阻止这些操作
- **保持响应式特性**：虽然对象是只读，但仍然保持响应式特性，意味着当原始对象发生变化时，依赖于只读代理的副作用（如组件渲染）仍会被正确触发
- **嵌套对象处理**：readonly 会递归地将整个对象树转换为只读，包括所有嵌套的对象属性
- **开发环境警告**：在开发环境中，Vue 会在修改只读对象时发出警告，提示开发者不要修改只读对象

### 34. shallowReactive() 和 reactive() 的区别？

- **响应式层级不同**：reactive()会对整个对象进行深层次的响应式转换，包括所有嵌套的对象属性；shallowReactive()只会对对象的第一层属性进行响应式处理，而嵌套对象则不会被转换为响应式
- **性能差异**：reactive()由于需要递归处理所有嵌套属性，开销大；shallowReactive()只处理第一层，性能更好，适用于不需要深层响应式的场景

### 35. shallowReactive() 的底层原理？

- **基于 Proxy 实现**：与 reactive()类似，shallowReactive()同样基于 JavaScript 的 Proxy API 实现，创建目标对象的代理
- **浅层处理机制**：与 reactive()的主要区别在于 shallowReactive()在处理属性访问时，不会对嵌套对象自动调用 reactive()进行深层转换
- **拦截操作范围受限**：只对顶层属性的访问（get）和修改（set）进行拦截和响应式处理，对于嵌套对象的属性操作不会触发响应式行为
- **性能优化策略**：通过限制响应式转换的深度，避免不必要的递归处理，提高初始化性能和减少内存占用

## Vue3 监听器深入面试题

### 36. watch() 底层原理？

- **依赖收集**：在首次执行时，访问 source 中的响应式数据，通过 ReactiveEffect 收集所有被访问的响应式属性作为依赖
- **变化检测**：当依赖的响应式数据变化时，触发 scheduler 调度执行回调，根据配置选项（如 flush）决定执行时机
- **回调执行**：比较新旧值确定是否需要执行回调，支持 immediate 选项控制是否立即执行

### 37. watchEffect() 和 watch() 的区别？

- **监听方式**：watchEffect 自动追踪回调函数内的响应式依赖；watch 显式指定要监听的响应式数据源
- **初始执行**：watchEffect 立即执行一次，然后追踪依赖；watch 默认不立即执行，除非设置 immediate:true
- **回调函数参数**：watchEffect 回调函数不接收参数；watch 回调函数接收（newVal，oldVal）参数

## Vue 指令深入面试题

### 38. v-for 循环的 key 是什么作用？

- **帮助识别元素变化**：Vue 使用 key 来建立虚拟 DOM 节点与真实 DOM 元素之间的映射关系。当数据更新时，Vue 可以通过比较新旧 key 快速判断出应该执行怎样的 DOM 操作
- **优化渲染性能**：Vue 可以最小化 DOM 操作次数，只更新真正发生变化的部分，避免不必要重新渲染整个列表
- **维持组件状态和触发过渡效果**：使用 key 可以保证组件的状态（如输入框内容、复选框状态等）在列表更新时不丢失
- **避免就地更新策略带来的问题**：如果没有提供 key，Vue 会采用"就地更新"策略，可能导致一些意外的行为，比如表单元素的状态错乱

### 39. v-for 循环的 key 的底层原理？

- **无 key 的更新机制**：当未指定 key 时，Vue 采用就地复用策略，依据索引顺序进行新旧虚拟节点比对。数据变动会导致大量不必要的 DOM 原地更新和潜在的组件状态错乱
- **有 key 的更新机制**：当指定了 key 时，Vue 会启动 keyed Diff 算法，基于 key 进行新旧虚拟节点比对，并使用 key 进行映射，从而避免了就地更新策略带来的问题
  - **头部/尾部同步**：快速跳过相同前缀和后缀
  - **映射查找**：构建旧节点 key 到索引的映射表，遍历新节点用 key 精准查找匹配
  - **精准操作**：找到匹配，复用现有 DOM 节点，仅必要时移动位置。未找到，新建节点。旧节点未使用，卸载节点

### 40. v-model 的原理？

- v-model 是一个语法糖，本质是 v-bind 和 v-on 的组合
- **数据绑定**：通过 v-bind 将组件数据绑定到表单元素的 value 属性
- **事件监听**：通过 v-on 监听表单元素的输入事件
- **数据更新**：当用户输入时，触发事件处理器更新组件数据
- **视图更新**：数据更新后，Vue 的响应式系统会自动更新视图

### 41. v-memo 的底层原理？

- **缓存存储**：为带有 v-memo 的节点维护一个特殊的缓存槽。缓存内容：上一次渲染生成的完整虚拟 DOM 子树，以及对应的依赖值快照
- **依赖比较**：每次组件重渲染时，将 v-memo="[deps]"中的依赖值与缓存快照进行浅层严格相等比较（使用 Object.is 或类似机制）。比较算法：按顺序逐个对比数组中的每个依赖项
- **决策分支**：所有依赖值完全相同：直接返回缓存的虚拟 DOM 子树。任一依赖值变化：正常执行完整渲染流程，用新结果更新缓存
